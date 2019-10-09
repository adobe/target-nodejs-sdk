/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/*
 THIS A GENERATED FILE, DO NOT EDIT IT DIRECTLY!
 */

"use strict";
function _interopDefault(e) {
  return e && "object" == typeof e && "default" in e ? e.default : e;
}
Object.defineProperty(exports, "__esModule", { value: !0 });
var localVarRequest = _interopDefault(require("request"));
function __awaiter(e, t, a, i) {
  return new (a || (a = Promise))(function(r, s) {
    function n(e) {
      try {
        p(i.next(e));
      } catch (e) {
        s(e);
      }
    }
    function o(e) {
      try {
        p(i.throw(e));
      } catch (e) {
        s(e);
      }
    }
    function p(e) {
      e.done
        ? r(e.value)
        : new a(function(t) {
            t(e.value);
          }).then(n, o);
    }
    p((i = i.apply(e, t || [])).next());
  });
}
class Action {
  static getAttributeTypeMap() {
    return Action.attributeTypeMap;
  }
}
(Action.discriminator = void 0),
  (Action.attributeTypeMap = [
    { name: "type", baseName: "type", type: "string" },
    { name: "selector", baseName: "selector", type: "string" },
    { name: "cssSelector", baseName: "cssSelector", type: "string" },
    { name: "content", baseName: "content", type: "OneOfstringobject" }
  ]);
class Address {
  static getAttributeTypeMap() {
    return Address.attributeTypeMap;
  }
}
(Address.discriminator = void 0),
  (Address.attributeTypeMap = [
    { name: "url", baseName: "url", type: "string" },
    { name: "referringUrl", baseName: "referringUrl", type: "string" }
  ]);
class AnalyticsPayload {
  static getAttributeTypeMap() {
    return AnalyticsPayload.attributeTypeMap;
  }
}
(AnalyticsPayload.discriminator = void 0),
  (AnalyticsPayload.attributeTypeMap = [
    { name: "pe", baseName: "pe", type: "string" },
    { name: "tnta", baseName: "tnta", type: "string" }
  ]);
class AnalyticsRequest {
  static getAttributeTypeMap() {
    return AnalyticsRequest.attributeTypeMap;
  }
}
(AnalyticsRequest.discriminator = void 0),
  (AnalyticsRequest.attributeTypeMap = [
    {
      name: "supplementalDataId",
      baseName: "supplementalDataId",
      type: "string"
    },
    { name: "logging", baseName: "logging", type: "LoggingType" },
    { name: "trackingServer", baseName: "trackingServer", type: "string" },
    {
      name: "trackingServerSecure",
      baseName: "trackingServerSecure",
      type: "string"
    }
  ]);
class AnalyticsResponse {
  static getAttributeTypeMap() {
    return AnalyticsResponse.attributeTypeMap;
  }
}
(AnalyticsResponse.discriminator = void 0),
  (AnalyticsResponse.attributeTypeMap = [
    { name: "payload", baseName: "payload", type: "AnalyticsPayload" }
  ]);
class Application {
  static getAttributeTypeMap() {
    return Application.attributeTypeMap;
  }
}
(Application.discriminator = void 0),
  (Application.attributeTypeMap = [
    { name: "id", baseName: "id", type: "string" },
    { name: "name", baseName: "name", type: "string" },
    { name: "version", baseName: "version", type: "string" }
  ]);
class AudienceManager {
  static getAttributeTypeMap() {
    return AudienceManager.attributeTypeMap;
  }
}
(AudienceManager.discriminator = void 0),
  (AudienceManager.attributeTypeMap = [
    { name: "locationHint", baseName: "locationHint", type: "number" },
    { name: "blob", baseName: "blob", type: "string" }
  ]),
  (function(e) {
    (e[(e.Unknown = "unknown")] = "Unknown"),
      (e[(e.Authenticated = "authenticated")] = "Authenticated"),
      (e[(e.LoggedOut = "logged_out")] = "LoggedOut");
  })(exports.AuthenticatedState || (exports.AuthenticatedState = {}));
class Browser {
  static getAttributeTypeMap() {
    return Browser.attributeTypeMap;
  }
}
(Browser.discriminator = void 0),
  (Browser.attributeTypeMap = [
    { name: "host", baseName: "host", type: "string" },
    { name: "webGLRenderer", baseName: "webGLRenderer", type: "string" }
  ]),
  (function(e) {
    (e[(e.Mobile = "mobile")] = "Mobile"), (e[(e.Web = "web")] = "Web");
  })(exports.ChannelType || (exports.ChannelType = {}));
class Context {
  static getAttributeTypeMap() {
    return Context.attributeTypeMap;
  }
}
(Context.discriminator = void 0),
  (Context.attributeTypeMap = [
    { name: "channel", baseName: "channel", type: "ChannelType" },
    {
      name: "mobilePlatform",
      baseName: "mobilePlatform",
      type: "MobilePlatform"
    },
    { name: "application", baseName: "application", type: "Application" },
    { name: "screen", baseName: "screen", type: "Screen" },
    { name: "window", baseName: "window", type: "Window" },
    { name: "browser", baseName: "browser", type: "Browser" },
    { name: "address", baseName: "address", type: "Address" },
    { name: "geo", baseName: "geo", type: "Geo" },
    {
      name: "timeOffsetInMinutes",
      baseName: "timeOffsetInMinutes",
      type: "number"
    },
    { name: "userAgent", baseName: "userAgent", type: "string" },
    { name: "beacon", baseName: "beacon", type: "boolean" }
  ]);
class CustomerId {
  static getAttributeTypeMap() {
    return CustomerId.attributeTypeMap;
  }
}
(CustomerId.discriminator = void 0),
  (CustomerId.attributeTypeMap = [
    { name: "id", baseName: "id", type: "string" },
    { name: "integrationCode", baseName: "integrationCode", type: "string" },
    {
      name: "authenticatedState",
      baseName: "authenticatedState",
      type: "AuthenticatedState"
    }
  ]);
class DeliveryRequest {
  static getAttributeTypeMap() {
    return DeliveryRequest.attributeTypeMap;
  }
}
(DeliveryRequest.discriminator = void 0),
  (DeliveryRequest.attributeTypeMap = [
    { name: "requestId", baseName: "requestId", type: "string" },
    { name: "impressionId", baseName: "impressionId", type: "string" },
    { name: "id", baseName: "id", type: "VisitorId" },
    { name: "environmentId", baseName: "environmentId", type: "number" },
    { name: "property", baseName: "property", type: "Property" },
    { name: "trace", baseName: "trace", type: "Trace" },
    { name: "context", baseName: "context", type: "Context" },
    {
      name: "experienceCloud",
      baseName: "experienceCloud",
      type: "ExperienceCloud"
    },
    { name: "execute", baseName: "execute", type: "ExecuteRequest" },
    { name: "prefetch", baseName: "prefetch", type: "PrefetchRequest" },
    {
      name: "notifications",
      baseName: "notifications",
      type: "Array<Notification>"
    },
    { name: "qaMode", baseName: "qaMode", type: "QAMode" }
  ]);
class DeliveryResponse {
  static getAttributeTypeMap() {
    return DeliveryResponse.attributeTypeMap;
  }
}
(DeliveryResponse.discriminator = void 0),
  (DeliveryResponse.attributeTypeMap = [
    { name: "status", baseName: "status", type: "number" },
    { name: "requestId", baseName: "requestId", type: "string" },
    { name: "id", baseName: "id", type: "VisitorId" },
    { name: "client", baseName: "client", type: "string" },
    { name: "edgeHost", baseName: "edgeHost", type: "string" },
    { name: "execute", baseName: "execute", type: "ExecuteResponse" },
    { name: "prefetch", baseName: "prefetch", type: "PrefetchResponse" }
  ]),
  (function(e) {
    (e[(e.Phone = "phone")] = "Phone"), (e[(e.Tablet = "tablet")] = "Tablet");
  })(exports.DeviceType || (exports.DeviceType = {}));
class ExecuteRequest {
  static getAttributeTypeMap() {
    return ExecuteRequest.attributeTypeMap;
  }
}
(ExecuteRequest.discriminator = void 0),
  (ExecuteRequest.attributeTypeMap = [
    { name: "pageLoad", baseName: "pageLoad", type: "RequestDetails" },
    { name: "mboxes", baseName: "mboxes", type: "Array<MboxRequest>" }
  ]);
class ExecuteResponse {
  static getAttributeTypeMap() {
    return ExecuteResponse.attributeTypeMap;
  }
}
(ExecuteResponse.discriminator = void 0),
  (ExecuteResponse.attributeTypeMap = [
    { name: "pageLoad", baseName: "pageLoad", type: "PageLoadResponse" },
    { name: "mboxes", baseName: "mboxes", type: "Array<MboxResponse>" }
  ]);
class ExperienceCloud {
  static getAttributeTypeMap() {
    return ExperienceCloud.attributeTypeMap;
  }
}
(ExperienceCloud.discriminator = void 0),
  (ExperienceCloud.attributeTypeMap = [
    {
      name: "audienceManager",
      baseName: "audienceManager",
      type: "AudienceManager"
    },
    { name: "analytics", baseName: "analytics", type: "AnalyticsRequest" }
  ]);
class Geo {
  static getAttributeTypeMap() {
    return Geo.attributeTypeMap;
  }
}
(Geo.discriminator = void 0),
  (Geo.attributeTypeMap = [
    { name: "latitude", baseName: "latitude", type: "number" },
    { name: "longitude", baseName: "longitude", type: "number" }
  ]),
  (function(e) {
    (e[(e.ServerSide = "server_side")] = "ServerSide"),
      (e[(e.ClientSide = "client_side")] = "ClientSide");
  })(exports.LoggingType || (exports.LoggingType = {}));
class MboxRequest {
  static getAttributeTypeMap() {
    return MboxRequest.attributeTypeMap;
  }
}
(MboxRequest.discriminator = void 0),
  (MboxRequest.attributeTypeMap = [
    { name: "address", baseName: "address", type: "Address" },
    {
      name: "parameters",
      baseName: "parameters",
      type: "{ [key: string]: string; }"
    },
    {
      name: "profileParameters",
      baseName: "profileParameters",
      type: "{ [key: string]: string; }"
    },
    { name: "order", baseName: "order", type: "Order" },
    { name: "product", baseName: "product", type: "Product" },
    { name: "index", baseName: "index", type: "number" },
    { name: "name", baseName: "name", type: "string" }
  ]);
class MboxRequestAllOf {
  static getAttributeTypeMap() {
    return MboxRequestAllOf.attributeTypeMap;
  }
}
(MboxRequestAllOf.discriminator = void 0),
  (MboxRequestAllOf.attributeTypeMap = [
    { name: "index", baseName: "index", type: "number" },
    { name: "name", baseName: "name", type: "string" }
  ]);
class MboxResponse {
  static getAttributeTypeMap() {
    return MboxResponse.attributeTypeMap;
  }
}
(MboxResponse.discriminator = void 0),
  (MboxResponse.attributeTypeMap = [
    { name: "index", baseName: "index", type: "number" },
    { name: "name", baseName: "name", type: "string" },
    { name: "options", baseName: "options", type: "Array<Option>" },
    { name: "metrics", baseName: "metrics", type: "Array<Metric>" },
    { name: "analytics", baseName: "analytics", type: "AnalyticsResponse" },
    { name: "trace", baseName: "trace", type: "{ [key: string]: object; }" }
  ]);
class Metric {
  static getAttributeTypeMap() {
    return Metric.attributeTypeMap;
  }
}
(Metric.discriminator = void 0),
  (Metric.attributeTypeMap = [
    { name: "type", baseName: "type", type: "MetricType" },
    { name: "selector", baseName: "selector", type: "string" },
    { name: "eventToken", baseName: "eventToken", type: "string" }
  ]),
  (function(e) {
    (e[(e.Click = "click")] = "Click"),
      (e[(e.Display = "display")] = "Display");
  })(exports.MetricType || (exports.MetricType = {}));
class MobilePlatform {
  static getAttributeTypeMap() {
    return MobilePlatform.attributeTypeMap;
  }
}
(MobilePlatform.discriminator = void 0),
  (MobilePlatform.attributeTypeMap = [
    { name: "deviceName", baseName: "deviceName", type: "string" },
    { name: "deviceType", baseName: "deviceType", type: "DeviceType" },
    {
      name: "platformType",
      baseName: "platformType",
      type: "MobilePlatformType"
    },
    { name: "version", baseName: "version", type: "string" }
  ]),
  (function(e) {
    (e[(e.Android = "android")] = "Android"), (e[(e.Ios = "ios")] = "Ios");
  })(exports.MobilePlatformType || (exports.MobilePlatformType = {}));
class Notification {
  static getAttributeTypeMap() {
    return Notification.attributeTypeMap;
  }
}
(Notification.discriminator = void 0),
  (Notification.attributeTypeMap = [
    { name: "address", baseName: "address", type: "Address" },
    {
      name: "parameters",
      baseName: "parameters",
      type: "{ [key: string]: string; }"
    },
    {
      name: "profileParameters",
      baseName: "profileParameters",
      type: "{ [key: string]: string; }"
    },
    { name: "order", baseName: "order", type: "Order" },
    { name: "product", baseName: "product", type: "Product" },
    { name: "id", baseName: "id", type: "string" },
    { name: "impressionId", baseName: "impressionId", type: "string" },
    { name: "type", baseName: "type", type: "MetricType" },
    { name: "timestamp", baseName: "timestamp", type: "number" },
    { name: "tokens", baseName: "tokens", type: "Array<string>" },
    { name: "mbox", baseName: "mbox", type: "NotificationMbox" },
    { name: "view", baseName: "view", type: "NotificationView" },
    { name: "pageLoad", baseName: "pageLoad", type: "NotificationPageLoad" }
  ]);
class NotificationAllOf {
  static getAttributeTypeMap() {
    return NotificationAllOf.attributeTypeMap;
  }
}
(NotificationAllOf.discriminator = void 0),
  (NotificationAllOf.attributeTypeMap = [
    { name: "id", baseName: "id", type: "string" },
    { name: "impressionId", baseName: "impressionId", type: "string" },
    { name: "type", baseName: "type", type: "MetricType" },
    { name: "timestamp", baseName: "timestamp", type: "number" },
    { name: "tokens", baseName: "tokens", type: "Array<string>" },
    { name: "mbox", baseName: "mbox", type: "NotificationMbox" },
    { name: "view", baseName: "view", type: "NotificationView" },
    { name: "pageLoad", baseName: "pageLoad", type: "NotificationPageLoad" }
  ]);
class NotificationMbox {
  static getAttributeTypeMap() {
    return NotificationMbox.attributeTypeMap;
  }
}
(NotificationMbox.discriminator = void 0),
  (NotificationMbox.attributeTypeMap = [
    { name: "name", baseName: "name", type: "string" },
    { name: "state", baseName: "state", type: "string" }
  ]);
class NotificationPageLoad {
  static getAttributeTypeMap() {
    return NotificationPageLoad.attributeTypeMap;
  }
}
(NotificationPageLoad.discriminator = void 0),
  (NotificationPageLoad.attributeTypeMap = [
    { name: "state", baseName: "state", type: "string" }
  ]);
class NotificationView {
  static getAttributeTypeMap() {
    return NotificationView.attributeTypeMap;
  }
}
(NotificationView.discriminator = void 0),
  (NotificationView.attributeTypeMap = [
    { name: "name", baseName: "name", type: "string" },
    { name: "key", baseName: "key", type: "string" },
    { name: "state", baseName: "state", type: "string" }
  ]);
class Option {
  static getAttributeTypeMap() {
    return Option.attributeTypeMap;
  }
}
(Option.discriminator = void 0),
  (Option.attributeTypeMap = [
    { name: "type", baseName: "type", type: "OptionType" },
    { name: "content", baseName: "content", type: "OneOfstringobjectarray" },
    { name: "eventToken", baseName: "eventToken", type: "string" },
    {
      name: "responseTokens",
      baseName: "responseTokens",
      type: "{ [key: string]: object; }"
    }
  ]),
  (function(e) {
    (e[(e.Html = "html")] = "Html"),
      (e[(e.Json = "json")] = "Json"),
      (e[(e.Redirect = "redirect")] = "Redirect"),
      (e[(e.Dynamic = "dynamic")] = "Dynamic"),
      (e[(e.Actions = "actions")] = "Actions");
  })(exports.OptionType || (exports.OptionType = {}));
class Order {
  static getAttributeTypeMap() {
    return Order.attributeTypeMap;
  }
}
(Order.discriminator = void 0),
  (Order.attributeTypeMap = [
    { name: "id", baseName: "id", type: "string" },
    { name: "total", baseName: "total", type: "number" },
    {
      name: "purchasedProductIds",
      baseName: "purchasedProductIds",
      type: "Array<string>"
    },
    { name: "time", baseName: "time", type: "Date" },
    {
      name: "experienceLocalId",
      baseName: "experienceLocalId",
      type: "number"
    },
    { name: "duplicate", baseName: "duplicate", type: "boolean" },
    { name: "outlier", baseName: "outlier", type: "boolean" }
  ]);
class PageLoadResponse {
  static getAttributeTypeMap() {
    return PageLoadResponse.attributeTypeMap;
  }
}
(PageLoadResponse.discriminator = void 0),
  (PageLoadResponse.attributeTypeMap = [
    { name: "options", baseName: "options", type: "Array<Option>" },
    { name: "metrics", baseName: "metrics", type: "Array<Metric>" },
    { name: "analytics", baseName: "analytics", type: "AnalyticsResponse" },
    { name: "state", baseName: "state", type: "string" },
    { name: "trace", baseName: "trace", type: "{ [key: string]: object; }" }
  ]);
class PrefetchMboxResponse {
  static getAttributeTypeMap() {
    return PrefetchMboxResponse.attributeTypeMap;
  }
}
(PrefetchMboxResponse.discriminator = void 0),
  (PrefetchMboxResponse.attributeTypeMap = [
    { name: "index", baseName: "index", type: "number" },
    { name: "name", baseName: "name", type: "string" },
    { name: "options", baseName: "options", type: "Array<Option>" },
    { name: "metrics", baseName: "metrics", type: "Array<Metric>" },
    { name: "analytics", baseName: "analytics", type: "AnalyticsResponse" },
    { name: "trace", baseName: "trace", type: "{ [key: string]: object; }" },
    { name: "state", baseName: "state", type: "string" }
  ]);
class PrefetchMboxResponseAllOf {
  static getAttributeTypeMap() {
    return PrefetchMboxResponseAllOf.attributeTypeMap;
  }
}
(PrefetchMboxResponseAllOf.discriminator = void 0),
  (PrefetchMboxResponseAllOf.attributeTypeMap = [
    { name: "state", baseName: "state", type: "string" }
  ]);
class PrefetchRequest {
  static getAttributeTypeMap() {
    return PrefetchRequest.attributeTypeMap;
  }
}
(PrefetchRequest.discriminator = void 0),
  (PrefetchRequest.attributeTypeMap = [
    { name: "views", baseName: "views", type: "Array<ViewRequest>" },
    { name: "pageLoad", baseName: "pageLoad", type: "RequestDetails" },
    { name: "mboxes", baseName: "mboxes", type: "Array<MboxRequest>" }
  ]);
class PrefetchResponse {
  static getAttributeTypeMap() {
    return PrefetchResponse.attributeTypeMap;
  }
}
(PrefetchResponse.discriminator = void 0),
  (PrefetchResponse.attributeTypeMap = [
    { name: "views", baseName: "views", type: "Array<View>" },
    { name: "pageLoad", baseName: "pageLoad", type: "PageLoadResponse" },
    { name: "mboxes", baseName: "mboxes", type: "Array<PrefetchMboxResponse>" },
    { name: "metrics", baseName: "metrics", type: "Array<Metric>" }
  ]);
class Product {
  static getAttributeTypeMap() {
    return Product.attributeTypeMap;
  }
}
(Product.discriminator = void 0),
  (Product.attributeTypeMap = [
    { name: "id", baseName: "id", type: "string" },
    { name: "categoryId", baseName: "categoryId", type: "string" }
  ]);
class Property {
  static getAttributeTypeMap() {
    return Property.attributeTypeMap;
  }
}
(Property.discriminator = void 0),
  (Property.attributeTypeMap = [
    { name: "token", baseName: "token", type: "string" }
  ]);
class QAMode {
  static getAttributeTypeMap() {
    return QAMode.attributeTypeMap;
  }
}
(QAMode.discriminator = void 0),
  (QAMode.attributeTypeMap = [
    { name: "token", baseName: "token", type: "string" },
    {
      name: "listedActivitiesOnly",
      baseName: "listedActivitiesOnly",
      type: "boolean"
    },
    {
      name: "evaluateAsTrueAudienceIds",
      baseName: "evaluateAsTrueAudienceIds",
      type: "Array<number>"
    },
    {
      name: "evaluateAsFalseAudienceIds",
      baseName: "evaluateAsFalseAudienceIds",
      type: "Array<number>"
    },
    {
      name: "previewIndexes",
      baseName: "previewIndexes",
      type: "Array<QAModePreviewIndex>"
    }
  ]);
class QAModePreviewIndex {
  static getAttributeTypeMap() {
    return QAModePreviewIndex.attributeTypeMap;
  }
}
(QAModePreviewIndex.discriminator = void 0),
  (QAModePreviewIndex.attributeTypeMap = [
    { name: "activityIndex", baseName: "activityIndex", type: "number" },
    { name: "experienceIndex", baseName: "experienceIndex", type: "number" }
  ]);
class RequestDetails {
  static getAttributeTypeMap() {
    return RequestDetails.attributeTypeMap;
  }
}
(RequestDetails.discriminator = void 0),
  (RequestDetails.attributeTypeMap = [
    { name: "address", baseName: "address", type: "Address" },
    {
      name: "parameters",
      baseName: "parameters",
      type: "{ [key: string]: string; }"
    },
    {
      name: "profileParameters",
      baseName: "profileParameters",
      type: "{ [key: string]: string; }"
    },
    { name: "order", baseName: "order", type: "Order" },
    { name: "product", baseName: "product", type: "Product" }
  ]);
class Screen {
  static getAttributeTypeMap() {
    return Screen.attributeTypeMap;
  }
}
(Screen.discriminator = void 0),
  (Screen.attributeTypeMap = [
    { name: "width", baseName: "width", type: "number" },
    { name: "height", baseName: "height", type: "number" },
    { name: "colorDepth", baseName: "colorDepth", type: "number" },
    { name: "pixelRatio", baseName: "pixelRatio", type: "number" },
    {
      name: "orientation",
      baseName: "orientation",
      type: "ScreenOrientationType"
    }
  ]),
  (function(e) {
    (e[(e.Portrait = "portrait")] = "Portrait"),
      (e[(e.Landscape = "landscape")] = "Landscape");
  })(exports.ScreenOrientationType || (exports.ScreenOrientationType = {}));
class Trace {
  static getAttributeTypeMap() {
    return Trace.attributeTypeMap;
  }
}
(Trace.discriminator = void 0),
  (Trace.attributeTypeMap = [
    {
      name: "authorizationToken",
      baseName: "authorizationToken",
      type: "string"
    },
    { name: "usage", baseName: "usage", type: "{ [key: string]: string; }" }
  ]);
class UnexpectedError {
  static getAttributeTypeMap() {
    return UnexpectedError.attributeTypeMap;
  }
}
(UnexpectedError.discriminator = void 0),
  (UnexpectedError.attributeTypeMap = [
    { name: "status", baseName: "status", type: "number" },
    { name: "message", baseName: "message", type: "string" }
  ]);
class View {
  static getAttributeTypeMap() {
    return View.attributeTypeMap;
  }
}
(View.discriminator = void 0),
  (View.attributeTypeMap = [
    { name: "name", baseName: "name", type: "string" },
    { name: "key", baseName: "key", type: "string" },
    { name: "options", baseName: "options", type: "Array<Option>" },
    { name: "metrics", baseName: "metrics", type: "Array<Metric>" },
    { name: "analytics", baseName: "analytics", type: "AnalyticsResponse" },
    { name: "state", baseName: "state", type: "string" },
    { name: "trace", baseName: "trace", type: "{ [key: string]: object; }" }
  ]);
class ViewRequest {
  static getAttributeTypeMap() {
    return ViewRequest.attributeTypeMap;
  }
}
(ViewRequest.discriminator = void 0),
  (ViewRequest.attributeTypeMap = [
    { name: "address", baseName: "address", type: "Address" },
    {
      name: "parameters",
      baseName: "parameters",
      type: "{ [key: string]: string; }"
    },
    {
      name: "profileParameters",
      baseName: "profileParameters",
      type: "{ [key: string]: string; }"
    },
    { name: "order", baseName: "order", type: "Order" },
    { name: "product", baseName: "product", type: "Product" },
    { name: "name", baseName: "name", type: "string" },
    { name: "key", baseName: "key", type: "string" }
  ]);
class ViewRequestAllOf {
  static getAttributeTypeMap() {
    return ViewRequestAllOf.attributeTypeMap;
  }
}
(ViewRequestAllOf.discriminator = void 0),
  (ViewRequestAllOf.attributeTypeMap = [
    { name: "name", baseName: "name", type: "string" },
    { name: "key", baseName: "key", type: "string" }
  ]);
class VisitorId {
  static getAttributeTypeMap() {
    return VisitorId.attributeTypeMap;
  }
}
(VisitorId.discriminator = void 0),
  (VisitorId.attributeTypeMap = [
    { name: "tntId", baseName: "tntId", type: "string" },
    { name: "thirdPartyId", baseName: "thirdPartyId", type: "string" },
    {
      name: "marketingCloudVisitorId",
      baseName: "marketingCloudVisitorId",
      type: "string"
    },
    { name: "customerIds", baseName: "customerIds", type: "Array<CustomerId>" }
  ]);
class Window {
  static getAttributeTypeMap() {
    return Window.attributeTypeMap;
  }
}
(Window.discriminator = void 0),
  (Window.attributeTypeMap = [
    { name: "width", baseName: "width", type: "number" },
    { name: "height", baseName: "height", type: "number" }
  ]);
let primitives = [
    "string",
    "boolean",
    "double",
    "integer",
    "long",
    "float",
    "number",
    "any"
  ],
  enumsMap = {
    AuthenticatedState: exports.AuthenticatedState,
    ChannelType: exports.ChannelType,
    DeviceType: exports.DeviceType,
    LoggingType: exports.LoggingType,
    MetricType: exports.MetricType,
    MobilePlatformType: exports.MobilePlatformType,
    OptionType: exports.OptionType,
    ScreenOrientationType: exports.ScreenOrientationType
  },
  typeMap = {
    Action: Action,
    Address: Address,
    AnalyticsPayload: AnalyticsPayload,
    AnalyticsRequest: AnalyticsRequest,
    AnalyticsResponse: AnalyticsResponse,
    Application: Application,
    AudienceManager: AudienceManager,
    Browser: Browser,
    Context: Context,
    CustomerId: CustomerId,
    DeliveryRequest: DeliveryRequest,
    DeliveryResponse: DeliveryResponse,
    ExecuteRequest: ExecuteRequest,
    ExecuteResponse: ExecuteResponse,
    ExperienceCloud: ExperienceCloud,
    Geo: Geo,
    MboxRequest: MboxRequest,
    MboxRequestAllOf: MboxRequestAllOf,
    MboxResponse: MboxResponse,
    Metric: Metric,
    MobilePlatform: MobilePlatform,
    Notification: Notification,
    NotificationAllOf: NotificationAllOf,
    NotificationMbox: NotificationMbox,
    NotificationPageLoad: NotificationPageLoad,
    NotificationView: NotificationView,
    Option: Option,
    Order: Order,
    PageLoadResponse: PageLoadResponse,
    PrefetchMboxResponse: PrefetchMboxResponse,
    PrefetchMboxResponseAllOf: PrefetchMboxResponseAllOf,
    PrefetchRequest: PrefetchRequest,
    PrefetchResponse: PrefetchResponse,
    Product: Product,
    Property: Property,
    QAMode: QAMode,
    QAModePreviewIndex: QAModePreviewIndex,
    RequestDetails: RequestDetails,
    Screen: Screen,
    Trace: Trace,
    UnexpectedError: UnexpectedError,
    View: View,
    ViewRequest: ViewRequest,
    ViewRequestAllOf: ViewRequestAllOf,
    VisitorId: VisitorId,
    Window: Window
  };
class ObjectSerializer {
  static findCorrectType(e, t) {
    if (null == e) return t;
    if (-1 !== primitives.indexOf(t.toLowerCase())) return t;
    if ("Date" === t) return t;
    {
      if (enumsMap[t]) return t;
      if (!typeMap[t]) return t;
      let i = typeMap[t].discriminator;
      if (null == i) return t;
      if (e[i]) {
        var a = e[i];
        return typeMap[a] ? a : t;
      }
      return t;
    }
  }
  static serialize(e, t) {
    if (null == e) return e;
    if (-1 !== primitives.indexOf(t.toLowerCase())) return e;
    if (0 === t.lastIndexOf("Array<", 0)) {
      let a = t.replace("Array<", "");
      a = a.substring(0, a.length - 1);
      let i = [];
      for (let t in e) {
        let r = e[t];
        i.push(ObjectSerializer.serialize(r, a));
      }
      return i;
    }
    if ("Date" === t) return e.toISOString();
    {
      if (enumsMap[t]) return e;
      if (!typeMap[t]) return e;
      t = this.findCorrectType(e, t);
      let a = typeMap[t].getAttributeTypeMap(),
        i = {};
      for (let t in a) {
        let r = a[t];
        i[r.baseName] = ObjectSerializer.serialize(e[r.name], r.type);
      }
      return i;
    }
  }
  static deserialize(e, t) {
    if (((t = ObjectSerializer.findCorrectType(e, t)), null == e)) return e;
    if (-1 !== primitives.indexOf(t.toLowerCase())) return e;
    if (0 === t.lastIndexOf("Array<", 0)) {
      let a = t.replace("Array<", "");
      a = a.substring(0, a.length - 1);
      let i = [];
      for (let t in e) {
        let r = e[t];
        i.push(ObjectSerializer.deserialize(r, a));
      }
      return i;
    }
    if ("Date" === t) return new Date(e);
    {
      if (enumsMap[t]) return e;
      if (!typeMap[t]) return e;
      let a = new typeMap[t](),
        i = typeMap[t].getAttributeTypeMap();
      for (let t in i) {
        let r = i[t];
        a[r.name] = ObjectSerializer.deserialize(e[r.baseName], r.type);
      }
      return a;
    }
  }
}
let defaultBasePath = "https://.tt.omtrdc.net",
  defaultTimeout = 1e4;
class TargetDeliveryApi {
  constructor(e) {
    (this._basePath = defaultBasePath),
      (this._timeout = defaultTimeout),
      (this.defaultHeaders = {}),
      (this._useQuerystring = !1),
      e && (this.basePath = e);
  }
  set useQuerystring(e) {
    this._useQuerystring = e;
  }
  set basePath(e) {
    this._basePath = e;
  }
  get basePath() {
    return this._basePath;
  }
  set timeout(e) {
    this._timeout = e;
  }
  get timeout() {
    return this._timeout;
  }
  execute(e, t, a, i = { headers: {} }) {
    return __awaiter(this, void 0, void 0, function*() {
      const r = this.basePath + "/rest/v1/delivery";
      let s = {},
        n = Object.assign({}, this.defaultHeaders),
        o = {};
      if (null == e)
        throw new Error(
          "Required parameter client was null or undefined when calling execute."
        );
      if (null == t)
        throw new Error(
          "Required parameter sessionId was null or undefined when calling execute."
        );
      if (null == a)
        throw new Error(
          "Required parameter deliveryRequest was null or undefined when calling execute."
        );
      void 0 !== e && (s.client = ObjectSerializer.serialize(e, "string")),
        void 0 !== t && (s.sessionId = ObjectSerializer.serialize(t, "string")),
        Object.assign(n, i.headers);
      let p = {
        method: "POST",
        qs: s,
        headers: n,
        uri: r,
        useQuerystring: this._useQuerystring,
        timeout: this._timeout || defaultTimeout,
        time: !0,
        json: !0,
        body: ObjectSerializer.serialize(a, "DeliveryRequest")
      };
      return (
        Object.keys(o).length && (p.form = o),
        new Promise((e, t) => {
          localVarRequest(p, (a, i, r) => {
            if (a) t(a);
            else {
              r = ObjectSerializer.deserialize(r, "DeliveryResponse");
              const { statusCode: a, timingPhases: s } = i;
              a && a >= 200 && a <= 299
                ? e({ statusCode: a, timing: s, body: r })
                : t({ statusCode: a, timing: s, body: r });
            }
          });
        })
      );
    });
  }
}
const APIS = [TargetDeliveryApi];
(exports.APIS = APIS),
  (exports.Action = Action),
  (exports.Address = Address),
  (exports.AnalyticsPayload = AnalyticsPayload),
  (exports.AnalyticsRequest = AnalyticsRequest),
  (exports.AnalyticsResponse = AnalyticsResponse),
  (exports.Application = Application),
  (exports.AudienceManager = AudienceManager),
  (exports.Browser = Browser),
  (exports.Context = Context),
  (exports.CustomerId = CustomerId),
  (exports.DeliveryRequest = DeliveryRequest),
  (exports.DeliveryResponse = DeliveryResponse),
  (exports.ExecuteRequest = ExecuteRequest),
  (exports.ExecuteResponse = ExecuteResponse),
  (exports.ExperienceCloud = ExperienceCloud),
  (exports.Geo = Geo),
  (exports.MboxRequest = MboxRequest),
  (exports.MboxRequestAllOf = MboxRequestAllOf),
  (exports.MboxResponse = MboxResponse),
  (exports.Metric = Metric),
  (exports.MobilePlatform = MobilePlatform),
  (exports.Notification = Notification),
  (exports.NotificationAllOf = NotificationAllOf),
  (exports.NotificationMbox = NotificationMbox),
  (exports.NotificationPageLoad = NotificationPageLoad),
  (exports.NotificationView = NotificationView),
  (exports.ObjectSerializer = ObjectSerializer),
  (exports.Option = Option),
  (exports.Order = Order),
  (exports.PageLoadResponse = PageLoadResponse),
  (exports.PrefetchMboxResponse = PrefetchMboxResponse),
  (exports.PrefetchMboxResponseAllOf = PrefetchMboxResponseAllOf),
  (exports.PrefetchRequest = PrefetchRequest),
  (exports.PrefetchResponse = PrefetchResponse),
  (exports.Product = Product),
  (exports.Property = Property),
  (exports.QAMode = QAMode),
  (exports.QAModePreviewIndex = QAModePreviewIndex),
  (exports.RequestDetails = RequestDetails),
  (exports.Screen = Screen),
  (exports.TargetDeliveryApi = TargetDeliveryApi),
  (exports.Trace = Trace),
  (exports.UnexpectedError = UnexpectedError),
  (exports.View = View),
  (exports.ViewRequest = ViewRequest),
  (exports.ViewRequestAllOf = ViewRequestAllOf),
  (exports.VisitorId = VisitorId),
  (exports.Window = Window);
//# sourceMappingURL=api.js.map
