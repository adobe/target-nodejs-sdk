import jsonLogic from "json-logic-js";

/**
 * The get offers method
 * @param {Object} options
 * @param {Object} options.request Target View Delivery API request, required
 * @param {String} options.visitorCookie VisitorId cookie, optional
 * @param {String} options.targetCookie Target cookie, optional
 * @param {String} options.targetLocationHintCookie Target Location Hint cookie, optional
 * @param {String} options.consumerId When stitching multiple calls, different consumerIds should be provided, optional
 * @param {Array} options.customerIds An array of Customer Ids in VisitorId-compatible format, optional
 * @param {String} options.sessionId Session Id, used for linking multiple requests, optional
 * @param {Object} options.visitor Supply an external VisitorId instance, optional
 */
// eslint-disable-next-line no-unused-vars
export function getOffers(context, rules) {
  // need a mechanism for processing rules based on version number
  const consequences = rules.reduce((result, rule) => {
    if (jsonLogic.apply(rule.condition, context)) {
      result.push(rule.consequence);
    }
    return result;
  }, []);
  return consequences;
}

export function getRules(definition) {
  // do some validation, check version number
  return definition.rules;
}
