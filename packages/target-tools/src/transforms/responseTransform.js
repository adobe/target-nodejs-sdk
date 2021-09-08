/* eslint-disable import/prefer-default-export,no-unused-vars */
import {
  decodeKonductorIdentity,
  konductorCookieNameIdentity,
  PAGE_WIDE_SCOPE
} from "@adobe/aep-edge-tools";
import { createPipeline } from "../pipeline";
import {
  aepItemToTargetOption,
  indexBy,
  isMetricOptionType,
  sanitize
} from "./transformUtils";
import { isDefined, isUndefined } from "../utils";
import { isNonEmptyArray } from "../../../target-nodejs-sdk/src/utils";
import { values } from "../lodash";

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

  const pageLoad = {
    options: [],
    metrics: []
  };
  const mboxes = {};

  let mboxIndex = 0;

  personalizations
    .reverse() // TODO: remove this once sorting is correct on konductor
    .filter(
      personalization =>
        personalization.scopeDetails.decisionProvider === TARGET
    )
    .forEach(personalization => {
      const { scope, scopeDetails = {}, items = [] } = personalization;
      const { activity = {} } = scopeDetails;
      const { id: activityId } = activity;

      if (PAGE_WIDE_SCOPE === scope) {
        pageLoad.options.push(
          ...items
            .filter(item => !isMetricOptionType(item.data.type))
            .map(aepItemToTargetOption)
        );

        pageLoad.metrics.push(
          ...items
            .filter(item => isMetricOptionType(item.data.type))
            .map(aepItemToTargetOption)
        );
        return;
      }

      const mboxKey = `${scope}_${activityId}`;

      if (isUndefined(mboxes[mboxKey])) {
        mboxes[mboxKey] = {
          index: mboxIndex,
          name: scope,
          options: [],
          metrics: []
        };
        mboxIndex += 1;
      }

      mboxes[mboxKey].options.push(
        ...items
          .filter(item => !isMetricOptionType(item.data.type))
          .map(aepItemToTargetOption)
      );

      mboxes[mboxKey].metrics.push(
        ...items
          .filter(item => isMetricOptionType(item.data.type))
          .map(aepItemToTargetOption)
      );
    });

  return {
    ...deliveryResponse,
    execute: {
      ...deliveryResponse.execute,
      pageLoad:
        isNonEmptyArray(pageLoad.options) || isNonEmptyArray(pageLoad.metrics)
          ? pageLoad
          : undefined,
      mboxes: isNonEmptyArray(Object.keys(mboxes)) ? values(mboxes) : undefined
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
