import {
  ENVIRONMENT_DEV,
  ENVIRONMENT_PROD,
  ENVIRONMENT_STAGE
} from "@adobe/target-tools";

export const DEFAULT_POLLING_INTERVAL = 300000; // five minutes (in milliseconds)
export const MINIMUM_POLLING_INTERVAL = 300000; // five minutes (in milliseconds)
export const NUM_FETCH_RETRIES = 10;
export const SUPPORTED_ARTIFACT_MAJOR_VERSION = 1;
export const SUPPORTED_ARTIFACT_OBFUSCATION_VERSION = 1;
export const REGEX_ARTIFACT_FILENAME_BINARY = /.+\.bin$/i;
export const ARTIFACT_FORMAT_BINARY = "bin";
export const ARTIFACT_FORMAT_JSON = "json";
export const ARTIFACT_FORMAT_DEFAULT = ARTIFACT_FORMAT_JSON;
export const ARTIFACT_FORMATS = [ARTIFACT_FORMAT_BINARY, ARTIFACT_FORMAT_JSON];

export const ARTIFACT_FILENAME = {};
ARTIFACT_FILENAME[ARTIFACT_FORMAT_BINARY] = "rules.bin";
ARTIFACT_FILENAME[ARTIFACT_FORMAT_JSON] = "rules.json";

export const LOG_PREFIX = "LD";

export const CDN_BASE_PROD = "assets.adobetarget.com";
export const CDN_BASE_STAGE = "assets.staging.adobetarget.com";
export const CDN_BASE_DEV = "assets.staging.adobetarget.com";

export const HTTP_HEADER_FORWARDED_FOR = "x-forwarded-for";
export const HTTP_HEADER_GEO_LATITUDE = "x-geo-latitude";
export const HTTP_HEADER_GEO_LONGITUDE = "x-geo-longitude";
export const HTTP_HEADER_GEO_COUNTRY = "x-geo-country-code";
export const HTTP_HEADER_GEO_REGION = "x-geo-region-code";
export const HTTP_HEADER_GEO_CITY = "x-geo-city";

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
