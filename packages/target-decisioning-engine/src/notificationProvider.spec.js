import {
  ChannelType,
  MetricType
} from "@adobe/target-tools/delivery-api-client";
import NotificationProvider from "./notificationProvider";
import { validVisitorId } from "./requestProvider";

describe("notificationProvider", () => {
  const TARGET_REQUEST = {
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

  it("adds display notifications", () => {
    const mockNotify = jest.fn();

    const provider = NotificationProvider(
      TARGET_REQUEST,
      undefined,
      mockNotify
    );

    provider.addNotification({
      options: [{ content: "<h1>it's firefox</h1>", type: "html" }],
      metrics: [
        {
          type: MetricType.Display,
          eventToken:
            "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
        }
      ],
      name: "browser-mbox"
    });

    provider.sendNotifications();
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

  it("does not add non-display notifications", () => {
    const mockNotify = jest.fn();

    const provider = NotificationProvider(
      TARGET_REQUEST,
      undefined,
      mockNotify
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

    provider.sendNotifications();
    expect(mockNotify.mock.calls.length).toBe(0);
  });
});
