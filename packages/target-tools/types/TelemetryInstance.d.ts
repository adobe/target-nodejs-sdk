import { DeliveryRequest, TelemetryEntry } from "../delivery-api-client";

export interface TelemetryInstance {
  addDeliveryRequestEntry(
    request: DeliveryRequest,
    entry: TelemetryEntry,
    status: number,
    decisioningMethod: string
  ): void;
  addArtifactRequestEntry(requestId: string, entry: TelemetryEntry): void;
  addRenderEntry(renderId: string, execution: number): void;
  addServerStateEntry(request: DeliveryRequest): void;
  getAndClearEntries(): Array<TelemetryEntry>;
  hasEntries(): boolean;
  addTelemetryToDeliveryRequest(
    deliveryRequest: DeliveryRequest
  ): DeliveryRequest;
}
