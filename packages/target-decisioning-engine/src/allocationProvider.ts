import {
  uuid,
  hashUnencodedChars,
  isEmpty,
  isString,
  memoize
} from "@adobe/target-tools";
import { VisitorId } from "@adobe/target-tools/delivery-api-client";
import { CAMPAIGN_BUCKET_SALT } from "./constants";

const TOTAL_BUCKETS = 10000;
const MAX_PERCENTAGE = 100;

export function validTntId(tntId: string = ""): string {
  if (isString(tntId) && !isEmpty(tntId)) {
    // eslint-disable-next-line no-unused-vars
    const [id, locationHint] = tntId.split(".");
    return id;
  }
  return undefined;
}

/**
 *
 * @param { import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @returns {string} first non-blank marketingCloudVisitorId, tntId, thirdPartyId
 */
export function getOrCreateVisitorId(visitorId: VisitorId): string {
  if (visitorId) {
    return (
      visitorId.marketingCloudVisitorId ||
      validTntId(visitorId.tntId) ||
      visitorId.thirdPartyId ||
      uuid() // create a tntId
    );
  }
  return uuid();
}

/**
 * @param deviceId
 * @returns {number}
 */
function calculateAllocation(deviceId: string): number {
  const signedNumericHashValue = hashUnencodedChars(deviceId);

  const hashFixedBucket = Math.abs(signedNumericHashValue) % TOTAL_BUCKETS;
  const allocationValue = (hashFixedBucket / TOTAL_BUCKETS) * MAX_PERCENTAGE;

  return Math.round(allocationValue * 100) / 100; // two decimal places
}

const calculateAllocationMemoized = memoize(calculateAllocation);

/**
 *
 * @param {String} clientId Target Client Id, required
 * @param {number} activityId Target Activity Id, required
 * @param { import("@adobe/target-tools/delivery-api-client/models/VisitorId").VisitorId|String } visitorId
 * @param {String} salt salt value, optional
 */
export function computeAllocation(
  clientId: string,
  activityId: number,
  visitorId: VisitorId | String,
  salt: string = CAMPAIGN_BUCKET_SALT
): number {
  // Generate a device id based on visitorId, clientCode, campaignId and a salt value
  const deviceId = [
    clientId,
    activityId,
    isString(visitorId) && !isEmpty(visitorId)
      ? visitorId
      : getOrCreateVisitorId(visitorId as VisitorId),
    salt
  ].join(".");

  return calculateAllocationMemoized(deviceId);
}
