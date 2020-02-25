import MurmurHash3 from "imurmurhash";
import { parseURL } from "./utils";

const UAParser = require("ua-parser-js");

/**
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 */
function createBrowserContext(deliveryRequest) {
  const { context } = deliveryRequest;
  if (typeof context.userAgent === "undefined")
    throw new Error("Undefined User Agent");

  const userAgent = UAParser(context.userAgent);

  return {
    browserType: (userAgent.browser.name || "unknown").toLowerCase(),
    locale: "en", // TODO: determine where this comes from
    version: parseInt(userAgent.browser.major, 10)
  };
}

/**
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 */
function createPageContext(deliveryRequest) {
  const { context } = deliveryRequest;

  const result = parseURL(context.address.url);

  Object.keys(result).forEach(key => {
    result[`${key}_lc`] =
      typeof result[key] === "string" ? result[key].toLowerCase() : result[key];
  });

  return result;
}

/**
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 */
function createParamsContext(deliveryRequest) {}

/**
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 */
function createTimingContext(deliveryRequest) {
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
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 */
export function createDecisioningContext(deliveryRequest) {
  if (typeof deliveryRequest.context === "undefined")
    throw new Error("Undefined context.");

  return {
    ...createTimingContext(deliveryRequest),
    user: createBrowserContext(deliveryRequest),
    page: createPageContext(deliveryRequest),
    ...createParamsContext(deliveryRequest)
  };

  // return {
  //   allocation: 10, // 0 - 99.99
  //   mbox: {
  //     // custom params
  //     foo: "4.9",
  //     foo_lc: "4.9",
  //     bar: "BAZ",
  //     bar_lc: "baz"
  //   }
  // };
}
