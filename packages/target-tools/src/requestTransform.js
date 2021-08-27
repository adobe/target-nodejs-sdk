/* eslint-disable import/prefer-default-export,no-unused-vars */

import { createPipeline } from "./pipeline";
import { isDefined, objectWithoutUndefinedValues } from "./utils";
import { isArray } from "./lodash";
import {
  createIdentityItem,
  targetChannelToXdm,
  targetDeviceTypeToXdm,
  targetToAepAuthenticatedState,
  toHours
} from "./transformUtils";
import { AuthenticatedStateAEP } from "./constants";

// const ECID = "ECID";

function addConfigId(interactRequest, { deliveryRequest, edgeConfigId }) {
  return {
    ...interactRequest,
    requestId: deliveryRequest.requestId,
    // xRequestID?
    configId: edgeConfigId
  };
}

/**
 *
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/models/EdgeRequest").EdgeRequest } edgeRequest
 * @param { import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
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
 * @param { import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
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
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/apis/InteractApi").InteractPostRequest } interactRequest
 * @param { import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 * @returns { import("@adobe/aep-edge-tools/aep-edge-api-client/apis/InteractApi").InteractPostRequest }
 */
function createEdgeRequest(interactRequest, { deliveryRequest }) {
  const edgeRequestPipeline = createPipeline([
    translateIdentities,
    translateTargetContext
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

function sanitize(request) {
  return objectWithoutUndefinedValues(request, true);
}

/**
 * @param { String } imsOrgId
 * @param { String } sessionId
 * @param { import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest } deliveryRequest
 * @param { String } version
 * @param { String } edgeConfigId
 * @returns { import("@adobe/aep-edge-tools/aep-edge-api-client/apis/InteractApi").InteractPostRequest }
 */
export function targetDeliveryToAepEdgeRequest(
  imsOrgId,
  sessionId,
  deliveryRequest,
  version,
  edgeConfigId
) {
  const targetDeliveryToAepEdgeRequestPipeline = createPipeline([
    addConfigId,
    createEdgeRequest,
    sanitize
  ]);

  return targetDeliveryToAepEdgeRequestPipeline.execute(
    {},
    {
      imsOrgId,
      sessionId,
      deliveryRequest,
      version,
      edgeConfigId
    }
  );
}
