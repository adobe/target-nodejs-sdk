import * as MockDate from "mockdate";
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
    generatedAt: "2020-02-28T22:20:01.614Z"
  },
  rules: [
    {
      condition: true,
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<strong>default result</strong>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7mqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          }
        ]
      },
      meta: {
        activityId: 334853,
        experienceId: 0,
        type: "xt",
        mboxes: ["daterange-mbox"],
        views: []
      }
    },
    {
      condition: {
        and: [
          {
            "<=": [
              1582822800000,
              {
                var: "current_timestamp"
              },
              1583028000000
            ]
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<strong>date range 1</strong>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7unJlneZxJu5VqGhXCosHhWCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          }
        ]
      },
      meta: {
        activityId: 334853,
        experienceId: 5,
        type: "xt",
        mboxes: ["daterange-mbox"],
        views: []
      }
    },
    {
      condition: {
        and: [
          {
            "<=": [
              1583178000000,
              {
                var: "current_timestamp"
              },
              1583523600000
            ]
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<strong>date range 2</strong>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7pNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          }
        ]
      },
      meta: {
        activityId: 334853,
        experienceId: 1,
        type: "xt",
        mboxes: ["daterange-mbox"],
        views: []
      }
    },
    {
      condition: {
        and: [
          {
            and: [
              {
                or: [
                  {
                    "==": [
                      {
                        var: "current_day"
                      },
                      "1"
                    ]
                  }
                ]
              },
              {
                "<=": [
                  "0000",
                  {
                    var: "current_time"
                  },
                  "2359"
                ]
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
                content: "<strong>it's monday</strong>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          }
        ]
      },
      meta: {
        activityId: 334853,
        experienceId: 4,
        type: "xt",
        mboxes: ["daterange-mbox"],
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
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
    beacon: false
  },
  prefetch: {
    mboxes: [
      {
        name: "daterange-mbox",
        index: 1
      }
    ]
  }
};

describe.skip("decisioning outcomes - timeframe", () => {
  let decisioning;

  beforeEach(async () => {
    MockDate.reset();
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("targets date range 1 (feb 27 - feb 29 2020)", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    MockDate.set(new Date("2020-02-28T01:05:00"));

    decisioning = await TargetDecisioningEngine.initialize(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>date range 1</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7unJlneZxJu5VqGhXCosHhWCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("targets date range 2 (mar 2 - mar 6 2020)", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    MockDate.set(new Date("2020-03-04T01:05:00"));

    decisioning = await TargetDecisioningEngine.initialize(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>date range 2</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7pNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("targets monday out of range", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    MockDate.set(new Date("2020-03-09T01:05:00"));

    decisioning = await TargetDecisioningEngine.initialize(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>it's monday</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("matches two rules date range 2 and on monday", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    MockDate.set(new Date("2020-03-02T14:05:00"));

    decisioning = await TargetDecisioningEngine.initialize(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>it's monday</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("doesn't match any rules", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD));
    MockDate.set(new Date("2020-03-10T01:05:00")); // tuesday out of bounds

    decisioning = await TargetDecisioningEngine.initialize(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>default result</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7mqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });
});
