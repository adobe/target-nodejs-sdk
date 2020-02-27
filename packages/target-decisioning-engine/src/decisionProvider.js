import jsonLogic from "json-logic-js";
import { computeAllocation } from "./allocationProvider";
import {createMboxContext, createPageContext} from "./contextProvider";

/**
 *
 * @param { 'execute'|'prefetch' } mode
 * @param { String } clientId
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @param { Object } context
 * @param { Array } rules
 * @param {import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target View Delivery API request
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
            const page =
              rule.meta.mboxes.indexOf(requestDetail.name) > -1 &&
              typeof requestDetail.address !== "undefined"
                ? createPageContext(requestDetail.address)
                : context.page;

            const ruleContext = {
              ...context,
              page,
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
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @param { Object } context
 * @param { Array } rules
 * @param {import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target View Delivery API request
 */
function getExecuteDecisions(
  clientId,
  visitorId,
  context,
  rules,
  deliveryRequest
) {
  function postProcess(item) {
    const result = { ...item };
    delete result.metrics;
    return result;
  }

  return getRequestDecisions(
    "execute",
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
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @param { Object } context
 * @param { Array } rules
 * @param {import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target View Delivery API request
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
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @param { Object } context
 * @param { Array } rules
 * @param {import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target View Delivery API request
 */
export function getDecisions(
  clientId,
  visitorId,
  context,
  rules,
  deliveryRequest
) {
  const result = {
    execute: getExecuteDecisions(
      clientId,
      visitorId,
      context,
      rules,
      deliveryRequest
    ),
    prefetch: getPrefetchDecisions(
      clientId,
      visitorId,
      context,
      rules,
      deliveryRequest
    )
  };

  return Promise.resolve(result);
}

export function getRules(definition) {
  // do some validation, check version number
  return definition.rules;
}
