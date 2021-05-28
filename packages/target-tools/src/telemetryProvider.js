import { now } from "./lodash";
import { DECISIONING_METHOD } from "./enums";
import { noop } from "./utils";

/**
 * The get TelemetryProvider initialization method
 * @param {function} sendTelemetriesFunc function used to send the telemetries, required
 */
function TelemetryProvider(
  request,
  sendTelemetriesFunc = noop,
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

  function sendTelemetries() {
    if (telemetryEntries.length > 0) {
      setTimeout(() => {
        sendTelemetriesFunc.call(null, telemetryEntries);
        telemetryEntries = [];
      }, 0);
    }
  }

  return {
    addEntry,
    sendTelemetries
  };
}

export default TelemetryProvider;
