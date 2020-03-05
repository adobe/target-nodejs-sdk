/**
 * @param {import("../generated-delivery-api-client/models/DeliveryResponse").DeliveryResponse} response
 */
const { ATTRIBUTE_NOT_EXIST } = require("./messages");

function createIndexed(response) {
  const result = {};

  ["prefetch", "execute"].forEach(requestType => {
    if (
      typeof response[requestType] !== "undefined" &&
      typeof response[requestType].mboxes !== "undefined" &&
      response[requestType].mboxes instanceof Array
    ) {
      response[requestType].mboxes.forEach(mbox => {
        const { name, options } = mbox;
        options.forEach(option => {
          const { type, content } = option;
          if (type === "json" && typeof content !== "undefined") {
            result[name] = Object.assign({}, result[name], content);
          }
        });
      });
    }
  });
  return result;
}

/**
 * @param {String} mbox The name of an mbox that contains JSON content attributes, required
 * @param {import("../generated-delivery-api-client/models/DeliveryResponse").DeliveryResponse} deliveryResponse
 */
function AttributesProvider(mbox, deliveryResponse) {
  const indexed = createIndexed(deliveryResponse);

  function getValue(key) {
    // console.log(mbox, key, indexed, indexed['jason-flags']);
    if (
      !Object.prototype.hasOwnProperty.call(indexed, mbox) ||
      !Object.prototype.hasOwnProperty.call(indexed[mbox], key)
    ) {
      return new Error(ATTRIBUTE_NOT_EXIST(key, mbox));
    }

    return indexed[mbox][key];
  }

  function getAsObject() {
    return {
      ...indexed[mbox]
    };
  }

  return {
    getValue: key => getValue(key),
    asObject: key => getAsObject(key)
  };
}

module.exports = AttributesProvider;
