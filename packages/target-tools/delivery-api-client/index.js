"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function(d, b) {
        d.__proto__ = b;
      }) ||
    function(d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype =
    b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}

var __assign = function() {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : new P(function(resolve) {
            resolve(result.value);
          }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return (
    (g = { next: verb(0), throw: verb(1), return: verb(2) }),
    typeof Symbol === "function" &&
      (g[Symbol.iterator] = function() {
        return this;
      }),
    g
  );
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2
                ? y["return"]
                : op[0]
                ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t;
        if (((y = 0), t)) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var BASE_PATH = "https://.tt.omtrdc.net".replace(/\/+$/, "");
var HTTP_NO_CONTENT = 204;
var DEFAULT_TIMEOUT = 3000;
var isBlob = function(value) {
  return typeof Blob !== "undefined" && value instanceof Blob;
};
var BaseAPI = (function() {
  function BaseAPI(configuration) {
    if (configuration === void 0) {
      configuration = new Configuration();
    }
    var _this = this;
    this.configuration = configuration;
    this.fetchApi = function(url, init) {
      return __awaiter(_this, void 0, void 0, function() {
        var fetchParams, _i, _a, middleware, response, _b, _c, middleware;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              fetchParams = { url: url, init: init };
              (_i = 0), (_a = this.middleware);
              _d.label = 1;
            case 1:
              if (!(_i < _a.length)) return [3, 4];
              middleware = _a[_i];
              if (!middleware.pre) return [3, 3];
              return [
                4,
                middleware.pre(__assign({ fetch: this.fetchApi }, fetchParams))
              ];
            case 2:
              fetchParams = _d.sent() || fetchParams;
              _d.label = 3;
            case 3:
              _i++;
              return [3, 1];
            case 4:
              return [
                4,
                this.configuration.fetchApi(fetchParams.url, fetchParams.init)
              ];
            case 5:
              response = _d.sent();
              (_b = 0), (_c = this.middleware);
              _d.label = 6;
            case 6:
              if (!(_b < _c.length)) return [3, 9];
              middleware = _c[_b];
              if (!middleware.post) return [3, 8];
              return [
                4,
                middleware.post({
                  fetch: this.fetchApi,
                  url: url,
                  init: init,
                  response: response.clone()
                })
              ];
            case 7:
              response = _d.sent() || response;
              _d.label = 8;
            case 8:
              _b++;
              return [3, 6];
            case 9:
              return [2, response];
          }
        });
      });
    };
    this.middleware = configuration.middleware;
  }
  BaseAPI.prototype.withMiddleware = function() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      middlewares[_i] = arguments[_i];
    }
    var _a;
    var next = this.clone();
    next.middleware = (_a = next.middleware).concat.apply(_a, middlewares);
    return next;
  };
  BaseAPI.prototype.withPreMiddleware = function() {
    var preMiddlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      preMiddlewares[_i] = arguments[_i];
    }
    var middlewares = preMiddlewares.map(function(pre) {
      return { pre: pre };
    });
    return this.withMiddleware.apply(this, middlewares);
  };
  BaseAPI.prototype.withPostMiddleware = function() {
    var postMiddlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      postMiddlewares[_i] = arguments[_i];
    }
    var middlewares = postMiddlewares.map(function(post) {
      return { post: post };
    });
    return this.withMiddleware.apply(this, middlewares);
  };
  BaseAPI.prototype.request = function(context) {
    return __awaiter(this, void 0, void 0, function() {
      var _a, url, init, response;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            (_a = this.createFetchParams(context)),
              (url = _a.url),
              (init = _a.init);
            return [4, this.fetchApi(url, init)];
          case 1:
            response = _b.sent();
            if (response.status >= 200 && response.status < 300) {
              return [2, response];
            }
            throw response;
        }
      });
    });
  };
  BaseAPI.prototype.createFetchParams = function(context) {
    var url = this.configuration.basePath + context.path;
    if (
      context.query !== undefined &&
      Object.keys(context.query).length !== 0
    ) {
      url += "?" + this.configuration.queryParamsStringify(context.query);
    }
    var body =
      context.body instanceof FormData ||
      context.body instanceof URLSearchParams ||
      isBlob(context.body)
        ? context.body
        : JSON.stringify(context.body);
    var headers = Object.assign(
      {},
      this.configuration.headers,
      context.headers
    );
    var init = {
      method: context.method,
      headers: headers,
      body: body,
      credentials: this.configuration.credentials
    };
    return { url: url, init: init };
  };
  BaseAPI.prototype.clone = function() {
    var constructor = this.constructor;
    var next = new constructor(this.configuration);
    next.middleware = this.middleware.slice();
    return next;
  };
  return BaseAPI;
})();
var RequiredError = (function(_super) {
  __extends(RequiredError, _super);
  function RequiredError(field, msg) {
    var _this = _super.call(this, msg) || this;
    _this.field = field;
    _this.name = "RequiredError";
    return _this;
  }
  return RequiredError;
})(Error);
var COLLECTION_FORMATS = {
  csv: ",",
  ssv: " ",
  tsv: "\t",
  pipes: "|"
};
var Configuration = (function() {
  function Configuration(configuration) {
    if (configuration === void 0) {
      configuration = {};
    }
    this.configuration = configuration;
  }
  Object.defineProperty(Configuration.prototype, "basePath", {
    get: function() {
      return this.configuration.basePath || BASE_PATH;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "fetchApi", {
    get: function() {
      var timeout = this.configuration.timeout;
      var fetch = this.configuration.fetchApi || window.fetch.bind(window);
      return function(input, init) {
        return new Promise(function(resolve, reject) {
          var timer = setTimeout(function() {
            return reject(new Error("Request timed out"));
          }, timeout);
          fetch(input, init)
            .then(
              function(response) {
                return resolve(response);
              },
              function(err) {
                return reject(err);
              }
            )
            .finally(function() {
              return clearTimeout(timer);
            });
        });
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "middleware", {
    get: function() {
      return this.configuration.middleware || [];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "queryParamsStringify", {
    get: function() {
      return this.configuration.queryParamsStringify || querystring;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "username", {
    get: function() {
      return this.configuration.username;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "password", {
    get: function() {
      return this.configuration.password;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "apiKey", {
    get: function() {
      var apiKey = this.configuration.apiKey;
      if (apiKey) {
        return typeof apiKey === "function"
          ? apiKey
          : function() {
              return apiKey;
            };
      }
      return undefined;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "accessToken", {
    get: function() {
      var accessToken = this.configuration.accessToken;
      if (accessToken) {
        return typeof accessToken === "function"
          ? accessToken
          : function() {
              return accessToken;
            };
      }
      return undefined;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "headers", {
    get: function() {
      return this.configuration.headers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "credentials", {
    get: function() {
      return this.configuration.credentials;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Configuration.prototype, "timeout", {
    get: function() {
      return this.configuration.timeout || DEFAULT_TIMEOUT;
    },
    enumerable: true,
    configurable: true
  });
  return Configuration;
})();
function exists(json, key) {
  var value = json[key];
  return value !== null && value !== undefined;
}
function querystring(params, prefix) {
  if (prefix === void 0) {
    prefix = "";
  }
  return Object.keys(params)
    .map(function(key) {
      var fullKey = prefix + (prefix.length ? "[" + key + "]" : key);
      var value = params[key];
      if (value instanceof Array) {
        var multiValue = value
          .map(function(singleValue) {
            return encodeURIComponent(String(singleValue));
          })
          .join("&" + encodeURIComponent(fullKey) + "=");
        return encodeURIComponent(fullKey) + "=" + multiValue;
      }
      if (value instanceof Object) {
        return querystring(value, fullKey);
      }
      return (
        encodeURIComponent(fullKey) + "=" + encodeURIComponent(String(value))
      );
    })
    .filter(function(part) {
      return part.length > 0;
    })
    .join("&");
}
function mapValues(data, fn) {
  return Object.keys(data).reduce(function(acc, key) {
    var _a;
    return __assign({}, acc, ((_a = {}), (_a[key] = fn(data[key])), _a));
  }, {});
}
function canConsumeForm(consumes) {
  for (var _i = 0, consumes_1 = consumes; _i < consumes_1.length; _i++) {
    var consume = consumes_1[_i];
    if ("multipart/form-data" === consume.contentType) {
      return true;
    }
  }
  return false;
}
var JSONApiResponse = (function() {
  function JSONApiResponse(raw, transformer) {
    if (transformer === void 0) {
      transformer = function(jsonValue) {
        return jsonValue;
      };
    }
    this.raw = raw;
    this.transformer = transformer;
  }
  JSONApiResponse.prototype.value = function() {
    return __awaiter(this, void 0, void 0, function() {
      var _a, _b;
      return __generator(this, function(_c) {
        switch (_c.label) {
          case 0:
            _a = this.transformer;
            if (!(this.raw.status === HTTP_NO_CONTENT)) return [3, 1];
            _b = {};
            return [3, 3];
          case 1:
            return [4, this.raw.json()];
          case 2:
            _b = _c.sent();
            _c.label = 3;
          case 3:
            return [2, _a.apply(this, [_b])];
        }
      });
    });
  };
  return JSONApiResponse;
})();
var VoidApiResponse = (function() {
  function VoidApiResponse(raw) {
    this.raw = raw;
  }
  VoidApiResponse.prototype.value = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2, undefined];
      });
    });
  };
  return VoidApiResponse;
})();
var BlobApiResponse = (function() {
  function BlobApiResponse(raw) {
    this.raw = raw;
  }
  BlobApiResponse.prototype.value = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, this.raw.blob()];
          case 1:
            return [2, _a.sent()];
        }
      });
    });
  };
  return BlobApiResponse;
})();
var TextApiResponse = (function() {
  function TextApiResponse(raw) {
    this.raw = raw;
  }
  TextApiResponse.prototype.value = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, this.raw.text()];
          case 1:
            return [2, _a.sent()];
        }
      });
    });
  };
  return TextApiResponse;
})();

function ActionFromJSON(json) {
  return ActionFromJSONTyped(json);
}
function ActionFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    type: !exists(json, "type") ? undefined : json["type"],
    selector: !exists(json, "selector") ? undefined : json["selector"],
    cssSelector: !exists(json, "cssSelector") ? undefined : json["cssSelector"],
    content: !exists(json, "content")
      ? undefined
      : OneOfstringobjectFromJSON(json["content"])
  };
}
function ActionToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    type: value.type,
    selector: value.selector,
    cssSelector: value.cssSelector,
    content: OneOfstringobjectToJSON(value.content)
  };
}

function AddressFromJSON(json) {
  return AddressFromJSONTyped(json);
}
function AddressFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    url: !exists(json, "url") ? undefined : json["url"],
    referringUrl: !exists(json, "referringUrl")
      ? undefined
      : json["referringUrl"]
  };
}
function AddressToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    url: value.url,
    referringUrl: value.referringUrl
  };
}

function AnalyticsPayloadFromJSON(json) {
  return AnalyticsPayloadFromJSONTyped(json);
}
function AnalyticsPayloadFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    pe: !exists(json, "pe") ? undefined : json["pe"],
    tnta: !exists(json, "tnta") ? undefined : json["tnta"]
  };
}
function AnalyticsPayloadToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    pe: value.pe,
    tnta: value.tnta
  };
}

function AnalyticsRequestFromJSON(json) {
  return AnalyticsRequestFromJSONTyped(json);
}
function AnalyticsRequestFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    supplementalDataId: !exists(json, "supplementalDataId")
      ? undefined
      : json["supplementalDataId"],
    logging: !exists(json, "logging")
      ? undefined
      : LoggingTypeFromJSON(json["logging"]),
    trackingServer: !exists(json, "trackingServer")
      ? undefined
      : json["trackingServer"],
    trackingServerSecure: !exists(json, "trackingServerSecure")
      ? undefined
      : json["trackingServerSecure"]
  };
}
function AnalyticsRequestToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    supplementalDataId: value.supplementalDataId,
    logging: LoggingTypeToJSON(value.logging),
    trackingServer: value.trackingServer,
    trackingServerSecure: value.trackingServerSecure
  };
}

function AnalyticsResponseFromJSON(json) {
  return AnalyticsResponseFromJSONTyped(json);
}
function AnalyticsResponseFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    payload: !exists(json, "payload")
      ? undefined
      : AnalyticsPayloadFromJSON(json["payload"])
  };
}
function AnalyticsResponseToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    payload: AnalyticsPayloadToJSON(value.payload)
  };
}

function ApplicationFromJSON(json) {
  return ApplicationFromJSONTyped(json);
}
function ApplicationFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    name: !exists(json, "name") ? undefined : json["name"],
    version: !exists(json, "version") ? undefined : json["version"]
  };
}
function ApplicationToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    version: value.version
  };
}

function AudienceManagerFromJSON(json) {
  return AudienceManagerFromJSONTyped(json);
}
function AudienceManagerFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    locationHint: !exists(json, "locationHint")
      ? undefined
      : json["locationHint"],
    blob: !exists(json, "blob") ? undefined : json["blob"]
  };
}
function AudienceManagerToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    locationHint: value.locationHint,
    blob: value.blob
  };
}

(function(AuthenticatedState) {
  AuthenticatedState["Unknown"] = "unknown";
  AuthenticatedState["Authenticated"] = "authenticated";
  AuthenticatedState["LoggedOut"] = "logged_out";
})(exports.AuthenticatedState || (exports.AuthenticatedState = {}));
function AuthenticatedStateFromJSON(json) {
  return AuthenticatedStateFromJSONTyped(json);
}
function AuthenticatedStateFromJSONTyped(json, ignoreDiscriminator) {
  return json;
}
function AuthenticatedStateToJSON(value) {
  return value;
}

function BrowserFromJSON(json) {
  return BrowserFromJSONTyped(json);
}
function BrowserFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    host: !exists(json, "host") ? undefined : json["host"],
    webGLRenderer: !exists(json, "webGLRenderer")
      ? undefined
      : json["webGLRenderer"]
  };
}
function BrowserToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    host: value.host,
    webGLRenderer: value.webGLRenderer
  };
}

(function(ChannelType) {
  ChannelType["Mobile"] = "mobile";
  ChannelType["Web"] = "web";
})(exports.ChannelType || (exports.ChannelType = {}));
function ChannelTypeFromJSON(json) {
  return ChannelTypeFromJSONTyped(json);
}
function ChannelTypeFromJSONTyped(json, ignoreDiscriminator) {
  return json;
}
function ChannelTypeToJSON(value) {
  return value;
}

function ContextFromJSON(json) {
  return ContextFromJSONTyped(json);
}
function ContextFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    channel: ChannelTypeFromJSON(json["channel"]),
    mobilePlatform: !exists(json, "mobilePlatform")
      ? undefined
      : MobilePlatformFromJSON(json["mobilePlatform"]),
    application: !exists(json, "application")
      ? undefined
      : ApplicationFromJSON(json["application"]),
    screen: !exists(json, "screen")
      ? undefined
      : ScreenFromJSON(json["screen"]),
    window: !exists(json, "window")
      ? undefined
      : WindowFromJSON(json["window"]),
    browser: !exists(json, "browser")
      ? undefined
      : BrowserFromJSON(json["browser"]),
    address: !exists(json, "address")
      ? undefined
      : AddressFromJSON(json["address"]),
    geo: !exists(json, "geo") ? undefined : GeoFromJSON(json["geo"]),
    timeOffsetInMinutes: !exists(json, "timeOffsetInMinutes")
      ? undefined
      : json["timeOffsetInMinutes"],
    userAgent: !exists(json, "userAgent") ? undefined : json["userAgent"],
    beacon: !exists(json, "beacon") ? undefined : json["beacon"]
  };
}
function ContextToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    channel: ChannelTypeToJSON(value.channel),
    mobilePlatform: MobilePlatformToJSON(value.mobilePlatform),
    application: ApplicationToJSON(value.application),
    screen: ScreenToJSON(value.screen),
    window: WindowToJSON(value.window),
    browser: BrowserToJSON(value.browser),
    address: AddressToJSON(value.address),
    geo: GeoToJSON(value.geo),
    timeOffsetInMinutes: value.timeOffsetInMinutes,
    userAgent: value.userAgent,
    beacon: value.beacon
  };
}

function CustomerIdFromJSON(json) {
  return CustomerIdFromJSONTyped(json);
}
function CustomerIdFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    integrationCode: json["integrationCode"],
    authenticatedState: AuthenticatedStateFromJSON(json["authenticatedState"])
  };
}
function CustomerIdToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    integrationCode: value.integrationCode,
    authenticatedState: AuthenticatedStateToJSON(value.authenticatedState)
  };
}

function DeliveryRequestFromJSON(json) {
  return DeliveryRequestFromJSONTyped(json);
}
function DeliveryRequestFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    requestId: !exists(json, "requestId") ? undefined : json["requestId"],
    impressionId: !exists(json, "impressionId")
      ? undefined
      : json["impressionId"],
    id: !exists(json, "id") ? undefined : VisitorIdFromJSON(json["id"]),
    environmentId: !exists(json, "environmentId")
      ? undefined
      : json["environmentId"],
    property: !exists(json, "property")
      ? undefined
      : PropertyFromJSON(json["property"]),
    trace: !exists(json, "trace") ? undefined : TraceFromJSON(json["trace"]),
    context: ContextFromJSON(json["context"]),
    experienceCloud: !exists(json, "experienceCloud")
      ? undefined
      : ExperienceCloudFromJSON(json["experienceCloud"]),
    execute: !exists(json, "execute")
      ? undefined
      : ExecuteRequestFromJSON(json["execute"]),
    prefetch: !exists(json, "prefetch")
      ? undefined
      : PrefetchRequestFromJSON(json["prefetch"]),
    notifications: !exists(json, "notifications")
      ? undefined
      : json["notifications"].map(NotificationFromJSON),
    qaMode: !exists(json, "qaMode") ? undefined : QAModeFromJSON(json["qaMode"])
  };
}
function DeliveryRequestToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    requestId: value.requestId,
    impressionId: value.impressionId,
    id: VisitorIdToJSON(value.id),
    environmentId: value.environmentId,
    property: PropertyToJSON(value.property),
    trace: TraceToJSON(value.trace),
    context: ContextToJSON(value.context),
    experienceCloud: ExperienceCloudToJSON(value.experienceCloud),
    execute: ExecuteRequestToJSON(value.execute),
    prefetch: PrefetchRequestToJSON(value.prefetch),
    notifications:
      value.notifications === undefined
        ? undefined
        : value.notifications.map(NotificationToJSON),
    qaMode: QAModeToJSON(value.qaMode)
  };
}

function DeliveryResponseFromJSON(json) {
  return DeliveryResponseFromJSONTyped(json);
}
function DeliveryResponseFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: !exists(json, "status") ? undefined : json["status"],
    requestId: !exists(json, "requestId") ? undefined : json["requestId"],
    id: !exists(json, "id") ? undefined : VisitorIdFromJSON(json["id"]),
    client: !exists(json, "client") ? undefined : json["client"],
    edgeHost: !exists(json, "edgeHost") ? undefined : json["edgeHost"],
    execute: !exists(json, "execute")
      ? undefined
      : ExecuteResponseFromJSON(json["execute"]),
    prefetch: !exists(json, "prefetch")
      ? undefined
      : PrefetchResponseFromJSON(json["prefetch"])
  };
}
function DeliveryResponseToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    status: value.status,
    requestId: value.requestId,
    id: VisitorIdToJSON(value.id),
    client: value.client,
    edgeHost: value.edgeHost,
    execute: ExecuteResponseToJSON(value.execute),
    prefetch: PrefetchResponseToJSON(value.prefetch)
  };
}

(function(DeviceType) {
  DeviceType["Phone"] = "phone";
  DeviceType["Tablet"] = "tablet";
})(exports.DeviceType || (exports.DeviceType = {}));
function DeviceTypeFromJSON(json) {
  return DeviceTypeFromJSONTyped(json);
}
function DeviceTypeFromJSONTyped(json, ignoreDiscriminator) {
  return json;
}
function DeviceTypeToJSON(value) {
  return value;
}

function ExecuteRequestFromJSON(json) {
  return ExecuteRequestFromJSONTyped(json);
}
function ExecuteRequestFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    pageLoad: !exists(json, "pageLoad")
      ? undefined
      : RequestDetailsFromJSON(json["pageLoad"]),
    mboxes: !exists(json, "mboxes")
      ? undefined
      : json["mboxes"].map(MboxRequestFromJSON)
  };
}
function ExecuteRequestToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    pageLoad: RequestDetailsToJSON(value.pageLoad),
    mboxes:
      value.mboxes === undefined
        ? undefined
        : value.mboxes.map(MboxRequestToJSON)
  };
}

function ExecuteResponseFromJSON(json) {
  return ExecuteResponseFromJSONTyped(json);
}
function ExecuteResponseFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    pageLoad: !exists(json, "pageLoad")
      ? undefined
      : PageLoadResponseFromJSON(json["pageLoad"]),
    mboxes: !exists(json, "mboxes")
      ? undefined
      : json["mboxes"].map(MboxResponseFromJSON)
  };
}
function ExecuteResponseToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    pageLoad: PageLoadResponseToJSON(value.pageLoad),
    mboxes:
      value.mboxes === undefined
        ? undefined
        : value.mboxes.map(MboxResponseToJSON)
  };
}

function ExperienceCloudFromJSON(json) {
  return ExperienceCloudFromJSONTyped(json);
}
function ExperienceCloudFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    audienceManager: !exists(json, "audienceManager")
      ? undefined
      : AudienceManagerFromJSON(json["audienceManager"]),
    analytics: !exists(json, "analytics")
      ? undefined
      : AnalyticsRequestFromJSON(json["analytics"])
  };
}
function ExperienceCloudToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    audienceManager: AudienceManagerToJSON(value.audienceManager),
    analytics: AnalyticsRequestToJSON(value.analytics)
  };
}

function GeoFromJSON(json) {
  return GeoFromJSONTyped(json);
}
function GeoFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    latitude: !exists(json, "latitude") ? undefined : json["latitude"],
    longitude: !exists(json, "longitude") ? undefined : json["longitude"]
  };
}
function GeoToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    latitude: value.latitude,
    longitude: value.longitude
  };
}

(function(LoggingType) {
  LoggingType["ServerSide"] = "server_side";
  LoggingType["ClientSide"] = "client_side";
})(exports.LoggingType || (exports.LoggingType = {}));
function LoggingTypeFromJSON(json) {
  return LoggingTypeFromJSONTyped(json);
}
function LoggingTypeFromJSONTyped(json, ignoreDiscriminator) {
  return json;
}
function LoggingTypeToJSON(value) {
  return value;
}

function MboxRequestFromJSON(json) {
  return MboxRequestFromJSONTyped(json);
}
function MboxRequestFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    address: !exists(json, "address")
      ? undefined
      : AddressFromJSON(json["address"]),
    parameters: !exists(json, "parameters") ? undefined : json["parameters"],
    profileParameters: !exists(json, "profileParameters")
      ? undefined
      : json["profileParameters"],
    order: !exists(json, "order") ? undefined : OrderFromJSON(json["order"]),
    product: !exists(json, "product")
      ? undefined
      : ProductFromJSON(json["product"]),
    index: !exists(json, "index") ? undefined : json["index"],
    name: !exists(json, "name") ? undefined : json["name"]
  };
}
function MboxRequestToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    address: AddressToJSON(value.address),
    parameters: value.parameters,
    profileParameters: value.profileParameters,
    order: OrderToJSON(value.order),
    product: ProductToJSON(value.product),
    index: value.index,
    name: value.name
  };
}

function MboxRequestAllOfFromJSON(json) {
  return MboxRequestAllOfFromJSONTyped(json);
}
function MboxRequestAllOfFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    index: !exists(json, "index") ? undefined : json["index"],
    name: !exists(json, "name") ? undefined : json["name"]
  };
}
function MboxRequestAllOfToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    index: value.index,
    name: value.name
  };
}

function MboxResponseFromJSON(json) {
  return MboxResponseFromJSONTyped(json);
}
function MboxResponseFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    index: !exists(json, "index") ? undefined : json["index"],
    name: !exists(json, "name") ? undefined : json["name"],
    options: !exists(json, "options")
      ? undefined
      : json["options"].map(OptionFromJSON),
    metrics: !exists(json, "metrics")
      ? undefined
      : json["metrics"].map(MetricFromJSON),
    analytics: !exists(json, "analytics")
      ? undefined
      : AnalyticsResponseFromJSON(json["analytics"]),
    trace: !exists(json, "trace") ? undefined : json["trace"]
  };
}
function MboxResponseToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    index: value.index,
    name: value.name,
    options:
      value.options === undefined ? undefined : value.options.map(OptionToJSON),
    metrics:
      value.metrics === undefined ? undefined : value.metrics.map(MetricToJSON),
    analytics: AnalyticsResponseToJSON(value.analytics),
    trace: value.trace
  };
}

function MetricFromJSON(json) {
  return MetricFromJSONTyped(json);
}
function MetricFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    type: !exists(json, "type") ? undefined : MetricTypeFromJSON(json["type"]),
    selector: !exists(json, "selector") ? undefined : json["selector"],
    eventToken: !exists(json, "eventToken") ? undefined : json["eventToken"]
  };
}
function MetricToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    type: MetricTypeToJSON(value.type),
    selector: value.selector,
    eventToken: value.eventToken
  };
}

(function(MetricType) {
  MetricType["Click"] = "click";
  MetricType["Display"] = "display";
})(exports.MetricType || (exports.MetricType = {}));
function MetricTypeFromJSON(json) {
  return MetricTypeFromJSONTyped(json);
}
function MetricTypeFromJSONTyped(json, ignoreDiscriminator) {
  return json;
}
function MetricTypeToJSON(value) {
  return value;
}

function MobilePlatformFromJSON(json) {
  return MobilePlatformFromJSONTyped(json);
}
function MobilePlatformFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    deviceName: !exists(json, "deviceName") ? undefined : json["deviceName"],
    deviceType: DeviceTypeFromJSON(json["deviceType"]),
    platformType: MobilePlatformTypeFromJSON(json["platformType"]),
    version: !exists(json, "version") ? undefined : json["version"]
  };
}
function MobilePlatformToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    deviceName: value.deviceName,
    deviceType: DeviceTypeToJSON(value.deviceType),
    platformType: MobilePlatformTypeToJSON(value.platformType),
    version: value.version
  };
}

(function(MobilePlatformType) {
  MobilePlatformType["Android"] = "android";
  MobilePlatformType["Ios"] = "ios";
})(exports.MobilePlatformType || (exports.MobilePlatformType = {}));
function MobilePlatformTypeFromJSON(json) {
  return MobilePlatformTypeFromJSONTyped(json);
}
function MobilePlatformTypeFromJSONTyped(json, ignoreDiscriminator) {
  return json;
}
function MobilePlatformTypeToJSON(value) {
  return value;
}

function NotificationFromJSON(json) {
  return NotificationFromJSONTyped(json);
}
function NotificationFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    address: !exists(json, "address")
      ? undefined
      : AddressFromJSON(json["address"]),
    parameters: !exists(json, "parameters") ? undefined : json["parameters"],
    profileParameters: !exists(json, "profileParameters")
      ? undefined
      : json["profileParameters"],
    order: !exists(json, "order") ? undefined : OrderFromJSON(json["order"]),
    product: !exists(json, "product")
      ? undefined
      : ProductFromJSON(json["product"]),
    id: !exists(json, "id") ? undefined : json["id"],
    impressionId: !exists(json, "impressionId")
      ? undefined
      : json["impressionId"],
    type: !exists(json, "type") ? undefined : MetricTypeFromJSON(json["type"]),
    timestamp: !exists(json, "timestamp") ? undefined : json["timestamp"],
    tokens: !exists(json, "tokens") ? undefined : json["tokens"],
    mbox: !exists(json, "mbox")
      ? undefined
      : NotificationMboxFromJSON(json["mbox"]),
    view: !exists(json, "view")
      ? undefined
      : NotificationViewFromJSON(json["view"]),
    pageLoad: !exists(json, "pageLoad")
      ? undefined
      : NotificationPageLoadFromJSON(json["pageLoad"])
  };
}
function NotificationToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    address: AddressToJSON(value.address),
    parameters: value.parameters,
    profileParameters: value.profileParameters,
    order: OrderToJSON(value.order),
    product: ProductToJSON(value.product),
    id: value.id,
    impressionId: value.impressionId,
    type: MetricTypeToJSON(value.type),
    timestamp: value.timestamp,
    tokens: value.tokens,
    mbox: NotificationMboxToJSON(value.mbox),
    view: NotificationViewToJSON(value.view),
    pageLoad: NotificationPageLoadToJSON(value.pageLoad)
  };
}

function NotificationAllOfFromJSON(json) {
  return NotificationAllOfFromJSONTyped(json);
}
function NotificationAllOfFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    impressionId: !exists(json, "impressionId")
      ? undefined
      : json["impressionId"],
    type: !exists(json, "type") ? undefined : MetricTypeFromJSON(json["type"]),
    timestamp: !exists(json, "timestamp") ? undefined : json["timestamp"],
    tokens: !exists(json, "tokens") ? undefined : json["tokens"],
    mbox: !exists(json, "mbox")
      ? undefined
      : NotificationMboxFromJSON(json["mbox"]),
    view: !exists(json, "view")
      ? undefined
      : NotificationViewFromJSON(json["view"]),
    pageLoad: !exists(json, "pageLoad")
      ? undefined
      : NotificationPageLoadFromJSON(json["pageLoad"])
  };
}
function NotificationAllOfToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    impressionId: value.impressionId,
    type: MetricTypeToJSON(value.type),
    timestamp: value.timestamp,
    tokens: value.tokens,
    mbox: NotificationMboxToJSON(value.mbox),
    view: NotificationViewToJSON(value.view),
    pageLoad: NotificationPageLoadToJSON(value.pageLoad)
  };
}

function NotificationMboxFromJSON(json) {
  return NotificationMboxFromJSONTyped(json);
}
function NotificationMboxFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, "name") ? undefined : json["name"],
    state: !exists(json, "state") ? undefined : json["state"]
  };
}
function NotificationMboxToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    state: value.state
  };
}

function NotificationPageLoadFromJSON(json) {
  return NotificationPageLoadFromJSONTyped(json);
}
function NotificationPageLoadFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    state: !exists(json, "state") ? undefined : json["state"]
  };
}
function NotificationPageLoadToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    state: value.state
  };
}

function NotificationViewFromJSON(json) {
  return NotificationViewFromJSONTyped(json);
}
function NotificationViewFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, "name") ? undefined : json["name"],
    key: !exists(json, "key") ? undefined : json["key"],
    state: !exists(json, "state") ? undefined : json["state"]
  };
}
function NotificationViewToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    key: value.key,
    state: value.state
  };
}

function OptionFromJSON(json) {
  return OptionFromJSONTyped(json);
}
function OptionFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    type: !exists(json, "type") ? undefined : OptionTypeFromJSON(json["type"]),
    content: !exists(json, "content")
      ? undefined
      : OneOfstringobjectarrayFromJSON(json["content"]),
    eventToken: !exists(json, "eventToken") ? undefined : json["eventToken"],
    responseTokens: !exists(json, "responseTokens")
      ? undefined
      : json["responseTokens"]
  };
}
function OptionToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    type: OptionTypeToJSON(value.type),
    content: OneOfstringobjectarrayToJSON(value.content),
    eventToken: value.eventToken,
    responseTokens: value.responseTokens
  };
}

(function(OptionType) {
  OptionType["Html"] = "html";
  OptionType["Json"] = "json";
  OptionType["Redirect"] = "redirect";
  OptionType["Dynamic"] = "dynamic";
  OptionType["Actions"] = "actions";
})(exports.OptionType || (exports.OptionType = {}));
function OptionTypeFromJSON(json) {
  return OptionTypeFromJSONTyped(json);
}
function OptionTypeFromJSONTyped(json, ignoreDiscriminator) {
  return json;
}
function OptionTypeToJSON(value) {
  return value;
}

function OrderFromJSON(json) {
  return OrderFromJSONTyped(json);
}
function OrderFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    total: !exists(json, "total") ? undefined : json["total"],
    purchasedProductIds: !exists(json, "purchasedProductIds")
      ? undefined
      : json["purchasedProductIds"],
    time: !exists(json, "time") ? undefined : DateTimeFromJSON(json["time"]),
    experienceLocalId: !exists(json, "experienceLocalId")
      ? undefined
      : json["experienceLocalId"],
    duplicate: !exists(json, "duplicate") ? undefined : json["duplicate"],
    outlier: !exists(json, "outlier") ? undefined : json["outlier"]
  };
}
function OrderToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    total: value.total,
    purchasedProductIds: value.purchasedProductIds,
    time: DateTimeToJSON(value.time),
    experienceLocalId: value.experienceLocalId,
    duplicate: value.duplicate,
    outlier: value.outlier
  };
}

function PageLoadResponseFromJSON(json) {
  return PageLoadResponseFromJSONTyped(json);
}
function PageLoadResponseFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    options: !exists(json, "options")
      ? undefined
      : json["options"].map(OptionFromJSON),
    metrics: !exists(json, "metrics")
      ? undefined
      : json["metrics"].map(MetricFromJSON),
    analytics: !exists(json, "analytics")
      ? undefined
      : AnalyticsResponseFromJSON(json["analytics"]),
    state: !exists(json, "state") ? undefined : json["state"],
    trace: !exists(json, "trace") ? undefined : json["trace"]
  };
}
function PageLoadResponseToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    options:
      value.options === undefined ? undefined : value.options.map(OptionToJSON),
    metrics:
      value.metrics === undefined ? undefined : value.metrics.map(MetricToJSON),
    analytics: AnalyticsResponseToJSON(value.analytics),
    state: value.state,
    trace: value.trace
  };
}

function PrefetchMboxResponseFromJSON(json) {
  return PrefetchMboxResponseFromJSONTyped(json);
}
function PrefetchMboxResponseFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    index: !exists(json, "index") ? undefined : json["index"],
    name: !exists(json, "name") ? undefined : json["name"],
    options: !exists(json, "options")
      ? undefined
      : json["options"].map(OptionFromJSON),
    metrics: !exists(json, "metrics")
      ? undefined
      : json["metrics"].map(MetricFromJSON),
    analytics: !exists(json, "analytics")
      ? undefined
      : AnalyticsResponseFromJSON(json["analytics"]),
    trace: !exists(json, "trace") ? undefined : json["trace"],
    state: !exists(json, "state") ? undefined : json["state"]
  };
}
function PrefetchMboxResponseToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    index: value.index,
    name: value.name,
    options:
      value.options === undefined ? undefined : value.options.map(OptionToJSON),
    metrics:
      value.metrics === undefined ? undefined : value.metrics.map(MetricToJSON),
    analytics: AnalyticsResponseToJSON(value.analytics),
    trace: value.trace,
    state: value.state
  };
}

function PrefetchMboxResponseAllOfFromJSON(json) {
  return PrefetchMboxResponseAllOfFromJSONTyped(json);
}
function PrefetchMboxResponseAllOfFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    state: !exists(json, "state") ? undefined : json["state"]
  };
}
function PrefetchMboxResponseAllOfToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    state: value.state
  };
}

function PrefetchRequestFromJSON(json) {
  return PrefetchRequestFromJSONTyped(json);
}
function PrefetchRequestFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    views: !exists(json, "views")
      ? undefined
      : json["views"].map(ViewRequestFromJSON),
    pageLoad: !exists(json, "pageLoad")
      ? undefined
      : RequestDetailsFromJSON(json["pageLoad"]),
    mboxes: !exists(json, "mboxes")
      ? undefined
      : json["mboxes"].map(MboxRequestFromJSON)
  };
}
function PrefetchRequestToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    views:
      value.views === undefined
        ? undefined
        : value.views.map(ViewRequestToJSON),
    pageLoad: RequestDetailsToJSON(value.pageLoad),
    mboxes:
      value.mboxes === undefined
        ? undefined
        : value.mboxes.map(MboxRequestToJSON)
  };
}

function PrefetchResponseFromJSON(json) {
  return PrefetchResponseFromJSONTyped(json);
}
function PrefetchResponseFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    views: !exists(json, "views") ? undefined : json["views"].map(ViewFromJSON),
    pageLoad: !exists(json, "pageLoad")
      ? undefined
      : PageLoadResponseFromJSON(json["pageLoad"]),
    mboxes: !exists(json, "mboxes")
      ? undefined
      : json["mboxes"].map(PrefetchMboxResponseFromJSON),
    metrics: !exists(json, "metrics")
      ? undefined
      : json["metrics"].map(MetricFromJSON)
  };
}
function PrefetchResponseToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    views: value.views === undefined ? undefined : value.views.map(ViewToJSON),
    pageLoad: PageLoadResponseToJSON(value.pageLoad),
    mboxes:
      value.mboxes === undefined
        ? undefined
        : value.mboxes.map(PrefetchMboxResponseToJSON),
    metrics:
      value.metrics === undefined ? undefined : value.metrics.map(MetricToJSON)
  };
}

function ProductFromJSON(json) {
  return ProductFromJSONTyped(json);
}
function ProductFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    categoryId: !exists(json, "categoryId") ? undefined : json["categoryId"]
  };
}
function ProductToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    categoryId: value.categoryId
  };
}

function PropertyFromJSON(json) {
  return PropertyFromJSONTyped(json);
}
function PropertyFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    token: json["token"]
  };
}
function PropertyToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    token: value.token
  };
}

function QAModeFromJSON(json) {
  return QAModeFromJSONTyped(json);
}
function QAModeFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    token: !exists(json, "token") ? undefined : json["token"],
    listedActivitiesOnly: !exists(json, "listedActivitiesOnly")
      ? undefined
      : json["listedActivitiesOnly"],
    evaluateAsTrueAudienceIds: !exists(json, "evaluateAsTrueAudienceIds")
      ? undefined
      : json["evaluateAsTrueAudienceIds"],
    evaluateAsFalseAudienceIds: !exists(json, "evaluateAsFalseAudienceIds")
      ? undefined
      : json["evaluateAsFalseAudienceIds"],
    previewIndexes: !exists(json, "previewIndexes")
      ? undefined
      : json["previewIndexes"].map(QAModePreviewIndexFromJSON)
  };
}
function QAModeToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    token: value.token,
    listedActivitiesOnly: value.listedActivitiesOnly,
    evaluateAsTrueAudienceIds: value.evaluateAsTrueAudienceIds,
    evaluateAsFalseAudienceIds: value.evaluateAsFalseAudienceIds,
    previewIndexes:
      value.previewIndexes === undefined
        ? undefined
        : value.previewIndexes.map(QAModePreviewIndexToJSON)
  };
}

function QAModePreviewIndexFromJSON(json) {
  return QAModePreviewIndexFromJSONTyped(json);
}
function QAModePreviewIndexFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    activityIndex: !exists(json, "activityIndex")
      ? undefined
      : json["activityIndex"],
    experienceIndex: !exists(json, "experienceIndex")
      ? undefined
      : json["experienceIndex"]
  };
}
function QAModePreviewIndexToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    activityIndex: value.activityIndex,
    experienceIndex: value.experienceIndex
  };
}

function RequestDetailsFromJSON(json) {
  return RequestDetailsFromJSONTyped(json);
}
function RequestDetailsFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    address: !exists(json, "address")
      ? undefined
      : AddressFromJSON(json["address"]),
    parameters: !exists(json, "parameters") ? undefined : json["parameters"],
    profileParameters: !exists(json, "profileParameters")
      ? undefined
      : json["profileParameters"],
    order: !exists(json, "order") ? undefined : OrderFromJSON(json["order"]),
    product: !exists(json, "product")
      ? undefined
      : ProductFromJSON(json["product"])
  };
}
function RequestDetailsToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    address: AddressToJSON(value.address),
    parameters: value.parameters,
    profileParameters: value.profileParameters,
    order: OrderToJSON(value.order),
    product: ProductToJSON(value.product)
  };
}

function ScreenFromJSON(json) {
  return ScreenFromJSONTyped(json);
}
function ScreenFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    width: !exists(json, "width") ? undefined : json["width"],
    height: !exists(json, "height") ? undefined : json["height"],
    colorDepth: !exists(json, "colorDepth") ? undefined : json["colorDepth"],
    pixelRatio: !exists(json, "pixelRatio") ? undefined : json["pixelRatio"],
    orientation: !exists(json, "orientation")
      ? undefined
      : ScreenOrientationTypeFromJSON(json["orientation"])
  };
}
function ScreenToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    width: value.width,
    height: value.height,
    colorDepth: value.colorDepth,
    pixelRatio: value.pixelRatio,
    orientation: ScreenOrientationTypeToJSON(value.orientation)
  };
}

(function(ScreenOrientationType) {
  ScreenOrientationType["Portrait"] = "portrait";
  ScreenOrientationType["Landscape"] = "landscape";
})(exports.ScreenOrientationType || (exports.ScreenOrientationType = {}));
function ScreenOrientationTypeFromJSON(json) {
  return ScreenOrientationTypeFromJSONTyped(json);
}
function ScreenOrientationTypeFromJSONTyped(json, ignoreDiscriminator) {
  return json;
}
function ScreenOrientationTypeToJSON(value) {
  return value;
}

function TraceFromJSON(json) {
  return TraceFromJSONTyped(json);
}
function TraceFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    authorizationToken: json["authorizationToken"],
    usage: !exists(json, "usage") ? undefined : json["usage"]
  };
}
function TraceToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    authorizationToken: value.authorizationToken,
    usage: value.usage
  };
}

function UnexpectedErrorFromJSON(json) {
  return UnexpectedErrorFromJSONTyped(json);
}
function UnexpectedErrorFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: json["status"],
    message: json["message"]
  };
}
function UnexpectedErrorToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    status: value.status,
    message: value.message
  };
}

function ViewFromJSON(json) {
  return ViewFromJSONTyped(json);
}
function ViewFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, "name") ? undefined : json["name"],
    key: !exists(json, "key") ? undefined : json["key"],
    options: !exists(json, "options")
      ? undefined
      : json["options"].map(OptionFromJSON),
    metrics: !exists(json, "metrics")
      ? undefined
      : json["metrics"].map(MetricFromJSON),
    analytics: !exists(json, "analytics")
      ? undefined
      : AnalyticsResponseFromJSON(json["analytics"]),
    state: !exists(json, "state") ? undefined : json["state"],
    trace: !exists(json, "trace") ? undefined : json["trace"]
  };
}
function ViewToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    key: value.key,
    options:
      value.options === undefined ? undefined : value.options.map(OptionToJSON),
    metrics:
      value.metrics === undefined ? undefined : value.metrics.map(MetricToJSON),
    analytics: AnalyticsResponseToJSON(value.analytics),
    state: value.state,
    trace: value.trace
  };
}

function ViewRequestFromJSON(json) {
  return ViewRequestFromJSONTyped(json);
}
function ViewRequestFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    address: !exists(json, "address")
      ? undefined
      : AddressFromJSON(json["address"]),
    parameters: !exists(json, "parameters") ? undefined : json["parameters"],
    profileParameters: !exists(json, "profileParameters")
      ? undefined
      : json["profileParameters"],
    order: !exists(json, "order") ? undefined : OrderFromJSON(json["order"]),
    product: !exists(json, "product")
      ? undefined
      : ProductFromJSON(json["product"]),
    name: !exists(json, "name") ? undefined : json["name"],
    key: !exists(json, "key") ? undefined : json["key"]
  };
}
function ViewRequestToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    address: AddressToJSON(value.address),
    parameters: value.parameters,
    profileParameters: value.profileParameters,
    order: OrderToJSON(value.order),
    product: ProductToJSON(value.product),
    name: value.name,
    key: value.key
  };
}

function ViewRequestAllOfFromJSON(json) {
  return ViewRequestAllOfFromJSONTyped(json);
}
function ViewRequestAllOfFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, "name") ? undefined : json["name"],
    key: !exists(json, "key") ? undefined : json["key"]
  };
}
function ViewRequestAllOfToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    key: value.key
  };
}

function VisitorIdFromJSON(json) {
  return VisitorIdFromJSONTyped(json);
}
function VisitorIdFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    tntId: !exists(json, "tntId") ? undefined : json["tntId"],
    thirdPartyId: !exists(json, "thirdPartyId")
      ? undefined
      : json["thirdPartyId"],
    marketingCloudVisitorId: !exists(json, "marketingCloudVisitorId")
      ? undefined
      : json["marketingCloudVisitorId"],
    customerIds: !exists(json, "customerIds")
      ? undefined
      : json["customerIds"].map(CustomerIdFromJSON)
  };
}
function VisitorIdToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    tntId: value.tntId,
    thirdPartyId: value.thirdPartyId,
    marketingCloudVisitorId: value.marketingCloudVisitorId,
    customerIds:
      value.customerIds === undefined
        ? undefined
        : value.customerIds.map(CustomerIdToJSON)
  };
}

function WindowFromJSON(json) {
  return WindowFromJSONTyped(json);
}
function WindowFromJSONTyped(json, ignoreDiscriminator) {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    width: !exists(json, "width") ? undefined : json["width"],
    height: !exists(json, "height") ? undefined : json["height"]
  };
}
function WindowToJSON(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    width: value.width,
    height: value.height
  };
}

function DateTimeFromJSON(value) {
  return new Date(value);
}
function DateTimeFromJSONTyped(value, ignoreDiscriminator) {
  return new Date(value);
}
function DateTimeToJSON(value) {
  return value != null && typeof value !== "undefined"
    ? value.toISOString()
    : "";
}

function OneOfstringobjectFromJSON(value) {
  return value;
}
function OneOfstringobjectFromJSONTyped(value, ignoreDiscriminator) {
  return value;
}
function OneOfstringobjectToJSON(value) {
  return value;
}
function OneOfstringobjectarrayFromJSON(value) {
  return value;
}
function OneOfstringobjectarrayFromJSONTyped(value, ignoreDiscriminator) {
  return value;
}
function OneOfstringobjectarrayToJSON(value) {
  return value;
}

var DeliveryAPIApi = (function(_super) {
  __extends(DeliveryAPIApi, _super);
  function DeliveryAPIApi() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  DeliveryAPIApi.prototype.executeRaw = function(requestParameters) {
    return __awaiter(this, void 0, void 0, function() {
      var queryParameters, headerParameters, response;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (
              requestParameters.client === null ||
              requestParameters.client === undefined
            ) {
              throw new RequiredError(
                "client",
                "Required parameter requestParameters.client was null or undefined when calling execute."
              );
            }
            if (
              requestParameters.sessionId === null ||
              requestParameters.sessionId === undefined
            ) {
              throw new RequiredError(
                "sessionId",
                "Required parameter requestParameters.sessionId was null or undefined when calling execute."
              );
            }
            if (
              requestParameters.deliveryRequest === null ||
              requestParameters.deliveryRequest === undefined
            ) {
              throw new RequiredError(
                "deliveryRequest",
                "Required parameter requestParameters.deliveryRequest was null or undefined when calling execute."
              );
            }
            queryParameters = {};
            if (requestParameters.client !== undefined) {
              queryParameters["client"] = requestParameters.client;
            }
            if (requestParameters.sessionId !== undefined) {
              queryParameters["sessionId"] = requestParameters.sessionId;
            }
            if (requestParameters.version !== undefined) {
              queryParameters["version"] = requestParameters.version;
            }
            headerParameters = {};
            headerParameters["Content-Type"] = "application/json";
            return [
              4,
              this.request({
                path: "/rest/v1/delivery",
                method: "POST",
                headers: headerParameters,
                query: queryParameters,
                body: DeliveryRequestToJSON(requestParameters.deliveryRequest)
              })
            ];
          case 1:
            response = _a.sent();
            return [
              2,
              new JSONApiResponse(response, function(jsonValue) {
                return DeliveryResponseFromJSON(jsonValue);
              })
            ];
        }
      });
    });
  };
  DeliveryAPIApi.prototype.execute = function(
    client,
    sessionId,
    deliveryRequest,
    version
  ) {
    return __awaiter(this, void 0, void 0, function() {
      var response;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              this.executeRaw({
                client: client,
                sessionId: sessionId,
                deliveryRequest: deliveryRequest,
                version: version
              })
            ];
          case 1:
            response = _a.sent();
            return [4, response.value()];
          case 2:
            return [2, _a.sent()];
        }
      });
    });
  };
  return DeliveryAPIApi;
})(BaseAPI);

exports.ActionFromJSON = ActionFromJSON;
exports.ActionFromJSONTyped = ActionFromJSONTyped;
exports.ActionToJSON = ActionToJSON;
exports.AddressFromJSON = AddressFromJSON;
exports.AddressFromJSONTyped = AddressFromJSONTyped;
exports.AddressToJSON = AddressToJSON;
exports.AnalyticsPayloadFromJSON = AnalyticsPayloadFromJSON;
exports.AnalyticsPayloadFromJSONTyped = AnalyticsPayloadFromJSONTyped;
exports.AnalyticsPayloadToJSON = AnalyticsPayloadToJSON;
exports.AnalyticsRequestFromJSON = AnalyticsRequestFromJSON;
exports.AnalyticsRequestFromJSONTyped = AnalyticsRequestFromJSONTyped;
exports.AnalyticsRequestToJSON = AnalyticsRequestToJSON;
exports.AnalyticsResponseFromJSON = AnalyticsResponseFromJSON;
exports.AnalyticsResponseFromJSONTyped = AnalyticsResponseFromJSONTyped;
exports.AnalyticsResponseToJSON = AnalyticsResponseToJSON;
exports.ApplicationFromJSON = ApplicationFromJSON;
exports.ApplicationFromJSONTyped = ApplicationFromJSONTyped;
exports.ApplicationToJSON = ApplicationToJSON;
exports.AudienceManagerFromJSON = AudienceManagerFromJSON;
exports.AudienceManagerFromJSONTyped = AudienceManagerFromJSONTyped;
exports.AudienceManagerToJSON = AudienceManagerToJSON;
exports.AuthenticatedStateFromJSON = AuthenticatedStateFromJSON;
exports.AuthenticatedStateFromJSONTyped = AuthenticatedStateFromJSONTyped;
exports.AuthenticatedStateToJSON = AuthenticatedStateToJSON;
exports.BASE_PATH = BASE_PATH;
exports.BaseAPI = BaseAPI;
exports.BlobApiResponse = BlobApiResponse;
exports.BrowserFromJSON = BrowserFromJSON;
exports.BrowserFromJSONTyped = BrowserFromJSONTyped;
exports.BrowserToJSON = BrowserToJSON;
exports.COLLECTION_FORMATS = COLLECTION_FORMATS;
exports.ChannelTypeFromJSON = ChannelTypeFromJSON;
exports.ChannelTypeFromJSONTyped = ChannelTypeFromJSONTyped;
exports.ChannelTypeToJSON = ChannelTypeToJSON;
exports.Configuration = Configuration;
exports.ContextFromJSON = ContextFromJSON;
exports.ContextFromJSONTyped = ContextFromJSONTyped;
exports.ContextToJSON = ContextToJSON;
exports.CustomerIdFromJSON = CustomerIdFromJSON;
exports.CustomerIdFromJSONTyped = CustomerIdFromJSONTyped;
exports.CustomerIdToJSON = CustomerIdToJSON;
exports.DateTimeFromJSON = DateTimeFromJSON;
exports.DateTimeFromJSONTyped = DateTimeFromJSONTyped;
exports.DateTimeToJSON = DateTimeToJSON;
exports.DeliveryAPIApi = DeliveryAPIApi;
exports.DeliveryRequestFromJSON = DeliveryRequestFromJSON;
exports.DeliveryRequestFromJSONTyped = DeliveryRequestFromJSONTyped;
exports.DeliveryRequestToJSON = DeliveryRequestToJSON;
exports.DeliveryResponseFromJSON = DeliveryResponseFromJSON;
exports.DeliveryResponseFromJSONTyped = DeliveryResponseFromJSONTyped;
exports.DeliveryResponseToJSON = DeliveryResponseToJSON;
exports.DeviceTypeFromJSON = DeviceTypeFromJSON;
exports.DeviceTypeFromJSONTyped = DeviceTypeFromJSONTyped;
exports.DeviceTypeToJSON = DeviceTypeToJSON;
exports.ExecuteRequestFromJSON = ExecuteRequestFromJSON;
exports.ExecuteRequestFromJSONTyped = ExecuteRequestFromJSONTyped;
exports.ExecuteRequestToJSON = ExecuteRequestToJSON;
exports.ExecuteResponseFromJSON = ExecuteResponseFromJSON;
exports.ExecuteResponseFromJSONTyped = ExecuteResponseFromJSONTyped;
exports.ExecuteResponseToJSON = ExecuteResponseToJSON;
exports.ExperienceCloudFromJSON = ExperienceCloudFromJSON;
exports.ExperienceCloudFromJSONTyped = ExperienceCloudFromJSONTyped;
exports.ExperienceCloudToJSON = ExperienceCloudToJSON;
exports.GeoFromJSON = GeoFromJSON;
exports.GeoFromJSONTyped = GeoFromJSONTyped;
exports.GeoToJSON = GeoToJSON;
exports.JSONApiResponse = JSONApiResponse;
exports.LoggingTypeFromJSON = LoggingTypeFromJSON;
exports.LoggingTypeFromJSONTyped = LoggingTypeFromJSONTyped;
exports.LoggingTypeToJSON = LoggingTypeToJSON;
exports.MboxRequestAllOfFromJSON = MboxRequestAllOfFromJSON;
exports.MboxRequestAllOfFromJSONTyped = MboxRequestAllOfFromJSONTyped;
exports.MboxRequestAllOfToJSON = MboxRequestAllOfToJSON;
exports.MboxRequestFromJSON = MboxRequestFromJSON;
exports.MboxRequestFromJSONTyped = MboxRequestFromJSONTyped;
exports.MboxRequestToJSON = MboxRequestToJSON;
exports.MboxResponseFromJSON = MboxResponseFromJSON;
exports.MboxResponseFromJSONTyped = MboxResponseFromJSONTyped;
exports.MboxResponseToJSON = MboxResponseToJSON;
exports.MetricFromJSON = MetricFromJSON;
exports.MetricFromJSONTyped = MetricFromJSONTyped;
exports.MetricToJSON = MetricToJSON;
exports.MetricTypeFromJSON = MetricTypeFromJSON;
exports.MetricTypeFromJSONTyped = MetricTypeFromJSONTyped;
exports.MetricTypeToJSON = MetricTypeToJSON;
exports.MobilePlatformFromJSON = MobilePlatformFromJSON;
exports.MobilePlatformFromJSONTyped = MobilePlatformFromJSONTyped;
exports.MobilePlatformToJSON = MobilePlatformToJSON;
exports.MobilePlatformTypeFromJSON = MobilePlatformTypeFromJSON;
exports.MobilePlatformTypeFromJSONTyped = MobilePlatformTypeFromJSONTyped;
exports.MobilePlatformTypeToJSON = MobilePlatformTypeToJSON;
exports.NotificationAllOfFromJSON = NotificationAllOfFromJSON;
exports.NotificationAllOfFromJSONTyped = NotificationAllOfFromJSONTyped;
exports.NotificationAllOfToJSON = NotificationAllOfToJSON;
exports.NotificationFromJSON = NotificationFromJSON;
exports.NotificationFromJSONTyped = NotificationFromJSONTyped;
exports.NotificationMboxFromJSON = NotificationMboxFromJSON;
exports.NotificationMboxFromJSONTyped = NotificationMboxFromJSONTyped;
exports.NotificationMboxToJSON = NotificationMboxToJSON;
exports.NotificationPageLoadFromJSON = NotificationPageLoadFromJSON;
exports.NotificationPageLoadFromJSONTyped = NotificationPageLoadFromJSONTyped;
exports.NotificationPageLoadToJSON = NotificationPageLoadToJSON;
exports.NotificationToJSON = NotificationToJSON;
exports.NotificationViewFromJSON = NotificationViewFromJSON;
exports.NotificationViewFromJSONTyped = NotificationViewFromJSONTyped;
exports.NotificationViewToJSON = NotificationViewToJSON;
exports.OneOfstringobjectFromJSON = OneOfstringobjectFromJSON;
exports.OneOfstringobjectFromJSONTyped = OneOfstringobjectFromJSONTyped;
exports.OneOfstringobjectToJSON = OneOfstringobjectToJSON;
exports.OneOfstringobjectarrayFromJSON = OneOfstringobjectarrayFromJSON;
exports.OneOfstringobjectarrayFromJSONTyped = OneOfstringobjectarrayFromJSONTyped;
exports.OneOfstringobjectarrayToJSON = OneOfstringobjectarrayToJSON;
exports.OptionFromJSON = OptionFromJSON;
exports.OptionFromJSONTyped = OptionFromJSONTyped;
exports.OptionToJSON = OptionToJSON;
exports.OptionTypeFromJSON = OptionTypeFromJSON;
exports.OptionTypeFromJSONTyped = OptionTypeFromJSONTyped;
exports.OptionTypeToJSON = OptionTypeToJSON;
exports.OrderFromJSON = OrderFromJSON;
exports.OrderFromJSONTyped = OrderFromJSONTyped;
exports.OrderToJSON = OrderToJSON;
exports.PageLoadResponseFromJSON = PageLoadResponseFromJSON;
exports.PageLoadResponseFromJSONTyped = PageLoadResponseFromJSONTyped;
exports.PageLoadResponseToJSON = PageLoadResponseToJSON;
exports.PrefetchMboxResponseAllOfFromJSON = PrefetchMboxResponseAllOfFromJSON;
exports.PrefetchMboxResponseAllOfFromJSONTyped = PrefetchMboxResponseAllOfFromJSONTyped;
exports.PrefetchMboxResponseAllOfToJSON = PrefetchMboxResponseAllOfToJSON;
exports.PrefetchMboxResponseFromJSON = PrefetchMboxResponseFromJSON;
exports.PrefetchMboxResponseFromJSONTyped = PrefetchMboxResponseFromJSONTyped;
exports.PrefetchMboxResponseToJSON = PrefetchMboxResponseToJSON;
exports.PrefetchRequestFromJSON = PrefetchRequestFromJSON;
exports.PrefetchRequestFromJSONTyped = PrefetchRequestFromJSONTyped;
exports.PrefetchRequestToJSON = PrefetchRequestToJSON;
exports.PrefetchResponseFromJSON = PrefetchResponseFromJSON;
exports.PrefetchResponseFromJSONTyped = PrefetchResponseFromJSONTyped;
exports.PrefetchResponseToJSON = PrefetchResponseToJSON;
exports.ProductFromJSON = ProductFromJSON;
exports.ProductFromJSONTyped = ProductFromJSONTyped;
exports.ProductToJSON = ProductToJSON;
exports.PropertyFromJSON = PropertyFromJSON;
exports.PropertyFromJSONTyped = PropertyFromJSONTyped;
exports.PropertyToJSON = PropertyToJSON;
exports.QAModeFromJSON = QAModeFromJSON;
exports.QAModeFromJSONTyped = QAModeFromJSONTyped;
exports.QAModePreviewIndexFromJSON = QAModePreviewIndexFromJSON;
exports.QAModePreviewIndexFromJSONTyped = QAModePreviewIndexFromJSONTyped;
exports.QAModePreviewIndexToJSON = QAModePreviewIndexToJSON;
exports.QAModeToJSON = QAModeToJSON;
exports.RequestDetailsFromJSON = RequestDetailsFromJSON;
exports.RequestDetailsFromJSONTyped = RequestDetailsFromJSONTyped;
exports.RequestDetailsToJSON = RequestDetailsToJSON;
exports.RequiredError = RequiredError;
exports.ScreenFromJSON = ScreenFromJSON;
exports.ScreenFromJSONTyped = ScreenFromJSONTyped;
exports.ScreenOrientationTypeFromJSON = ScreenOrientationTypeFromJSON;
exports.ScreenOrientationTypeFromJSONTyped = ScreenOrientationTypeFromJSONTyped;
exports.ScreenOrientationTypeToJSON = ScreenOrientationTypeToJSON;
exports.ScreenToJSON = ScreenToJSON;
exports.TextApiResponse = TextApiResponse;
exports.TraceFromJSON = TraceFromJSON;
exports.TraceFromJSONTyped = TraceFromJSONTyped;
exports.TraceToJSON = TraceToJSON;
exports.UnexpectedErrorFromJSON = UnexpectedErrorFromJSON;
exports.UnexpectedErrorFromJSONTyped = UnexpectedErrorFromJSONTyped;
exports.UnexpectedErrorToJSON = UnexpectedErrorToJSON;
exports.ViewFromJSON = ViewFromJSON;
exports.ViewFromJSONTyped = ViewFromJSONTyped;
exports.ViewRequestAllOfFromJSON = ViewRequestAllOfFromJSON;
exports.ViewRequestAllOfFromJSONTyped = ViewRequestAllOfFromJSONTyped;
exports.ViewRequestAllOfToJSON = ViewRequestAllOfToJSON;
exports.ViewRequestFromJSON = ViewRequestFromJSON;
exports.ViewRequestFromJSONTyped = ViewRequestFromJSONTyped;
exports.ViewRequestToJSON = ViewRequestToJSON;
exports.ViewToJSON = ViewToJSON;
exports.VisitorIdFromJSON = VisitorIdFromJSON;
exports.VisitorIdFromJSONTyped = VisitorIdFromJSONTyped;
exports.VisitorIdToJSON = VisitorIdToJSON;
exports.VoidApiResponse = VoidApiResponse;
exports.WindowFromJSON = WindowFromJSON;
exports.WindowFromJSONTyped = WindowFromJSONTyped;
exports.WindowToJSON = WindowToJSON;
exports.canConsumeForm = canConsumeForm;
exports.exists = exists;
exports.mapValues = mapValues;
exports.querystring = querystring;
//# sourceMappingURL=index.js.map
