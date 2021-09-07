import {
  DECISIONING_METHOD,
  requiresDecisioningEngine
} from "@adobe/target-tools";
import { createOnDeviceApi } from "./ondevice";
import { Configuration as AepEdgeConfiguration } from "../../../../../aep-edge-nodejs-sdk/packages/aep-edge-tools/aep-edge-api-client";
import { isBeaconSupported, isNonEmptyString } from "../utils";
import {
  createBeaconDeliveryApi,
  createDeliveryApi,
  createDeliveryConfiguration
} from "./delivery";
import { createAepApi, createAepEdgeConfiguration } from "./aep";

function createRemoteApi(sdkConfig, configuration, useBeacon) {
  if (configuration instanceof AepEdgeConfiguration) {
    return createAepApi(sdkConfig, configuration);
  }

  return useBeacon && isBeaconSupported()
    ? createBeaconDeliveryApi(configuration)
    : createDeliveryApi(configuration);
}

/**
 *
 * @param {String} edgeConfigId
 * @param {Function} fetchApi
 * @param host
 * @param headers
 * @param timeout
 * @return {import("@adobe/aep-edge-tools/aep-edge-api-client/runtime").Configuration|import("@adobe/target-tools/delivery-api-client/runtime").Configuration}
 */
export function createConfiguration(
  edgeConfigId,
  fetchApi,
  host,
  headers,
  timeout
) {
  const options = {
    basePath: host,
    fetchApi,
    headers,
    timeout
  };

  return isNonEmptyString(edgeConfigId)
    ? createAepEdgeConfiguration(options)
    : createDeliveryConfiguration(options);
}

/**
 * @param sdkConfig
 * @param {import("@adobe/target-tools/delivery-api-client/runtime").Configuration|import("@adobe/aep-edge-tools/aep-edge-api-client/runtime").Configuration} configuration
 * @param visitor VisitorId instance
 * @param { Boolean } useBeacon
 * @param decisioningMethod
 * @param { String } targetLocationHint
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest
 * @param decisioningEngine
 * */
export function createApi(
  sdkConfig,
  configuration,
  visitor,
  useBeacon = false,
  decisioningMethod = DECISIONING_METHOD.SERVER_SIDE,
  targetLocationHint = undefined,
  deliveryRequest = undefined,
  decisioningEngine = undefined
) {
  if (requiresDecisioningEngine(decisioningMethod)) {
    const decisioningDependency =
      decisioningEngine.hasRemoteDependency(deliveryRequest);

    if (
      decisioningMethod === DECISIONING_METHOD.HYBRID &&
      decisioningDependency.remoteNeeded
    ) {
      return createRemoteApi(sdkConfig, configuration, useBeacon);
    }

    return createOnDeviceApi(decisioningEngine, visitor, targetLocationHint);
  }

  return createRemoteApi(sdkConfig, configuration, useBeacon);
}
