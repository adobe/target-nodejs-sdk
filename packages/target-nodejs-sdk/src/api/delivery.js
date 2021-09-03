import { DECISIONING_METHOD, isDefined } from "@adobe/target-tools";
import {
  Configuration as DeliveryConfiguration,
  DeliveryApi
} from "@adobe/target-tools/delivery-api-client";
import { executeSendBeacon } from "../utils";

DeliveryApi.prototype.decisioningMethod = DECISIONING_METHOD.SERVER_SIDE;

/**
 *
 * @returns { import("@adobe/target-tools/delivery-api-client/runtime").Configuration }
 */
export function createDeliveryConfiguration({
  basePath,
  fetchApi,
  headers,
  timeout
}) {
  return new DeliveryConfiguration({
    basePath,
    fetchApi,
    headers,
    timeout
  });
}

/**
 *
 * @param { import("@adobe/target-tools/delivery-api-client/runtime").Configuration } configuration
 * @returns { import("@adobe/target-tools/delivery-api-client").DeliveryApi }
 */
export function createDeliveryApi(configuration) {
  return new DeliveryApi(configuration);
}

/**
 *
 * @param { import("@adobe/target-tools/delivery-api-client/runtime").Configuration } configuration
 * @returns {GenericApi}
 */
export function createBeaconDeliveryApi(configuration) {
  return {
    execute: (organizationId, sessionId, deliveryRequest, atjsVersion) => {
      const query = {
        imsOrgId: organizationId,
        sessionId
      };

      if (isDefined(configuration.version)) {
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
    },
    decisioningMethod: DECISIONING_METHOD.SERVER_SIDE
  };
}
