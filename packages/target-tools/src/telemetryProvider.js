/* eslint-disable import/prefer-default-export */

import { now } from "./lodash";
import { DECISIONING_METHOD, EXECUTION_MODE } from "./enums";
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
  method = DECISIONING_METHOD.SERVER_SIDE
) {
  let telemetryEntries = [];
  let mode;

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/TelemetryEntry").TelemetryEntry} entry
   */
  function addEntry(request, entry, decisioningMethod = method) {
    if (!telemetryEnabled || !entry) {
      return;
    }

    const { requestId } = request;
    const timestamp = now();

    telemetryEntries.push({
      requestId,
      timestamp,
      mode,
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
  }

  function setMode(decisioningMethod) {
    if (decisioningMethod === DECISIONING_METHOD.ON_DEVICE) {
      console.log("CACHE POSSIBLY USED");
      mode = EXECUTION_MODE.ON_DEVICE_CACHED;
    } else if (decisioningMethod === DECISIONING_METHOD.SERVER_SIDE) {
      console.log("SERVER USED");
      mode = EXECUTION_MODE.SERVER_SIDE;
    }
  }

  function newArtifacts() {
    console.log("ON DEVICE USED");
    mode = EXECUTION_MODE.ON_DEVICE;
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
    setMode,
    newArtifacts,
    addEntry,
    getEntries,
    clearEntries,
    hasEntries,
    executeTelemetries
  };
}

export default TelemetryProvider;
