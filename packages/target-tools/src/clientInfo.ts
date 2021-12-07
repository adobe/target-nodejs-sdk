interface Matcher {
  name: string;
  regex: RegExp;
  versionGroupIndex?: number;
  version?: number;
}

function matchUserAgent(
  matchersList: Array<Matcher>,
  processFunc: Function = undefined
) {
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
    return processFunc({ name: "Unknown" });
  };
}

export const browserFromUserAgent = (
  userAgent: string = ""
): { name: string; version: number } =>
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
    (matcher, matches) => {
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
    }
  )(userAgent);

export const operatingSystemFromUserAgent = (userAgent: string): string =>
  matchUserAgent([
    { name: "iOS", regex: /iPhone|iPad|iPod/ },
    { name: "Android", regex: /Android [0-9.]+;/ },
    { name: "Linux", regex: / Linux / },
    { name: "Unix", regex: /FreeBSD|OpenBSD|CrOS/ },
    { name: "Windows", regex: /[( ]Windows / },
    { name: "Mac OS", regex: /Macintosh;/ }
  ])(userAgent);

export const deviceTypeFromUserAgent = (userAgent: string): string =>
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
