import {
  DeliveryRequest,
  DeliveryResponse
} from "@adobe/target-tools/delivery-api-client";

export interface Cookie {
  name: string;
  value: string;
  maxAge: number;
}

export interface ResponseMeta {
  decisioningMethod: string;
  remoteMboxes: string[];
  remoteViews: string[];
}

export interface TargetDeliveryResponse {
  request: DeliveryRequest;
  response: DeliveryResponse;
  visitorState?: object;
  targetCookie?: Cookie;
  targetLocationHintCookie?: Cookie;
  analyticsDetails?: Array<any>;
  responseTokens?: Array<any>;
  trace?: Array<any>;
  meta?: ResponseMeta;
}
