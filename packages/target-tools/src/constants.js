/* eslint-disable import/prefer-default-export */

export const DEFAULT_GLOBAL_MBOX = "target-global-mbox";
export const DEFAULT_NUM_FETCH_RETRIES = 10;
export const DEFAULT_MAXIMUM_WAIT_READY = -1; // default is to wait indefinitely

/**
 *
 * @type {{Web: string, Mobile: string}}
 */
export const ChannelType = {
  Mobile: "mobile",
  Web: "web"
};

/**
 *
 * @type {{Click: string, Display: string}}
 */
export const MetricType = {
  Click: "click",
  Display: "display"
};

/**
 *
 * @type {{Authenticated: string, Unknown: string, LoggedOut: string}}
 */
export const AuthenticatedState = {
  Unknown: "unknown",
  Authenticated: "authenticated",
  LoggedOut: "logged_out"
};

export const EMPTY_REQUEST = { context: { channel: ChannelType.Web } };

export const ENVIRONMENT_PROD = "production";
export const ENVIRONMENT_STAGE = "staging";
export const ENVIRONMENT_DEV = "development";
export const POSSIBLE_ENVIRONMENTS = [
  ENVIRONMENT_PROD,
  ENVIRONMENT_STAGE,
  ENVIRONMENT_DEV
];

export const UNKNOWN_IP_ADDRESS = "unknownIpAddress";
