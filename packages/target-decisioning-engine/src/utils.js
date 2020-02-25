/* eslint-disable prefer-destructuring,import/prefer-default-export */
const parseUrl = require("parse-url");

export function parseURL(url) {
  const parsed = parseUrl(url);

  const result = {
    url: parsed.href,
    path: parsed.pathname,
    query: parsed.search,
    fragment: parsed.hash
  };

  const domainParts = parsed.resource.split(".");

  switch (domainParts.length) {
    case 1:
      result.subdomain = undefined;
      result.domain = domainParts[0];
      result.topLevelDomain = undefined;
      break;
    case 2:
      result.subdomain = undefined;
      result.domain = domainParts[0];
      result.topLevelDomain = domainParts[1];
      break;
    case 3:
      result.subdomain = domainParts[0] === "www" ? undefined : domainParts[0];
      result.domain = domainParts[1];
      result.topLevelDomain = domainParts[2];
      break;
    case 4:
      result.subdomain = domainParts[0] === "www" ? null : domainParts[0];
      result.domain = domainParts[1];
      result.topLevelDomain = `${domainParts[2]}.${domainParts[3]}`;
      break;
    default:
      break;
  }
  return result;
}
