import {
  Configuration as AepEdgeConfiguration,
  InteractApi
} from "@adobe/aep-edge-tools/aep-edge-api-client";
import { targetDeliveryToAepEdgeRequest } from "@adobe/target-tools/src/transforms/requestTransform";
import { aepEdgeToTargetDeliveryResponse } from "@adobe/target-tools/src/transforms/responseTransform";
import { DECISIONING_METHOD } from "@adobe/target-tools";

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
export function createAepApi(configuration) {
  const aepEdgeApi = new InteractApi(configuration);

  return {
    /**
     *
     * @param imsOrgId
     * @param sessionId
     * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest
     * @param atjsVersion
     * @param edgeConfigId
     * @returns {Promise<import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest>}
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

      return aepEdgeApi
        .interactPost(interactPostRequest)
        .then(aepEdgeToTargetDeliveryResponse);
    }
  };
}
