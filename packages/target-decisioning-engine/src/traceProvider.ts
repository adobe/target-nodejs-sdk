import {
  isDefined,
  isObject,
  isString,
  isUndefined,
  values
} from "@adobe/target-tools";
import Messages from "./messages";
import {
  ACTIVITY_ID,
  ACTIVITY_TYPE,
  AUDIENCE_IDS,
  EXPERIENCE_ID,
  OFFER_ID
} from "./constants";
import { DecisioningArtifact, Rule } from "../types/DecisioningArtifact";
import { TraceInstance } from "../types/TraceInstance";
import { TraceNotification, Tracer } from "../types/Tracer";
import { TargetDeliveryRequest } from "../types/TargetDeliveryRequest";
import { DecisioningConfig } from "../types/DecisioningConfig";
import { RequestType } from "../types/RequestType";
import { DecisioningContext } from "../types/DecisioningContext";
import { AbstractRequest } from "../types/AbstractRequest";
import { RequestMode } from "../types/RequestMode";

const byOrder = (a, b) => a.order - b.order;

/**
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 * @param {import("../types/TargetDeliveryRequest").TargetDeliveryRequest} targetOptions
 * @param { object } artifactTrace
 */
export function TraceProvider(
  config: DecisioningConfig,
  targetOptions: TargetDeliveryRequest,
  artifactTrace: object
): TraceInstance {
  const clientCode = config.client;
  const { sessionId, request } = targetOptions;
  const showTraces = isDefined(request.trace);

  const [tntId, profileLocation] =
    isDefined(request.id) && isString(request.id.tntId)
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
    if (!showTraces) {
      return undefined;
    }

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
export function RequestTracer(
  traceProvider: TraceInstance,
  artifact: DecisioningArtifact
): Tracer {
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
  function traceRequest(
    mode: RequestMode,
    requestType: RequestType,
    mboxRequest: AbstractRequest,
    context: DecisioningContext
  ): void {
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
  function addCampaign(rule: Rule, ruleSatisfied: boolean) {
    const { meta } = rule;
    const activityId = meta[ACTIVITY_ID];

    if (ruleSatisfied && isUndefined(campaigns[activityId])) {
      campaignOrder += 1;

      campaigns[activityId] = {
        id: activityId,
        order: campaignOrder,
        campaignType: meta[ACTIVITY_TYPE],
        branchId: meta[EXPERIENCE_ID],
        offers: isDefined(meta[OFFER_ID]) ? [meta[OFFER_ID]] : [],
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
  function addEvaluatedCampaignTarget(
    rule: Rule,
    ruleContext: DecisioningContext,
    ruleSatisfied: boolean
  ): void {
    const { meta } = rule;
    const audienceIds = meta[AUDIENCE_IDS];
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
    rule: Rule,
    mboxRequest: AbstractRequest,
    requestType: RequestType,
    ruleContext: DecisioningContext,
    ruleSatisfied: boolean
  ): void {
    addCampaign(rule, ruleSatisfied);
    addEvaluatedCampaignTarget(rule, ruleContext, ruleSatisfied);
  }

  /**
   *
   * @param {import("../types/DecisioningArtifact").Rule} rule
   */
  function traceNotification(rule: Rule): TraceNotification {
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
  artifactLocation: string,
  artifactPayload: DecisioningArtifact,
  pollingInterval: number,
  pollingHalted: boolean,
  firstArtifact: DecisioningArtifact
) {
  let artifact: DecisioningArtifact = firstArtifact;
  let artifactRetrievalCount: number = 1;
  let artifactLastRetrieved: Date = new Date();

  function provideNewArtifact(value: DecisioningArtifact): void {
    artifactLastRetrieved = new Date();
    artifactRetrievalCount += 1;
    artifact = value;
  }

  const meta = isDefined(artifact) ? artifact.meta : {};

  function toJSON() {
    return {
      artifactLocation: isObject(artifactPayload)
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
