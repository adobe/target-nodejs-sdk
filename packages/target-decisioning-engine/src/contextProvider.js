import {
  browserFromUserAgentOrClientHintUA,
  ChannelType,
  includes,
  isDefined,
  isString,
  operatingSystemFromUserAgentOrClientHints
} from "@adobe/target-tools";
import { parseURL } from "./utils";

/**
 * @type { import("@adobe/target-tools/delivery-api-client/models/Context").Context }
 */
const EMPTY_CONTEXT = {
  channel: ChannelType.Web
};

function getLowerCaseAttributes(obj) {
  const result = {};

  Object.keys(obj).forEach(key => {
    result[`${key}_lc`] = isString(obj[key])
      ? obj[key].toLowerCase()
      : obj[key];
  });

  return result;
}

const BROWSER_PLATFORMS_MAPPING = {
  "Windows": "windows",
  "Macintosh": "mac",
  "Mac OS": "mac",
  "macOS": "mac",
  "Linux": "linux"
};

const toTargetPlatform = platform =>
  isDefined(BROWSER_PLATFORMS_MAPPING[platform])
    ? BROWSER_PLATFORMS_MAPPING[platform]
    : platform;

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/Context").Context } context
 * @return { import("../types/DecisioningContext").UserContext }
 */
function createBrowserContext(context) {
  const { userAgent = "", clientHints } = context;

  const browser = browserFromUserAgentOrClientHintUA(userAgent, clientHints);

  const platform = operatingSystemFromUserAgentOrClientHints(
    userAgent,
    clientHints
  );

  return {
    browserType: browser.name.toLowerCase(),
    platform: toTargetPlatform(platform),
    locale: "en", // TODO: determine where this comes from
    browserVersion: browser.version
  };
}

/**
 * @param { string } url
 * @return { import("../types/DecisioningContext").PageContext }
 */
function createUrlContext(url) {
  if (!url || !isString(url)) {
    // eslint-disable-next-line no-param-reassign
    url = "";
  }

  const urlAttributes = parseURL(url);

  return {
    ...urlAttributes,
    ...getLowerCaseAttributes(urlAttributes)
  };
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/Address").Address } address
 * @return { import("../types/DecisioningContext").PageContext }
 */
export function createPageContext(address) {
  return createUrlContext(address ? address.url : "");
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/Address").Address } address
 * @return { import("../types/DecisioningContext").PageContext }
 */
export function createReferringContext(address) {
  return createUrlContext(address ? address.referringUrl : "");
}

/**
 * @param @param { import("../types/DecisioningContext").MboxContext } context
 * @param { string } key
 * @param { object } value
 * @return { import("../types/DecisioningContext").MboxContext }
 */
function addNestedKeyToParameters(context, key, value) {
  const result = context;
  let currentObj = result;
  const keys = key.split(".");
  for (let i = 0; i < keys.length - 1; i += 1) {
    currentObj[keys[i]] = currentObj[keys[i]] || {};
    currentObj = currentObj[keys[i]];
  }
  currentObj[keys[keys.length - 1]] = value;
  return result;
}

/**
 * @param { import("../types/DecisioningContext").MboxContext } context
 * @return { import("../types/DecisioningContext").MboxContext }
 */
function createNestedParametersFromDots(context) {
  let result = {};
  Object.keys(context).forEach(key => {
    if (
      includes(".", key) &&
      !includes("..", key) &&
      key[0] !== "." &&
      !key.endsWith(".") &&
      !key.endsWith("._lc")
    ) {
      result = addNestedKeyToParameters(result, key, context[key]);
      return;
    }
    result[key] = context[key];
  });
  return result;
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest } mboxRequest
 * @return { import("../types/DecisioningContext").MboxContext }
 */
export function createMboxContext(mboxRequest) {
  if (!mboxRequest) {
    return {};
  }

  const parameters = mboxRequest.parameters || {};

  const context = {
    ...parameters,
    ...getLowerCaseAttributes(parameters)
  };
  const updatedContext = createNestedParametersFromDots(context);
  return updatedContext;
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/Geo").Geo } geoContext
 * @return { import("../types/DecisioningContext").GeoContext}
 */
export function createGeoContext(geoContext = {}) {
  return {
    country: geoContext.countryCode,
    region: geoContext.stateCode,
    city: geoContext.city,
    latitude: geoContext.latitude,
    longitude: geoContext.longitude
  };
}

function createTimingContext() {
  const now = new Date();

  const twoDigitString = value => (value < 10 ? `0${value}` : String(value));

  const currentHours = twoDigitString(now.getUTCHours());
  const currentMinutes = twoDigitString(now.getUTCMinutes());

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
 * @return { import("../types/DecisioningContext").DecisioningContext }
 */
export function createDecisioningContext(deliveryRequest) {
  const { context = EMPTY_CONTEXT } = deliveryRequest;

  return {
    ...createTimingContext(),
    user: createBrowserContext(context),
    page: createPageContext(context.address),
    referring: createReferringContext(context.address),
    geo: createGeoContext(context.geo || {})
  };
}
