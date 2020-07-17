import {
  ENVIRONMENT_DEV,
  ENVIRONMENT_PROD,
  ENVIRONMENT_STAGE
} from "@adobe/target-tools";

export const DEFAULT_POLLING_INTERVAL = 300000; // five minutes (in milliseconds)
export const MINIMUM_POLLING_INTERVAL = 300000; // five minutes (in milliseconds)
export const NUM_FETCH_RETRIES = 10;
export const SUPPORTED_ARTIFACT_MAJOR_VERSION = 1;
export const LOG_PREFIX = "LD";

export const CDN_BASE_PROD = "https://assets.adobetarget.com";
export const CDN_BASE_STAGE = "https://assets.staging.adobetarget.com";
export const CDN_BASE_DEV = "https://assets.staging.adobetarget.com";

export const HTTP_HEADER_FORWARDED_FOR = "X-Forwarded-For";
export const HTTP_HEADER_GEO_LATITUDE = "X-GEO-Latitude";
export const HTTP_HEADER_GEO_LONGITUDE = "X-GEO-Longitude";
export const HTTP_HEADER_GEO_COUNTRY = "X-GEO-Country-Code";
export const HTTP_HEADER_GEO_REGION = "X-GEO-Region-Code";
export const HTTP_HEADER_GEO_CITY = "X-GEO-City";

const CDN_BASE = {};
CDN_BASE[ENVIRONMENT_PROD] = CDN_BASE_PROD;
CDN_BASE[ENVIRONMENT_STAGE] = CDN_BASE_STAGE;
CDN_BASE[ENVIRONMENT_DEV] = CDN_BASE_DEV;

export { CDN_BASE };

// Response token keys
export const ACTIVITY_DECISIONING_METHOD = "activity.decisioningMethod";
export const ACTIVITY_ID = "activity.id";
export const ACTIVITY_NAME = "activity.name";
export const ACTIVITY_TYPE = "activity.type";
export const EXPERIENCE_ID = "experience.id";
export const EXPERIENCE_NAME = "experience.name";
export const LOCATION_ID = "location.id";
export const LOCATION_NAME = "location.name";
export const LOCATION_TYPE = "location.type";
export const OFFER_ID = "offer.id";
export const OFFER_NAME = "offer.name";
export const OPTION_ID = "option.id";
export const OPTION_NAME = "option.name";
export const GEO_CITY = "geo.city";
export const GEO_COUNTRY = "geo.country";
export const GEO_STATE = "geo.state";
export const GEO_LATITUDE = "geo.latitude";
export const GEO_LONGITUDE = "geo.longitude";
