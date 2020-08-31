/* eslint-disable prefer-destructuring,import/prefer-default-export */

import {
  ENVIRONMENT_PROD,
  getLogger,
  getMboxNames,
  getViewNames,
  hasRequestedViews,
  includes,
  isBrowser,
  isDefined,
  isUndefined,
  parseURI,
  POSSIBLE_ENVIRONMENTS
} from "@adobe/target-tools";

import Messages from "./messages";
import {
  ARTIFACT_FORMAT_BINARY,
  ARTIFACT_FILENAME,
  ARTIFACT_FORMAT_JSON,
  CDN_BASE,
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

export function parseURL(url) {
  if (typeof url !== "string") {
    // eslint-disable-next-line no-param-reassign
    url = "";
  }

  const parsed = parseURI(url);

  const { host, path, query, anchor } = parsed;

  const result = {
    url,
    path,
    query,
    fragment: anchor
  };

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
 * @param { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} request
 */
export function hasRemoteDependency(artifact, request) {
  // TODO: memoize this
  if (isUndefined(artifact)) {
    throw new Error(Messages.ARTIFACT_NOT_AVAILABLE);
  }

  const requestedMboxes = Array.from(getMboxNames(request));
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

/**
 *
 * @param {String} environmentName
 * @param logger
 */
export function getValidEnvironment(environmentName, logger) {
  const isValid = includes(environmentName, POSSIBLE_ENVIRONMENTS);

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
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config
 * @return {string}
 */
export function getCdnBasePath(config) {
  let { cdnBasePath } = config;

  if (!isDefined(cdnBasePath)) {
    const cdnEnvironment = getCdnEnvironment(config);

    const env = includes(cdnEnvironment, POSSIBLE_ENVIRONMENTS)
      ? cdnEnvironment
      : ENVIRONMENT_PROD;
    cdnBasePath = CDN_BASE[env];
  }

  return `https://${cdnBasePath}`;
}

/**
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config
 * @return {string}
 */
export function getGeoLookupPath(config) {
  const cdnBasePath = getCdnBasePath(config);
  return `${cdnBasePath}/v${SUPPORTED_ARTIFACT_MAJOR_VERSION}/geo`;
}

/**
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 * @param {Boolean} addPropertyToken
 */
export function determineArtifactLocation(
  config,
  addPropertyToken = isBrowser()
) {
  const { client, propertyToken } = config;
  const targetEnvironment = getTargetEnvironment(config);

  return [
    getCdnBasePath(config),
    client,
    targetEnvironment,
    `v${SUPPORTED_ARTIFACT_MAJOR_VERSION}`,
    addPropertyToken ? propertyToken : undefined,
    ARTIFACT_FILENAME
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
