/* eslint-disable import/prefer-default-export */

import { ATTRIBUTE_NOT_EXIST } from "./messages";
import { isDefined, isUndefined } from "./utils";

/**
 * @param {import("../delivery-api-client/models/DeliveryResponse").DeliveryResponse} response
 */
function createIndexed(response) {
  const result = {};

  ["prefetch", "execute"].forEach(requestType => {
    if (
      isDefined(response[requestType]) &&
      isDefined(response[requestType].mboxes) &&
      response[requestType].mboxes instanceof Array
    ) {
      response[requestType].mboxes.forEach(mbox => {
        const { name, options = [] } = mbox;
        options.forEach(option => {
          const { type, content } = option;
          if (type === "json" && isDefined(content)) {
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
      return new Error(ATTRIBUTE_NOT_EXIST(key, mboxName));
    }

    return indexed[mboxName][key];
  }

  /**
   * @param {string} mboxName
   */
  function getAsObject(mboxName) {
    if (isUndefined(mboxName)) {
      return { ...indexed };
    }

    return {
      ...indexed[mboxName]
    };
  }

  return {
    getValue: (mboxName, key) => getValue(mboxName, key),
    asObject: mboxName => getAsObject(mboxName),
    toJSON: () => getAsObject(undefined),
    getResponse: () => offersResponse
  };
}
