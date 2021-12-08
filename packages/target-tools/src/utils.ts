import { includes, isNumber, isObject, isString, now } from "./lodash";
import { DECISIONING_METHOD } from "./enums";
import { getLogger } from "./logging";
import { PROPERTY_TOKEN_MISMATCH } from "./messages";
import { DEFAULT_MAXIMUM_WAIT_READY } from "./constants";
import { DeliveryRequest, Property } from "../delivery-api-client";

const VIEWS = "views";
const MBOXES = "mboxes";

export function isUndefined(value: any): boolean {
  return typeof value === "undefined";
}

export function isDefined(value: any): boolean {
  return !isUndefined(value);
}

export function isPojo(obj: any): boolean {
  if (isUndefined(obj) || obj === null || !isObject(obj)) {
    return false;
  }

  return Object.getPrototypeOf(obj) === Object.prototype;
}

function getNamesForRequested(
  itemsKey: "mboxes" | "views",
  deliveryRequest: DeliveryRequest
): Set<string> {
  const resultSet: Set<string> = new Set();

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

export function getMboxNames(deliveryRequest: DeliveryRequest): Set<string> {
  return getNamesForRequested(MBOXES, deliveryRequest);
}

export function getViewNames(deliveryRequest: DeliveryRequest): Set<string> {
  return getNamesForRequested(VIEWS, deliveryRequest);
}

function hasRequested(
  itemsKey: "mboxes" | "views",
  deliveryRequest: DeliveryRequest
): boolean {
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

export function hasRequestedViews(deliveryRequest: DeliveryRequest): boolean {
  return hasRequested(VIEWS, deliveryRequest);
}

/**
 * addMboxesToRequest method.  Ensures the mboxes specified are part of the returned delivery request
 */
export function addMboxesToRequest(
  mboxNames: string[],
  request: DeliveryRequest,
  requestType: "execute" | "prefetch" = "execute"
): DeliveryRequest {
  const requestedMboxes = getMboxNames(request); // returns a set

  const mboxes = [];

  if (
    request &&
    request[requestType] &&
    request[requestType].mboxes instanceof Array
  ) {
    Array.prototype.push.apply(mboxes, request[requestType].mboxes);
  }

  const highestUserSpecifiedIndex = mboxes.reduce(
    (highest, mbox) => Math.max(highest, isNumber(mbox.index) ? mbox.index : 0),
    0
  );

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

export function isBrowser(): boolean {
  // @ts-ignore
  return typeof window !== "undefined";
}

export function isNodeJS(): boolean {
  return typeof global !== "undefined";
}

export const noop = () => undefined;
export const noopSingleArg = (arg: any) => undefined;
export const noopPromise = value => Promise.resolve(value);

export function requiresDecisioningEngine(decisioningMethod: string): boolean {
  return includes(decisioningMethod, [
    DECISIONING_METHOD.ON_DEVICE,
    DECISIONING_METHOD.HYBRID
  ]);
}

export function decisioningEngineReady(decisioningEngine): boolean {
  return isDefined(decisioningEngine) && decisioningEngine.isReady();
}

export function objectWithoutUndefinedValues(obj: object): object {
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

export function getPropertyToken(
  property: Property = { token: undefined }
): string {
  const { token = undefined } = property;
  return token;
}

export function getProperty(
  config = { propertyToken: undefined },
  request = { property: undefined },
  logger = undefined
): Property {
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

export function timeLimitExceeded(
  startTimeMillis: number,
  limit = -1
): boolean {
  if (limit === -1) {
    return false;
  }

  return now() - startTimeMillis > limit;
}

export function isValidIpAddress(ipAddress: string): boolean {
  const IP_ADDRESS = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/g;
  return isString(ipAddress) && IP_ADDRESS.test(ipAddress);
}

export function whenReady(
  isReady: Function,
  maximumWaitTime: number = DEFAULT_MAXIMUM_WAIT_READY,
  errorMessage: string
): Promise<void> {
  const initTime = now();
  let timer;

  return new Promise<void>((resolve, reject) => {
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

export function memoize(
  func: Function,
  keyResolverFunc = arr => arr[0]
): Function {
  const memoizedValues = {};

  return function memoized(...funcArgs) {
    const key = keyResolverFunc.call(this, funcArgs);

    if (!isDefined(memoizedValues[key])) {
      memoizedValues[key] = func.call(null, ...funcArgs);
    }

    return memoizedValues[key];
  };
}

export function isExecutePageLoad(request: DeliveryRequest): boolean {
  return !!request.execute && !!request.execute.pageLoad;
}

export function executeMboxCount(request: DeliveryRequest): number {
  return (
    (!!request.execute &&
      !!request.execute.mboxes &&
      request.execute.mboxes.length) ||
    0
  );
}

export function isPrefetchPageLoad(request: DeliveryRequest): boolean {
  return !!request.prefetch && !!request.prefetch.pageLoad;
}

export function prefetchMboxCount(request: DeliveryRequest): number {
  return (
    (!!request.prefetch &&
      !!request.prefetch.mboxes &&
      request.prefetch.mboxes.length) ||
    0
  );
}

export function prefetchViewCount(request: DeliveryRequest): number {
  return (
    (!!request.prefetch &&
      !!request.prefetch.views &&
      request.prefetch.views.length) ||
    0
  );
}

export function formatDecimal(value: number, digits = 2): number {
  if (!value || !isNumber(value)) {
    return undefined;
  }
  return +value.toFixed(digits);
}
