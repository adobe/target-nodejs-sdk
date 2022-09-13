import * as MockDate from "mockdate";
import {
  createDecisioningContext,
  createMboxContext,
  createPageContext,
  createGeoContext
} from "./contextProvider";

const DELIVERY_REQUEST = {
  context: {
    channel: "web",
    browser: null,
    address: {
      url: "http://local-target-test:8080/",
      referringUrl: null
    },
    geo: null,
    timeOffsetInMinutes: null,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
    beacon: false
  },
  execute: {
    mboxes: [
      {
        address: {
          url: "http://local-target-test/foo",
          referringUrl: null
        },
        parameters: {
          foo: "bar"
        },
        name: "product",
        index: 0
      },
      {
        address: {
          url: "http://local-target-test/foo"
        },
        parameters: {
          foo: "bar"
        },
        name: "offer1",
        index: 1
      },
      {
        address: {
          url: "http://local-target-test/foo"
        },
        parameters: {
          foo: "bar"
        },
        name: "offer2",
        index: 2
      },
      {
        address: {
          url: "http://local-target-test/foo"
        },
        parameters: {
          foo: "bar"
        },
        name: "offer3",
        index: 3
      }
    ]
  },
  prefetch: {
    views: [
      {
        address: {
          url: "http://local-target-test:8080/",
          referringUrl: null
        }
      }
    ],
    mboxes: []
  }
};

describe("contextProvider", () => {
  beforeEach(() => {
    MockDate.reset();
  });

  it("can generate blank context", () => {
    expect(createDecisioningContext({})).toEqual({
      current_day: expect.any(Number),
      current_time: expect.any(String),
      current_timestamp: expect.any(Number),
      geo: {
        latitude: undefined,
        longitude: undefined,
        country: undefined,
        region: undefined,
        city: undefined
      },
      page: {
        domain: "",
        domain_lc: "",
        fragment: "",
        fragment_lc: "",
        path: "",
        path_lc: "",
        query: "",
        query_lc: "",
        subdomain: "",
        subdomain_lc: "",
        topLevelDomain: "",
        topLevelDomain_lc: "",
        url: "",
        url_lc: ""
      },
      referring: {
        domain: "",
        domain_lc: "",
        fragment: "",
        fragment_lc: "",
        path: "",
        path_lc: "",
        query: "",
        query_lc: "",
        subdomain: "",
        subdomain_lc: "",
        topLevelDomain: "",
        topLevelDomain_lc: "",
        url: "",
        url_lc: ""
      },
      user: {
        browserType: "unknown",
        browserVersion: -1,
        locale: "en",
        platform: "unknown"
      }
    });
  });

  it("has browser context from userAgent", () => {
    const context = createDecisioningContext(DELIVERY_REQUEST);

    expect(context.user).toEqual(
      expect.objectContaining({
        browserType: "firefox",
        locale: "en",
        platform: "mac",
        browserVersion: 73
      })
    );
  });

  it("has browser context from clientHints", () => {
    const context = createDecisioningContext({
      ...DELIVERY_REQUEST,
      context: {
        ...DELIVERY_REQUEST.context,
        userAgent: undefined,
        clientHints: {
          mobile: false,
          model: "",
          platform: "macOS",
          platformVersion: "12.2.1",
          browserUAWithMajorVersion:
            '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
          browserUAWithFullVersion:
            '" Not A;Brand";v="99.0.0.0", "Chromium";v="99.0.4844.83", "Google Chrome";v="99.0.4844.83"',
          architecture: "x86",
          bitness: "64"
        }
      }
    });
    expect(context.user).toEqual(
      expect.objectContaining({
        browserType: "chrome",
        locale: "en",
        platform: "mac",
        browserVersion: 99
      })
    );
  });

  it("has page context", () => {
    const context = createDecisioningContext({
      context: {
        channel: "web",
        browser: null,
        address: {
          url: "http://My.Web-Site.net:8080/About?m=1&t=5&name=Jimmy#home",
          referringUrl: null
        },
        geo: null,
        timeOffsetInMinutes: null,
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
        beacon: false
      }
    });

    expect(context.page).toEqual(
      expect.objectContaining({
        url: "http://My.Web-Site.net:8080/About?m=1&t=5&name=Jimmy#home",
        url_lc: "http://my.web-site.net:8080/about?m=1&t=5&name=jimmy#home",
        path: "/About",
        path_lc: "/about",
        domain: "My.Web-Site.net",
        domain_lc: "my.web-site.net",
        subdomain: "My",
        subdomain_lc: "my",
        topLevelDomain: "net",
        topLevelDomain_lc: "net",
        query: "m=1&t=5&name=Jimmy",
        query_lc: "m=1&t=5&name=jimmy",
        fragment: "home",
        fragment_lc: "home"
      })
    );
  });
  it("has greg page context", () => {
    expect(
      createPageContext({
        url: "https://stage.applookout.net/"
      })
    ).toEqual(
      expect.objectContaining({
        url: "https://stage.applookout.net/",
        url_lc: "https://stage.applookout.net/",
        path: "/",
        path_lc: "/",
        domain: "stage.applookout.net",
        domain_lc: "stage.applookout.net",
        subdomain: "stage",
        subdomain_lc: "stage",
        topLevelDomain: "net",
        topLevelDomain_lc: "net",
        query: "",
        query_lc: "",
        fragment: "",
        fragment_lc: ""
      })
    );
  });

  it("has referring context", () => {
    const context = createDecisioningContext({
      context: {
        channel: "web",
        browser: null,
        address: {
          url: "http://apple.com",
          referringUrl:
            "http://My.Web-Site.net:8080/About?m=1&t=5&name=Jimmy#home"
        },
        geo: null,
        timeOffsetInMinutes: null,
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
        beacon: false
      }
    });

    expect(context.referring).toEqual(
      expect.objectContaining({
        url: "http://My.Web-Site.net:8080/About?m=1&t=5&name=Jimmy#home",
        url_lc: "http://my.web-site.net:8080/about?m=1&t=5&name=jimmy#home",
        path: "/About",
        path_lc: "/about",
        domain: "My.Web-Site.net",
        domain_lc: "my.web-site.net",
        subdomain: "My",
        subdomain_lc: "my",
        topLevelDomain: "net",
        topLevelDomain_lc: "net",
        query: "m=1&t=5&name=Jimmy",
        query_lc: "m=1&t=5&name=jimmy",
        fragment: "home",
        fragment_lc: "home"
      })
    );
  });

  it("has timing context", () => {
    MockDate.set(Date.UTC(2020, 2, 25, 24)); // "Wednesday, March 25, 2020 5:00 PM" (PST)

    const context = createDecisioningContext({
      context: {
        channel: "web",
        browser: null,
        address: {
          url: "http://My.Web-Site.net:8080/About?m=1&t=5&name=Jimmy#home",
          referringUrl: null
        },
        geo: null,
        timeOffsetInMinutes: null,
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
        beacon: false
      }
    });

    expect(context).toEqual(
      expect.objectContaining({
        current_timestamp: 1585180800000,
        current_time: "0000",
        current_day: 4
      })
    );
  });

  it("produces mbox context", () => {
    expect(
      createMboxContext({
        index: 10,
        name: "foo_mbox",
        parameters: {
          one: 1,
          pizza: "PEPPERONI",
          truthy: true,
          kitty: "MeoW"
        }
      })
    ).toEqual({
      one: 1,
      one_lc: 1,
      pizza: "PEPPERONI",
      pizza_lc: "pepperoni",
      truthy: true,
      truthy_lc: true,
      kitty: "MeoW",
      kitty_lc: "meow"
    });

    expect(createMboxContext({})).toEqual({});
    expect(createMboxContext(undefined)).toEqual({});
  });

  it("supports mbox content with dot notation", () => {
    expect(
      createMboxContext({
        index: 10,
        name: "dot_mbox",
        parameters: {
          "favorite.pizza": "PINEAPPLE",
          "favorite.month": "august",
          "ignore..notation": true,
          "support.nested.notation": true,
          "support.nested.dots": true,
          ".best.coast": "east",
          "trailing.dots.": "bad"
        }
      })
    ).toEqual({
      "favorite": {
        pizza: "PINEAPPLE",
        pizza_lc: "pineapple",
        month: "august",
        month_lc: "august"
      },
      "ignore..notation": true,
      "ignore..notation_lc": true,
      ".best.coast": "east",
      ".best.coast_lc": "east",
      "trailing.dots.": "bad",
      "trailing.dots._lc": "bad",
      "support": {
        nested: {
          notation: true,
          notation_lc: true,
          dots: true,
          dots_lc: true
        }
      }
    });
  });

  it("produces geo context", () => {
    expect(
      createGeoContext({
        countryCode: "US",
        stateCode: "CA",
        city: "SANFRANCISCO",
        latitude: 37.773972,
        longitude: -122.431297
      })
    ).toEqual({
      country: "US",
      region: "CA",
      city: "SANFRANCISCO",
      latitude: 37.773972,
      longitude: -122.431297
    });

    expect(createGeoContext({})).toEqual({
      country: undefined,
      region: undefined,
      city: undefined,
      latitude: undefined,
      longitude: undefined
    });

    expect(createGeoContext(undefined)).toEqual({
      country: undefined,
      region: undefined,
      city: undefined,
      latitude: undefined,
      longitude: undefined
    });
  });
});
