// eslint-disable-next-line import/prefer-default-export
export function createContext(config, targetOptions) {
  // the context needs to be derived from the config Options and request parameters

  // eslint-disable-next-line no-unused-vars
  const aaa = { config, targetOptions };

  return {
    allocation: 10, // 0 - 99.99
    current_timestamp: 1580371200001, // in ms
    current_hour: 15, // 24-hour time, UTC
    current_minute: 45,
    current_day: 5, // 0-6, 0 = sunday
    user: {
      browserType: "firefox",
      locale: "en",
      version: 45
    },
    page: {
      url: "http://WWW.TARGET.ADOBE.COM/ABOUT/",
      url_lc: "http://www.target.adobe.com/about/",
      path: "/ABOUT",
      path_lc: "/about",
      domain: "WWW.TARGET.ADOBE.COM",
      domain_lc: "www.target.adobe.com",
      subdomain: "TARGET.ADOBE.COM",
      subdomain_lc: "target.adobe.com",
      topLevelDomain: "ADOBE.COM",
      topLevelDomain_lc: "adobe.com",
      query: "foo=bar&name=JimmyG",
      query_lc: "foo=bar&name=jimmyg",
      fragment: "part1",
      fragment_lc: "part1"
    },
    mbox: {
      // custom params
      foo: "4.9",
      foo_lc: "4.9",
      bar: "BAZ",
      bar_lc: "baz"
    }
  };
}
