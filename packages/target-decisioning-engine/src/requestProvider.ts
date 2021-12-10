import {
  AuthenticatedState,
  isBlank,
  isString,
  uuid
} from "@adobe/target-tools";
import {
  ChannelType,
  DeliveryRequest,
  VisitorId
} from "@adobe/target-tools/delivery-api-client";
import { RequestGeo } from "../types/RequestGeo";

/**
 *
 * @param { import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @returns {string} first non-blank marketingCloudVisitorId, tntId, thirdPartyId
 */
export function getCustomerId(visitorId: VisitorId): string {
  if (!visitorId.customerIds || !(visitorId.customerIds instanceof Array)) {
    return undefined;
  }

  const customerIds = visitorId.customerIds.filter(
    customerId =>
      customerId.authenticatedState === AuthenticatedState.Authenticated
  );

  if (customerIds.length > 0) {
    return customerIds[0].id;
  }

  return undefined;
}

/**
 *
 * @param {import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId} visitorId
 * @param {String} targetLocationHint
 * @returns {import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId}
 */
export function validVisitorId(
  visitorId: VisitorId,
  targetLocationHint: string
): VisitorId {
  const result = {
    ...visitorId
  };

  if (
    !result.tntId &&
    !result.marketingCloudVisitorId &&
    !getCustomerId(result) &&
    !result.thirdPartyId
  ) {
    const locationHint =
      isString(targetLocationHint) && !isBlank(targetLocationHint)
        ? `.${targetLocationHint}_0`
        : "";
    result.tntId = `${uuid()}${locationHint}`;
  }
  return result;
}

/**
 *
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} request
 * @param {String} targetLocationHint
 * @param {Function} validGeoRequestContext
 * @returns {Promise<import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest>}
 */
export function validDeliveryRequest(
  request: DeliveryRequest,
  targetLocationHint: string,
  validGeoRequestContext: Function
): Promise<DeliveryRequest> {
  const { context = { geo: {} } } = request;

  return validGeoRequestContext(context.geo).then(geo => {
    return {
      ...request,
      context: {
        ...context,
        geo
      },
      id: validVisitorId(request.id, targetLocationHint),
      requestId: request.requestId || uuid()
    };
  });
}
