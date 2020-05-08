import TargetDecisioningEngine from "../src";
import {
  DECISIONING_PAYLOAD_PAGELOAD_VEC_AB,
  DECISIONING_PAYLOAD_PAGELOAD_VEC_XT,
  DECISIONING_PAYLOAD_VIEWS
} from "./decisioning-payloads";

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

  describe("spa views", () => {
    beforeEach(async () => {
      decisioning = await TargetDecisioningEngine({
        ...TEST_CONF,
        artifactPayload: DECISIONING_PAYLOAD_VIEWS
      });
    });
    describe("ab", () => {
      it("no audiences - shows all outcomes for the chosen experience", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              views: [{}]
            }
          }
        });

        expect(result.prefetch.views[1].options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  type: "insertAfter",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content:
                    '<p id="action_insert_15889689998702412">experience A</p>'
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector: "#spa-content > H3:nth-of-type(1)",
                  cssSelector: "#spa-content > H3:nth-of-type(1)",
                  content: "nobody home - exp A"
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector: "#spa-content > H3:nth-of-type(1)",
                  cssSelector: "#spa-content > H3:nth-of-type(1)",
                  content: "Home - Experience B"
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content:
                    "experience B! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            }
          ])
        );
      });

      it("with audiences - shows all outcomes for the chosen experience and matching audiences", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              views: [
                {
                  parameters: {
                    jason: "correct"
                  }
                }
              ]
            }
          }
        });

        expect(result.prefetch.views[1].options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  type: "insertAfter",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content:
                    '<p id="action_insert_15889690271122446">jason = correct</p>'
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector: "#spa-content > H3:nth-of-type(1)",
                  cssSelector: "#spa-content > H3:nth-of-type(1)",
                  content: "jason home - exp A"
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "insertAfter",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content:
                    '<p id="action_insert_15889689998702412">experience A</p>'
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector: "#spa-content > H3:nth-of-type(1)",
                  cssSelector: "#spa-content > H3:nth-of-type(1)",
                  content: "nobody home - exp A"
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector: "#spa-content > H3:nth-of-type(1)",
                  cssSelector: "#spa-content > H3:nth-of-type(1)",
                  content: "Home - Experience B"
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content:
                    "experience B! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            }
          ])
        );
      });
    });

    describe("xt", () => {
      it("multiple matching params, returns experiences for just one experience", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              views: [
                {
                  parameters: { jason: "correct", greg: "correct" }
                }
              ]
            }
          }
        });

        expect(result.prefetch.views[0].options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  type: "insertBefore",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content:
                    '<div id="action_insert_15889714592501888">Please call Jason immediately</div>'
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "setStyle",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content: {
                    "background-color": "rgba(255,255,170,1)",
                    priority: "important"
                  }
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            }
          ])
        );
      });
      it("single matching param, returns experiences for just one experience", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              views: [
                {
                  parameters: { greg: "correct" }
                }
              ]
            }
          }
        });

        expect(result.prefetch.views[0].options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  type: "insertBefore",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content:
                    '<span id="action_insert_15889714897491922">Please email Greg immediately</span>'
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
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
              eventToken: expect.any(String)
            }
          ])
        );
      });
      it("no params, returns experiences for just one experience", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              views: [{}]
            }
          }
        });

        expect(result.prefetch.views[0].options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  type: "insertAfter",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content:
                    '<span id="action_insert_15889715194712006">Please do not contact us.</span>'
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            },
            {
              content: [
                {
                  type: "setStyle",
                  selector: "#spa-content > P:nth-of-type(1)",
                  cssSelector: "#spa-content > P:nth-of-type(1)",
                  content: {
                    "background-color": "rgba(127,0,0,1)",
                    priority: "important"
                  }
                }
              ],
              type: "actions",
              eventToken: expect.any(String)
            }
          ])
        );
      });
    });
  });

  describe("pageLoad options (selectors)", () => {
    describe("ab", () => {
      beforeEach(async () => {
        decisioning = await TargetDecisioningEngine({
          ...TEST_CONF,
          artifactPayload: DECISIONING_PAYLOAD_PAGELOAD_VEC_AB
        });
      });

      it("returns outcomes for both activities in the artifact - no params", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            execute: {
              pageLoad: {}
            }
          }
        });

        expect(result.execute.pageLoad.options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  content:
                    '<p id="action_insert_15887183492726231">experience A</p>',
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                  selector:
                    "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                  type: "insertBefore"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "insertAfter",
                  selector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  content:
                    '<p id="action_insert_15882853393943012">Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.</p>'
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "setStyle",
                  selector: "#action_insert_15882853393943012",
                  cssSelector: "#action_insert_15882853393943012",
                  content: {
                    "background-color": "rgba(86,255,86,1)",
                    priority: "important"
                  }
                }
              ],
              type: "actions"
            }
          ])
        );

        expect(result.execute.pageLoad.metrics).toEqual(
          expect.objectContaining([
            {
              type: "click",
              selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
              eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
            },
            {
              type: "click",
              selector: "#action_insert_15882853393943012",
              eventToken: "/GMYvcjhUsR6WVqQElppUw=="
            }
          ])
        );
      });

      it("returns all applicable outcomes when an experiences has audiences - single param", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            execute: {
              pageLoad: {
                parameters: {
                  jason: "correct"
                }
              }
            }
          }
        });

        expect(result.execute.pageLoad.options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  type: "setHtml",
                  selector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  cssSelector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  content: "jason is correct"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "setStyle",
                  selector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  cssSelector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  content: {
                    "background-color": "rgba(170,255,255,1)",
                    priority: "important"
                  }
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "insertBefore",
                  selector:
                    "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                  content:
                    '<p id="action_insert_15887183492726231">experience A</p>'
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "insertAfter",
                  selector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  content:
                    '<p id="action_insert_15882853393943012">Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.</p>'
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "setStyle",
                  selector: "#action_insert_15882853393943012",
                  cssSelector: "#action_insert_15882853393943012",
                  content: {
                    "background-color": "rgba(86,255,86,1)",
                    priority: "important"
                  }
                }
              ],
              type: "actions"
            }
          ])
        );
      });

      it("returns all applicable outcomes when an experiences has audiences - multi param", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            execute: {
              pageLoad: {
                parameters: {
                  jason: "correct",
                  greg: "correct"
                }
              }
            }
          }
        });

        expect(result.execute.pageLoad.options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  type: "setHtml",
                  selector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                  cssSelector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                  content: "greg is correct"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "setStyle",
                  selector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                  cssSelector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                  content: {
                    "background-color": "rgba(127,255,0,1)",
                    priority: "important"
                  }
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  cssSelector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  content: "jason is correct"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "setStyle",
                  selector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  cssSelector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  content: {
                    "background-color": "rgba(170,255,255,1)",
                    priority: "important"
                  }
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "insertBefore",
                  selector:
                    "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                  content:
                    '<p id="action_insert_15887183492726231">experience A</p>'
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  content:
                    '<p id="action_insert_15882853393943012">Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.</p>',
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  selector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  type: "insertAfter"
                }
              ],
              type: "actions"
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
              type: "actions"
            }
          ])
        );
      });
    });

    describe("xt", () => {
      beforeEach(async () => {
        decisioning = await TargetDecisioningEngine({
          ...TEST_CONF,
          artifactPayload: DECISIONING_PAYLOAD_PAGELOAD_VEC_XT
        });
      });
      it("multiple matching params, returns experiences for just one experience", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            execute: {
              pageLoad: {
                parameters: {
                  jason: "correct",
                  greg: "correct"
                }
              }
            }
          }
        });

        expect(result.execute.pageLoad.options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  type: "setHtml",
                  selector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                  cssSelector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                  content: "greg is correct"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  content: "Hello greg"
                }
              ],
              type: "actions"
            }
          ])
        );
      });
      it("single matching param, returns experiences for just one experience", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            execute: {
              pageLoad: {
                parameters: {
                  jason: "correct"
                }
              }
            }
          }
        });

        expect(result.execute.pageLoad.options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  content: "Hello jason",
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  selector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  type: "setHtml"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  content: "jason is correct",
                  cssSelector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  selector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                  type: "setHtml"
                }
              ],
              type: "actions"
            }
          ])
        );
      });
      it("no params, returns experiences for just one experience", async () => {
        const result = await decisioning.getOffers({
          request: {
            ...targetRequest,
            execute: {
              pageLoad: {}
            }
          }
        });

        expect(result.execute.pageLoad.options).toEqual(
          expect.objectContaining([
            {
              content: [
                {
                  type: "setHtml",
                  selector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  content: "Hello everyone"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  type: "setHtml",
                  selector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                  cssSelector:
                    "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                  content: "all visitors"
                }
              ],
              type: "actions"
            }
          ])
        );
      });
    });
  });
});
