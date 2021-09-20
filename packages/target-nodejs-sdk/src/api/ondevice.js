/* eslint-disable import/prefer-default-export */
import {
  DECISIONING_ENGINE_NOT_READY,
  DECISIONING_METHOD,
  isUndefined
} from "@adobe/target-tools";
import { logApiRequest, logApiResponse } from "./utils";

export function createOnDeviceApi(
  logger,
  decisioningEngine,
  visitor,
  targetLocationHint
) {
  const decisioningMethod = DECISIONING_METHOD.ON_DEVICE;

  return {
    // eslint-disable-next-line no-unused-vars
    execute: (organizationId, sessionId, deliveryRequest, atjsVersion) => {
      if (isUndefined(decisioningEngine)) {
        return Promise.reject(new Error(DECISIONING_ENGINE_NOT_READY));
      }

      logApiRequest(logger, deliveryRequest, decisioningMethod);

      return decisioningEngine
        .getOffers({
          targetLocationHint,
          request: deliveryRequest,
          sessionId,
          visitor
        })
        .then(response => logApiResponse(logger, response, decisioningMethod));
    },
    decisioningMethod
  };
}
