/* eslint-disable import/prefer-default-export */

import { Messages } from "./messages";

/**
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryResponse").DeliveryResponse} response
 */
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
 * @param { OffersResponse } offersResponse
 */
export function AttributesProvider(mboxNames, offersResponse) {
  const indexed = createIndexed(offersResponse.response);

  function getValue(mboxName, key) {
    if (
      !Object.prototype.hasOwnProperty.call(indexed, mboxName) ||
      !Object.prototype.hasOwnProperty.call(indexed[mboxName], key)
    ) {
      return new Error(Messages.ATTRIBUTE_NOT_EXIST(key, mboxName));
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
    asObject: mboxName => getAsObject(mboxName),
    getResponse: () => offersResponse
  };
}
