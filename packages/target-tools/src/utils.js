/**
 * @param {import("../delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target Delivery API request, required
 * @returns {Set<String>} Set of mbox names
 **/
export function getMboxNames(deliveryRequest) {
  const requestMboxes = new Set();

  ["prefetch", "execute"].forEach(type => {
    const mboxes =
      deliveryRequest &&
      deliveryRequest[type] &&
      deliveryRequest[type].mboxes instanceof Array
        ? deliveryRequest[type].mboxes
        : [];
    mboxes.forEach(mbox => {
      requestMboxes.add(mbox.name);
    });
  });

  return requestMboxes;
}

export function isBrowser() {
  return typeof window !== "undefined";
}

export function isNodeJS() {
  return typeof global !== "undefined";
}
