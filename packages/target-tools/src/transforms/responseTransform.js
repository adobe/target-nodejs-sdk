/* eslint-disable import/prefer-default-export,no-unused-vars */
import {
  decodeKonductorIdentity,
  konductorCookieNameIdentity,
  PAGE_WIDE_SCOPE
} from "@adobe/aep-edge-tools";
import { createPipeline } from "../pipeline";
import {
  aepFormatToTargetOptionType,
  indexBy,
  sanitize
} from "./transformUtils";
import { isDefined } from "../utils";
import { isNonEmptyArray } from "../../../target-nodejs-sdk/src/utils";

const TARGET = "TGT";
const HANDLE_STATE = "state:store";
const HANDLE_PERSONALIZATION = "personalization:decisions";

function addRequestDetails(
  deliveryResponse,
  { status, client, interactResponse = {} }
) {
  const { requestId } = interactResponse;

  return {
    ...deliveryResponse,
    status,
    requestId,
    client
  };
}
function addIdentities(
  deliveryResponse,
  { deliveryRequest = {}, imsOrgId, handlesById }
) {
  const state = handlesById[HANDLE_STATE].payload;

  const identityCookieName = konductorCookieNameIdentity(imsOrgId);

  const konductorIdentityCookie = state.find(
    obj => obj.key === identityCookieName
  );

  let marketingCloudVisitorId;

  if (isDefined(konductorIdentityCookie)) {
    const identity = decodeKonductorIdentity(konductorIdentityCookie.value);
    marketingCloudVisitorId = identity.ecid;
  }

  const { id = {} } = deliveryRequest;
  const { customerIds = [] } = id;

  return {
    ...deliveryResponse,
    id: {
      marketingCloudVisitorId,
      customerIds: isNonEmptyArray(customerIds) ? customerIds : undefined
    }
  };
}

function translateExecuteResponse(deliveryResponse, { handlesById }) {
  const personalizations = handlesById[HANDLE_PERSONALIZATION].payload;

  const pageLoad = [];
  const mboxes = [];

  personalizations
    .filter(
      personalization =>
        personalization.scopeDetails.decisionProvider === TARGET
    )
    .forEach((personalization, index) => {
      const { scope } = personalization;

      if (PAGE_WIDE_SCOPE === scope) {
        // target-global-mbox (pageLoad)
        return;
      }

      const { items = [] } = personalization;

      mboxes.push({
        index,
        name: scope,
        options: items.map(item => {
          const { data = {}, meta = {} } = item;
          const { format, content } = data;
          return {
            type: aepFormatToTargetOptionType(format),
            content,
            responseTokens: {
              ...meta
            }
          };
        })
      });
    });

  return {
    ...deliveryResponse,
    execute: {
      ...deliveryResponse.execute,
      mboxes
    }
  };
}

/**
 *
 * @param { number } status
 * @param {string} client
 * @param {string} imsOrgId
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/models/InteractResponse").InteractResponse } interactResponse
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest
 * @returns { import("../../delivery-api-client/models/DeliveryResponse").DeliveryResponse }
 */
export function aepEdgeToTargetDeliveryResponse({
  status,
  client,
  imsOrgId,
  interactResponse,
  deliveryRequest
}) {
  const aepEdgeToTargetDeliveryResponsePipeline = createPipeline([
    addRequestDetails,
    addIdentities,
    translateExecuteResponse,
    sanitize
  ]);

  const { handle = [] } = interactResponse;
  const handlesById = indexBy("type", handle);

  return aepEdgeToTargetDeliveryResponsePipeline.execute(
    {},
    { status, client, imsOrgId, interactResponse, deliveryRequest, handlesById }
  );
}
