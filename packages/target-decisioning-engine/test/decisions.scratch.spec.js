import TargetDecisioningEngine from "../src";

const DECISIONING_PAYLOAD_SCRATCH = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    generatedAt: "2020-05-12T17:30:51.603Z",
    environment: "waters_test"
  },
  globalMbox: "target-global-mbox",
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.name",
    "experience.id",
    "offer.name",
    "offer.id",
    "option.id",
    "option.name"
  ],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          meta: {
            activityId: 346119,
            activityType: "landing",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 0,
            audienceIds: [5665764, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "stage.applookout.net",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setStyle",
                    selector:
                      "HTML > BODY > DIV.top-content:eq(0) > DIV.inner-bg:eq(0) > DIV.container:eq(0) > DIV.row:eq(1) > DIV.col-sm-6:eq(0)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(1)",
                    content: {
                      visibility: "hidden"
                    }
                  }
                ],
                eventToken:
                  "XaGxL/oofudncR2tWZZ6z2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "oDfbc20sBuxCM6JwOpstag==",
                selector: "#continue-button"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 346119,
            activityType: "landing",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 0,
            audienceIds: [5665764],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "stage.applookout.net",
                  {
                    var: "page.domain"
                  }
                ]
              },
              {
                "==": [
                  "/",
                  {
                    var: "page.path"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "XaGxL/oofudncR2tWZZ6z5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "oDfbc20sBuxCM6JwOpstag==",
                selector: "#continue-button"
              }
            ]
          }
        }
      ]
    },
    views: {}
  }
};

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
      host: "stage.applookout.net"
    },
    address: {
      url: "https://stage.applookout.net/"
    },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
  }
};

describe("a quick test", () => {
  let decisioning;

  beforeEach(async () => {
    decisioning = await TargetDecisioningEngine({
      ...TEST_CONF,
      artifactPayload: DECISIONING_PAYLOAD_SCRATCH
    });
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("does something", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          pageLoad: {}
        }
      }
    });

    const { eventToken } = result.prefetch.pageLoad.options[0];

    expect(eventToken.startsWith("XaGxL/oofudncR2")).toEqual(true);
  });
});
