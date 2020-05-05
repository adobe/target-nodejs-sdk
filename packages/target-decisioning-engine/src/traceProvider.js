import Messages from "./messages";
import { ChannelType } from "@adobe/target-tools/delivery-api-client";

const byOrder = (a, b) => a.order - b.order;

/**
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 * @param {import("../types/TargetOptions").TargetOptions} targetOptions
 * @param { object } artifactTrace
 */
export function TraceProvider(config, targetOptions, artifactTrace) {
  const clientCode = config.client;
  const { sessionId, request } = targetOptions;
  const showTraces = typeof request.trace !== "undefined";

  const [tntId, profileLocation] =
    typeof request.id !== "undefined" && typeof request.id.tntId === "string"
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
   * @param { 'execute'|'prefetch' } mode
   * @param mboxRequest
   * @param context
   */
  function traceViewRequest(mode, mboxRequest, context) {
    request = {
      view: {
        ...mboxRequest,
        type: mode,
        channelType: ChannelType.Web
      },
      pageURL: context.page.url,
      host: context.page.domain
    };
  }

  /**
   *
   * @param {import("../types/DecisioningArtifact").Rule} rule
   * @param { Boolean } ruleSatisfied
   */
  function addCampaign(rule, ruleSatisfied) {
    const { meta } = rule;

    if (ruleSatisfied && typeof campaigns[meta.activityId] === "undefined") {
      campaignOrder += 1;

      campaigns[meta.activityId] = {
        id: meta.activityId,
        order: campaignOrder,
        campaignType: meta.activityType,
        branchId: meta.experienceId,
        offers: meta.offerIds,
        environmentId: artifact.meta.environment
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

    if (typeof evaluatedCampaignTargets[meta.activityId] === "undefined") {
      evaluatedCampaignTargetOrder += 1;

      evaluatedCampaignTargets[meta.activityId] = {
        order: evaluatedCampaignTargetOrder,
        context: ruleContext,
        campaignId: meta.activityId,
        campaignType: meta.activityType,
        matchedSegmentIds: new Set(),
        unmatchedSegmentIds: new Set(),
        matchedRuleConditions: [],
        unmatchedRuleConditions: []
      };
    }

    meta.audienceIds.forEach(audienceId => {
      evaluatedCampaignTargets[meta.activityId][
        ruleSatisfied ? "matchedSegmentIds" : "unmatchedSegmentIds"
      ].add(audienceId);
    });

    evaluatedCampaignTargets[meta.activityId][
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
    if (!(campaigns[meta.activityId].notifications instanceof Array)) {
      campaigns[meta.activityId].notifications = [];
    }

    return notification => {
      campaigns[meta.activityId].notifications.push(notification);
    };
  }

  function toJSON() {
    return {
      campaigns: Object.values(campaigns)
        .sort(byOrder)
        .map(campaign => {
          const result = {
            ...campaign
          };
          delete result.order;
          return result;
        }),
      evaluatedCampaignTargets: Object.values(evaluatedCampaignTargets)
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

  const meta = typeof artifact !== "undefined" ? artifact.meta : {};

  function toJSON() {
    return {
      artifactLocation:
        typeof artifactPayload === "object"
          ? Messages.NOT_APPLICABLE
          : artifactLocation,
      pollingInterval,
      pollingHalted,
      artifactVersion:
        typeof artifact !== "undefined" ? artifact.version : Messages.UNKNOWN,
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
