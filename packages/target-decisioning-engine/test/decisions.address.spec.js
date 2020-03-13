import TargetDecisioningEngine from "../src";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0
};

const DECISIONING_PAYLOAD_ADDRESS = {
  version: "1.0.0",
  meta: {
    generatedAt: "2020-02-27T20:07:11.017Z"
  },
  rules: [
    {
      condition: {
        and: [
          {
            "<": [
              0,
              {
                var: "allocation"
              },
              50
            ]
          },
          {
            in: [
              "bar",
              {
                var: "page.url_lc"
              }
            ]
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: {
                  baz: 1
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "mWtD0yDAXMnesyQOa7/jS2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "offer2"
          }
        ]
      },
      meta: {
        activityId: 333312,
        experienceId: 0,
        type: "ab",
        mboxes: ["offer2"],
        views: []
      }
    },
    {
      condition: {
        and: [
          {
            "<": [
              50,
              {
                var: "allocation"
              },
              100
            ]
          },
          {
            in: [
              "bar",
              {
                var: "page.url_lc"
              }
            ]
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: {
                  baz: 2
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "mWtD0yDAXMnesyQOa7/jS5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "offer2"
          }
        ]
      },
      meta: {
        activityId: 333312,
        experienceId: 1,
        type: "ab",
        mboxes: ["offer2"],
        views: []
      }
    }
  ]
};

describe("decisioning outcomes - url params", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("keys off of the url provided in the base context", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_ADDRESS));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_ADDRESS);

    const result = await decisioning.getOffers({
      request: {
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        context: {
          channel: "web",
          mobilePlatform: null,
          application: null,
          screen: null,
          window: null,
          browser: null,
          address: {
            url: "http://local-target-test:8080/home?bar=true#hello",
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
              name: "offer2",
              index: 1
            }
          ]
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        execute: {
          mboxes: [
            {
              index: 1,
              name: "offer2",
              options: [
                {
                  type: "json",
                  content: {
                    baz: 2
                  }
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("address attributes override context url", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_ADDRESS));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_ADDRESS);

    const result = await decisioning.getOffers({
      request: {
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        context: {
          channel: "web",
          mobilePlatform: null,
          application: null,
          screen: null,
          window: null,
          browser: null,
          address: {
            url: "http://adobe.com",
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
              name: "offer2",
              address: {
                url: "http://local-target-test:8080/home?bar=true#hello"
              },
              index: 1
            }
          ]
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        execute: {
          mboxes: [
            {
              index: 1,
              name: "offer2",
              options: [
                {
                  type: "json",
                  content: {
                    baz: 2
                  }
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("address attributes override context url return empty", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_ADDRESS));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_ADDRESS);

    const result = await decisioning.getOffers({
      request: {
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        context: {
          channel: "web",
          mobilePlatform: null,
          application: null,
          screen: null,
          window: null,
          browser: null,
          address: {
            url: "http://adobe.com",
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
              name: "offer2",
              address: {
                url: "http://local-target-test"
              },
              index: 1
            }
          ]
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        execute: {
          mboxes: [
            {
              index: 1,
              name: "offer2"
            }
          ]
        }
      })
    );
  });
});
