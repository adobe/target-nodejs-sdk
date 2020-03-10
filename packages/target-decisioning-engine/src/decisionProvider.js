import jsonLogic from "json-logic-js";
import { createUUID } from "@adobe/target-tools";
import { OK, PARTIAL_CONTENT } from "http-status-codes";
import { computeAllocation } from "./allocationProvider";
import { createMboxContext, createPageContext } from "./contextProvider";
import { hasRemoteDependency } from "./utils";

/**
 *
 * @param { 'execute'|'prefetch' } mode
 * @param { String } clientId
 * @param { import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @param { Object } context
 * @param { Array<import("../types/DecisioningArtifact").Rule> } rules
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target View Delivery API request
 * @param { Function } mboxPostProcess Used to process an mbox if needed, optional
 */
function getRequestDecisions(
  mode,
  clientId,
  visitorId,
  context,
  rules,
  deliveryRequest,
  mboxPostProcess = value => value
) {
  if (typeof deliveryRequest[mode] === "undefined") return undefined;

  const mboxes = deliveryRequest[mode].mboxes || [];

  return mboxes.reduce(
    (result, requestDetail) => {
      const rulesResult = rules
        .filter(rule => rule.meta.mboxes.indexOf(requestDetail.name) > -1) // only evaluate rules that pertain to this mbox
        .reduce(
          (requestResult, rule) => {
            let { page, referring } = context;

            if (
              rule.meta.mboxes.indexOf(requestDetail.name) > -1 &&
              typeof requestDetail.address !== "undefined"
            ) {
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
                rule.meta.activityId,
                visitorId
              )
            };

            if (jsonLogic.apply(rule.condition, ruleContext)) {
              Object.keys(rule.consequence).forEach(key => {
                if (typeof requestResult[key] === "undefined") {
                  // eslint-disable-next-line no-param-reassign
                  requestResult[key] = [];
                }

                Array.prototype.push.apply(
                  requestResult[key],
                  rule.consequence[key]
                    .filter(item => requestDetail.name === item.name) // filter out items that do not pertain to this mbox
                    .map(item => {
                      const value = {
                        ...item,
                        index: requestDetail.index
                      };

                      return mboxPostProcess(value);
                    })
                );
              });
            }
            return requestResult;
          },
          { mboxes: [] }
        );

      Object.keys(rulesResult).forEach(key =>
        Array.prototype.push.apply(result[key], rulesResult[key])
      );

      return result;
    },
    { mboxes: [] }
  );
}

/**
 *
 * @param { String } clientId
 * @param { import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @param { Object } context
 * @param { Array<import("../types/DecisioningArtifact").Rule> } rules
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target View Delivery API request
 * @param { Object } notificationProvider
 */
function getExecuteDecisions(
  clientId,
  visitorId,
  context,
  rules,
  deliveryRequest,
  notificationProvider
) {
  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} item
   */
  function postProcess(item) {
    notificationProvider.addNotification(item);

    const result = { ...item };
    delete result.metrics;
    return result;
  }

  const decisions = getRequestDecisions(
    "execute",
    clientId,
    visitorId,
    context,
    rules,
    deliveryRequest,
    postProcess
  );

  notificationProvider.sendNotifications();

  return decisions;
}
/**
 *
 * @param { String } clientId
 * @param { import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @param { Object } context
 * @param { Array<import("../types/DecisioningArtifact").Rule> } rules
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target View Delivery API request
 */
// eslint-disable-next-line no-unused-vars
function getPrefetchDecisions(
  clientId,
  visitorId,
  context,
  rules,
  deliveryRequest
) {
  function postProcess(item) {
    const eventToken =
      item.metrics.length > 0 ? item.metrics[0].eventToken : undefined;

    const result = {
      ...item,
      options: item.options.map(option => {
        return {
          ...option,
          eventToken
        };
      })
    };

    delete result.metrics;
    return result;
  }

  return getRequestDecisions(
    "prefetch",
    clientId,
    visitorId,
    context,
    rules,
    deliveryRequest,
    postProcess
  );
}

/**
 *
 * @param { String } clientId
 * @param { import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @param { Object } context
 * @param { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target View Delivery API request
 * @param { Object } notificationProvider
 */
export function getDecisions(
  clientId,
  visitorId,
  context,
  artifact,
  deliveryRequest,
  notificationProvider
) {
  const request = {
    ...deliveryRequest,
    requestId: deliveryRequest.requestId || createUUID()
  };
  const { rules } = artifact;

  const response = {
    execute: getExecuteDecisions(
      clientId,
      visitorId,
      context,
      rules,
      request,
      notificationProvider
    ),
    prefetch: getPrefetchDecisions(clientId, visitorId, context, rules, request)
  };

  return Promise.resolve({
    status: hasRemoteDependency(artifact, request).remoteNeeded
      ? PARTIAL_CONTENT
      : OK,
    requestId: deliveryRequest.requestId,
    id: {
      ...deliveryRequest.id
    },
    client: clientId,
    edgeHost: undefined,
    ...response
  });
}
