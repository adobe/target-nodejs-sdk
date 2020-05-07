import TargetDecisioningEngine from "../src";
import { DECISIONING_PAYLOAD_VIEWS } from "./decisioning-payloads";

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0
};

const targetRequest = {
  id: {
    tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
  },
  context: {
    channel: "web",
    browser: {
      host: "local-target-test"
    },
    address: {
      url: "http://local-target-test/"
    },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
  }
};

describe("decisioning outcomes - views", () => {
  let decisioning;

  beforeEach(async () => {
    decisioning = await TargetDecisioningEngine({
      ...TEST_CONF,
      artifactPayload: DECISIONING_PAYLOAD_VIEWS
    });
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  describe("spa", () => {
    it("gets all views", async () => {
      const result = await decisioning.getOffers({
        request: {
          ...targetRequest,
          prefetch: {
            views: [{}]
          }
        }
      });

      expect(result.prefetch.views).toEqual(
        expect.objectContaining([
          {
            metrics: [
              {
                eventToken: "l1MU85ewOVIpA//AMIXNVA==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                type: "click"
              }
            ],
            name: "home",
            options: [
              {
                content: [
                  {
                    content: "Company Website",
                    cssSelector: "#spa > H1:nth-of-type(1)",
                    selector: "#spa > H1:nth-of-type(1)",
                    type: "setHtml"
                  }
                ],
                eventToken:
                  "GHOChK7T/wgyMBkN/NlmpmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
                type: "actions"
              },
              {
                content: [
                  {
                    content: {
                      "background-color": "rgba(170,255,255,1)",
                      priority: "important"
                    },
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    selector: "#spa-content > P:nth-of-type(1)",
                    type: "setStyle"
                  }
                ],
                eventToken:
                  "AwsKVxnME5t76R+joOlBI5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
                type: "actions"
              }
            ]
          },
          {
            metrics: [],
            name: "contact",
            options: [
              {
                content: [
                  {
                    content:
                      '<p id="action_insert_15887891723461599">experience B - all visitors</p>',
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    selector: "#spa-content > P:nth-of-type(1)",
                    type: "insertAfter"
                  }
                ],
                eventToken:
                  "B8pBf3FguSiYH0tQvbbGUJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
                type: "actions"
              }
            ]
          }
        ])
      );
    });

    it("gets a specific view", async () => {
      const result = await decisioning.getOffers({
        request: {
          ...targetRequest,
          prefetch: {
            views: [
              {
                name: "contact"
              }
            ]
          }
        }
      });

      expect(result.prefetch.views).toEqual(
        expect.objectContaining([
          {
            metrics: [],
            name: "contact",
            options: [
              {
                content: [
                  {
                    content:
                      '<p id="action_insert_15887891723461599">experience B - all visitors</p>',
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    selector: "#spa-content > P:nth-of-type(1)",
                    type: "insertAfter"
                  }
                ],
                eventToken:
                  "B8pBf3FguSiYH0tQvbbGUJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
                type: "actions"
              }
            ]
          }
        ])
      );
    });

    it("returns all views that match the conditions", async () => {
      const result = await decisioning.getOffers({
        request: {
          ...targetRequest,
          prefetch: {
            views: [
              {
                name: "contact",
                parameters: {
                  jason: "correct",
                  greg: "correct"
                }
              }
            ]
          }
        }
      });

      expect(result.prefetch.views).toEqual(
        expect.objectContaining([
          {
            metrics: [],
            name: "contact",
            options: [
              {
                content: [
                  {
                    content:
                      '<p id="action_insert_15887891723461599">experience B - all visitors</p>',
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    selector: "#spa-content > P:nth-of-type(1)",
                    type: "insertAfter"
                  }
                ],
                eventToken:
                  "B8pBf3FguSiYH0tQvbbGUJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
                type: "actions"
              },
              {
                content: [
                  {
                    content:
                      '<p id="action_insert_15887891852061628">experience B - jason is correct</p>',
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    selector: "#spa-content > P:nth-of-type(1)",
                    type: "insertAfter"
                  }
                ],
                eventToken:
                  "B8pBf3FguSiYH0tQvbbGUJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
                type: "actions"
              },
              {
                content: [
                  {
                    content:
                      '<p id="action_insert_15887891929931657">experience B - greg is correct</p>',
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    selector: "#spa-content > P:nth-of-type(1)",
                    type: "insertAfter"
                  }
                ],
                eventToken:
                  "B8pBf3FguSiYH0tQvbbGUJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
                type: "actions"
              }
            ]
          }
        ])
      );
    });
  });

  describe("pageLoad options", () => {
    it("has selector based views - multiple", async () => {
      const result = await decisioning.getOffers({
        request: {
          ...targetRequest,
          execute: {
            pageLoad: {
              parameters: { browser: "firefox" }
            }
          },
          trace: {}
        }
      });

      // activityId 344512
      // https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_add_text_local-target-test
      expect(
        result.execute.pageLoad.options.filter(
          option =>
            option.eventToken ===
            "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
        )
      ).toEqual([
        {
          content: [
            {
              content:
                '<p id="action_insert_15882853393943012">Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.</p>',
              cssSelector:
                "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              type: "insertAfter"
            }
          ],
          eventToken:
            "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
          type: "actions"
        },
        {
          eventToken:
            "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
          type: "default"
        },
        {
          content: [
            {
              content: {
                "background-color": "rgba(86,255,86,1)",
                priority: "important"
              },
              cssSelector: "#action_insert_15882853393943012",
              selector: "#action_insert_15882853393943012",
              type: "setStyle"
            }
          ],
          eventToken:
            "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ==",
          type: "actions"
        }
      ]);

      expect(
        result.execute.pageLoad.metrics.find(
          metric => metric.eventToken === "/GMYvcjhUsR6WVqQElppUw=="
        )
      ).toEqual({
        type: "click",
        eventToken: "/GMYvcjhUsR6WVqQElppUw==",
        selector: "#action_insert_15882853393943012"
      });

      // activityId 344854
      // https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/local-target-testvecxtheadertextandcolorchange
      expect(
        result.execute.pageLoad.options.filter(
          option =>
            option.eventToken ===
            "5IC4QWO4U1JZOs4j6l0LRQreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
        )
      ).toEqual([
        {
          type: "actions",
          content: [
            {
              type: "setHtml",
              selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              cssSelector:
                "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              content: "Hey Firefox!"
            }
          ],
          eventToken:
            "5IC4QWO4U1JZOs4j6l0LRQreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
        },
        {
          type: "actions",
          content: [
            {
              type: "setStyle",
              selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              cssSelector:
                "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
              content: {
                "background-color": "rgba(255,170,212,1)",
                priority: "important"
              }
            }
          ],
          eventToken:
            "5IC4QWO4U1JZOs4j6l0LRQreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
        }
      ]);

      expect(
        result.execute.pageLoad.metrics.find(
          metric => metric.eventToken === "QWWpEMH8FTeKXvGWDQG7JQ=="
        )
      ).toEqual({
        type: "click",
        eventToken: "QWWpEMH8FTeKXvGWDQG7JQ==",
        selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)"
      });
    });

    it("has metrics", async () => {
      const result = await decisioning.getOffers({
        request: {
          ...targetRequest,
          execute: {
            pageLoad: {
              parameters: { browser: "firefox" }
            }
          }
        }
      });

      expect(result.execute.pageLoad.metrics).toEqual(
        expect.objectContaining([
          {
            eventToken: "/GMYvcjhUsR6WVqQElppUw==",
            selector: "#action_insert_15882853393943012",
            type: "click"
          },
          {
            eventToken: "L0+AILo8bZTAkg9wSkGRcQ==",
            selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
            type: "click"
          },
          {
            eventToken: "QWWpEMH8FTeKXvGWDQG7JQ==",
            selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
            type: "click"
          }
        ])
      );
    });
  });
});
