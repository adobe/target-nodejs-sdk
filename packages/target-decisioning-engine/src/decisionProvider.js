import jsonLogic from "json-logic-js";
import { computeAllocation } from "./allocationProvider";

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

  const requestedMboxes = (deliveryRequest[mode].mboxes || []).reduce(
    (result, mbox) => {
      // eslint-disable-next-line no-param-reassign
      result[mbox.name] = mbox;
      return result;
    },
    {}
  );

  const requestedMboxNames = Object.keys(requestedMboxes);

  return rules.reduce((result, rule) => {
    const ruleContext = {
      allocation: computeAllocation(clientId, rule.meta.activityId, visitorId),
      ...context
    };

    if (jsonLogic.apply(rule.condition, ruleContext)) {
      Object.keys(rule.consequence).forEach(key => {
        if (typeof result[key] === "undefined") {
          // eslint-disable-next-line no-param-reassign
          result[key] = [];
        }

        Array.prototype.push.apply(
          result[key],
          rule.consequence[key]
            .filter(item => {
              // filter out items that are not part of the execute request
              return requestedMboxNames.indexOf(item.name) > -1;
            })
            .map(item => {
              const value = {
                ...item,
                index: requestedMboxes[item.name].index
              };

              return mboxPostProcess(value);
            })
        );
      });
    }
    return result;
  }, {});
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
