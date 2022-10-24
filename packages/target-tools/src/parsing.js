/* eslint-disable import/prefer-default-export */
const psl = require("psl");

/**
 * @param {string} host
 * @returns {import("../../target-decisioning-engine/types/DecisioningContext").DomainContext}
 */
export function parseDomainPsl(host) {
  const result = {};

  if (!psl.isValid(host)) {
    result.subdomain = "";
    result.domain = host;
    result.topLevelDomain = "";
    return result;
  }

  const parseResult = psl.parse(host);

  if (parseResult.subdomain) {
    result.subdomain = parseResult.subdomain.startsWith("www")
      ? parseResult.subdomain.substring(4)
      : parseResult.subdomain;
  } else {
    result.subdomain = "";
  }

  result.domain = parseResult.domain;
  result.topLevelDomain = parseResult.tld;

  return result;
}
