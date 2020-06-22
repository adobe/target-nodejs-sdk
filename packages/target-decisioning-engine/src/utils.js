/* eslint-disable prefer-destructuring,import/prefer-default-export */
import Url from "url-parse";
import {
  ENVIRONMENT_PROD,
  getLogger,
  getMboxNames,
  isBrowser,
  isDefined,
  isUndefined,
  POSSIBLE_ENVIRONMENTS
} from "@adobe/target-tools";
import Messages from "./messages";
import { RequestType } from "./enums";
import { CDN_BASE, SUPPORTED_ARTIFACT_MAJOR_VERSION } from "./constants";

function caseSensitiveVersion(caseSenstiveString, lowercaseString) {
  const start = caseSenstiveString.toLowerCase().indexOf(lowercaseString);
  const end = start + lowercaseString.length;

  return caseSenstiveString.substring(start, end);
}

/**
 *
 * @param {import("../types/DecisioningArtifact").Rule} rule
 * @return {string}
 */
export function getRuleKey(rule) {
  const { locationType, activityId, locationId = 0 } = rule.meta;

  return locationType === RequestType.VIEW
    ? `${activityId}-${locationId}`
    : `${activityId}`;
}

export function parseURL(url) {
  if (typeof url !== "string") {
    // eslint-disable-next-line no-param-reassign
    url = "";
  }

  const parsed = new Url(url);

  const result = {
    url,
    path: parsed.pathname,
    query: parsed.query.replace("?", ""),
    fragment: parsed.hash.replace("#", "")
  };

  const hostnameCaseSensitive = caseSensitiveVersion(url, parsed.hostname);

  const domainParts = hostnameCaseSensitive.split(".");

  switch (domainParts.length) {
    case 1:
      result.subdomain = "";
      result.domain = hostnameCaseSensitive;
      result.topLevelDomain = "";
      break;
    case 2:
      result.subdomain = "";
      result.domain = hostnameCaseSensitive;
      result.topLevelDomain = domainParts[1];
      break;
    case 3:
      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
      result.domain = hostnameCaseSensitive;
      result.topLevelDomain = domainParts[2];
      break;
    case 4:
      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
      result.domain = hostnameCaseSensitive;
      result.topLevelDomain = `${domainParts[2]}.${domainParts[3]}`;
      break;
    default:
      break;
  }
  return result;
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

  const requestedMboxes = getMboxNames(request);

  const remoteMboxes = (artifact.remoteMboxes || []).filter(mboxName =>
    requestedMboxes.has(mboxName)
  );

  return {
    remoteNeeded: remoteMboxes.length > 0,
    remoteMboxes
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

export function getCdnBasePath(environment = ENVIRONMENT_PROD) {
  const env = POSSIBLE_ENVIRONMENTS.includes(environment)
    ? environment
    : ENVIRONMENT_PROD;

  return CDN_BASE[env];
}

/**
 *
 * @param {String} environmentName
 * @param logger
 */
export function getValidEnvironment(environmentName, logger) {
  const isValid = POSSIBLE_ENVIRONMENTS.includes(environmentName);

  if (!isValid) {
    getLogger(logger).debug(
      Messages.INVALID_ENVIRONMENT(environmentName, ENVIRONMENT_PROD)
    );
  }

  return isValid ? environmentName : ENVIRONMENT_PROD;
}

/**
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config
 */
export function getTargetEnvironment(config) {
  const { environment = ENVIRONMENT_PROD } = config;

  return getValidEnvironment(environment, config.logger);
}

/**
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config
 */
export function getCdnEnvironment(config) {
  const { cdnEnvironment = ENVIRONMENT_PROD } = config;

  return getValidEnvironment(cdnEnvironment, config.logger);
}

/**
 * The ArtifactProvider initialize method
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 * @param {Boolean} addPropertyToken
 */
export function determineArtifactLocation(
  config,
  addPropertyToken = isBrowser()
) {
  const { client, propertyToken } = config;
  const targetEnvironment = getTargetEnvironment(config);
  const cdnEnvironment = getCdnEnvironment(config);

  return [
    getCdnBasePath(cdnEnvironment),
    client,
    targetEnvironment,
    `v${SUPPORTED_ARTIFACT_MAJOR_VERSION}`,
    addPropertyToken ? propertyToken : undefined,
    "rules.json"
  ]
    .filter(value => isDefined(value))
    .join("/");
}
