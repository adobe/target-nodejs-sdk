import {
  AuthenticatedStateAEP,
  ChannelTypeAEP,
  DeviceTypeAEP
} from "@adobe/aep-edge-tools";
import { load } from "protobufjs";
import {
  AuthenticatedState,
  ChannelType,
  DEFAULT_GLOBAL_MBOX,
  DeviceType
} from "../constants";
import { isArray, isEmpty, isNumber, isString } from "../lodash";
import { isDefined, isUndefined } from "../utils";

const MINUTES_PER_HOUR = 60;
const ORG_ID_DELIMITER = "@";
const KONDUCTOR_PROTO_FILE = "src/transforms/konductor.proto";
const KONDUCTOR_IDENTITY = "konductor.Identity";

let _konductorIdentity;

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

export const byIndex = (itemA, itemB) =>
  (itemA.index || 0) - (itemB.index || 0);

export function konductorCookieNameSessionId(imsOrgId) {
  if (!isString(imsOrgId) || isEmpty(imsOrgId)) {
    return undefined;
  }

  return `kndctr_${imsOrgId.replace(
    ORG_ID_DELIMITER,
    "_"
  )}_personalization_sessionId`;
}

export function konductorCookieNameIdentity(imsOrgId) {
  if (!isString(imsOrgId) || isEmpty(imsOrgId)) {
    return undefined;
  }

  return `kndctr_${imsOrgId.replace(ORG_ID_DELIMITER, "_")}_identity`;
}

function loadKonductorIdentityProtoBuf() {
  return new Promise((resolve, reject) => {
    if (isDefined(_konductorIdentity)) {
      resolve(_konductorIdentity);
      return;
    }

    load(KONDUCTOR_PROTO_FILE, function (err, root) {
      if (err) {
        reject(err);
      }

      _konductorIdentity = root.lookupType(KONDUCTOR_IDENTITY);

      resolve(_konductorIdentity);
    });
  });
}

export function decodeKonductorIdentity(konductorIdentity) {
  const buffer = Buffer.from(konductorIdentity, "base64");
  return loadKonductorIdentityProtoBuf().then(KonductorIdentity =>
    KonductorIdentity.decode(buffer)
  );
}
