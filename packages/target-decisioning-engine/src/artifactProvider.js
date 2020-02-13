const DEFAULT_POLLING_INTERVAL = 300000; // five minutes (in milliseconds)

function determineArtifactLocation(clientId, organizationId) {
  return `${clientId}__${organizationId}`;
}

function fetchArtifact(artifactUrl) {
  return fetch(artifactUrl).then(res => res.json());
}

function getPollingInterval(config) {
  return Math.max(
    0,
    typeof config.pollingInterval === "number"
      ? config.pollingInterval
      : DEFAULT_POLLING_INTERVAL
  );
}

/**
 * The ArtifactProvider initialize method
 * @param {Object} config Options map, required
 * @param {String} config.client Target Client Id, required
 * @param {String} config.organizationId Target Organization Id, required
 * @param {Number} config.pollingInterval Polling interval in ms, optional, default: 30000
 * @param {String} config.artifactLocation Fully qualified url to the location of the artifact, optional
 * @param {String} config.artifactPayload A pre-fetched artifact, optional
 */
async function initialize(config) {
  const pollingInterval = getPollingInterval(config);

  let pollingHalted = false;
  let pollingTimer;

  let artifact;

  const subscriptions = {};
  let subscriptionCount = 0;

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

  const artifactLocation =
    typeof config.artifactLocation === "string"
      ? config.artifactLocation
      : determineArtifactLocation(config.client, config.organizationId);

  function scheduleNextUpdate() {
    if (pollingInterval === 0 || pollingHalted) {
      return;
    }

    pollingTimer = setTimeout(async () => {
      try {
        artifact = await fetchArtifact(artifactLocation);
        emit(artifact);
      } catch (err) {
        console.log(`Error fetching artifact: ${err.toString()}`);
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

  if (typeof config.artifactPayload === "object") {
    artifact = config.artifactPayload;
  } else {
    try {
      artifact = await fetchArtifact(artifactLocation);
    } catch (err) {
      console.log(`Error fetching artifact: ${err.toString()}`);
    }
    scheduleNextUpdate();
  }

  return Promise.resolve({
    getArtifact: () => artifact,
    subscribe: callbackFunc => addSubscription(callbackFunc),
    unsubscribe: id => removeSubscription(id),
    stopPolling: () => stopAllPolling(),
    resumePolling: () => resumePolling()
  });
}

const ArtifactProvider = {
  initialize
};

export default ArtifactProvider;
