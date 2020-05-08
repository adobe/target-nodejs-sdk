import * as MockDate from "mockdate";
import {
  createDecisioningContext,
  createMboxContext,
  createPageContext
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
    pageLoad: null,
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
    pageLoad: null,
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

  it("has browser context", () => {
    const context = createDecisioningContext(DELIVERY_REQUEST);

    expect(context.user).toEqual(
      expect.objectContaining({
        browserType: "firefox",
        locale: "en",
        platform: "Mac OS",
        browserVersion: 73
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
});
