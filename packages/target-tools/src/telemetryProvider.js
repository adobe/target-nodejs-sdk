/* eslint-disable import/prefer-default-export */

import { now } from "./lodash";
import { DECISIONING_METHOD } from "./enums";
import {
  isExecutePageLoad,
  executeMBoxCount,
  isPrefetchPageLoad,
  prefetchMBoxCount,
  prefetchViewCount
} from "./utils";

/**
 * The get TelemetryProvider initialization method
 * @param {function} sendTelemetriesFunc function used to send the telemetries, required
 */
export function TelemetryProvider(
  executeTelemetriesFunc,
  telemetryEnabled = true,
  mode = DECISIONING_METHOD.SERVER_SIDE
) {
  let telemetryEntries = [];

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/TelemetryEntry").TelemetryEntry} entry
   */
  function addEntry(request, entry, decisioningMethod = mode) {
    if (!telemetryEnabled || !entry) {
      return;
    }

    const { requestId } = request;
    const timestamp = now();

    telemetryEntries.push({
      requestId,
      timestamp,
      features: {
        decisioningMethod,
        executePageLoad: isExecutePageLoad(request),
        executeMboxCount: executeMBoxCount(request),
        prefetchPageLoad: isPrefetchPageLoad(request),
        prefetchMboxCount: prefetchMBoxCount(request),
        prefetchViewCount: prefetchViewCount(request)
      },
      ...entry
    });

    console.log(telemetryEntries[telemetryEntries.length - 1]);
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
    executeTelemetries
  };
}

export default TelemetryProvider;
