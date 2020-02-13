import { createContext } from "./contextProvider";
import { getOffers, getRules } from "./decisionProvider";
import ArtifactProvider from "./artifactProvider";

/**
 * The TargetDecisioningEngine initialize method
 * @param {Object} config Options map, required
 * @param {String} config.client Target Client Id, required
 * @param {String} config.organizationId Target Organization Id, required
 * @param {Number} config.pollingInterval Polling interval in ms, default: 30000
 * @param {Object} config.logger Replaces the default noop logger, optional
 */
async function initialize(config) {
  const artifactProvider = await ArtifactProvider.initialize({
    client: config.client,
    organizationId: config.organizationId,
    pollingInterval: config.pollingInterval
  });

  let artifact = artifactProvider.getArtifact();

  // subscribe to new artifacts that are downloaded on the polling interval
  artifactProvider.subscribe(data => {
    artifact = data;
  });

  return Promise.resolve({
    getRawArtifact: () => artifact,
    stopPolling: () => artifactProvider.stopPolling(),
    getOffers: targetOptions =>
      getOffers(createContext(config, targetOptions), getRules(artifact))
  });
}

const TargetDecisioningEngine = {
  initialize
};

export default TargetDecisioningEngine;
