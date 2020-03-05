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

const TargetTools = require("@adobe/target-tools");
const { EXECUTION_MODE } = require("./enums");
const api = require("../generated-delivery-api-client");
const Messages = require("./messages");
const { executeSendBeacon, isBeaconSupported } = require("./utils");
const { MBOX_INVALID, NOTIFICATION_INVALID } = require("./messages");

const {
  AuthenticatedState,
  Configuration,
  ChannelType,
  LoggingType,
  MetricType,
  DeliveryAPIApi
} = api;
const {
  createTargetCookie,
  DEVICE_ID_COOKIE,
  LOCATION_HINT_COOKIE,
  SESSION_ID_COOKIE
} = require("./cookies");
const { version } = require("../package");
const {
  isObject,
  isNumber,
  isNonEmptyObject,
  isEmptyObject,
  isNonEmptyString,
  isEmptyString,
  isNonEmptyArray,
  isEmptyArray,
  removeEmptyKeys,
  flatten,
  getTimezoneOffset
} = require("./utils");

const SCHEME = {
  HTTP: "http://",
  HTTPS: "https://"
};
const AUTH_STATE = {
  0: AuthenticatedState.Unknown,
  1: AuthenticatedState.Authenticated,
  2: AuthenticatedState.LoggedOut
};
const DEFAULT_GLOBAL_MBOX = "target-global-mbox";
const EDGE_CLUSTER_PREFIX = "mboxedge";
const HOST = "tt.omtrdc.net";
const SESSION_ID_MAX_AGE = 1860;
const DEVICE_ID_MAX_AGE = 63244800;
const LOCATION_HINT_MAX_AGE = 1860;

function extractClusterFromDeviceId(id) {
  if (isEmptyString(id)) {
    return null;
  }

  const parts = id.split(".");

  if (parts.length !== 2 || !parts[1]) {
    return null;
  }

  const nodeDetails = parts[1].split("_");

  if (nodeDetails.length !== 2 || !nodeDetails[0]) {
    return null;
  }

  return nodeDetails[0];
}

function getCluster(deviceId, cluster) {
  return extractClusterFromDeviceId(deviceId) || cluster;
}

function getDeviceId(cookies) {
  const cookie = cookies[DEVICE_ID_COOKIE] || {};
  const { value } = cookie;

  if (isEmptyString(value)) {
    return undefined;
  }

  return value;
}

function getSessionId(
  cookies,
  userSessionId,
  uuidMethod = TargetTools.createUUID
) {
  const cookie = cookies[SESSION_ID_COOKIE] || {};
  const { value } = cookie;

  if (isNonEmptyString(value)) {
    return value;
  }

  if (userSessionId) {
    return userSessionId;
  }

  return uuidMethod();
}

function getTargetHost(serverDomain, cluster, client, secure) {
  const schemePrefix = secure === false ? SCHEME.HTTP : SCHEME.HTTPS;

  if (isNonEmptyString(cluster)) {
    return `${schemePrefix}${EDGE_CLUSTER_PREFIX}${cluster}.${HOST}`;
  }

  if (isNonEmptyString(serverDomain)) {
    return `${schemePrefix}${serverDomain}`;
  }

  return `${schemePrefix}${client}.${HOST}`;
}

function createHeaders(uuidMethod = TargetTools.createUUID) {
  return {
    "Content-Type": "application/json",
    "X-EXC-SDK": "AdobeTargetNode",
    "X-EXC-SDK-Version": version,
    "X-Request-Id": uuidMethod()
  };
}

function getMarketingCloudVisitorId(visitor) {
  const visitorValues = visitor.getVisitorValues();
  const { MCMID } = visitorValues;

  return MCMID;
}

function getVisitorCustomerIds(visitor) {
  const visitorState = visitor.getState();
  const firstOrganizationState = visitorState[Object.keys(visitorState)[0]];

  return firstOrganizationState.customerIDs;
}

function getCustomerIds(customerIds, visitor) {
  const visitorCustomerIds = getVisitorCustomerIds(visitor);
  if (isEmptyObject(visitorCustomerIds)) {
    return customerIds;
  }

  const convertedIds = Object.keys(visitorCustomerIds).reduce((acc, key) => {
    const value = visitorCustomerIds[key];

    if (value) {
      let item;

      if (isObject(value)) {
        item = api.CustomerIdFromJSON({
          id: value.id || undefined,
          integrationCode: key || undefined,
          authenticatedState: AUTH_STATE[value.authState] || undefined
        });
      } else {
        item = api.CustomerIdFromJSON({
          id: value,
          integrationCode: key || undefined,
          authenticatedState: AUTH_STATE["0"]
        });
      }

      acc.push(item);
    }

    return acc;
  }, []);

  if (!convertedIds.length) {
    return customerIds;
  }

  return convertedIds.concat(customerIds || []);
}

function createVisitorId(id = {}, options) {
  const { deviceId, visitor } = options;
  const {
    tntId = deviceId,
    thirdPartyId,
    marketingCloudVisitorId = getMarketingCloudVisitorId(visitor),
    customerIds
  } = id;

  const mergedCustomerIds = getCustomerIds(customerIds, visitor);

  const result = api.VisitorIdFromJSON({
    tntId: isNonEmptyString(tntId) ? tntId : undefined,
    thirdPartyId: isNonEmptyString(thirdPartyId) ? thirdPartyId : undefined,
    marketingCloudVisitorId: isNonEmptyString(marketingCloudVisitorId)
      ? marketingCloudVisitorId
      : undefined,
    customerIds: isNonEmptyArray(mergedCustomerIds)
      ? mergedCustomerIds
      : undefined
  });

  return isNonEmptyObject(result) ? result : undefined;
}

function createTrace(trace) {
  const result = api.TraceFromJSON(trace);

  if (trace && isNonEmptyString(trace.authorizationToken)) {
    return result;
  }

  return undefined;
}

function createContext(context = {}) {
  const result = api.ContextFromJSON({
    timeOffsetInMinutes: getTimezoneOffset(),
    ...context
  });

  if (Object.keys(ChannelType).includes(result.channel)) {
    return context;
  }
  result.channel = ChannelType.Web;

  return result;
}

function createSupplementalDataId(options) {
  const { visitor, consumerId = DEFAULT_GLOBAL_MBOX } = options;

  return visitor.getSupplementalDataID(consumerId);
}

function createAnalytics(analytics = {}, options) {
  return api.AnalyticsRequestFromJSON({
    logging: LoggingType.ServerSide,
    supplementalDataId: createSupplementalDataId(options),
    trackingServer: isNonEmptyString(analytics.trackingServer)
      ? analytics.trackingServer
      : undefined,
    trackingServerSecure: isNonEmptyString(analytics.trackingServerSecure)
      ? analytics.trackingServerSecure
      : undefined
  });
}

function getLocationHint(locationHintString) {
  const hintNumber = parseInt(locationHintString, 10);
  return !isNaN(hintNumber) ? hintNumber : undefined; // eslint-disable-line no-restricted-globals
}

function createAudienceManager(audienceManager = {}, options) {
  const { visitor } = options;
  const visitorValues = visitor.getVisitorValues() || {};
  const {
    locationHint = getLocationHint(visitorValues.MCAAMLH),
    blob = visitorValues.MCAAMB
  } = audienceManager;

  const result = api.AudienceManagerFromJSON({
    locationHint,
    blob
  });

  return isNonEmptyObject(result) ? result : undefined;
}

function createExperienceCloud(experienceCloud = {}, options) {
  const { analytics, audienceManager } = experienceCloud;

  const createdAudienceManager = createAudienceManager(
    audienceManager,
    options
  );

  return api.ExperienceCloudFromJSON({
    analytics: createAnalytics(analytics, options),
    audienceManager: createdAudienceManager || undefined
  });
}

function createParams(resultClass, entity = {}) {
  return api[`${resultClass}FromJSON`].call(null, entity);
}

const validMbox = (mbox, logger) => {
  const result = isNonEmptyObject(mbox) && isNonEmptyString(mbox.name);
  if (!result) {
    logger.error(MBOX_INVALID, mbox);
  }
  return result;
};

function createMboxes(mboxes, logger) {
  if (isEmptyArray(mboxes)) {
    return undefined;
  }
  const resultMboxes = mboxes
    .filter(mbox => validMbox(mbox, logger))
    .map((mbox, index) => {
      const result = createParams("MboxRequest", mbox);
      result.name = mbox.name;

      if (isNumber(mbox.index)) {
        result.index = mbox.index;
      } else {
        result.index = index;
      }

      return result;
    });

  return isNonEmptyArray(resultMboxes) ? resultMboxes : undefined;
}

function createViews(views) {
  if (isEmptyArray(views)) {
    return undefined;
  }
  const resultViews = views.map(view => {
    const result = createParams("ViewRequest", view);

    if (isNonEmptyString(view.name)) {
      result.name = view.name;
    }

    if (isNonEmptyString(view.key)) {
      result.key = view.key;
    }

    return result;
  });

  return isNonEmptyArray(resultViews) ? resultViews : undefined;
}

function createExecute(execute, logger) {
  if (isEmptyObject(execute)) {
    return undefined;
  }

  const { pageLoad, mboxes } = execute;

  if (!isObject(pageLoad) && isEmptyArray(mboxes)) {
    return undefined;
  }

  return new api.ExecuteRequestFromJSON({
    pageLoad: isObject(pageLoad)
      ? createParams("RequestDetails", pageLoad)
      : undefined,
    mboxes: isNonEmptyArray(mboxes) ? createMboxes(mboxes, logger) : undefined
  });
}

function createPrefetch(prefetch, logger) {
  if (isEmptyObject(prefetch)) {
    return undefined;
  }

  const { pageLoad, views, mboxes } = prefetch;

  if (!isObject(pageLoad) && isEmptyArray(views) && isEmptyArray(mboxes)) {
    return undefined;
  }

  return api.PrefetchRequestFromJSON({
    pageLoad: isObject(pageLoad)
      ? createParams("RequestDetails", pageLoad)
      : undefined,
    views: isNonEmptyArray(views) ? createViews(views) : undefined,
    mboxes: isNonEmptyArray(mboxes) ? createMboxes(mboxes, logger) : undefined
  });
}

const validNotification = (notification, logger) => {
  const result =
    isNonEmptyObject(notification) &&
    isNonEmptyString(notification.id) &&
    isNumber(notification.timestamp) &&
    Object.values(MetricType).includes(notification.type);
  if (!result) {
    logger.error(NOTIFICATION_INVALID, notification);
  }
  return result;
};

function createNotifications(notifications, logger) {
  if (isEmptyArray(notifications)) {
    return undefined;
  }

  const resultNotifications = notifications
    .filter(notification => validNotification(notification, logger))
    .map(notification => {
      const {
        id,
        type,
        timestamp,
        impressionId,
        tokens,
        mbox,
        view
      } = notification;
      const result = createParams("Notification", notification);

      result.id = id;
      result.type = type;
      result.timestamp = timestamp;

      if (isNonEmptyString(impressionId)) {
        result.impressionId = impressionId;
      }

      if (isNonEmptyArray(tokens)) {
        result.tokens = tokens;
      }

      if (isNonEmptyObject(mbox)) {
        result.mbox = mbox;
      }

      if (isNonEmptyObject(view)) {
        result.view = view;
      }

      return result;
    });

  return isNonEmptyArray(resultNotifications) ? resultNotifications : undefined;
}

function createProperty(property = {}) {
  const { token } = property;

  if (isNonEmptyString(token)) {
    return api.PropertyFromJSON(property);
  }

  return undefined;
}

function createDeliveryRequest(requestParam, options) {
  const { logger, uuidMethod = TargetTools.createUUID } = options;

  const result = api.DeliveryRequestFromJSON({
    requestId: uuidMethod(),
    environmentId: options.environmentId,
    ...requestParam
  });

  result.id = createVisitorId(result.id, options);
  result.property = createProperty(result.property);
  result.trace = createTrace(result.trace);
  result.context = createContext(result.context);
  result.experienceCloud = createExperienceCloud(
    result.experienceCloud,
    options
  );

  result.execute = createExecute(result.execute, logger);
  result.prefetch = createPrefetch(result.prefetch, logger);
  result.notifications = createNotifications(result.notifications, logger);

  removeEmptyKeys(result);

  return result;
}

// eslint-disable-next-line no-unused-vars
function createConfiguration(fetchApi, host, headers, timeout) {
  return new Configuration({
    basePath: host,
    fetchApi,
    headers,
    timeout
  });
}

function createLocalDeliveryApi(decisioningEngine) {
  return {
    // eslint-disable-next-line no-unused-vars
    execute: (client, sessionId, deliveryRequest, atjsVersion) => {
      if (typeof decisioningEngine === "undefined") {
        return Promise.reject(new Error(Messages.PENDING_ARTIFACT_RETRIEVAL));
      }

      return decisioningEngine.getOffers({
        request: deliveryRequest,
        sessionId
      });
    }
  };
}

function createBeaconDeliveryApi(configuration) {
  return {
    execute: (client, sessionId, deliveryRequest, atjsVersion) => {
      const query = {
        client,
        sessionId
      };

      if (typeof configuration.version !== "undefined") {
        query.version = atjsVersion;
      }

      const queryString = configuration.queryParamsStringify(query);

      const success = executeSendBeacon(
        `${configuration.basePath}/rest/v1/delivery?${queryString}`,
        JSON.stringify({
          ...deliveryRequest,
          context: {
            ...deliveryRequest.context,
            beacon: true
          }
        })
      );
      return success ? Promise.resolve() : Promise.reject();
    }
  };
}

function createDeliveryApi(
  configuration,
  useBeacon = false,
  executionMode = EXECUTION_MODE.REMOTE,
  decisioningEngine = undefined
) {
  if (executionMode === EXECUTION_MODE.LOCAL) {
    return createLocalDeliveryApi(decisioningEngine);
  }

  return useBeacon && isBeaconSupported()
    ? createBeaconDeliveryApi(configuration)
    : new DeliveryAPIApi(configuration);
}

function getTargetCookie(sessionId, id) {
  const nowInSeconds = Math.ceil(Date.now() / 1000);
  const cookies = [];
  const { tntId } = id;

  cookies.push({
    name: SESSION_ID_COOKIE,
    value: sessionId,
    expires: nowInSeconds + SESSION_ID_MAX_AGE
  });

  if (tntId) {
    cookies.push({
      name: DEVICE_ID_COOKIE,
      value: tntId,
      expires: nowInSeconds + DEVICE_ID_MAX_AGE
    });
  }

  return createTargetCookie(cookies);
}

function extractClusterFromEdgeHost(host) {
  if (isEmptyString(host)) {
    return null;
  }

  const parts = host.split(".");

  if (parts.length !== 4 || !parts[0]) {
    return null;
  }

  return parts[0].replace(EDGE_CLUSTER_PREFIX, "");
}

function getTargetLocationHintCookie(requestCluster, edgeHost) {
  const hostCluster = extractClusterFromEdgeHost(edgeHost);
  const cluster = requestCluster || hostCluster;

  if (isEmptyString(cluster)) {
    return undefined;
  }

  return {
    name: LOCATION_HINT_COOKIE,
    value: cluster,
    maxAge: LOCATION_HINT_MAX_AGE
  };
}

function getAnalyticsFromObject(object = {}) {
  const { analytics } = object;

  return isNonEmptyObject(analytics) ? [analytics] : undefined;
}

function getAnalyticsFromArray(array = []) {
  return flatten(array.map(getAnalyticsFromObject));
}

function getAnalyticsDetails(response) {
  const { execute = {}, prefetch = {} } = response;
  if (isEmptyObject(execute) && isEmptyObject(prefetch)) {
    return undefined;
  }

  const executePageLoadAnalytics = getAnalyticsFromObject(execute.pageLoad);
  const executeMboxAnalytics = getAnalyticsFromArray(execute.mboxes);
  const prefetchPageLoadAnalytics = getAnalyticsFromObject(prefetch.pageLoad);
  const prefetchViewsAnalytics = getAnalyticsFromArray(prefetch.views);
  const prefetchMboxAnalytics = getAnalyticsFromArray(prefetch.mboxes);

  const result = flatten(
    [
      executePageLoadAnalytics,
      executeMboxAnalytics,
      prefetchPageLoadAnalytics,
      prefetchViewsAnalytics,
      prefetchMboxAnalytics
    ].filter(value => !!value)
  );

  return isNonEmptyArray(result) ? result : undefined;
}

function getTraceFromObject(object = {}) {
  const { trace } = object;

  return isNonEmptyObject(trace) ? [trace] : undefined;
}

function getTraceFromArray(array = []) {
  return flatten(array.map(getTraceFromObject));
}

function getTraceDetails(response) {
  const { execute = {}, prefetch = {} } = response;
  if (isEmptyObject(execute) && isEmptyObject(prefetch)) {
    return undefined;
  }

  const executePageLoadTrace = getTraceFromObject(execute.pageLoad);
  const executeMboxTrace = getTraceFromArray(execute.mboxes);
  const prefetchPageLoadTrace = getTraceFromObject(prefetch.pageLoad);
  const prefetchViewsTrace = getTraceFromArray(prefetch.views);
  const prefetchMboxTrace = getTraceFromArray(prefetch.mboxes);

  const result = flatten(
    [
      executePageLoadTrace,
      executeMboxTrace,
      prefetchPageLoadTrace,
      prefetchViewsTrace,
      prefetchMboxTrace
    ].filter(value => !!value)
  );

  return isNonEmptyArray(result) ? result : undefined;
}

function getResponseTokensFromObject(object = {}) {
  const { options } = object;

  if (isEmptyArray(options)) {
    return [];
  }

  return options.map(option => option.responseTokens).filter(isNonEmptyObject);
}

function getResponseTokensFromArray(array = []) {
  return flatten(array.map(getResponseTokensFromObject));
}

function getResponseTokens(response) {
  const { execute = {}, prefetch = {} } = response;
  if (isEmptyObject(execute) && isEmptyObject(prefetch)) {
    return undefined;
  }

  const executePageLoadTokens = getResponseTokensFromObject(execute.pageLoad);
  const executeMboxTokens = getResponseTokensFromArray(execute.mboxes);
  const prefetchPageLoadTokens = getResponseTokensFromObject(prefetch.pageLoad);
  const prefetchViewsTokens = getResponseTokensFromArray(prefetch.views);
  const prefetchMboxTokens = getResponseTokensFromArray(prefetch.mboxes);

  const result = flatten([
    executePageLoadTokens,
    executeMboxTokens,
    prefetchPageLoadTokens,
    prefetchViewsTokens,
    prefetchMboxTokens
  ]);

  return isNonEmptyArray(result) ? result : undefined;
}

function processResponse(sessionId, cluster, response = {}) {
  const { id = {}, edgeHost } = response;

  const result = {
    targetCookie: getTargetCookie(sessionId, id),
    targetLocationHintCookie: getTargetLocationHintCookie(cluster, edgeHost),
    analyticsDetails: getAnalyticsDetails(response),
    trace: getTraceDetails(response),
    responseTokens: getResponseTokens(response),
    response
  };

  removeEmptyKeys(result);

  return result;
}

module.exports = {
  getDeviceId,
  getCluster,
  getSessionId,
  getTargetHost,
  extractClusterFromDeviceId,
  createHeaders,
  createDeliveryRequest,
  createConfiguration,
  createDeliveryApi,
  processResponse,
  createVisitorId
};
