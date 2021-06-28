/* eslint-disable import/prefer-default-export */

import { now } from "./lodash";
import { DECISIONING_METHOD, EXECUTION_MODE } from "./enums";
import {
  isExecutePageLoad,
  executeMboxCount,
  isPrefetchPageLoad,
  prefetchMboxCount,
  prefetchViewCount
} from "./utils";

const OK = 200;

/**
 * The get TelemetryProvider initialization method
 * @param {function} sendTelemetriesFunc function used to send the telemetries, required
 */
export function TelemetryProvider(
  executeTelemetriesFunc,
  telemetryEnabled = true,
  method = DECISIONING_METHOD.SERVER_SIDE
) {
  let telemetryEntries = [];

  function getMode(status, decisioningMethod) {
    if (
      status === OK &&
      (decisioningMethod === DECISIONING_METHOD.ON_DEVICE ||
        decisioningMethod === DECISIONING_METHOD.HYBRID)
    ) {
      return EXECUTION_MODE.LOCAL;
    }
    return EXECUTION_MODE.EDGE;
  }

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/TelemetryEntry").TelemetryEntry} entry
   */
  function addEntry(request, entry, status, decisioningMethod = method) {
    if (!telemetryEnabled || !entry) {
      return;
    }

    const { requestId } = request;
    const timestamp = now();

    telemetryEntries.push({
      requestId,
      timestamp,
      mode: getMode(status, decisioningMethod),
      features: {
        decisioningMethod,
        executePageLoad: isExecutePageLoad(request),
        executeMboxCount: executeMboxCount(request),
        prefetchPageLoad: isPrefetchPageLoad(request),
        prefetchMboxCount: prefetchMboxCount(request),
        prefetchViewCount: prefetchViewCount(request)
      },
      ...entry
    });
  }

  function getEntries() {
    return telemetryEntries;
  }

  function clearEntries() {
    telemetryEntries = [];
  }

  function hasEntries() {
    return telemetryEntries.length !== 0;
  }

  function executeTelemetries(deliveryRequest) {
    if (telemetryEntries.length > 0) {
      const result = executeTelemetriesFunc(deliveryRequest, telemetryEntries);
      clearEntries();
      return result;
    }
    return deliveryRequest;
  }

  return {
    addEntry,
    getEntries,
    clearEntries,
    hasEntries,
    executeTelemetries,
    getMode
  };
}

export default TelemetryProvider;
