import TargetTools from "@adobe/target-tools";
import { createDecisioningContext } from "./contextProvider";
import { getDecisions, getRules } from "./decisionProvider";
import ArtifactProvider from "./artifactProvider";
import Messages from "./messages";

/**
 * The TargetDecisioningEngine initialize method
 * @param {Object} config Options map, required
 * @param {String} config.client Target Client Id, required
 * @param {String} config.organizationId Target Organization Id, required
 * @param {Number} config.pollingInterval Polling interval in ms, default: 30000
 * @param {String} config.artifactLocation Fully qualified url to the location of the artifact, optional
 * @param {String} config.artifactPayload A pre-fetched artifact, optional
 * @param {Object} config.logger Replaces the default noop logger, optional
 */
async function initialize(config) {
  const logger = TargetTools.getLogger(config.logger);

  const artifactProvider = await ArtifactProvider.initialize({
    client: config.client,
    organizationId: config.organizationId,
    pollingInterval: config.pollingInterval,
    artifactLocation: config.artifactLocation,
    artifactPayload: config.artifactPayload,
    logger
  });

  let artifact = artifactProvider.getArtifact();

  // subscribe to new artifacts that are downloaded on the polling interval
  artifactProvider.subscribe(data => {
    artifact = data;
  });

  /**
   * The get offers method
   * @param {Object} options
   * @param {Object} options.request Target View Delivery API request, required
   * @param {String} options.visitorCookie VisitorId cookie, optional
   * @param {String} options.targetCookie Target cookie, optional
   * @param {String} options.targetLocationHintCookie Target Location Hint cookie, optional
   * @param {String} options.consumerId When stitching multiple calls, different consumerIds should be provided, optional
   * @param {Array}  options.customerIds An array of Customer Ids in VisitorId-compatible format, optional
   * @param {String} options.sessionId Session Id, used for linking multiple requests, optional
   * @param {Object} options.visitor Supply an external VisitorId instance, optional
   */
  function getOffers(targetOptions) {
    if (typeof artifact === "undefined") {
      return Promise.reject(new Error(Messages.ARTIFACT_NOT_AVAILABLE));
    }
    return getDecisions(
      createDecisioningContext(targetOptions.request),
      getRules(artifact)
    );
  }

  return Promise.resolve({
    getRawArtifact: () => artifact,
    stopPolling: () => artifactProvider.stopPolling(),
    getOffers: targetOptions => getOffers(targetOptions)
  });
}

const TargetDecisioningEngine = {
  initialize
};

export default TargetDecisioningEngine;
