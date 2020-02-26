import MurmurHash3 from "imurmurhash";
import TargetTools from "@adobe/target-tools";

/**
 *
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @returns {string} first non-blank marketingCloudVisitorId, tntId, thirdPartyId
 */
export function getOrCreateVisitorId(visitorId) {
  if (visitorId) {
    return (
      visitorId.marketingCloudVisitorId ||
      visitorId.tntId ||
      visitorId.thirdPartyId ||
      TargetTools.createUUID()
    );
  }
  return TargetTools.createUUID();
}

/**
 *
 * The TargetDecisioningEngine initialize method
 * @param {String} clientId Target Client Id, required
 * @param {String} activityId Target Activity Id, required
 * @param { import("../../target-nodejs-sdk/generated-delivery-api-client/models/VisitorId").VisitorId } visitorId
 * @param {String} salt salt value, optional
 */
export function computeAllocation(clientId, activityId, visitorId, salt = "") {
  // TODO: may want to memoize this

  // Generate a unique visitor ID and persist it.
  const vid = getOrCreateVisitorId(visitorId); // first non-blank marketingCloudVisitorId, tntId, thirdPartyId

  // Generate a device id based on visitorId, clientCode, campaignId and a salt value
  const deviceId = `${clientId}.${activityId}.${vid}.${salt}`;

  // Use the MurmurHash3 (32-bit) hashing algorithm to generate a numeric 10-digit hash based on the device id.
  const output = MurmurHash3(deviceId).result();

  // Mod the murmurhash value by 10,000 to get the remainder value
  // Divide the remainder value by 10,000 to get the bucket value (a float between 0 and 1)
  // Multiply the bucket value by the total number of branches and return the rounded value.
  const value = ((Math.abs(output) % 10000) / 10000) * 100;

  return Math.round(value * 100) / 100; // two decimal places
}
