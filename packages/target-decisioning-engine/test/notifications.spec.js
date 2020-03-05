/* eslint-disable jest/no-test-callback */
import TargetDecisioningEngine from "../src";

const MockDate = require("mockdate");
require("jest-fetch-mock").enableMocks();

const sendNotificationFunc = jest.fn();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0,
  sendNotificationFunc
};

const targetRequest = {
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
  sessionId: "dummy_session"
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

describe("notifications", () => {
  const now = new Date("2020-02-25T01:05:00");

  let decisioning;

  beforeEach(async () => {
    MockDate.reset();
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("sends notifications for execute of 1 mbox", async () => {
    MockDate.set(now);

    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    await decisioning.getOffers({
      request: {
        ...targetRequest,
        execute: {
          mboxes: [
            {
              name: "superfluous-mbox",
              index: 2
            }
          ]
        }
      }
    });

    expect(sendNotificationFunc.mock.calls.length).toEqual(1);
    const notificationPayload = sendNotificationFunc.mock.calls[0][0];

    expect(notificationPayload).toMatchObject({
      request: {
        id: targetRequest.id,
        context: targetRequest.context,
        notifications: [
          {
            id: "superfluous-mbox_notification",
            timestamp: now.getTime(),
            type: "display",
            mbox: {
              name: "superfluous-mbox"
            },
            tokens: [
              "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
            ]
          }
        ]
      }
    });
  });

  it("sends notifications for execute of multiple mboxes", async () => {
    MockDate.set(now);

    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    await decisioning.getOffers({
      request: {
        ...targetRequest,
        execute: {
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
      }
    });

    expect(sendNotificationFunc.mock.calls.length).toEqual(1);
    const notificationPayload = sendNotificationFunc.mock.calls[0][0];

    expect(notificationPayload).toMatchObject({
      request: {
        id: targetRequest.id,
        context: targetRequest.context,
        notifications: [
          {
            id: "superfluous-mbox_notification",
            timestamp: now.getTime(),
            type: "display",
            mbox: {
              name: "superfluous-mbox"
            },
            tokens: [
              "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
            ]
          },
          {
            id: "expendable-mbox_notification",
            timestamp: now.getTime(),
            type: "display",
            mbox: {
              name: "expendable-mbox"
            },
            tokens: [
              "YPoPRnGmGGit+QxnpxYFjZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
            ]
          }
        ]
      }
    });
  });

  it("does not send notifications if nothing to send (no matching mboxes)", async () => {
    MockDate.set(now);

    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    await decisioning.getOffers({
      request: {
        ...targetRequest,
        execute: {
          mboxes: [
            {
              name: "nonexistent-mbox",
              index: 1
            }
          ]
        }
      }
    });

    expect(sendNotificationFunc.mock.calls.length).toEqual(0);
  });

  it("does not send a notifications for prefetch", async () => {
    MockDate.set(now);

    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          mboxes: [
            {
              name: "superfluous-mbox",
              index: 2
            }
          ]
        }
      }
    });

    expect(sendNotificationFunc.mock.calls.length).toEqual(0);
  });
});
