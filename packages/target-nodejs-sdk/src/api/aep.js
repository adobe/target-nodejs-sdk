import {
  Configuration as AepEdgeConfiguration,
  InteractApi
} from "@adobe/aep-edge-tools/aep-edge-api-client";
import { targetDeliveryToAepEdgeRequest } from "@adobe/target-tools/src/transforms/requestTransform";
import { aepEdgeToTargetDeliveryResponse } from "@adobe/target-tools/src/transforms/responseTransform";
import { DECISIONING_METHOD } from "@adobe/target-tools";
import { logApiRequest, logApiResponse } from "./utils";

InteractApi.prototype.decisioningMethod = DECISIONING_METHOD.SERVER_SIDE;

/**
 *
 * @returns { import("@adobe/aep-edge-tools/aep-edge-api-client/runtime").Configuration }
 */
export function createAepEdgeConfiguration({ fetchApi }) {
  return new AepEdgeConfiguration({
    fetchApi
  });
}

/**
 *
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/runtime").Configuration } configuration
 * @returns { GenericApi }
 */
export function createAepApi(sdkConfig, configuration) {
  const { client, logger } = sdkConfig;
  const aepEdgeApi = new InteractApi(configuration);
  const decisioningMethod = DECISIONING_METHOD.SERVER_SIDE;

  return {
    /**
     *
     * @param imsOrgId
     * @param sessionId
     * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest
     * @param atjsVersion
     * @param edgeConfigId
     * @returns {Promise<import("@adobe/target-tools/delivery-api-client/models/DeliveryResponse").DeliveryResponse>}
     */
    execute: (
      imsOrgId,
      sessionId,
      deliveryRequest,
      atjsVersion,
      edgeConfigId
    ) => {
      const interactPostRequest = targetDeliveryToAepEdgeRequest({
        imsOrgId,
        sessionId,
        deliveryRequest,
        version: atjsVersion,
        edgeConfigId,
        konductorIdentity: undefined
      });

      logApiRequest(
        logger,
        interactPostRequest,
        decisioningMethod,
        configuration.basePath
      );

      return aepEdgeApi.interactPostRaw(interactPostRequest).then(response => {
        const { raw } = response;
        const { status } = raw;

        return response.value().then(interactResponse => {
          logApiResponse(
            logger,
            interactResponse,
            decisioningMethod,
            configuration.basePath
          );

          return aepEdgeToTargetDeliveryResponse({
            client,
            imsOrgId,
            status,
            interactResponse,
            deliveryRequest
          });
        });
      });
    },
    decisioningMethod
  };
}
