import { createUUID } from "@adobe/target-tools";
import { AuthenticatedState } from "@adobe/target-tools/delivery-api-client";

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
 * @param {String} targetLocationHint
 * @returns {import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId}
 */
export function validVisitorId(visitorId, targetLocationHint) {
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
      typeof targetLocationHint === "string" && targetLocationHint.length > 0
        ? `.${targetLocationHint}_0`
        : "";
    result.tntId = `${createUUID()}${locationHint}`;
  }
  return result;
}

/**
 *
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} request
 * @param {String} targetLocationHint
 * @returns {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest}
 */
export function validDeliveryRequest(request, targetLocationHint) {
  return {
    ...request,
    id: validVisitorId(request.id, targetLocationHint),
    requestId: request.requestId || createUUID()
  };
}
