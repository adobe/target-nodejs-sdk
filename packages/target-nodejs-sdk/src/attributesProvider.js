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
 * @param {Array<String>} mboxNames A list of mbox names that contains JSON content attributes, required
 * @param {import("../generated-delivery-api-client/models/DeliveryResponse").DeliveryResponse} deliveryResponse
 */
function AttributesProvider(mboxNames, deliveryResponse) {
  const indexed = createIndexed(deliveryResponse);

  function getValue(mboxName, key) {
    if (
      !Object.prototype.hasOwnProperty.call(indexed, mboxName) ||
      !Object.prototype.hasOwnProperty.call(indexed[mboxName], key)
    ) {
      return new Error(ATTRIBUTE_NOT_EXIST(key, mboxName));
    }

    return indexed[mboxName][key];
  }

  /**
   * @param {string} mboxName
   */
  function getAsObject(mboxName) {
    if (typeof mboxName === "undefined") {
      return { ...indexed };
    }

    return {
      ...indexed[mboxName]
    };
  }

  return {
    getValue: (mboxName, key) => getValue(mboxName, key),
    asObject: mboxName => getAsObject(mboxName)
  };
}

module.exports = AttributesProvider;
