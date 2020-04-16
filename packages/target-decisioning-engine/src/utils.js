/* eslint-disable prefer-destructuring,import/prefer-default-export */
import Url from "url-parse";
import { getMboxNames } from "@adobe/target-tools";
import Messages from "./messages";

function caseSensitiveVersion(caseSenstiveString, lowercaseString) {
  const start = caseSenstiveString.toLowerCase().indexOf(lowercaseString);
  const end = start + lowercaseString.length;

  return caseSenstiveString.substring(start, end);
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
      result.domain = domainParts[0];
      result.topLevelDomain = "";
      break;
    case 2:
      result.subdomain = "";
      result.domain = domainParts[0];
      result.topLevelDomain = domainParts[1];
      break;
    case 3:
      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
      result.domain = domainParts[1];
      result.topLevelDomain = domainParts[2];
      break;
    case 4:
      result.subdomain = domainParts[0] === "www" ? "" : domainParts[0];
      result.domain = domainParts[1];
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
  if (typeof artifact === "undefined") {
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
