import { includes, isNumber, isObject, isString, now, uuid } from "./lodash";
import { DECISIONING_METHOD } from "./enums";
import { getLogger } from "./logging";
import { PROPERTY_TOKEN_MISMATCH } from "./messages";
import { DEFAULT_MAXIMUM_WAIT_READY } from "./constants";

const VIEWS = "views";
const MBOXES = "mboxes";

export function isUndefined(value) {
  return typeof value === "undefined";
}

export function isDefined(value) {
  return !isUndefined(value);
}

export function isPojo(obj) {
  if (isUndefined(obj) || obj === null || !isObject(obj)) {
    return false;
  }

  return Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 *
 * @param {"mboxes"|"views"} itemsKey
 * @param {import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target Delivery API request
 * @returns {Set<String>} Set of names
 */
function getNamesForRequested(itemsKey, deliveryRequest) {
  const resultSet = new Set();

  ["prefetch", "execute"].forEach(type => {
    const items =
      deliveryRequest &&
      deliveryRequest[type] &&
      deliveryRequest[type][itemsKey] instanceof Array
        ? deliveryRequest[type][itemsKey]
        : [];
    items
      .filter(item => isDefined(item.name))
      .forEach(item => {
        resultSet.add(item.name);
      });
  });

  return resultSet;
}

/**
 * @param {import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target Delivery API request, required
 * @returns {Set<String>} Set of mbox names
 */
export function getMboxNames(deliveryRequest) {
  return getNamesForRequested(MBOXES, deliveryRequest);
}

/**
 * @param {import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target Delivery API request, required
 * @returns {Set<String>} Set of view names
 */
export function getViewNames(deliveryRequest) {
  return getNamesForRequested(VIEWS, deliveryRequest);
}

/**
 * @param {"mboxes"|"views"} itemsKey
 * @param {import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target Delivery API request, required
 * @returns {boolean}
 */
function hasRequested(itemsKey, deliveryRequest) {
  const types = ["prefetch", "execute"];

  for (let i = 0; i < types.length; i += 1) {
    const type = types[i];
    const items =
      deliveryRequest &&
      deliveryRequest[type] &&
      deliveryRequest[type][itemsKey] instanceof Array
        ? deliveryRequest[type][itemsKey]
        : undefined;

    if (isDefined(items) && items instanceof Array) {
      return true;
    }
  }

  return false;
}

/**
 *
 * @param {import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target Delivery API request, required
 * @returns {boolean}
 */
export function hasRequestedViews(deliveryRequest) {
  return hasRequested(VIEWS, deliveryRequest);
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
    return Math.max(highest, isNumber(mbox.index) ? mbox.index : 0);
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
export const noopPromise = value => Promise.resolve(value);

export function requiresDecisioningEngine(decisioningMethod) {
  return includes(decisioningMethod, [
    DECISIONING_METHOD.ON_DEVICE,
    DECISIONING_METHOD.HYBRID
  ]);
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
  if (limit === -1) {
    return false;
  }

  return now() - startTimeMillis > limit;
}

export function isValidIpAddress(ipAddress) {
  const IP_ADDRESS = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/g;
  return isString(ipAddress) && IP_ADDRESS.test(ipAddress);
}

/**
 *
 * @param {Function} isReady
 * @param {Number} maximumWaitTime
 * @param {String} errorMessage
 * @return {Promise}
 */
export function whenReady(
  isReady,
  maximumWaitTime = DEFAULT_MAXIMUM_WAIT_READY,
  errorMessage
) {
  const initTime = now();
  let timer;

  return new Promise((resolve, reject) => {
    function wait() {
      if (timeLimitExceeded(initTime, maximumWaitTime)) {
        clearTimeout(timer);
        reject(new Error(errorMessage));
        return;
      }
      if (isReady()) {
        clearTimeout(timer);
        resolve();
      }
    }
    timer = setInterval(() => wait(), 0);
  });
}

export function memoize(func, keyResolverFunc = arr => arr[0]) {
  const memoizedValues = {};

  return function memoized(...funcArgs) {
    const key = keyResolverFunc.call(this, funcArgs);

    if (!isDefined(memoizedValues[key])) {
      memoizedValues[key] = func.call(null, ...funcArgs);
    }

    return memoizedValues[key];
  };
}
