import TargetDecisioningEngine from "../src";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0
};

const DECISIONING_PAYLOAD = {
  version: "1.0.0",
  meta: {
    generatedAt: "2020-02-28T19:19:37.420Z"
  },
  rules: [
    {
      condition: {
        and: []
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<h1>not firefox, safari or chrome</h1>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          }
        ]
      },
      meta: {
        activityId: 334845,
        experienceId: 0,
        type: "xt",
        mboxes: ["browser-mbox"],
        views: []
      }
    },
    {
      condition: {
        and: [
          {
            "==": [
              {
                var: "user.browserType"
              },
              "firefox"
            ]
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<h1>it's firefox</h1>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          }
        ]
      },
      meta: {
        activityId: 334845,
        experienceId: 1,
        type: "xt",
        mboxes: ["browser-mbox"],
        views: []
      }
    },
    {
      condition: {
        and: [
          {
            "==": [
              {
                var: "user.browserType"
              },
              "safari"
            ]
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<h1>it's safari</h1>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGgreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          }
        ]
      },
      meta: {
        activityId: 334845,
        experienceId: 2,
        type: "xt",
        mboxes: ["browser-mbox"],
        views: []
      }
    },
    {
      condition: {
        and: [
          {
            "==": [
              {
                var: "user.browserType"
              },
              "chrome"
            ]
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<h1>it's chrome</h1>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          }
        ]
      },
      meta: {
        activityId: 334845,
        experienceId: 3,
        type: "xt",
        mboxes: ["browser-mbox"],
        views: []
      }
    },
    {
      condition: {
        and: [
          {
            "==": [
              {
                var: "user.browserType"
              },
              "ie"
            ]
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<h1>it's internet explorer</h1>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGhB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          }
        ]
      },
      meta: {
        activityId: 334845,
        experienceId: 4,
        type: "xt",
        mboxes: ["browser-mbox"],
        views: []
      }
    }
  ]
};

const TARGET_REQUEST = {
  id: {
    tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
    marketingCloudVisitorId: "07327024324407615852294135870030620007"
  },
  context: {
    channel: "web",
    address: {
      url: "http://local-target-test:8080/home?bar=true#hello"
    },
    beacon: false
  },
  prefetch: {
    mboxes: [
      {
        name: "browser-mbox",
        index: 1
      }
    ]
  }
};

describe("decisioning outcomes - browser", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("can identify chrome outcomes", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    decisioning = await TargetDecisioningEngine.initialize(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST,
        context: {
          ...TARGET_REQUEST.context,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "browser-mbox",
              options: [
                {
                  type: "html",
                  content: "<h1>it's chrome</h1>",
                  eventToken:
                    "B8C2FP2IuBgmeJcDfXHjGpZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("can identify firefox outcomes", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    decisioning = await TargetDecisioningEngine.initialize(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST,
        context: {
          ...TARGET_REQUEST.context,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "browser-mbox",
              options: [
                {
                  type: "html",
                  content: "<h1>it's firefox</h1>",
                  eventToken:
                    "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("can identify safari outcomes", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    decisioning = await TargetDecisioningEngine.initialize(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST,
        context: {
          ...TARGET_REQUEST.context,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15"
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "browser-mbox",
              options: [
                {
                  type: "html",
                  content: "<h1>it's safari</h1>",
                  eventToken:
                    "B8C2FP2IuBgmeJcDfXHjGgreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("can identify internet explorer outcomes", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    decisioning = await TargetDecisioningEngine.initialize(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST,
        context: {
          ...TARGET_REQUEST.context,
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko"
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "browser-mbox",
              options: [
                {
                  type: "html",
                  content: "<h1>it's internet explorer</h1>",
                  eventToken:
                    "B8C2FP2IuBgmeJcDfXHjGhB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });
});
