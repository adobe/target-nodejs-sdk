import TargetDecisioningEngine from "../src";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0
};

const DECISIONING_PAYLOAD_PARAMS = {
  version: "1.0.0",
  meta: {
    generatedAt: "2020-02-27T22:31:09.383Z"
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
            "==": [
              "bar",
              {
                var: "mbox.foo"
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
                  foo: "bar",
                  isFooBar: true,
                  experience: "A"
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Zhwxeqy1O2r9Ske1YDA9bGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "redundant-mbox"
          }
        ]
      },
      meta: {
        activityId: 334717,
        experienceId: 0,
        type: "ab",
        mboxes: ["redundant-mbox"],
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
            "==": [
              "bar",
              {
                var: "mbox.foo"
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
                  foo: "bar",
                  isFooBar: true,
                  experience: "B"
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Zhwxeqy1O2r9Ske1YDA9bJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "redundant-mbox"
          }
        ]
      },
      meta: {
        activityId: 334717,
        experienceId: 1,
        type: "ab",
        mboxes: ["redundant-mbox"],
        views: []
      }
    }
  ]
};

describe("decisioning outcomes - params", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("provides decisions based on mbox parameters", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_PARAMS));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_PARAMS);

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
            url: "http://local-target-test:8080/home?fabulous=true#sosumi",
            referringUrl: null
          },
          geo: null,
          timeOffsetInMinutes: null,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
          beacon: false
        },
        prefetch: {
          mboxes: [
            {
              name: "redundant-mbox",
              parameters: {
                foo: "bar"
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
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "redundant-mbox",
              options: [
                {
                  type: "json",
                  content: {
                    foo: "bar",
                    isFooBar: true,
                    experience: "B"
                  },
                  eventToken:
                    "Zhwxeqy1O2r9Ske1YDA9bJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("only returns decisions if match params", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_PARAMS));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_PARAMS);

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
            url: "http://local-target-test:8080/home?fabulous=true#sosumi",
            referringUrl: null
          },
          geo: null,
          timeOffsetInMinutes: null,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
          beacon: false
        },
        prefetch: {
          mboxes: [
            {
              name: "redundant-mbox",
              parameters: {
                foo: "cow"
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
        prefetch: {
          mboxes: [
            // {
            //   index: 1,
            //   name: "redundant-mbox",
            // }
          ]
        }
      })
    );
  });
});
