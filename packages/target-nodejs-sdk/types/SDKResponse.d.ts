import {DeliveryRequest, DeliveryResponse} from "@adobe/target-tools/delivery-api-client";

export interface Cookie {
  name: String;
  value: String;
  maxAge: Number;
}

export interface ResponseStatus {
  status: Number;
  message: String;
  remoteMboxes: String[];
}

export interface OffersResponse {
    request: DeliveryRequest;
    response: DeliveryResponse;
    visitorState?:Object;
    targetCookie?:Cookie;
    targetLocationHintCookie?:Cookie;
    analyticsDetails?:Array<any>;
    responseTokens?:Array<any>;
    trace?:Array<any>;
    status?:ResponseStatus;
}
