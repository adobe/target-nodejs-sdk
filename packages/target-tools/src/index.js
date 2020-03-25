import { uuid } from "./lodash";

export { default as DeliveryApiClient } from "../delivery-api-client";
export { getMboxNames, isBrowser, isNodeJS, getFetchApi } from "./utils";
export { getLogger } from "./logger";
export const createUUID = () => uuid();
export const noop = () => undefined;

export { DEFAULT_GLOBAL_MBOX } from "./constants";
