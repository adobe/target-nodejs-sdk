/* eslint-disable import/prefer-default-export,no-unused-vars */

import {
  AuthenticatedStateAEP,
  konductorCookieNameIdentity,
  konductorCookieNameSessionId,
  PAGE_WIDE_SCOPE,
  PERSONALIZATION_SCHEMA_ALL
} from "@adobe/aep-edge-tools";
import {
  byIndex,
  createIdentityItem,
  isGlobalMbox,
  targetChannelToXdm,
  targetDeviceTypeToXdm,
  targetOrderToAEP,
  targetProductToAEP,
  targetToAepAuthenticatedState,
  toHours
} from "./transformUtils";
import {
  isDefined,
  isRoughlyTheSameObject,
  objectWithoutUndefinedValues
} from "../utils";
import { isArray } from "../lodash";
import { createPipeline } from "../pipeline";
import { parseURI } from "../index";
import isNotBlank from "../lodash/internal/isNotBlank";

function sanitize(request) {
  return objectWithoutUndefinedValues(request, true);
}

function addConfigId(interactRequest, { deliveryRequest, edgeConfigId }) {
  return {
    ...interactRequest,
    requestId: deliveryRequest.requestId,
    configId: edgeConfigId
  };
}

function addTrace(interactRequest, { deliveryRequest }) {
  const { trace = {} } = deliveryRequest;
  const { authorizationToken } = trace;
  return {
    ...interactRequest,
    xAdobeTargetTraceToken: authorizationToken
  };
}

/**
 *
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/models/EdgeRequest").EdgeRequest } edgeRequest
 * @param { import("../../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 * @returns { import("@adobe/aep-edge-tools/aep-edge-api-client/models/EdgeRequest").EdgeRequest }
 */
function translateIdentities(edgeRequest, { id = {} }) {
  let primaryFlagged = false;
  const setPrimary = () => {
    if (primaryFlagged) {
      return false;
    }
    primaryFlagged = true;
    return true;
  };

  const { marketingCloudVisitorId, customerIds } = id; // tntId and thirdPartyId out of scope

  const { xdm = {} } = edgeRequest;
  const { identityMap = {} } = xdm;

  const newIdentityMap = { ...identityMap };

  if (isDefined(marketingCloudVisitorId)) {
    newIdentityMap.ECID = [...(identityMap.ECID || [])];

    newIdentityMap.ECID.push(
      createIdentityItem(
        marketingCloudVisitorId,
        AuthenticatedStateAEP.Ambiguous,
        setPrimary()
      )
    );
  }

  if (isDefined(customerIds) && isArray(customerIds)) {
    customerIds.forEach(customerId => {
      const { integrationCode } = customerId;

      newIdentityMap[integrationCode] = [
        ...(identityMap[integrationCode] || [])
      ];

      newIdentityMap[integrationCode].push(
        createIdentityItem(
          customerId.id,
          targetToAepAuthenticatedState(customerId.authenticatedState),
          setPrimary()
        )
      );
    });
  }

  return {
    ...edgeRequest,
    xdm: {
      ...xdm,
      identityMap: newIdentityMap
    }
  };
}

/**
 *
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/models/EdgeRequest").EdgeRequest } edgeRequest
 * @param { import("../../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 * @returns { import("@adobe/aep-edge-tools/aep-edge-api-client/models/EdgeRequest").EdgeRequest }
 */
function translateTargetContext(edgeRequest, { context = {} }) {
  const { xdm = {} } = edgeRequest;
  const { environment = {} } = xdm;
  const { browserDetails = {} } = environment;

  const {
    channel,
    mobilePlatform = {},
    application = {},
    window = {},
    userAgent,
    screen = {},
    browser = {},
    address = {},
    geo = {},
    timeOffsetInMinutes
  } = context;
  const {
    width: screenWidth,
    height: screenHeight,
    colorDepth,
    orientation: screenOrientation
  } = screen;

  const { width: viewportWidth, height: viewportHeight } = window;

  const { host } = browser;
  const { url, referringUrl } = address;
  const { latitude, longitude } = geo;

  const { web = { webPageDetails: {} } } = edgeRequest;

  const {
    deviceName: deviceModel,
    deviceType,
    version: modelNumber
  } = mobilePlatform;

  const {
    id: applicationId,
    name: applicationName,
    version: applicationVersion
  } = application;

  return {
    ...edgeRequest,
    xdm: {
      ...xdm,
      environment: {
        ...environment,
        type: targetChannelToXdm(channel),
        browserDetails: {
          ...browserDetails,
          viewportWidth,
          viewportHeight,
          userAgent
        }
      },
      device: {
        screenWidth,
        screenHeight,
        colorDepth,
        screenOrientation,
        model: deviceModel,
        type: targetDeviceTypeToXdm(deviceType),
        modelNumber
      },
      application: {
        id: applicationId,
        name: applicationName,
        version: applicationVersion
      },
      web: {
        ...web,
        webPageDetails: {
          ...web.webPageDetails,
          url: url || host
        },
        webReferrer: {
          url: referringUrl
        }
      },
      placeContext: {
        geo: {
          latitude,
          longitude
        },
        localTimezoneOffset: toHours(timeOffsetInMinutes)
      }
    }
  };
}

/**
 *
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/models/EdgeRequest").EdgeRequest } edgeRequest
 * @param { import("../../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 * @returns { import("@adobe/aep-edge-tools/aep-edge-api-client/models/EdgeRequest").EdgeRequest }
 */
function translateExecuteRequest(edgeRequest, { execute = {} }) {
  const events = [...(edgeRequest.events || [])];

  const { pageLoad, mboxes = [] } = execute;

  [
    isDefined(pageLoad)
      ? {
          name: "target-global-mbox",
          ...pageLoad
        }
      : undefined,
    ...mboxes.sort(byIndex)
  ]
    .filter(mbox => isDefined(mbox))
    .forEach(mbox => {
      const { name, product, order } = mbox;

      const decisionScopes = [];
      let targetParams = {};
      let targetProfileParams = {};

      decisionScopes.push(isGlobalMbox(name) ? PAGE_WIDE_SCOPE : name);

      const { parameters = {}, profileParameters = {} } = mbox;
      targetParams = { ...parameters };
      targetProfileParams = { ...profileParameters };

      const xdm = {
        timestamp: new Date(),
        implementationDetails: {
          name: "https://ns.adobe.com/experience/aep-edge-nodejs-sdk",
          version: "1.0.0",
          environment: "server"
        }
      };

      xdm.productListItems = isDefined(product)
        ? [targetProductToAEP(product)]
        : undefined;

      xdm.commerce = targetOrderToAEP(order);

      const event = {
        query: {
          personalization: {
            schemas: PERSONALIZATION_SCHEMA_ALL,
            decisionScopes: [...decisionScopes]
          }
        },
        xdm,
        data: {
          __adobe: {
            target: {
              ...targetParams,
              profile: {
                ...targetProfileParams
              }
            }
          }
        }
      };

      const lastEvent = events[events.length - 1];

      if (
        events.length > 0 &&
        isRoughlyTheSameObject(lastEvent.data, event.data)
      ) {
        lastEvent.query.personalization.decisionScopes.push(
          ...event.query.personalization.decisionScopes
        );
      } else {
        events.push(event);
      }
    });

  return {
    ...edgeRequest,
    events
  };
}

/**
 *
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/apis/InteractApi").InteractPostRequest } interactRequest
 * @param { import("../../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 * @returns { import("@adobe/aep-edge-tools/aep-edge-api-client/apis/InteractApi").InteractPostRequest }
 */
function createEdgeRequest(interactRequest, { deliveryRequest }) {
  const edgeRequestPipeline = createPipeline([
    translateIdentities,
    translateTargetContext,
    translateExecuteRequest
  ]);

  return {
    ...interactRequest,
    edgeRequest: edgeRequestPipeline.execute(
      {
        xdm: {}
      },
      deliveryRequest
    )
  };
}

/**
 *
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/apis/InteractApi").InteractPostRequest } interactRequest
 * @param { String } imsOrgId
 * @param { String } sessionId
 * @param { import("../../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 * @returns { import("@adobe/aep-edge-tools/aep-edge-api-client/apis/InteractApi").InteractPostRequest }
 */
function addMetaEntries(
  interactRequest,
  { imsOrgId, sessionId, deliveryRequest, konductorIdentity }
) {
  const { context = {} } = deliveryRequest;
  const { browser = {}, address = {} } = context;

  const { host } = browser;
  const { url } = address;

  const { edgeRequest } = interactRequest;
  const { meta = {} } = edgeRequest;
  const { state = {} } = meta;
  const { entries = [] } = state;

  const { host: domain = "" } = parseURI(host || url || "") || {};

  const additionalState = {
    domain,
    cookiesEnabled: true,
    entries: [...entries]
  };

  if (isNotBlank(imsOrgId) && isNotBlank(sessionId)) {
    additionalState.entries.push({
      key: konductorCookieNameSessionId(imsOrgId),
      value: sessionId
    });
  }

  if (isNotBlank(konductorIdentity)) {
    additionalState.entries.push({
      key: konductorCookieNameIdentity(imsOrgId),
      value: konductorIdentity
    });
  }

  return {
    ...interactRequest,
    edgeRequest: {
      ...edgeRequest,
      meta: {
        ...meta,
        state: {
          ...state,
          ...additionalState
        }
      }
    }
  };
}

/**
 * @param { String } imsOrgId
 * @param { String } sessionId
 * @param { import("../../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 * @param { String } version
 * @param { String } edgeConfigId
 * @param { String } konductorIdentity
 * @returns { import("@adobe/aep-edge-tools/aep-edge-api-client/apis/InteractApi").InteractPostRequest }
 */
export function targetDeliveryToAepEdgeRequest({
  imsOrgId,
  sessionId,
  deliveryRequest,
  version,
  edgeConfigId,
  konductorIdentity
}) {
  const targetDeliveryToAepEdgeRequestPipeline = createPipeline([
    addConfigId,
    addTrace,
    createEdgeRequest,
    addMetaEntries,
    sanitize
  ]);

  return targetDeliveryToAepEdgeRequestPipeline.execute(
    {},
    {
      imsOrgId,
      sessionId,
      deliveryRequest,
      version,
      edgeConfigId,
      konductorIdentity
    }
  );
}
