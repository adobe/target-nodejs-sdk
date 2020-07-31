/* eslint-disable no-unused-vars */
import {
  isDefined,
  isUndefined,
  objectWithoutUndefinedValues,
  MetricType,
  includes
} from "@adobe/target-tools";
import { RequestType } from "./enums";
import {
  ACTIVITY_DECISIONING_METHOD,
  ACTIVITY_ID,
  ACTIVITY_NAME,
  ACTIVITY_TYPE,
  EXPERIENCE_ID,
  EXPERIENCE_NAME,
  GEO_CITY,
  GEO_COUNTRY,
  GEO_LATITUDE,
  GEO_LONGITUDE,
  GEO_STATE,
  LOCATION_ID,
  LOCATION_NAME,
  LOCATION_TYPE,
  OFFER_ID,
  OFFER_NAME,
  OPTION_ID,
  OPTION_NAME
} from "./constants";

function noBlankOptions(option) {
  return !(isUndefined(option.type) && isUndefined(option.content));
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param tracer
 */
export function prepareExecuteResponse(
  rule,
  mboxResponse,
  requestType,
  tracer
) {
  const { metrics = [], options = [] } = mboxResponse;

  const result = {
    ...mboxResponse,
    options: options.filter(noBlankOptions).map(pristineOption => {
      const option = { ...pristineOption };
      delete option.eventToken;
      return option;
    }),
    metrics: metrics.filter(metric => metric.type === MetricType.Click)
  };

  if (result.metrics.length === 0) {
    delete result.metrics;
  }

  return result;
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param tracer
 */
export function preparePrefetchResponse(
  rule,
  mboxResponse,
  requestType,
  tracer
) {
  const { options = [] } = mboxResponse;

  const result = {
    ...mboxResponse,
    options: options.map((pristineOption, idx) => {
      let { eventToken } = pristineOption;
      if (
        isUndefined(eventToken) &&
        mboxResponse.metrics.length > idx &&
        mboxResponse.metrics[idx].type === MetricType.Display
      ) {
        // eslint-disable-next-line prefer-destructuring
        eventToken = mboxResponse.metrics[idx].eventToken;
      }
      return {
        ...pristineOption,
        eventToken
      };
    })
  };

  if (requestType !== RequestType.VIEW) {
    delete result.metrics;
  }

  return result;
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param tracer
 */
export function addTrace(rule, mboxResponse, requestType, tracer) {
  return {
    ...mboxResponse,
    trace: tracer.getTraceResult()
  };
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param tracer
 */
export function cleanUp(rule, mboxResponse, requestType, tracer) {
  const result = objectWithoutUndefinedValues(mboxResponse);

  return result;
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param tracer
 */
export function removePageLoadAttributes(
  rule,
  mboxResponse,
  requestType,
  tracer
) {
  const processed = {
    ...mboxResponse
  };

  delete processed.index;
  delete processed.name;
  delete processed.trace;

  return processed;
}

/**
 * @param {Object} context
 * @param {Array<string>} responseTokensInArtifact
 */
export function createResponseTokensPostProcessor(
  context,
  responseTokensInArtifact = []
) {
  const responseTokens = {};
  responseTokens[ACTIVITY_DECISIONING_METHOD] = "on-device";

  if (
    includes(GEO_CITY, responseTokensInArtifact) &&
    isDefined(context.geo.city)
  ) {
    responseTokens[GEO_CITY] = context.geo.city;
  }
  if (
    includes(GEO_COUNTRY, responseTokensInArtifact) &&
    isDefined(context.geo.country)
  ) {
    responseTokens[GEO_COUNTRY] = context.geo.country;
  }
  if (
    includes(GEO_STATE, responseTokensInArtifact) &&
    isDefined(context.geo.region)
  ) {
    responseTokens[GEO_STATE] = context.geo.region;
  }
  if (
    includes(GEO_LATITUDE, responseTokensInArtifact) &&
    isDefined(context.geo.latitude)
  ) {
    responseTokens[GEO_LATITUDE] = context.geo.latitude;
  }
  if (
    includes(GEO_LONGITUDE, responseTokensInArtifact) &&
    isDefined(context.geo.longitude)
  ) {
    responseTokens[GEO_LONGITUDE] = context.geo.longitude;
  }

  /**
   * @param {import("../types/DecisioningArtifact").Rule} rule
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
   */
  return function addResponseTokens(rule, mboxResponse) {
    const meta = rule.meta || {};
    const responseTokensFromMeta = [
      ACTIVITY_ID,
      ACTIVITY_NAME,
      ACTIVITY_TYPE,
      EXPERIENCE_ID,
      EXPERIENCE_NAME,
      LOCATION_ID,
      LOCATION_NAME,
      LOCATION_TYPE,
      OFFER_ID,
      OFFER_NAME,
      OPTION_ID,
      OPTION_NAME
    ].reduce((accumulator, key) => {
      if (includes(key, responseTokensInArtifact) && isDefined(meta[key])) {
        accumulator[key] = meta[key];
      }
      return accumulator;
    }, {});

    const options = mboxResponse.options.map(option => {
      return {
        ...option,
        responseTokens: {
          ...responseTokensFromMeta,
          ...responseTokens
        }
      };
    });

    return {
      ...mboxResponse,
      options
    };
  };
}
