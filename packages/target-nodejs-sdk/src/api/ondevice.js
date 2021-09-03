/* eslint-disable import/prefer-default-export */
import {
  DECISIONING_ENGINE_NOT_READY,
  DECISIONING_METHOD,
  isUndefined
} from "@adobe/target-tools";

export function createOnDeviceApi(
  decisioningEngine,
  visitor,
  targetLocationHint
) {
  return {
    // eslint-disable-next-line no-unused-vars
    execute: (organizationId, sessionId, deliveryRequest, atjsVersion) => {
      if (isUndefined(decisioningEngine)) {
        return Promise.reject(new Error(DECISIONING_ENGINE_NOT_READY));
      }

      return decisioningEngine.getOffers({
        targetLocationHint,
        request: deliveryRequest,
        sessionId,
        visitor
      });
    },
    decisioningMethod: DECISIONING_METHOD.ON_DEVICE
  };
}
