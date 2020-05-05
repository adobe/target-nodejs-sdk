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

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  describe("spa", () => {
    it("gets all views", async () => {
      decisioning = await TargetDecisioningEngine({
        ...TEST_CONF,
        artifactPayload: DECISIONING_PAYLOAD_VIEWS
      });

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
            name: "home",
            // key: "home",
            options: [
              {
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa > H1:nth-of-type(1)",
                    cssSelector: "#spa > H1:nth-of-type(1)",
                    content: "Company Website"
                  }
                ],
                type: "actions",
                eventToken:
                  "kUaEC8amAVyoGv9fclUocTSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              },
              {
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      "<div id=\"action_insert_1588356504219968\"><h4>We're awesome because…</h4>\n<ol>\n<li>we do cool stuff</li>\n<li>we like you</li>\n<li>we're affordable</li>\n</ol></div>"
                  }
                ],
                type: "actions",
                eventToken:
                  "kUaEC8amAVyoGv9fclUocTSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              },
              {
                content: [
                  {
                    type: "setStyle",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content: {
                      "background-color": "rgba(170,255,255,1)",
                      priority: "important"
                    }
                  }
                ],
                type: "actions",
                eventToken:
                  "Jc+a2hGbxIZZ6KZOuJ59jAincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                eventToken: "l1MU85ewOVIpA//AMIXNVA==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                type: "click"
              }
            ]
          },
          {
            metrics: [
              {
                eventToken: "355TUgmhMpxnMLw2HgiPBA==",
                selector:
                  "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                type: "click"
              }
            ],
            name: "contact",
            options: [
              {
                content: [
                  {
                    content:
                      '<p id="action_insert_15883724759054688">Please give us a call any time at: 800-532-2002</p>',
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    selector: "#spa-content > P:nth-of-type(1)",
                    type: "insertBefore"
                  }
                ],
                eventToken:
                  "MCqgP0tYVVh5Es6mHZJosAincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq",
                type: "actions"
              }
            ]
          }
        ])
      );
    });

    it("gets specific views", async () => {
      decisioning = await TargetDecisioningEngine({
        ...TEST_CONF,
        artifactPayload: DECISIONING_PAYLOAD_VIEWS
      });

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
            metrics: [
              {
                eventToken: "355TUgmhMpxnMLw2HgiPBA==",
                selector:
                  "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                type: "click"
              }
            ],
            name: "contact",
            options: [
              {
                content: [
                  {
                    content:
                      '<p id="action_insert_15883724759054688">Please give us a call any time at: 800-532-2002</p>',
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    selector: "#spa-content > P:nth-of-type(1)",
                    type: "insertBefore"
                  }
                ],
                eventToken:
                  "MCqgP0tYVVh5Es6mHZJosAincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq",
                type: "actions"
              }
            ]
          }
        ])
      );
    });
  });

  describe("pageLoad options", () => {
    it("has views in page load options", async () => {
      decisioning = await TargetDecisioningEngine({
        ...TEST_CONF,
        artifactPayload: DECISIONING_PAYLOAD_VIEWS
      });

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

      expect(
        result.execute.pageLoad.options.filter(
          option =>
            option.eventToken ===
            "neZRmUp4w2JJPxnOS+UTvn0gWGoMtBqXksS4P3HyOWjf5r+rP39VCIaiiZlXOAYq"
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
            "neZRmUp4w2JJPxnOS+UTvn0gWGoMtBqXksS4P3HyOWjf5r+rP39VCIaiiZlXOAYq"
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
            "neZRmUp4w2JJPxnOS+UTvn0gWGoMtBqXksS4P3HyOWjf5r+rP39VCIaiiZlXOAYq"
        }
      ]);
    });

    it("has metrics in page load options", async () => {
      decisioning = await TargetDecisioningEngine({
        ...TEST_CONF,
        artifactPayload: DECISIONING_PAYLOAD_VIEWS
      });

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
