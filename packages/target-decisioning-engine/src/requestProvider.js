import { createUUID, DeliveryApiClient } from "@adobe/target-tools";

const { AuthenticatedState } = DeliveryApiClient;

/**
 *
 * @param { import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @returns {string} first non-blank marketingCloudVisitorId, tntId, thirdPartyId
 */
export function getCustomerId(visitorId) {
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
 * @returns {import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId}
 */
export function validVisitorId(visitorId) {
  const result = {
    ...visitorId
  };

  if (
    !result.tntId &&
    !result.marketingCloudVisitorId &&
    !getCustomerId(result) &&
    !result.thirdPartyId
  ) {
    result.tntId = createUUID();
  }
  return result;
}

/**
 *
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} request
 * @returns {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest}
 */
export function validDeliveryRequest(request) {
  return {
    ...request,
    id: validVisitorId(request.id)
  };
}
