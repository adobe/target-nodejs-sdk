import { getFetchApi, getFetchWithRetry, getLogger } from "@adobe/target-tools";
import { NOT_MODIFIED, OK } from "http-status-codes";
import Messages from "./messages";
import {
  DEFAULT_POLLING_INTERVAL,
  MINIMUM_POLLING_INTERVAL,
  NUM_FETCH_RETRIES
} from "./constants";
import { ArtifactTracer } from "./traceProvider";

// eslint-disable-next-line no-unused-vars
function determineArtifactLocation(clientId, organizationId) {
  return `UNKNOWN_ARTIFACT_LOCATION`;
}

function getPollingInterval(config) {
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

/**
 * The ArtifactProvider initialize method
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 */
async function ArtifactProvider(config) {
  const pollingInterval = getPollingInterval(config);
  const logger = getLogger(config.logger);

  const fetchApi = getFetchApi(config.fetchApi);

  let pollingHalted = false;
  let pollingTimer;

  let artifact;

  const subscriptions = {};
  let subscriptionCount = 0;

  let lastEtag;
  let lastResponse;
  const fetchWithRetry = getFetchWithRetry(
    fetchApi,
    NUM_FETCH_RETRIES,
    errorMessage => Messages.ERROR_MAX_RETRY(NUM_FETCH_RETRIES, errorMessage)
  );

  const artifactLocation =
    typeof config.artifactLocation === "string"
      ? config.artifactLocation
      : determineArtifactLocation(config.client, config.organizationId);

  function fetchArtifact(artifactUrl) {
    const headers = {
      "Access-Control-Expose-Headers": "Etag"
    };

    if (lastEtag) {
      headers["If-None-Match"] = lastEtag;
    }

    return fetchWithRetry(artifactUrl, {
      headers,
      cache: "default"
    })
      .then(res => {
        if (res.status === NOT_MODIFIED && lastResponse) {
          return lastResponse.clone();
        }

        if (res.status === OK) {
          const etag = res.headers.get("Etag");
          if (etag != null && typeof etag !== "undefined") {
            lastResponse = res.clone();
            lastEtag = etag;
          }
        }
        return res;
      })
      .then(res => res.json());
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
    if (typeof pollingTimer !== "undefined") {
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
