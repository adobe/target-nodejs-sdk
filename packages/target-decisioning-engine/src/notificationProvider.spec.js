import {
  ChannelType,
  getLogger,
  MetricType,
  noop,
  noopPromise
} from "@adobe/target-tools";
import NotificationProvider from "./notificationProvider";
import { validVisitorId } from "./requestProvider";
import { SEND_NOTIFICATION_ERROR } from "./events";

describe("notificationProvider", () => {
  const logger = getLogger();
  let mockNotify;

  const TARGET_REQUEST = {
    requestId: "request123456",
    id: validVisitorId(undefined, undefined),
    context: {
      channel: ChannelType.Web,
      address: {
        url: "http://local-target-test:8080/"
      },
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
    },
    prefetch: {
      mboxes: [
        {
          name: "mbox-something",
          index: 1
        }
      ]
    }
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockNotify = jest.fn(noopPromise);
  });

  it("adds display notifications", () => {
    const provider = NotificationProvider(
      TARGET_REQUEST,
      undefined,
      logger,
      mockNotify,
      false
    );

    provider.addNotification({
      options: [
        {
          content: "<h1>it's firefox</h1>",
          type: "html",
          eventToken:
            "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
        }
      ],
      metrics: [],
      name: "browser-mbox"
    });

    provider.sendNotifications();
    jest.runAllTimers();
    expect(mockNotify.mock.calls.length).toBe(1);
    expect(mockNotify.mock.calls[0][0].request.notifications.length).toEqual(1);
    expect(mockNotify.mock.calls[0][0].request.notifications[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        impressionId: expect.any(String),
        timestamp: expect.any(Number),
        type: "display",
        mbox: {
          name: "browser-mbox"
        },
        tokens: [
          "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
        ]
      })
    );
  });

  it("sends notifications when telemetry enabled", () => {
    const provider = NotificationProvider(
      TARGET_REQUEST,
      undefined,
      logger,
      mockNotify
    );

    provider.sendNotifications();
    jest.runAllTimers();
    expect(mockNotify.mock.calls.length).toBe(1);
  });

  it("does not duplicate notifications", () => {
    const provider = NotificationProvider(
      TARGET_REQUEST,
      undefined,
      logger,
      mockNotify,
      false
    );
    provider.addNotification({
      name: "target-global-mbox",
      options: [
        {
          type: "actions",
          content: [
            {
              type: "insertAfter",
              selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              cssSelector:
                "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              content:
                '<p id="action_insert_15882850825432970">Better to remain silent and be thought a fool than to speak out and remove all doubt.</p>'
            }
          ],
          eventToken:
            "yYWdmhDasVXGPWlpX1TRZDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
        }
      ],
      metrics: [
        {
          type: MetricType.Click,
          eventToken: "/GMYvcjhUsR6WVqQElppUw==",
          selector: "#action_insert_15882853393943012"
        }
      ]
    });

    provider.addNotification({
      name: "target-global-mbox",
      options: [
        {
          type: "actions",
          content: [
            {
              type: "insertAfter",
              selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              cssSelector:
                "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              content:
                '<p id="action_insert_15882850825432970">Better to remain silent and be thought a fool than to speak out and remove all doubt.</p>'
            }
          ],
          eventToken:
            "yYWdmhDasVXGPWlpX1TRZDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
        }
      ],
      metrics: [
        {
          type: MetricType.Click,
          eventToken: "/GMYvcjhUsR6WVqQElppUw==",
          selector: "#action_insert_15882853393943012"
        }
      ]
    });

    provider.sendNotifications();
    jest.runAllTimers();
    expect(mockNotify.mock.calls.length).toBe(1);

    expect(mockNotify.mock.calls[0][0].request.notifications.length).toEqual(1);
    expect(mockNotify.mock.calls[0][0].request.notifications[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        impressionId: expect.any(String),
        timestamp: expect.any(Number),
        type: "display",
        mbox: {
          name: "target-global-mbox"
        },
        tokens: [
          "yYWdmhDasVXGPWlpX1TRZDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
        ]
      })
    );
  });

  it("has distinct notifications per mbox", () => {
    const provider = NotificationProvider(
      TARGET_REQUEST,
      undefined,
      logger,
      mockNotify,
      false
    );
    provider.addNotification({
      name: "my-mbox",
      options: [
        {
          type: "actions",
          content: [
            {
              type: "insertAfter",
              selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              cssSelector:
                "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              content:
                '<p id="action_insert_15882850825432970">Better to remain silent and be thought a fool than to speak out and remove all doubt.</p>'
            }
          ],
          eventToken:
            "yYWdmhDasVXGPWlpX1TRZDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
        }
      ],
      metrics: [
        {
          type: MetricType.Click,
          eventToken: "/GMYvcjhUsR6WVqQElppUw==",
          selector: "#action_insert_15882853393943012"
        }
      ]
    });

    provider.addNotification({
      name: "another-mbox",
      options: [
        {
          type: "actions",
          content: [
            {
              type: "insertAfter",
              selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              cssSelector:
                "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              content:
                '<p id="action_insert_15882850825432970">Better to remain silent and be thought a fool than to speak out and remove all doubt.</p>'
            }
          ],
          eventToken:
            "yYWdmhDasVXGPWlpX1TRZDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
        }
      ],
      metrics: [
        {
          type: MetricType.Click,
          eventToken: "/GMYvcjhUsR6WVqQElppUw==",
          selector: "#action_insert_15882853393943012"
        }
      ]
    });

    provider.sendNotifications();
    jest.runAllTimers();
    expect(mockNotify.mock.calls.length).toBe(1);

    expect(mockNotify.mock.calls[0][0].request.notifications.length).toEqual(2);
    expect(mockNotify.mock.calls[0][0].request.notifications).toEqual(
      expect.objectContaining([
        {
          id: expect.any(String),
          impressionId: expect.any(String),
          timestamp: expect.any(Number),
          type: "display",
          mbox: {
            name: "my-mbox"
          },
          tokens: [
            "yYWdmhDasVXGPWlpX1TRZDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
          ]
        },
        {
          id: expect.any(String),
          impressionId: expect.any(String),
          timestamp: expect.any(Number),
          type: "display",
          mbox: {
            name: "another-mbox"
          },
          tokens: [
            "yYWdmhDasVXGPWlpX1TRZDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
          ]
        }
      ])
    );
  });

  it("emits error when send notification fails", async () => {
    const eventEmitter = jest.fn(noop);
    mockNotify = jest.fn(() => Promise.reject(new Error("chicken says moo")));

    const provider = NotificationProvider(
      TARGET_REQUEST,
      undefined,
      logger,
      mockNotify,
      true,
      eventEmitter
    );

    provider.addNotification({
      options: [
        {
          content: "<h1>it's firefox</h1>",
          type: "html",
          eventToken:
            "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
        }
      ],
      metrics: [],
      name: "browser-mbox"
    });

    provider.sendNotifications();
    jest.runAllTimers();

    expect(mockNotify.mock.calls.length).toBe(1);

    await new Promise(process.nextTick);

    expect(eventEmitter.mock.calls.length).toBe(1);
    expect(eventEmitter.mock.calls[0][0]).toBe(SEND_NOTIFICATION_ERROR);
    const { notification, error } = eventEmitter.mock.calls[0][1];
    expect(error).toMatchObject({
      message: "chicken says moo"
    });
    expect(notification).toBeDefined();
  });
});
