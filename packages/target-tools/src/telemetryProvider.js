/* eslint-disable import/prefer-default-export */

import { now } from "./lodash";
import { DECISIONING_METHOD } from "./enums";

/**
 * The get TelemetryProvider initialization method
 * @param {function} sendTelemetriesFunc function used to send the telemetries, required
 */
export function TelemetryProvider(
  request,
  executeTelemetriesFunc,
  telemetryEnabled = true,
  decisioningMethod = DECISIONING_METHOD.ON_DEVICE
) {
  const { requestId } = request;
  const timestamp = now();
  let telemetryEntries = [];

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/TelemetryEntry").TelemetryEntry} entry
   */
  function addEntry(entry) {
    if (!telemetryEnabled) {
      return;
    }

    telemetryEntries.push({
      requestId,
      timestamp,
      features: {
        decisioningMethod
      },
      ...entry
    });
  }

  function clearEntries() {
    telemetryEntries = [];
  }

  function executeTelemetries(deliveryRequest) {
    if (telemetryEntries.length > 0) {
      const result = executeTelemetriesFunc(deliveryRequest, telemetryEntries);
      clearEntries();
      return result;
    }
    return deliveryRequest;
  }

  function getEntries() {
    return telemetryEntries;
  }

  return {
    addEntry,
    clearEntries,
    executeTelemetries,
    getEntries
  };
}

export default TelemetryProvider;
