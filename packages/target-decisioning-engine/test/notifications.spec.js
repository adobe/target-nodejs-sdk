/* eslint-disable jest/no-test-callback */
import TargetDecisioningEngine from "../src";
import { DECISIONING_PAYLOAD_AB_MULTI_SIMPLE } from "./decisioning-payloads";

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
            id: expect.any(String),
            impressionId: expect.any(String),
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
            id: expect.any(String),
            impressionId: expect.any(String),
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
            id: expect.any(String),
            impressionId: expect.any(String),
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
