/* eslint-disable prefer-destructuring,import/prefer-default-export */

import {
  DEFAULT_GLOBAL_MBOX,
  ENVIRONMENT_PROD,
  getMboxNames,
  getViewNames,
  hasRequestedViews,
  includes,
  isDefined,
  isFunction,
  isObject,
  isPojo,
  isString,
  isUndefined,
  parseURI
} from "@adobe/target-tools";

import Messages from "./messages";
import {
  ARTIFACT_FILENAME,
  ARTIFACT_FORMAT_BINARY,
  ARTIFACT_FORMAT_DEFAULT,
  ARTIFACT_FORMAT_JSON,
  ARTIFACT_FORMATS,
  CDN_BASE_PATH,
  REGEX_ARTIFACT_FILENAME_BINARY,
  SUPPORTED_ARTIFACT_MAJOR_VERSION
} from "./constants";

/**
 *
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @return {string}
 */
export function getRuleKey(rule) {
  return rule.ruleKey;
}

/**
 * @param {string} host
 * @returns {import("../types/DecisioningContext").DomainContext}
 */
export function parseDomainBasic(host) {
  const result = {};
  const domainParts = host.split(".");

  switch (domainParts.length) {
    case 1:
      result.subdomain = "";
      result.domain = host;
      result.topLevelDomain = "";
      break;
    case 2:
      result.subdomain = "";
      result.domain = host;
      result.topLevelDomain = domainParts[1];
      break;
    case 3:
      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
      result.domain = host;
      result.topLevelDomain = domainParts[2];
      break;
    case 4:
      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
      result.domain = host;
      result.topLevelDomain = `${domainParts[2]}.${domainParts[3]}`;
      break;
    default:
      break;
  }

  return result;
}

/**
 *
 * @param {string} url
 * @param { import("../types/DecisioningContext").ParseDomainFunc } parseDomain
 * @returns {{path: string, fragment: string, topLevelDomain?: string, query: string, domain?: string, subdomain?: string, url: string}}
 */
export function parseURL(url, parseDomain = parseDomainBasic) {
  if (!isString(url)) {
    // eslint-disable-next-line no-param-reassign
    url = "";
  }

  const parsed = parseURI(url) || {};

  const { host = "", path = "", query = "", anchor = "" } = parsed;

  return {
    url,
    path,
    query,
    fragment: anchor,
    ...parseDomain(host)
  };
}

/**
 *
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config
 * @returns {import("../types/DecisioningContext").ParseDomainFunc}
 */
export function getParseDomainImpl(config) {
  return isFunction(config.parseDomainImpl)
    ? config.parseDomainImpl
    : parseDomainBasic;
}

/**
 * @param { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} request
 */
export function hasRemoteDependency(artifact, request) {
  // TODO: memoize this
  if (isUndefined(artifact)) {
    throw new Error(Messages.ARTIFACT_NOT_AVAILABLE);
  }

  const requestedMboxes = Array.from(getMboxNames(request));

  if (
    (request.execute && isPojo(request.execute.pageLoad)) ||
    (request.prefetch && isPojo(request.prefetch.pageLoad))
  ) {
    requestedMboxes.push(DEFAULT_GLOBAL_MBOX);
  }

  const requestedViews = Array.from(getViewNames(request));

  const {
    remoteMboxes = [],
    localMboxes = [],
    remoteViews = [],
    localViews = []
  } = artifact;

  const mboxesThatRequireRemote = new Set([
    ...remoteMboxes.filter(mboxName => includes(mboxName, requestedMboxes)),
    ...requestedMboxes.filter(mboxName => !includes(mboxName, localMboxes))
  ]);

  const viewsThatRequireRemote =
    hasRequestedViews(request) && requestedViews.length === 0
      ? new Set(remoteViews)
      : new Set([
          ...remoteViews.filter(viewName => includes(viewName, requestedViews)),
          ...requestedViews.filter(viewName => !includes(viewName, localViews))
        ]);

  return {
    remoteNeeded:
      mboxesThatRequireRemote.size > 0 || viewsThatRequireRemote.size > 0,
    remoteMboxes: Array.from(mboxesThatRequireRemote),
    remoteViews: Array.from(viewsThatRequireRemote)
  };
}

/**
 * @param { string } semanticVersion
 * @param { number } majorVersion
 */
export function matchMajorVersion(semanticVersion, majorVersion) {
  // eslint-disable-next-line no-unused-vars
  const [major, minor, patch] = semanticVersion
    .split(".")
    .map(value => parseInt(value, 10));
  return majorVersion === major;
}

export function cloneDeep(obj) {
  if (isDefined(obj)) {
    return JSON.parse(JSON.stringify(obj));
  }

  return undefined;
}

export function getArtifactFileName(artifactFormat = ARTIFACT_FORMAT_DEFAULT) {
  // eslint-disable-next-line no-param-reassign
  artifactFormat = includes(artifactFormat, ARTIFACT_FORMATS)
    ? artifactFormat
    : ARTIFACT_FORMAT_DEFAULT;

  return ARTIFACT_FILENAME[artifactFormat];
}
/**
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 * @param {Boolean} addPropertyToken
 */
export function determineArtifactLocation(config) {
  const { client, propertyToken, artifactFormat, artifactLocation } = config;
  if (isString(artifactLocation)) {
    return artifactLocation;
  }

  const cdnBaseUrl = `https://${CDN_BASE_PATH}`;
  const targetEnvironment =
    config.environment != null
      ? config.environment.toLowerCase()
      : ENVIRONMENT_PROD;

  return [
    cdnBaseUrl,
    client,
    targetEnvironment,
    `v${SUPPORTED_ARTIFACT_MAJOR_VERSION}`,
    isDefined(propertyToken) ? propertyToken : undefined,
    getArtifactFileName(artifactFormat)
  ]
    .filter(value => isDefined(value))
    .join("/");
}

/**
 *
 * @param {string} artifactLocation
 */
export function determineArtifactFormat(artifactLocation) {
  return artifactLocation.match(REGEX_ARTIFACT_FILENAME_BINARY) != null
    ? ARTIFACT_FORMAT_BINARY
    : ARTIFACT_FORMAT_JSON;
}

/**
 * firstMatch looks through a list of objects (in order) and returns a value from the first object that has a matching key
 * @param key
 * @param {Array<Object>} searchObjects
 * @param defaultValue
 */
export function firstMatch(key, searchObjects = [], defaultValue = undefined) {
  for (let i = 0; i < searchObjects.length; i += 1) {
    const haystack = searchObjects[i];
    if (isObject(haystack) && isDefined(haystack[key])) {
      return haystack[key];
    }
  }
  return defaultValue;
}

/**
 * @param {object} object
 * @param { array<string> } keys
 * @param { object } value
 */
function setNestedValue(object, keys, value) {
  let currentObj = object;
  for (let i = 0; i < keys.length - 1; i += 1) {
    currentObj[keys[i]] = currentObj[keys[i]] || {};
    currentObj = currentObj[keys[i]];
  }
  currentObj[keys[keys.length - 1]] = value;
}

/**
 * @param {string} key
 * @returns {boolean}
 */
function isExpandableKey(key) {
  const keyLength = key.length;

  return (
    includes(".", key) &&
    !includes("..", key) &&
    key[0] !== "." &&
    key[keyLength - 1] !== "."
  );
}

/**
 * @param {object} object
 * @return {object} object
 */
export function unflatten(object) {
  const result = {};
  Object.keys(object).forEach(key => {
    if (isExpandableKey(key)) {
      setNestedValue(result, key.split("."), object[key]);
    } else {
      result[key] = object[key];
    }
  });
  return result;
}
