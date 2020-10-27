import {CustomerId, DeliveryRequest} from "@adobe/target-tools/delivery-api-client";


export interface TargetOptions {
  /**
   * Target Delivery Request
   */
  request: DeliveryRequest;

  /**
   * VisitorId cookie value
   */
  visitorCookie?:String;

  /**
   * Target cookie value
   */
  targetCookie?:String;

  /**
   * Target location hint value
   */
  targetLocationHint?:String;

  /**
   * When stitching multiple calls, different consumerIds should be provided,
   */
  consumerId?:String;

  /**
   * An array of Customer Ids in VisitorId-compatible format
   */
  customerIds?:Array<CustomerId>

  /**
   * Session Id, used for linking multiple requests
   */
  sessionId?:String;

  /**
   * Supply an external VisitorId instance
   */
  visitor?:Object;
}
