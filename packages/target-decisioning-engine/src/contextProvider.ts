import {
  browserFromUserAgent,
  isString,
  operatingSystemFromUserAgent
} from "@adobe/target-tools";
import {
  Address,
  Context,
  DeliveryRequest,
  MboxRequest,
  ChannelType,
  Geo
} from "@adobe/target-tools/delivery-api-client";
import {
  DecisioningContext,
  GeoContext,
  MboxContext,
  PageContext,
  TimingContext,
  UserContext
} from "../types/DecisioningContext";
import { parseURL } from "./utils";

/**
 * @type { import("@adobe/target-tools/delivery-api-client/models/Context").Context }
 */
const EMPTY_CONTEXT: Context = {
  channel: ChannelType.Web
};

function getLowerCaseAttributes(obj: object): object {
  const result = {};

  Object.keys(obj).forEach(key => {
    result[`${key}_lc`] = isString(obj[key])
      ? obj[key].toLowerCase()
      : obj[key];
  });

  return result;
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/Context").Context } context
 * @return { import("../types/DecisioningContext").UserContext }
 */
function createBrowserContext(context: Context): UserContext {
  const { userAgent = "" } = context;

  const browser = browserFromUserAgent(userAgent);
  const platform = operatingSystemFromUserAgent(userAgent);

  return {
    browserType: browser.name.toLowerCase(),
    platform,
    locale: "en", // TODO: determine where this comes from
    browserVersion: browser.version
  };
}

/**
 * @param { string } url
 * @return { import("../types/DecisioningContext").PageContext }
 */
function createUrlContext(url: string): PageContext {
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
export function createPageContext(address: Address): PageContext {
  return createUrlContext(address ? address.url : "");
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/Address").Address } address
 * @return { import("../types/DecisioningContext").PageContext }
 */
export function createReferringContext(address: Address): PageContext {
  return createUrlContext(address ? address.referringUrl : "");
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest } mboxRequest
 * @return { import("../types/DecisioningContext").MboxContext }
 */
export function createMboxContext(mboxRequest: MboxRequest): MboxContext {
  if (!mboxRequest) {
    return {};
  }

  const parameters = mboxRequest.parameters || {};

  return {
    ...parameters,
    ...getLowerCaseAttributes(parameters)
  };
}

/**
 * @param { import("@adobe/target-tools/delivery-api-client/models/Geo").Geo } geoContext
 * @return { import("../types/DecisioningContext").GeoContext}
 */
export function createGeoContext(geoContext: Geo = {}): GeoContext {
  return {
    country: geoContext.countryCode,
    region: geoContext.stateCode,
    city: geoContext.city,
    latitude: geoContext.latitude,
    longitude: geoContext.longitude
  };
}

function createTimingContext(): TimingContext {
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
export function createDecisioningContext(
  deliveryRequest: DeliveryRequest
): DecisioningContext {
  const { context = EMPTY_CONTEXT } = deliveryRequest;
  const {
    current_timestamp,
    current_time,
    current_day
  } = createTimingContext();

  return {
    current_timestamp,
    current_time,
    current_day,
    user: createBrowserContext(context),
    page: createPageContext(context.address),
    referring: createReferringContext(context.address),
    geo: createGeoContext(context.geo || {})
  };
}
