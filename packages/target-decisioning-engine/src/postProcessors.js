/* eslint-disable no-unused-vars */
import {
  isUndefined,
  objectWithoutUndefinedValues,
  MetricType
} from "@adobe/target-tools";
import { RequestType } from "./enums";

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
