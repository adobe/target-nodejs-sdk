import { createUUID, hashUnencodedChars, memoize } from "@adobe/target-tools";
import { CAMPAIGN_BUCKET_SALT } from "./constants";

export function validTntId(tntId = "") {
  if (typeof tntId === "string" && tntId.length > 0) {
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
export function getOrCreateVisitorId(visitorId) {
  if (visitorId) {
    return (
      visitorId.marketingCloudVisitorId ||
      validTntId(visitorId.tntId) ||
      visitorId.thirdPartyId ||
      createUUID() // create a tntId
    );
  }
  return createUUID();
}

/**
 *
 * @param {String} deviceId
 */
function calculateAllocation(deviceId) {
  // Use the MurmurHash3 (32-bit) hashing algorithm to generate a numeric 10-digit hash based on the device id.
  const output = hashUnencodedChars(deviceId);

  // Mod the murmurhash value by 10,000 to get the remainder value
  // Divide the remainder value by 10,000 to get the bucket value (a float between 0 and 1)
  // Multiply the bucket value by the total number of branches and return the rounded value.
  const value = ((Math.abs(output) % 10000) / 10000) * 100;

  return Math.round(value * 100) / 100; // two decimal places
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
  clientId,
  activityId,
  visitorId,
  salt = CAMPAIGN_BUCKET_SALT
) {
  // Generate a device id based on visitorId, clientCode, campaignId and a salt value
  const deviceId = [
    clientId,
    activityId,
    typeof visitorId === "string" ? visitorId : getOrCreateVisitorId(visitorId),
    salt
  ].join(".");

  return calculateAllocationMemoized(deviceId);
}
