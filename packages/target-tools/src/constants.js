/* eslint-disable import/prefer-default-export */
import { ChannelType } from "../delivery-api-client";

export const DEFAULT_GLOBAL_MBOX = "target-global-mbox";
export const DEFAULT_NUM_FETCH_RETRIES = 10;

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
