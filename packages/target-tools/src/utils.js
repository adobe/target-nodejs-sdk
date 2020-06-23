import { uuid } from "./lodash";
import { EXECUTION_MODE } from "./enums";
import { getLogger } from "./logging";
import { PROPERTY_TOKEN_MISMATCH } from "./messages";

export function isUndefined(value) {
  return typeof value === "undefined";
}

export function isDefined(value) {
  return !isUndefined(value);
}

/**
 * @param {import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target Delivery API request, required
 * @returns {Set<String>} Set of mbox names
 */
export function getMboxNames(deliveryRequest) {
  const requestMboxes = new Set();

  ["prefetch", "execute"].forEach(type => {
    const mboxes =
      deliveryRequest &&
      deliveryRequest[type] &&
      deliveryRequest[type].mboxes instanceof Array
        ? deliveryRequest[type].mboxes
        : [];
    mboxes.forEach(mbox => {
      requestMboxes.add(mbox.name);
    });
  });

  return requestMboxes;
}

/**
 * addMboxesToRequest method.  Ensures the mboxes specified are part of the returned delivery request
 * @param {Array<String>} mboxNames A list of mbox names that contains JSON content attributes, required
 * @param {import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest} request Target View Delivery API request, required
 * @param { 'execute'|'prefetch' } requestType
 */
export function addMboxesToRequest(
  mboxNames,
  request,
  requestType = "execute"
) {
  const requestedMboxes = getMboxNames(request); // returns a set

  const mboxes = [];
  if (
    request &&
    request[requestType] &&
    request[requestType].mboxes instanceof Array
  ) {
    Array.prototype.push.apply(mboxes, request[requestType].mboxes);
  }

  const highestUserSpecifiedIndex = mboxes.reduce((highest, mbox) => {
    return Math.max(highest, typeof mbox.index === "number" ? mbox.index : 0);
  }, 0);

  let nextIndex = highestUserSpecifiedIndex + 1;

  mboxNames
    .filter(mboxName => !requestedMboxes.has(mboxName))
    .forEach(mboxName => {
      mboxes.push({
        name: mboxName,
        index: nextIndex
      });
      nextIndex += 1;
    });

  const result = {
    ...request
  };

  result[requestType] = {
    ...request[requestType],
    mboxes
  };

  return result;
}

export function isBrowser() {
  return typeof window !== "undefined";
}

export function isNodeJS() {
  return typeof global !== "undefined";
}

export const createUUID = () => uuid();
export const noop = () => undefined;
export { now } from "./lodash";

export function requiresDecisioningEngine(executionMode) {
  return [EXECUTION_MODE.LOCAL, EXECUTION_MODE.HYBRID].includes(executionMode);
}

export function decisioningEngineReady(decisioningEngine) {
  return isDefined(decisioningEngine) && decisioningEngine.isReady();
}

export function objectWithoutUndefinedValues(obj) {
  const result = {
    ...obj
  };

  Object.keys(result).forEach(key => {
    if (isUndefined(result[key])) {
      delete result[key];
    }
  });

  return result;
}

/**
 *
 * @param { import("../delivery-api-client/models/Property").Property } property
 */
export function getPropertyToken(property = { token: undefined }) {
  const { token = undefined } = property;
  return token;
}

export function getProperty(config = {}, request = {}, logger) {
  const configPropertyToken = config.propertyToken;
  const requestPropertyToken = getPropertyToken(request.property);
  const propertyToken = requestPropertyToken || configPropertyToken;

  if (
    isDefined(requestPropertyToken) &&
    requestPropertyToken !== configPropertyToken
  ) {
    getLogger(logger).debug(
      PROPERTY_TOKEN_MISMATCH(requestPropertyToken, configPropertyToken)
    );
  }

  return propertyToken
    ? {
        token: propertyToken
      }
    : undefined;
}

export function timeLimitExceeded(startTimeMillis, limit = -1) {
  if (limit === -1) return false;

  const now = new Date().getTime();
  return now - startTimeMillis > limit;
}
