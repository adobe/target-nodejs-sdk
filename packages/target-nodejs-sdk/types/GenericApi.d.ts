import {
  DeliveryRequest,
  DeliveryResponse
} from "@adobe/target-tools/delivery-api-client";

export interface GenericApi {
  execute(
    imsOrgId: string,
    sessionId: string,
    deliveryRequest: DeliveryRequest,
    version?: string,
    edgeConfigId?: string
  ): Promise<DeliveryResponse> | Promise<void> | Promise<never>;
  decisioningMethod: string;
}
