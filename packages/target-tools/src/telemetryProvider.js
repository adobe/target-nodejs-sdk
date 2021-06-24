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

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/TelemetryEntry").TelemetryEntry} entry
   */
  function addEntry(request, entry, decisioningMethod = method) {
    if (!telemetryEnabled || !entry) {
      return;
    }

    const { requestId } = request;
    const timestamp = now();

    let mode = EXECUTION_MODE.EDGE;
    if (decisioningMethod === DECISIONING_METHOD.ON_DEVICE) {
      mode = EXECUTION_MODE.LOCAL;
    }

    telemetryEntries.push({
      requestId,
      timestamp,
      mode,
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
    executeTelemetries
  };
}

export default TelemetryProvider;
