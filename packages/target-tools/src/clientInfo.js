import { reduce } from "./lodash";
import { isDefined } from "./utils";

const UNKNOWN = "unknown";

const withVersion = (matcher, matches) => {
  const version =
    (matches && matches.length > matcher.versionGroupIndex
      ? matches[matcher.versionGroupIndex]
      : matcher.version) || "-1";

  const majorVersion =
    typeof version === "string" ? parseInt(version.split(".")[0], 10) : -1;

  return {
    name: matcher.name,
    version: majorVersion
  };
};

/**
 *
 * @param {Array<Object>} matchersList
 */
function matchUserAgent(matchersList, processFunc) {
  // eslint-disable-next-line no-param-reassign
  processFunc =
    typeof processFunc === "function" ? processFunc : matcher => matcher.name;

  return function checkMatches(userAgent) {
    for (let i = 0; i < matchersList.length; i += 1) {
      const matcher = matchersList[i];

      const matches = userAgent.match(matcher.regex);

      if (matches) {
        return processFunc(matcher, matches);
      }
    }
    return processFunc({ name: UNKNOWN });
  };
}

/**
 *
 * @param {string} userAgent
 * @return {{name: string, version: number}}
 */
export const browserFromUserAgent = (userAgent = "") =>
  matchUserAgent(
    [
      {
        name: "Edge",
        regex: /(edge|edgios|edga|edg)\/((\d+)?[\w.]+)/i,
        versionGroupIndex: 2
      },
      {
        name: "Mobile Safari",
        regex: /version\/([\w.]+).+?mobile\/\w+\s(safari)/i,
        versionGroupIndex: 1
      },
      {
        name: "Safari",
        regex: /version\/([\w.]+).+?(mobile\s?safari|safari)/i,
        versionGroupIndex: 1
      },
      { name: "Chrome", regex: /(chrome)\/v?([\w.]+)/i, versionGroupIndex: 2 },
      {
        name: "Firefox",
        regex: /(firefox)\/([\w.-]+)$/i,
        versionGroupIndex: 2
      },
      { name: "IE", regex: /(?:ms|\()(ie)\s([\w.]+)/i, versionGroupIndex: 2 },
      {
        name: "IE",
        regex: /(trident).+rv[:\s]([\w.]+).+like\sgecko/i,
        versionGroupIndex: 2,
        version: 11
      }
    ],
    withVersion
  )(userAgent);

/**
 *
 * @param {string} userAgent
 * @return {string}
 */
export const operatingSystemFromUserAgent = userAgent =>
  matchUserAgent([
    { name: "iOS", regex: /iPhone|iPad|iPod/ },
    { name: "Android", regex: /Android [0-9.]+;/ },
    { name: "Linux", regex: / Linux / },
    { name: "Unix", regex: /FreeBSD|OpenBSD|CrOS/ },
    { name: "Windows", regex: /[( ]Windows / },
    { name: "Mac OS", regex: /Macintosh;/ }
  ])(userAgent);

/**
 *
 * @param {string} userAgent
 * @return {string}
 */
export const deviceTypeFromUserAgent = userAgent =>
  matchUserAgent([
    { name: "iPod", regex: /iPod/ },
    { name: "iPhone", regex: /iPhone/ },
    { name: "iPad", regex: /iPad/ },
    { name: "Nokia", regex: /SymbOS|Maemo/ },
    { name: "Windows Phone", regex: /IEMobile/ },
    { name: "Blackberry", regex: /BlackBerry/ },
    { name: "Android", regex: /Android [0-9.]+;/ },
    { name: "Desktop", regex: /.*/ }
  ])(userAgent);

/**
 *
 * @param {string} browserUAWithVersion Sec-CH-UA or Sec-CH-UA-Full-Version-List
 * @return {{name: string, version: number}}
 */
export const browserFromClientHintsUA = (browserUAWithVersion = "") =>
  matchUserAgent(
    [
      {
        name: "Chrome",
        versionGroupIndex: 1,
        regex: /Chrome";v="([0-9.]+)"/i
      },
      {
        name: "Edge",
        versionGroupIndex: 1,
        regex: /Edge";v="([0-9.]+)"/i
      },
      {
        name: "Safari",
        versionGroupIndex: 1,
        regex: /Safari";v="([0-9.]+)"/i
      },
      {
        name: "Firefox",
        versionGroupIndex: 1,
        regex: /Firefox";v="([0-9.]+)"/i
      }
    ],
    withVersion
  )(browserUAWithVersion);

/**
 *
 * @param {string} userAgent
 * @param {import("../delivery-api-client/models/ClientHints").ClientHints} clientHints
 * @return {{name: string, version: number}}
 */
export const browserFromUserAgentOrClientHintUA = (
  userAgent = "",
  clientHints = {}
) => {
  const { browserUAWithFullVersion, browserUAWithMajorVersion } = clientHints;
  return reduce(
    (accumulated, current) => ({
      name: current.name !== UNKNOWN ? current.name : accumulated.name,
      version: current.version >= 0 ? current.version : accumulated.version
    }),
    { name: UNKNOWN, version: -1 },
    [
      browserFromUserAgent(userAgent),
      browserFromClientHintsUA(
        browserUAWithFullVersion || browserUAWithMajorVersion
      )
    ]
  );
};

/**
 *
 * @param {string} userAgent
 * @param {import("../delivery-api-client/models/ClientHints").ClientHints} clientHints
 * @return {string}
 */
export const operatingSystemFromUserAgentOrClientHints = (
  userAgent,
  clientHints = {}
) => {
  const { platform } = clientHints;

  return isDefined(platform)
    ? platform
    : operatingSystemFromUserAgent(userAgent);
};
