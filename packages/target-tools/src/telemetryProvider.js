import { now } from "./lodash";
import { DECISIONING_METHOD } from "./enums";

/**
 * The get TelemetryProvider initialization method
 * @param {function} sendTelemetriesFunc function used to send the telemetries, required
 */
function TelemetryProvider(
  request,
  decisioningMethod = DECISIONING_METHOD.ON_DEVICE,
  telemetryEnabled = true
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

  function sendTelemetries(deliveryRequest) {
    if (telemetryEntries.length > 0) {
      const deliveryRequestWithTelemetry = {
        ...deliveryRequest,
        telemetry: {
          entries: telemetryEntries
        }
      };
      telemetryEntries = [];

      return deliveryRequestWithTelemetry;
    }
    return deliveryRequest;
  }

  function getEntries() {
    return telemetryEntries;
  }

  return {
    addEntry,
    sendTelemetries,
    getEntries
  };
}

export default TelemetryProvider;
