import {
  AuthenticatedState,
  AuthenticatedStateAEP,
  ChannelType,
  ChannelTypeAEP,
  DeviceType,
  DeviceTypeAEP
} from "./constants";
import { isNumber } from "./lodash";

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
