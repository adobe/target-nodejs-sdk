/* eslint-disable import/prefer-default-export */
import { ChannelType } from "../delivery-api-client";

export const DEFAULT_GLOBAL_MBOX = "target-global-mbox";
export const DEFAULT_NUM_FETCH_RETRIES = 10;

export const EMPTY_REQUEST = { context: { channel: ChannelType.Web } };
