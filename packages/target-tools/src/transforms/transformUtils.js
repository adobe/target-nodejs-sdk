import {
  AuthenticatedStateAEP,
  ChannelTypeAEP,
  ContentTypeAEP,
  DeviceTypeAEP
} from "@adobe/aep-edge-tools";
import {
  AuthenticatedState,
  ChannelType,
  DEFAULT_GLOBAL_MBOX,
  DeviceType,
  OptionType
} from "../constants";
import { isArray, isNumber } from "../lodash";
import { isUndefined, objectWithoutUndefinedValues } from "../utils";

const MINUTES_PER_HOUR = 60;

export function targetToAepAuthenticatedState(targetAuthenticatedState) {
  if (targetAuthenticatedState === AuthenticatedState.Unknown) {
    return AuthenticatedStateAEP.Ambiguous;
  }

  if (targetAuthenticatedState === AuthenticatedState.Authenticated) {
    return AuthenticatedStateAEP.Authenticated;
  }

  if (targetAuthenticatedState === AuthenticatedState.LoggedOut) {
    return AuthenticatedStateAEP.LoggedOut;
  }

  return AuthenticatedStateAEP.Ambiguous;
}

export function targetDeviceTypeToXdm(targetDeviceType) {
  if (targetDeviceType === DeviceType.Phone) {
    return DeviceTypeAEP.Mobile;
  }

  if (targetDeviceType === DeviceType.Tablet) {
    return DeviceTypeAEP.Tablet;
  }

  return undefined;
}

export function targetChannelToXdm(targetChannel) {
  if (targetChannel === ChannelType.Web) {
    return ChannelTypeAEP.Browser;
  }

  if (targetChannel === ChannelType.Mobile) {
    return ChannelTypeAEP.Browser;
  }

  return undefined;
}

export function createIdentityItem(id, authenticatedState, isPrimary) {
  return {
    id,
    authenticatedState,
    primary: isPrimary
  };
}

export function toHours(minutesValue) {
  if (!isNumber(minutesValue)) {
    return undefined;
  }

  return minutesValue / MINUTES_PER_HOUR;
}

export function targetProductToAEP(product) {
  if (isUndefined(product)) {
    return undefined;
  }

  const { id, categoryId } = product;

  return {
    SKU: id,
    category: categoryId
  };
}

export function targetOrderToAEP(order) {
  if (isUndefined(order)) {
    return undefined;
  }

  const { id, total, purchasedProductIds } = order;

  return {
    order: {
      purchaseId: id,
      priceTotal: total
    },
    purchases: {
      id:
        isArray(purchasedProductIds) && purchasedProductIds.length > 0
          ? purchasedProductIds[0]
          : undefined
    }
  };
}

export function aepFormatToTargetOptionType(format) {
  if (format === ContentTypeAEP.HTML) {
    return OptionType.Html;
  }

  if (format === ContentTypeAEP.DOM_ACTION) {
    return OptionType.Actions;
  }

  if (format === ContentTypeAEP.JSON) {
    return OptionType.Json;
  }

  if (format === ContentTypeAEP.METRIC_ACTION) {
    return OptionType.Dynamic;
  }

  if (format === ContentTypeAEP.URI_LIST) {
    return OptionType.Redirect;
  }

  return undefined;
}

export function isGlobalMbox(mboxName) {
  return mboxName === DEFAULT_GLOBAL_MBOX;
}

export const byIndex = (itemA, itemB) =>
  (itemA.index || 0) - (itemB.index || 0);

export function sanitize(object) {
  return objectWithoutUndefinedValues(object, true);
}

export /**
 *
 * @param {string} key
 * @param {array} list
 * @returns {object}
 */
function indexBy(key, list) {
  return list.reduce((indexed, item) => {
    const keyValue = item[key];
    // eslint-disable-next-line no-param-reassign
    indexed[keyValue] = item;
    return indexed;
  }, {});
}
