import * as MockDate from "mockdate";
import { createDecisioningContext } from "./contextProvider";

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

  it("has browser context", () => {
    const context = createDecisioningContext(DELIVERY_REQUEST);

    expect(context.user).toEqual(
      expect.objectContaining({
        browserType: "firefox",
        locale: "en",
        version: 73
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
        domain: "Web-Site",
        domain_lc: "web-site",
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
    MockDate.set(new Date("2020-02-25T01:05:00"));

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
        current_timestamp: 1582621500000,
        current_time: "0905",
        current_day: 2
      })
    );
  });
});
