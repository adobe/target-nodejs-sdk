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
    generatedAt: "2020-03-13T19:01:29.819Z",
    remoteMboxes: ["[remote-only-mbox-a", "remote-only-mbox-a]"],
    globalMbox: "target-global-mbox"
  },
  rules: [
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
                content: "<div>kitty high with targeting: Firefox</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "/DhjxnVDh9heBZ0MrYFLF2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          }
        ]
      },
      meta: {
        activityId: 336973,
        experienceId: 0,
        type: "xt",
        mboxes: ["kitty"],
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
                content: "<div>kitty high with targeting: Safari</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "/DhjxnVDh9heBZ0MrYFLF5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          }
        ]
      },
      meta: {
        activityId: 336973,
        experienceId: 1,
        type: "xt",
        mboxes: ["kitty"],
        views: []
      }
    },
    {
      condition: {
        "<": [
          0,
          {
            var: "allocation"
          },
          50
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<div>kitty high A</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "ruhwp7VESR7F74TJL2DV5WqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          }
        ]
      },
      meta: {
        activityId: 336951,
        experienceId: 0,
        type: "ab",
        mboxes: ["kitty"],
        views: []
      }
    },
    {
      condition: {
        "<": [
          50,
          {
            var: "allocation"
          },
          100
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<div>kitty high B</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "ruhwp7VESR7F74TJL2DV5ZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          }
        ]
      },
      meta: {
        activityId: 336951,
        experienceId: 1,
        type: "ab",
        mboxes: ["kitty"],
        views: []
      }
    },
    {
      condition: {
        "<": [
          0,
          {
            var: "allocation"
          },
          50
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<div>kitty low A</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Ww1ZcMj/ShY5tUV/rUzSjGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          }
        ]
      },
      meta: {
        activityId: 336950,
        experienceId: 0,
        type: "ab",
        mboxes: ["kitty"],
        views: []
      }
    },
    {
      condition: {
        "<": [
          50,
          {
            var: "allocation"
          },
          100
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<div>kitty low B</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Ww1ZcMj/ShY5tUV/rUzSjJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          }
        ]
      },
      meta: {
        activityId: 336950,
        experienceId: 1,
        type: "ab",
        mboxes: ["kitty"],
        views: []
      }
    }
  ]
};

describe("decisioning outcomes - priority", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("prefers audience targeted rules and returns one result for the mbox requested", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        context: {
          channel: "web",
          address: {
            url: "http://local-target-test:8080/"
          },
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
        },
        prefetch: {
          mboxes: [
            {
              name: "kitty",
              index: 7
            }
          ]
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 7,
              name: "kitty",
              options: [
                {
                  type: "html",
                  content: "<div>kitty high with targeting: Firefox</div>",
                  eventToken:
                    "/DhjxnVDh9heBZ0MrYFLF2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("only returns one result for the mbox requested", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        context: {
          channel: "web",
          address: {
            url: "http://local-target-test:8080/"
          },
          userAgent:
            "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)"
        },
        prefetch: {
          mboxes: [
            {
              name: "kitty",
              index: 7
            }
          ]
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 7,
              name: "kitty",
              options: [
                {
                  type: "html",
                  content: "<div>kitty high A</div>",
                  eventToken:
                    "ruhwp7VESR7F74TJL2DV5WqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });
});
