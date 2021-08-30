import {
  AuthenticatedStateAEP,
  ChannelTypeAEP,
  DeviceTypeAEP
} from "@adobe/aep-edge-tools";
import {
  AuthenticatedState,
  ChannelType,
  DEFAULT_GLOBAL_MBOX,
  DeviceType
} from "../constants";
import { isArray, isNumber } from "../lodash";
import { isUndefined } from "../utils";

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

export function isGlobalMbox(mboxName) {
  return mboxName === DEFAULT_GLOBAL_MBOX;
}
