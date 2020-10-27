/* eslint-disable no-unused-vars */
import {
  includes,
  isDefined,
  isUndefined,
  MetricType,
  objectWithoutUndefinedValues
} from "@adobe/target-tools";
import { OptionType, RequestType } from "./enums";
import {
  ACTIVITY_DECISIONING_METHOD,
  ACTIVITY_ID,
  ACTIVITY_NAME,
  ACTIVITY_TYPE,
  EXPERIENCE_ID,
  EXPERIENCE_NAME,
  GEO_CITY,
  GEO_COUNTRY,
  GEO_LATITUDE,
  GEO_LONGITUDE,
  GEO_STATE,
  LOCATION_ID,
  LOCATION_NAME,
  LOCATION_TYPE,
  OFFER_ID,
  OFFER_NAME,
  OPTION_ID,
  OPTION_NAME
} from "./constants";
import { firstMatch } from "./utils";

const MACRO_PATTERN_REGEX = /\$\{([a-zA-Z0-9_.]*?)\}/gi;

const MACRO_NAME_REPLACEMENTS = {
  campaign: "activity",
  recipe: "experience"
};

const MACRO_NAME_REPLACEMENTS_REGEX = new RegExp(
  Object.keys(MACRO_NAME_REPLACEMENTS).join("|"),
  "gi"
);

const MACRO_NAME_REMOVALS = ["mbox"];

function noBlankOptions(option) {
  return !(isUndefined(option.type) && isUndefined(option.content));
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetail
 * @param tracer
 */
export function prepareExecuteResponse(
  rule,
  mboxResponse,
  requestType,
  requestDetail,
  tracer
) {
  const { metrics = [], options = [] } = mboxResponse;

  const result = {
    ...mboxResponse,
    options: options.filter(noBlankOptions).map(pristineOption => {
      const option = { ...pristineOption };
      delete option.eventToken;
      return option;
    }),
    metrics: metrics.filter(metric => metric.type === MetricType.Click)
  };

  if (result.metrics.length === 0) {
    delete result.metrics;
  }

  return result;
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetail
 * @param tracer
 */
export function preparePrefetchResponse(
  rule,
  mboxResponse,
  requestType,
  requestDetail,
  tracer
) {
  const { options = [] } = mboxResponse;

  const result = {
    ...mboxResponse,
    options: options.map((pristineOption, idx) => {
      let { eventToken } = pristineOption;
      if (
        isUndefined(eventToken) &&
        mboxResponse.metrics.length > idx &&
        mboxResponse.metrics[idx].type === MetricType.Display
      ) {
        // eslint-disable-next-line prefer-destructuring
        eventToken = mboxResponse.metrics[idx].eventToken;
      }
      return {
        ...pristineOption,
        eventToken
      };
    })
  };

  if (requestType !== RequestType.VIEW) {
    delete result.metrics;
  }

  return result;
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetail
 * @param tracer
 */
export function addTrace(
  rule,
  mboxResponse,
  requestType,
  requestDetail,
  tracer
) {
  return {
    ...mboxResponse,
    trace: tracer.getTraceResult()
  };
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetail
 * @param tracer
 */
export function cleanUp(
  rule,
  mboxResponse,
  requestType,
  requestDetail,
  tracer
) {
  const result = objectWithoutUndefinedValues(mboxResponse);

  return result;
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetail
 * @param tracer
 */
export function removePageLoadAttributes(
  rule,
  mboxResponse,
  requestType,
  requestDetail,
  tracer
) {
  const processed = {
    ...mboxResponse
  };

  delete processed.index;
  delete processed.name;
  delete processed.trace;

  return processed;
}

/**
 * @param {import("../types/DecisioningContext").DecisioningContext} context
 * @param {Array<string>} responseTokensInArtifact
 */
export function createResponseTokensPostProcessor(
  context,
  responseTokensInArtifact = []
) {
  const responseTokens = {};
  responseTokens[ACTIVITY_DECISIONING_METHOD] = "on-device";

  if (
    includes(GEO_CITY, responseTokensInArtifact) &&
    isDefined(context.geo.city)
  ) {
    responseTokens[GEO_CITY] = context.geo.city;
  }
  if (
    includes(GEO_COUNTRY, responseTokensInArtifact) &&
    isDefined(context.geo.country)
  ) {
    responseTokens[GEO_COUNTRY] = context.geo.country;
  }
  if (
    includes(GEO_STATE, responseTokensInArtifact) &&
    isDefined(context.geo.region)
  ) {
    responseTokens[GEO_STATE] = context.geo.region;
  }
  if (
    includes(GEO_LATITUDE, responseTokensInArtifact) &&
    isDefined(context.geo.latitude)
  ) {
    responseTokens[GEO_LATITUDE] = context.geo.latitude;
  }
  if (
    includes(GEO_LONGITUDE, responseTokensInArtifact) &&
    isDefined(context.geo.longitude)
  ) {
    responseTokens[GEO_LONGITUDE] = context.geo.longitude;
  }

  /**
   * @param {import("../types/DecisioningArtifact").Rule} rule
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
   */
  return function addResponseTokens(rule, mboxResponse) {
    const meta = rule.meta || {};
    const responseTokensFromMeta = [
      ACTIVITY_ID,
      ACTIVITY_NAME,
      ACTIVITY_TYPE,
      EXPERIENCE_ID,
      EXPERIENCE_NAME,
      LOCATION_ID,
      LOCATION_NAME,
      LOCATION_TYPE,
      OFFER_ID,
      OFFER_NAME,
      OPTION_ID,
      OPTION_NAME
    ].reduce((accumulator, key) => {
      if (includes(key, responseTokensInArtifact) && isDefined(meta[key])) {
        accumulator[key] = meta[key];
      }
      return accumulator;
    }, {});

    const options = mboxResponse.options.map(option => {
      return {
        ...option,
        responseTokens: {
          ...responseTokensFromMeta,
          ...responseTokens
        }
      };
    });

    return {
      ...mboxResponse,
      options
    };
  };
}

/**
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
 * @param { 'mbox'|'view'|'pageLoad' } requestType
 * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetail
 * @param tracer
 */
export function replaceCampaignMacros(
  rule,
  mboxResponse,
  requestType,
  requestDetail,
  tracer
) {
  function addCampainMacroValues(htmlContent) {
    if (!isDefined(htmlContent) || typeof htmlContent !== "string")
      return htmlContent;

    return htmlContent.replace(
      MACRO_PATTERN_REGEX,
      (defaultValue, macroKey) => {
        let parts = macroKey
          .replace(
            MACRO_NAME_REPLACEMENTS_REGEX,
            matched => MACRO_NAME_REPLACEMENTS[matched]
          )
          .split(".");

        if (parts.length > 2) {
          parts = parts.slice(parts.length - 2);
        }

        const key = parts
          .filter(part => !includes(part, MACRO_NAME_REMOVALS))
          .join(".");

        const { parameters = {} } = requestDetail;

        return firstMatch(
          key,
          [rule.meta, requestDetail, parameters],
          defaultValue
        );
      }
    );
  }

  return {
    ...mboxResponse,
    options: mboxResponse.options.map(
      /**
       * @param {import("@adobe/target-tools/delivery-api-client/models/Option").Option} option
       */
      option => {
        if (option.type === OptionType.Html) {
          return {
            ...option,
            content: addCampainMacroValues(option.content)
          };
        }

        if (option.type === OptionType.Actions) {
          return {
            ...option,
            content: option.content.map(action => {
              return {
                ...action,
                content: addCampainMacroValues(action.content)
              };
            })
          };
        }

        return option;
      }
    )
  };
}
