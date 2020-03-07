import UAParser from "ua-parser-js";
import { parseURL } from "./utils";
import Messages from "./messages";

function getLowerCaseAttributes(obj) {
  const result = {};

  Object.keys(obj).forEach(key => {
    result[`${key}_lc`] =
      typeof obj[key] === "string" ? obj[key].toLowerCase() : obj[key];
  });

  return result;
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 */
function createBrowserContext(deliveryRequest) {
  const { context } = deliveryRequest;
  if (typeof context.userAgent === "undefined")
    throw new Error("Undefined User Agent");

  const userAgent = UAParser(context.userAgent);

  return {
    browserType: (userAgent.browser.name || "unknown").toLowerCase(),
    locale: "en", // TODO: determine where this comes from
    browserVersion: parseInt(userAgent.browser.major, 10)
  };
}

/**
 * @param { string } deliveryRequest
 */
function createUrlContext(url) {
  if (!url || typeof url !== "string") return undefined;

  const urlAttributes = parseURL(url);

  return {
    ...urlAttributes,
    ...getLowerCaseAttributes(urlAttributes)
  };
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/Address").Address } address
 */
export function createPageContext(address) {
  return createUrlContext(address.url);
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/Address").Address } address
 */
export function createReferringContext(address) {
  return createUrlContext(address.referringUrl);
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest } mboxRequest
 */
export function createMboxContext(mboxRequest) {
  if (!mboxRequest) return {};

  const parameters = mboxRequest.parameters || {};

  return {
    ...parameters,
    ...getLowerCaseAttributes(parameters)
  };
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 */
function createTimingContext() {
  const now = new Date();

  const currentHours = String(now.getUTCHours()).padStart(2, "0");
  const currentMinutes = String(now.getUTCMinutes()).padStart(2, "0");

  const currentTime = `${currentHours}${currentMinutes}`;
  const currentDay = now.getUTCDay(); // 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.

  return {
    current_timestamp: now.getTime(), // in ms
    current_time: currentTime, // 24-hour time, UTC, HHmm
    current_day: currentDay === 0 ? 7 : currentDay // 1-7, 1 = monday, 7 = sunday
  };
}

/**
 *
 * The TargetDecisioningEngine initialize method
 * @param { import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 */
export function createDecisioningContext(deliveryRequest) {
  if (typeof deliveryRequest.context === "undefined")
    throw new Error(Messages.CONTEXT_UNDEFINED);

  return {
    ...createTimingContext(),
    user: createBrowserContext(deliveryRequest),
    page: createPageContext(deliveryRequest.context.address),
    referring: createReferringContext(deliveryRequest.context.address)
  };
}
