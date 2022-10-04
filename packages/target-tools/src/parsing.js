import { isString } from "./lodash";
import { parseURI } from "./index";

const psl = require("psl");

export default function parseURL(url) {
  if (!isString(url)) {
    // eslint-disable-next-line no-param-reassign
    url = "";
  }
  const parsed = parseURI(url) || {};

  const { host = "", path = "", query = "", anchor = "" } = parsed;

  const result = {
    url,
    path,
    query,
    fragment: anchor
  };

  if (typeof host !== "string" || !psl.isValid(host)) {
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
