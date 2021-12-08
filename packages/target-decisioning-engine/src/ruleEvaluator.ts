/* eslint-disable import/prefer-default-export */
import jsonLogic from "json-logic-js";
import { isDefined } from "@adobe/target-tools";
import { createMboxContext, createPageContext } from "./contextProvider";
import { computeAllocation, getOrCreateVisitorId } from "./allocationProvider";
import { cloneDeep } from "./utils";
import { ACTIVITY_ID } from "./constants";

/**
 *
 * @param { String } clientId
 * @param { import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @return { Function }
 */
export function ruleEvaluator(clientId, visitorId) {
  const visitorIdString = getOrCreateVisitorId(visitorId);

  /**
   * @param {import("../types/DecisioningArtifact").Rule} rule
   * @param { import("../types/DecisioningContext").DecisioningContext } context
   * @param { 'mbox'|'view'|'pageLoad' } requestType
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetail
   * @param { Array<Function> } postProcessors
   * @param tracer
   */
  return function processRule(
    rule,
    context,
    requestType,
    requestDetail,
    postProcessors,
    tracer
  ) {
    let consequence;
    let { page, referring } = context;

    if (isDefined(requestDetail.address)) {
      page = createPageContext(requestDetail.address) || page;
      referring = createPageContext(requestDetail.address) || referring;
    }

    const ruleContext = {
      ...context,
      page,
      referring,
      mbox: createMboxContext(requestDetail),
      allocation: computeAllocation(
        clientId,
        rule.meta[ACTIVITY_ID],
        visitorIdString
      )
    };

    const ruleSatisfied = jsonLogic.apply(rule.condition, ruleContext);
    tracer.traceRuleEvaluated(
      rule,
      requestDetail,
      requestType,
      ruleContext,
      ruleSatisfied
    );

    if (ruleSatisfied) {
      consequence = {
        ...rule.consequence,
        index: requestDetail.index
      };

      postProcessors.forEach(postProcessFunc => {
        consequence = postProcessFunc(
          rule,
          consequence,
          requestType,
          requestDetail,
          tracer
        );
      });
    }
    return cloneDeep(consequence); // we return a new object because at.js has a tendency to mutate response and we don't want it to mutate the rule consequence itself
  };
}
