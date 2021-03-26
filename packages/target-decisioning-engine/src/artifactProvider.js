import {
  getFetchApi,
  getFetchWithRetry,
  getLogger,
  isBrowser,
  isDefined,
  isNodeJS,
  isNumber,
  isObject,
  isString,
  noop,
  perfTool,
  values
} from "@adobe/target-tools";
import Messages from "./messages";
import {
  ARTIFACT_FORMAT_BINARY,
  DEFAULT_POLLING_INTERVAL,
  LOG_PREFIX,
  MINIMUM_POLLING_INTERVAL,
  NUM_FETCH_RETRIES
} from "./constants";
import { ArtifactTracer } from "./traceProvider";
import { determineArtifactFormat, determineArtifactLocation } from "./utils";
import {
  ARTIFACT_DOWNLOAD_FAILED,
  ARTIFACT_DOWNLOAD_SUCCEEDED,
  GEO_LOCATION_UPDATED
} from "./events";
import { createGeoObjectFromHeaders } from "./geoProvider";
import ObfuscationProvider from "./obfuscationProvider";
import {
  TIMING_ARTIFACT_DEOBFUSCATE,
  TIMING_ARTIFACT_DOWNLOADED_FETCH,
  TIMING_ARTIFACT_DOWNLOADED_TOTAL,
  TIMING_ARTIFACT_GET_INITIAL,
  TIMING_ARTIFACT_READ_JSON
} from "./timings";

const LOG_TAG = `${LOG_PREFIX}.ArtifactProvider`;
const NOT_MODIFIED = 304;
const OK = 200;

/**
 * The ArtifactProvider initialize method
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 */
function ArtifactProvider(config) {
  const logger = getLogger(config.logger);
  const { eventEmitter = noop } = config;
  const obfuscationProvider = ObfuscationProvider(config);

  function getPollingInterval() {
    if (
      // allow polling to be set to 0
      isNumber(config.pollingInterval) &&
      config.pollingInterval === 0
    ) {
      return 0;
    }

    return Math.max(
      MINIMUM_POLLING_INTERVAL,
      isNumber(config.pollingInterval)
        ? config.pollingInterval
        : DEFAULT_POLLING_INTERVAL
    );
  }

  const pollingInterval = getPollingInterval(config);

  const fetchApi = getFetchApi(config.fetchApi);

  let pollingHalted = false;
  let pollingTimer;

  let artifact;

  const subscriptions = {};
  let subscriptionCount = 0;

  let lastResponseEtag;
  let lastResponseData;

  const artifactLocation = determineArtifactLocation(config);

  const artifactFormat = isString(config.artifactFormat)
    ? config.artifactFormat
    : determineArtifactFormat(artifactLocation);

  const fetchWithRetry = getFetchWithRetry(
    fetchApi,
    NUM_FETCH_RETRIES,
    errorMessage => Messages.ERROR_MAX_RETRY(NUM_FETCH_RETRIES, errorMessage),
    error => eventEmitter(ARTIFACT_DOWNLOAD_FAILED, { artifactLocation, error })
  );

  function emitNewArtifact(artifactPayload, geoContext = {}) {
    eventEmitter(ARTIFACT_DOWNLOAD_SUCCEEDED, {
      artifactLocation,
      artifactPayload
    });

    eventEmitter(GEO_LOCATION_UPDATED, {
      geoContext
    });

    values(subscriptions).forEach(subscriptionFunc =>
      subscriptionFunc(artifactPayload)
    );
  }

  /**
   *
   * @param {import("node-fetch").Response} res
   * @return {Promise<import("../types/DecisioningArtifact").DecisioningArtifact>}
   */
  function deobfuscate(res) {
    if (artifactFormat === ARTIFACT_FORMAT_BINARY) {
      perfTool.timeStart(TIMING_ARTIFACT_DEOBFUSCATE);
      return res.arrayBuffer().then(buffer => {
        return obfuscationProvider.deobfuscate(buffer).then(deobfuscated => {
          perfTool.timeEnd(TIMING_ARTIFACT_DEOBFUSCATE);
          return deobfuscated;
        });
      });
    }
    perfTool.timeStart(TIMING_ARTIFACT_READ_JSON);
    return res.json().then(data => {
      perfTool.timeEnd(TIMING_ARTIFACT_READ_JSON);
      return data;
    });
  }

  function fetchArtifact(artifactUrl) {
    perfTool.timeStart(TIMING_ARTIFACT_DOWNLOADED_TOTAL);
    const headers = {};
    logger.debug(`${LOG_TAG} fetching artifact - ${artifactUrl}`);

    if (lastResponseEtag && !isBrowser() && isNodeJS()) {
      headers["If-None-Match"] = lastResponseEtag;
    }

    perfTool.timeStart(TIMING_ARTIFACT_DOWNLOADED_FETCH);
    return fetchWithRetry(artifactUrl, {
      headers,
      cache: "default"
    })
      .then(res => {
        perfTool.timeEnd(TIMING_ARTIFACT_DOWNLOADED_FETCH);
        logger.debug(`${LOG_TAG} artifact received - status=${res.status}`);

        if (res.status === NOT_MODIFIED && lastResponseData) {
          return lastResponseData;
        }

        if (res.ok && res.status === OK) {
          return deobfuscate(res).then(responseData => {
            const etag = res.headers.get("Etag");
            if (etag != null && isDefined(etag)) {
              lastResponseData = responseData;
              lastResponseEtag = etag;
            }
            emitNewArtifact(
              responseData,
              createGeoObjectFromHeaders(res.headers)
            );

            perfTool.timeEnd(TIMING_ARTIFACT_DOWNLOADED_TOTAL);
            return responseData;
          });
        }
        return undefined;
      })
      .catch(err => {
        const reason = err.message || err.toString();
        logger.error(Messages.ARTIFACT_FETCH_ERROR(reason));
      });
  }

  function addSubscription(callbackFunc) {
    subscriptionCount += 1;
    subscriptions[subscriptionCount] = callbackFunc;
    return subscriptionCount;
  }

  function removeSubscription(id) {
    delete subscriptions[id];
  }

  function scheduleNextUpdate() {
    if (pollingInterval === 0 || pollingHalted) {
      return;
    }

    pollingTimer = setTimeout(() => {
      fetchArtifact(artifactLocation).then(newArtifact => {
        artifact = newArtifact;
        return newArtifact;
      });
      scheduleNextUpdate();
    }, pollingInterval);
  }

  function stopAllPolling() {
    if (isDefined(pollingTimer)) {
      clearTimeout(pollingTimer);
      pollingTimer = undefined;
    }
    pollingHalted = true;
  }

  function resumePolling() {
    pollingHalted = false;
    scheduleNextUpdate();
  }

  /**
   *
   * @return { import("../types/DecisioningArtifact").DecisioningArtifact }
   */
  function getArtifact() {
    return artifact;
  }

  function getInitialArtifact() {
    perfTool.timeStart(TIMING_ARTIFACT_GET_INITIAL);

    return isObject(config.artifactPayload)
      ? Promise.resolve(config.artifactPayload)
      : fetchArtifact(artifactLocation);
  }

  return getInitialArtifact()
    .then(newArtifact => {
      perfTool.timeEnd(TIMING_ARTIFACT_GET_INITIAL);

      artifact = newArtifact;

      const artifactTracer = ArtifactTracer(
        artifactLocation,
        config.artifactPayload,
        pollingInterval,
        pollingHalted,
        artifact
      );

      addSubscription(value => artifactTracer.provideNewArtifact(value));

      return {
        getArtifact: () => getArtifact(),
        subscribe: callbackFunc => addSubscription(callbackFunc),
        unsubscribe: id => removeSubscription(id),
        stopPolling: () => stopAllPolling(),
        resumePolling: () => resumePolling(),
        getTrace: () => artifactTracer.toJSON()
      };
    })
    .finally(() => {
      scheduleNextUpdate();
    });
}

export default ArtifactProvider;
