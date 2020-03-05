import TargetDecisioningEngine from "../src";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0
};

const DECISIONING_PAYLOAD_AB_MULTI_SIMPLE = {
  version: "1.0.0",
  meta: {
    generatedAt: "2020-02-27T17:45:25.312Z"
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
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: {
                  doMagic: true,
                  importantValue: 150
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "superfluous-mbox"
          }
        ]
      },
      meta: {
        activityId: 334411,
        experienceId: 0,
        type: "ab",
        mboxes: ["superfluous-mbox"],
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
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: {
                  doMagic: false,
                  importantValue: 75
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "superfluous-mbox"
          }
        ]
      },
      meta: {
        activityId: 334411,
        experienceId: 1,
        type: "ab",
        mboxes: ["superfluous-mbox"],
        views: []
      }
    },
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
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<div>hello</div>",
                type: "content"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "YPoPRnGmGGit+QxnpxYFjWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "expendable-mbox"
          }
        ]
      },
      meta: {
        activityId: 334640,
        experienceId: 0,
        type: "ab",
        mboxes: ["expendable-mbox"],
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
          }
        ]
      },
      consequence: {
        mboxes: [
          {
            options: [
              {
                content: "<div>goodbye</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "YPoPRnGmGGit+QxnpxYFjZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "expendable-mbox"
          }
        ]
      },
      meta: {
        activityId: 334640,
        experienceId: 1,
        type: "ab",
        mboxes: ["expendable-mbox"],
        views: []
      }
    }
  ]
};

describe("decisioning outcomes - multiple activities", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  describe("execute", () => {
    it("only returns for the mbox requested", async () => {
      fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
      decisioning = await TargetDecisioningEngine(TEST_CONF);

      expect(decisioning.getRawArtifact()).toEqual(
        DECISIONING_PAYLOAD_AB_MULTI_SIMPLE
      );

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
                name: "superfluous-mbox",
                index: 2
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
                index: 2,
                name: "superfluous-mbox",
                options: [
                  {
                    type: "json",
                    content: {
                      doMagic: true,
                      importantValue: 150
                    }
                  }
                ]
              }
            ]
          }
        })
      );
    });

    it("returns results for multiple mboxes", async () => {
      fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
      decisioning = await TargetDecisioningEngine(TEST_CONF);

      expect(decisioning.getRawArtifact()).toEqual(
        DECISIONING_PAYLOAD_AB_MULTI_SIMPLE
      );

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
                name: "superfluous-mbox",
                index: 1
              },
              {
                name: "expendable-mbox",
                index: 2
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
                name: "superfluous-mbox",
                options: [
                  {
                    type: "json",
                    content: {
                      doMagic: true,
                      importantValue: 150
                    }
                  }
                ]
              },
              {
                index: 2,
                name: "expendable-mbox",
                options: [
                  {
                    type: "html",
                    content: "<div>goodbye</div>"
                  }
                ]
              }
            ]
          }
        })
      );
    });
  });

  describe("prefetch", () => {
    it("only returns for the mbox requested", async () => {
      fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
      decisioning = await TargetDecisioningEngine(TEST_CONF);

      expect(decisioning.getRawArtifact()).toEqual(
        DECISIONING_PAYLOAD_AB_MULTI_SIMPLE
      );

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
              url: "http://local-target-test:8080/",
              referringUrl: null
            },
            geo: null,
            timeOffsetInMinutes: null,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            pageLoad: null,
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 2
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
                index: 2,
                name: "superfluous-mbox",
                options: [
                  {
                    type: "json",
                    content: {
                      doMagic: true,
                      importantValue: 150
                    },
                    eventToken:
                      "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                  }
                ]
              }
            ]
          }
        })
      );
    });

    it("returns results for multiple mboxes", async () => {
      fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
      decisioning = await TargetDecisioningEngine(TEST_CONF);

      expect(decisioning.getRawArtifact()).toEqual(
        DECISIONING_PAYLOAD_AB_MULTI_SIMPLE
      );

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
              url: "http://local-target-test:8080/",
              referringUrl: null
            },
            geo: null,
            timeOffsetInMinutes: null,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            pageLoad: null,
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 1
              },
              {
                name: "expendable-mbox",
                index: 2
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
                name: "superfluous-mbox",
                options: [
                  {
                    type: "json",
                    content: {
                      doMagic: true,
                      importantValue: 150
                    },
                    eventToken:
                      "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                  }
                ]
              },
              {
                index: 2,
                name: "expendable-mbox",
                options: [
                  {
                    type: "html",
                    content: "<div>goodbye</div>",
                    eventToken:
                      "YPoPRnGmGGit+QxnpxYFjZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                  }
                ]
              }
            ]
          }
        })
      );
    });
  });
});
