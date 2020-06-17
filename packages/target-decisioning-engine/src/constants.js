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

const CDN_BASE = {};
CDN_BASE[ENVIRONMENT_PROD] = CDN_BASE_PROD;
CDN_BASE[ENVIRONMENT_STAGE] = CDN_BASE_STAGE;
CDN_BASE[ENVIRONMENT_DEV] = CDN_BASE_DEV;

export { CDN_BASE };
