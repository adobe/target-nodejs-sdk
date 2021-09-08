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
  MetricType,
  OptionType
} from "../constants";
import { includes, isArray, isNumber, values } from "../lodash";
import { isUndefined, objectWithoutUndefinedValues } from "../utils";

const MINUTES_PER_HOUR = 60;
const HEAD = "head";

const VEC_ACTION_PROPERTY_MAP = [
  { aep: "type", target: "type" },
  { aep: "content", target: "content" },
  { aep: "selector", target: "selector" },
  { aep: "prehidingSelector", target: "cssSelector" }
];

const METRIC_ACTION_PROPERTY_MAP = [
  { aep: "type", target: "type" },
  { aep: "selector", target: "selector" },
  { aep: "???", target: "eventToken" }
];

const METRIC_OPTION_TYPES = values(MetricType);
export const isMetricOptionType = value => includes(value, METRIC_OPTION_TYPES);

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

export function aepFormatToTargetOptionType(aepFormat) {
  if (aepFormat === ContentTypeAEP.HTML) {
    return OptionType.Html;
  }

  if (aepFormat === ContentTypeAEP.DOM_ACTION) {
    return OptionType.Actions;
  }

  if (aepFormat === ContentTypeAEP.JSON) {
    return OptionType.Json;
  }

  if (aepFormat === ContentTypeAEP.METRIC_ACTION) {
    return OptionType.Dynamic;
  }

  if (aepFormat === ContentTypeAEP.URI_LIST) {
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
function indexBy(key, list, group = false) {
  return list.reduce((indexed, item) => {
    const keyValue = item[key];

    if (group) {
      if (isUndefined(indexed[keyValue])) {
        // eslint-disable-next-line no-param-reassign
        indexed[keyValue] = [];
      }

      indexed[keyValue].push(item);
    } else {
      // eslint-disable-next-line no-param-reassign
      indexed[keyValue] = item;
    }

    return indexed;
  }, {});
}

function createActionWithPropertyReplacements(propertyMapping, data) {
  const action = {};

  propertyMapping.forEach(property => {
    const { aep, target } = property;
    if (Object.prototype.hasOwnProperty.call(data, aep)) {
      action[target] = data[aep];
    }
  });

  return action;
}

export function createVecAction(data) {
  return createActionWithPropertyReplacements(VEC_ACTION_PROPERTY_MAP, data);
}

export function isFormBasedActivity(data) {
  const { selector } = data;
  return selector === HEAD;
}

export function createFormBasedAction(item) {
  const { meta = {}, data = {} } = item;

  const { type = "", content = "" } = data;

  return {
    content,
    responseTokens: { ...meta },
    type: type.replace("set", "").toLowerCase()
  };
}

export function createGlobalActions(item) {
  const { data } = item;

  if (isFormBasedActivity(data)) {
    return createFormBasedAction(item);
  }
  return [createVecAction(data)];
}

export function createMetricAction(data) {
  return createActionWithPropertyReplacements(METRIC_ACTION_PROPERTY_MAP, data);
}

export function aepItemToTargetOption(item) {
  const { data = {}, meta = {} } = item;
  let { content } = data;
  const { type: actionType } = data;

  const optionType = aepFormatToTargetOptionType(data.format);

  if (isMetricOptionType(actionType)) {
    return createMetricAction(data);
  }

  if (optionType === OptionType.Actions) {
    content = createGlobalActions(item);
  }

  return {
    type: optionType,
    content,
    responseTokens: { ...meta }
  };
}
