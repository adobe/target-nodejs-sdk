import {
  CustomerId,
  DeliveryRequest,
  Trace
} from "@adobe/target-tools/delivery-api-client";

export interface TargetDeliveryRequest {
  /**
   * Target Delivery Request
   */
  request: DeliveryRequest;

  /**
   * VisitorId cookie value
   */
  visitorCookie?: String;

  /**
   * Target cookie value
   */
  targetCookie?: String;

  /**
   * Target location hint value
   */
  targetLocationHint?: String;

  /**
   * When stitching multiple calls, different consumerIds should be provided,
   */
  consumerId?: String;

  /**
   * An array of Customer Ids in VisitorId-compatible format
   */
  customerIds?: Array<CustomerId>;

  /**
   * Session Id, used for linking multiple requests
   */
  sessionId?: String;

  /**
   * Supply an external VisitorId instance
   */
  visitor?: Object;

  /**
   * Enables the trace. A valid authorizationToken is requried for Delivery API.
   */
  trace?: Trace;
}
