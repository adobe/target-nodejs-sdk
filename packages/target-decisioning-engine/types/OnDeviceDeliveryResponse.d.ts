import { DeliveryResponse } from "@adobe/target-tools/delivery-api-client";

export interface OnDeviceDeliveryResponse extends DeliveryResponse {
  remoteMboxes?: Array<string>;
  remoteViews?: Array<string>;
}
