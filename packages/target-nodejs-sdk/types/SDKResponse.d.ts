import {
  DeliveryRequest,
  DeliveryResponse
} from "@adobe/target-tools/delivery-api-client";

export interface Cookie {
  name: String;
  value: String;
  maxAge: Number;
}

export interface ResponseMeta {
  decisioningMethod: String;
  remoteMboxes: String[];
  remoteViews: String[];
}

export interface TargetDeliveryResponse {
  request: DeliveryRequest;
  response: DeliveryResponse;
  visitorState?: Object;
  targetCookie?: Cookie;
  targetLocationHintCookie?: Cookie;
  analyticsDetails?: Array<any>;
  responseTokens?: Array<any>;
  trace?: Array<any>;
  meta?: ResponseMeta;
}
