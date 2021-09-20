import { DECISIONING_METHOD, isDefined } from "@adobe/target-tools";
import {
  Configuration as DeliveryConfiguration,
  DeliveryApi
} from "@adobe/target-tools/delivery-api-client";
import { executeSendBeacon } from "../utils";
import { logApiRequest, logApiResponse } from "./utils";

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
 * @param logger
 * @param { import("@adobe/target-tools/delivery-api-client/runtime").Configuration } configuration
 * @returns { import("@adobe/target-tools/delivery-api-client").DeliveryApi }
 */
export function createDeliveryApi(logger, configuration) {
  const decisioningMethod = DECISIONING_METHOD.SERVER_SIDE;
  const deliveryApi = new DeliveryApi(configuration);

  return {
    execute: (imsOrgId, sessionId, deliveryRequest, atjsVersion) => {
      logApiRequest(
        logger,
        deliveryRequest,
        decisioningMethod,
        configuration.basePath
      );

      return deliveryApi
        .execute(imsOrgId, sessionId, deliveryRequest, atjsVersion)
        .then(response =>
          logApiResponse(
            logger,
            response,
            decisioningMethod,
            configuration.basePath
          )
        );
    },
    decisioningMethod
  };
}

/**
 *
 * @param logger
 * @param { import("@adobe/target-tools/delivery-api-client/runtime").Configuration } configuration
 * @returns {GenericApi}
 */
export function createBeaconDeliveryApi(logger, configuration) {
  const decisioningMethod = DECISIONING_METHOD.SERVER_SIDE;

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

      logApiRequest(
        logger,
        deliveryRequest,
        decisioningMethod,
        configuration.basePath
      );

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
    decisioningMethod
  };
}
