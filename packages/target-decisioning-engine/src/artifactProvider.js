import {
  getFetchApi,
  getFetchWithRetry,
  getLogger,
  isBrowser,
  isDefined,
  isNodeJS
} from "@adobe/target-tools";
import Messages from "./messages";
import {
  DEFAULT_POLLING_INTERVAL,
  LOG_PREFIX,
  MINIMUM_POLLING_INTERVAL,
  NUM_FETCH_RETRIES
} from "./constants";
import { ArtifactTracer } from "./traceProvider";
import { determineArtifactLocation } from "./utils";

const LOG_TAG = `${LOG_PREFIX}.ArtifactProvider`;
const NOT_MODIFIED = 304;
const OK = 200;

/**
 * The ArtifactProvider initialize method
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 */
async function ArtifactProvider(config) {
  const logger = getLogger(config.logger);

  function getPollingInterval() {
    if (
      // allow polling to be set to 0
      typeof config.pollingInterval === "number" &&
      config.pollingInterval === 0
    ) {
      return 0;
    }

    return Math.max(
      MINIMUM_POLLING_INTERVAL,
      typeof config.pollingInterval === "number"
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
  const fetchWithRetry = getFetchWithRetry(
    fetchApi,
    NUM_FETCH_RETRIES,
    errorMessage => Messages.ERROR_MAX_RETRY(NUM_FETCH_RETRIES, errorMessage)
  );

  const artifactLocation =
    typeof config.artifactLocation === "string"
      ? config.artifactLocation
      : determineArtifactLocation(config);

  function fetchArtifact(artifactUrl) {
    const headers = {};
    logger.debug(`${LOG_TAG} fetching artifact - ${artifactUrl}`);

    if (lastResponseEtag && !isBrowser() && isNodeJS()) {
      headers["If-None-Match"] = lastResponseEtag;
    }

    return fetchWithRetry(artifactUrl, {
      headers,
      cache: "default"
    }).then(async res => {
      logger.debug(`${LOG_TAG} artifact received - status=${res.status}`);

      if (res.status === NOT_MODIFIED && lastResponseData) {
        return lastResponseData;
      }

      let responseData;
      if (res.ok && res.status === OK) {
        responseData = await res.json();

        const etag = res.headers.get("Etag");
        if (etag != null && isDefined(etag)) {
          lastResponseData = responseData;
          lastResponseEtag = etag;
        }
      }
      return responseData;
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

  function removeAllSubscriptions() {
    const ids = Object.keys(subscriptions);
    ids.forEach(id => removeSubscription(id));
  }

  function emit(data) {
    Object.values(subscriptions).forEach(subscriptionFunc =>
      subscriptionFunc(data)
    );
  }

  function scheduleNextUpdate() {
    if (pollingInterval === 0 || pollingHalted) {
      return;
    }

    pollingTimer = setTimeout(async () => {
      try {
        artifact = await fetchArtifact(artifactLocation);
        emit(artifact);
      } catch (err) {
        const reason = err ? err.toString() : "unknown reason";
        logger.error(Messages.ARTIFACT_FETCH_ERROR(reason));
      }
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
   * @return { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
   */
  function getArtifact() {
    return artifact;
  }

  if (typeof config.artifactPayload === "object") {
    artifact = config.artifactPayload;
    pollingHalted = true;
  } else {
    try {
      artifact = await fetchArtifact(artifactLocation);
    } catch (err) {
      const reason = err.message || err.toString();
      logger.error(Messages.ARTIFACT_FETCH_ERROR(reason));
    }
    scheduleNextUpdate();
  }

  const artifactTracer = ArtifactTracer(
    artifactLocation,
    config.artifactPayload,
    pollingInterval,
    pollingHalted,
    artifact
  );

  addSubscription(value => artifactTracer.provideNewArtifact(value));

  return Promise.resolve({
    getArtifact: () => getArtifact(),
    subscribe: callbackFunc => addSubscription(callbackFunc),
    unsubscribe: id => removeSubscription(id),
    stopPolling: () => stopAllPolling(),
    resumePolling: () => resumePolling(),
    getTrace: () => artifactTracer.toJSON()
  });
}

export default ArtifactProvider;
