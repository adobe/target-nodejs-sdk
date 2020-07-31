import { isDefined, isUndefined, values } from "@adobe/target-tools";
import Messages from "./messages";
import { ACTIVITY_ID, ACTIVITY_TYPE, EXPERIENCE_ID } from "./constants";

const byOrder = (a, b) => a.order - b.order;

/**
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 * @param {import("../types/TargetOptions").TargetOptions} targetOptions
 * @param { object } artifactTrace
 */
export function TraceProvider(config, targetOptions, artifactTrace) {
  const clientCode = config.client;
  const { sessionId, request } = targetOptions;
  const showTraces = isDefined(request.trace);

  const [tntId, profileLocation] =
    isDefined(request.id) && typeof request.id.tntId === "string"
      ? request.id.tntId.split(".")
      : [undefined, undefined];

  const profile = {
    visitorId: {
      ...request.id,
      tntId,
      profileLocation
    }
  };

  function wrap(traceResult) {
    if (!showTraces) return undefined;

    return {
      clientCode,
      artifact: artifactTrace,
      profile,
      request: {
        sessionId,
        ...traceResult.request
      },
      campaigns: traceResult.campaigns,
      evaluatedCampaignTargets: traceResult.evaluatedCampaignTargets
    };
  }

  return {
    wrap
  };
}

/**
 * @param traceProvider
 * @param { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
 */
export function RequestTracer(traceProvider, artifact) {
  let request = {};

  // add to as rules are evaluated
  const campaigns = {};
  let campaignOrder = 0;

  const evaluatedCampaignTargets = {};
  let evaluatedCampaignTargetOrder = 0;

  /**
   *
   * @param { 'execute'|'prefetch' } mode
   * @param { 'mbox'|'view'|'pageLoad' } requestType
   * @param mboxRequest
   * @param context
   */
  function traceRequest(mode, requestType, mboxRequest, context) {
    request = {
      pageURL: context.page.url,
      host: context.page.domain
    };

    request[requestType] = {
      ...mboxRequest,
      type: mode
    };
  }

  /**
   *
   * @param {import("../types/DecisioningArtifact").Rule} rule
   * @param { Boolean } ruleSatisfied
   */
  function addCampaign(rule, ruleSatisfied) {
    const { meta } = rule;
    const activityId = meta[ACTIVITY_ID];

    if (ruleSatisfied && isUndefined(campaigns[activityId])) {
      campaignOrder += 1;

      campaigns[activityId] = {
        id: activityId,
        order: campaignOrder,
        campaignType: meta[ACTIVITY_TYPE],
        branchId: meta[EXPERIENCE_ID],
        offers: meta.offerIds || [],
        environment: artifact.meta.environment
      };
    }
  }

  /**
   *
   * @param {import("../types/DecisioningArtifact").Rule} rule
   * @param { import("../types/DecisioningContext").DecisioningContext } ruleContext
   * @param { Boolean } ruleSatisfied
   */
  function addEvaluatedCampaignTarget(rule, ruleContext, ruleSatisfied) {
    const { meta } = rule;
    const { audienceIds = [] } = meta;
    const activityId = meta[ACTIVITY_ID];

    if (isUndefined(evaluatedCampaignTargets[activityId])) {
      evaluatedCampaignTargetOrder += 1;

      evaluatedCampaignTargets[activityId] = {
        order: evaluatedCampaignTargetOrder,
        context: ruleContext,
        campaignId: activityId,
        campaignType: meta[ACTIVITY_TYPE],
        matchedSegmentIds: new Set(),
        unmatchedSegmentIds: new Set(),
        matchedRuleConditions: [],
        unmatchedRuleConditions: []
      };
    }

    audienceIds.forEach(audienceId => {
      evaluatedCampaignTargets[activityId][
        ruleSatisfied ? "matchedSegmentIds" : "unmatchedSegmentIds"
      ].add(audienceId);
    });

    evaluatedCampaignTargets[activityId][
      ruleSatisfied ? "matchedRuleConditions" : "unmatchedRuleConditions"
    ].push(rule.condition);
  }

  /**
   * @param {import("../types/DecisioningArtifact").Rule} rule
   * @param { import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails } mboxRequest
   * @param { 'mbox'|'view'|'pageLoad' } requestType
   * @param { import("../types/DecisioningContext").DecisioningContext } ruleContext
   * @param { Boolean } ruleSatisfied
   */
  function traceRuleEvaluated(
    rule,
    mboxRequest,
    requestType,
    ruleContext,
    ruleSatisfied
  ) {
    addCampaign(rule, ruleSatisfied);
    addEvaluatedCampaignTarget(rule, ruleContext, ruleSatisfied);
  }

  /**
   *
   * @param {import("../types/DecisioningArtifact").Rule} rule
   */
  function traceNotification(rule) {
    const { meta } = rule;
    const activityId = meta[ACTIVITY_ID];

    if (!(campaigns[activityId].notifications instanceof Array)) {
      campaigns[activityId].notifications = [];
    }

    return notification => {
      campaigns[activityId].notifications.push(notification);
    };
  }

  function toJSON() {
    return {
      campaigns: values(campaigns)
        .sort(byOrder)
        .map(campaign => {
          const result = {
            ...campaign
          };
          delete result.order;
          return result;
        }),
      evaluatedCampaignTargets: values(evaluatedCampaignTargets)
        .sort(byOrder)
        .map(evaluatedCampaignTarget => {
          const result = {
            ...evaluatedCampaignTarget,
            matchedSegmentIds: [...evaluatedCampaignTarget.matchedSegmentIds],
            unmatchedSegmentIds: [
              ...evaluatedCampaignTarget.unmatchedSegmentIds
            ]
          };
          delete result.order;
          return result;
        }),
      request
    };
  }

  function getTraceResult() {
    return traceProvider.wrap(toJSON());
  }

  return {
    toJSON,
    traceRuleEvaluated,
    traceRequest,
    traceNotification,
    getTraceResult
  };
}

/**
 *
 * @param {string} artifactLocation
 * @param {import("../types/DecisioningArtifact").DecisioningArtifact} artifactPayload
 * @param {number} pollingInterval
 * @param {boolean} pollingHalted
 * @param {import("../types/DecisioningArtifact").DecisioningArtifact} firstArtifact
 */
export function ArtifactTracer(
  artifactLocation,
  artifactPayload,
  pollingInterval,
  pollingHalted,
  firstArtifact
) {
  let artifact = firstArtifact;
  let artifactRetrievalCount = 1;
  let artifactLastRetrieved = new Date();

  function provideNewArtifact(value) {
    artifactLastRetrieved = new Date();
    artifactRetrievalCount += 1;
    artifact = value;
  }

  const meta = isDefined(artifact) ? artifact.meta : {};

  function toJSON() {
    return {
      artifactLocation:
        typeof artifactPayload === "object"
          ? Messages.NOT_APPLICABLE
          : artifactLocation,
      pollingInterval,
      pollingHalted,
      artifactVersion: isDefined(artifact)
        ? artifact.version
        : Messages.UNKNOWN,
      artifactRetrievalCount,
      artifactLastRetrieved: artifactLastRetrieved.toISOString(),
      ...meta
    };
  }

  return {
    provideNewArtifact,
    toJSON
  };
}
