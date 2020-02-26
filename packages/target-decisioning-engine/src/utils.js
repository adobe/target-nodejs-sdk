/* eslint-disable prefer-destructuring,import/prefer-default-export */
const Url = require("url-parse");

function caseSensitiveVersion(caseSenstiveString, lowercaseString) {
  const start = caseSenstiveString.toLowerCase().indexOf(lowercaseString);
  const end = start + lowercaseString.length;

  return caseSenstiveString.substring(start, end);
}

export function parseURL(url) {
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
