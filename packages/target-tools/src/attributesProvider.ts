/* eslint-disable import/prefer-default-export */

import { assign } from "./lodash";
import { ATTRIBUTE_NOT_EXIST } from "./messages";
import { isDefined, isUndefined } from "./utils";
import { DeliveryResponse } from "../delivery-api-client";

type IndexedAttributes = { [key: string]: { [key: string]: any } };

function createIndexed(response: DeliveryResponse): IndexedAttributes {
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
            result[name] = assign({}, result[name], content);
          }
        });
      });
    }
  });
  return result;
}

export function AttributesProvider(offersResponse: {
  response: DeliveryResponse;
}): { [key: string]: any } {
  const indexed: IndexedAttributes = createIndexed(offersResponse.response);

  function getValue(mboxName: string, key: string): any {
    if (
      !Object.prototype.hasOwnProperty.call(indexed, mboxName) ||
      !Object.prototype.hasOwnProperty.call(indexed[mboxName], key)
    ) {
      return new Error(ATTRIBUTE_NOT_EXIST(key, mboxName));
    }

    return indexed[mboxName][key];
  }

  function getAsObject(mboxName: string): IndexedAttributes {
    if (isUndefined(mboxName)) {
      return { ...indexed };
    }

    return {
      ...indexed[mboxName]
    };
  }

  return {
    getValue: (mboxName: string, key: string) => getValue(mboxName, key),
    asObject: (mboxName: string = undefined) => getAsObject(mboxName),
    toJSON: () => getAsObject(undefined),
    getResponse: () => offersResponse
  };
}
