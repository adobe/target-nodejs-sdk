const HttpStatus = require("http-status-codes");

require("jest-fetch-mock").enableMocks();
const TargetClient = require("../src/index.server");
const { EXECUTION_MODE } = require("../src/enums");
const { PENDING_ARTIFACT_RETRIEVAL } = require("../src/messages");

const DUMMY_ARTIFACT_PAYLOAD = { version: "1.0.0", meta: {}, rules: [] };

const TARGET_REQUEST = {
  prefetch: {
    mboxes: [
      {
        name: "mbox-something",
        index: 1
      }
    ]
  }
};

describe("target local decisioning", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe("initializes", () => {
    it("creates an instance of target-decisioning-engine if evaluation mode is local", () => {
      fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

      return new Promise(done => {
        const client = TargetClient.create({
          client: "someClientId",
          organizationId: "someOrgId",
          executionMode: EXECUTION_MODE.LOCAL,
          pollingInterval: 0,
          clientReadyCallback: () => {
            expect(client.decisioningEngine).not.toBeUndefined();
            expect(typeof client.decisioningEngine.getOffers).toEqual(
              "function"
            );
            done();
          }
        });
      });
    });

    it("does not create an instance of target-decisioning-engine if evaluation mode is remote", () => {
      fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

      return new Promise(done => {
        const client = TargetClient.create({
          client: "someClientId",
          organizationId: "someOrgId",
          executionMode: EXECUTION_MODE.REMOTE,
          pollingInterval: 0,
          clientReadyCallback: () => {
            expect(client).toBeDefined();
            expect(
              Object.prototype.hasOwnProperty.call(client, "decisioningEngine")
            ).toEqual(false);
            done();
          }
        });
      });
    });
  });

  describe("throws an error", () => {
    it("if a getOffers request is made before the decisioning artifact is available", async () => {
      fetch.mockResponse(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));
          }, 100);
        });
      });

      const client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId",
        executionMode: EXECUTION_MODE.LOCAL,
        pollingInterval: 0
      });

      // make the request immediately (before the artifact has been fetched)
      await expect(
        client.getOffers({
          request: TARGET_REQUEST,
          sessionId: "dummy_session"
        })
      ).rejects.toEqual(new Error(PENDING_ARTIFACT_RETRIEVAL));
    });

    // eslint-disable-next-line jest/no-test-callback
    it("if getOffers is called, but the artifact could not be retrieved", async done => {
      fetch.mockResponses(
        ["", { status: HttpStatus.UNAUTHORIZED }],
        ["", { status: HttpStatus.NOT_FOUND }],
        ["", { status: HttpStatus.NOT_ACCEPTABLE }],
        ["", { status: HttpStatus.NOT_IMPLEMENTED }],
        ["", { status: HttpStatus.FORBIDDEN }],
        ["", { status: HttpStatus.SERVICE_UNAVAILABLE }],
        ["", { status: HttpStatus.BAD_REQUEST }],
        ["", { status: HttpStatus.BAD_GATEWAY }],
        ["", { status: HttpStatus.TOO_MANY_REQUESTS }],
        ["", { status: HttpStatus.GONE }],
        ["", { status: HttpStatus.INTERNAL_SERVER_ERROR }]
      );

      const client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId",
        executionMode: EXECUTION_MODE.LOCAL,
        pollingInterval: 0
      });

      await expect(
        client.getOffers({
          request: TARGET_REQUEST,
          sessionId: "dummy_session"
        })
      ).rejects.toEqual(new Error(PENDING_ARTIFACT_RETRIEVAL));

      setTimeout(async () => {
        await expect(
          client.getOffers({
            request: TARGET_REQUEST,
            sessionId: "dummy_session"
          })
        ).rejects.toEqual(
          new Error("The decisioning artifact is not available")
        );

        done();
      }, 500);
    });
  });

  describe("models delivery api responses", () => {
    const LOCAL_DECISIONING_ARTIFACT = {
      version: "1.0.0",
      meta: {
        generatedAt: "2020-03-02T21:20:13.576Z"
      },
      rules: [
        {
          condition: {
            "<": [
              0,
              {
                var: "allocation"
              },
              50
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
            "<": [
              50,
              {
                var: "allocation"
              },
              100
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
        }
      ]
    };
    const DELIVERY_API_RESPONSE = {
      status: 200,
      requestId: "0979a315df524c74aa420a9d03c8d921",
      client: "adobesummit2018",
      id: {
        tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
        marketingCloudVisitorId: "07327024324407615852294135870030620007"
      },
      edgeHost: "mboxedge28.tt.omtrdc.net",
      prefetch: {
        mboxes: [
          {
            index: 2,
            name: "superfluous-mbox",
            options: [
              {
                content: { doMagic: true, importantValue: 150 },
                type: "json",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ]
          }
        ]
      }
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
          url: "http://adobe.com",
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
            name: "superfluous-mbox",
            index: 2
          }
        ]
      }
    };

    const requestOptions = {
      request: targetRequest,
      sessionId: "dummy_session"
    };

    const targetClientOptions = {
      client: "adobesummit2018",
      organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
      pollingInterval: 0
    };

    const targetResult = {
      visitorState: {
        "65453EA95A70434F0A495D34@AdobeOrg": {
          sdid: {
            supplementalDataIDCurrent: expect.any(String),
            supplementalDataIDCurrentConsumed: {
              "payload:target-global-mbox": true
            },
            supplementalDataIDLastConsumed: {}
          }
        }
      },
      request: {
        requestId: expect.any(String),
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        context: {
          channel: "web",
          address: {
            url: "http://adobe.com"
          },
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
          beacon: false
        },
        experienceCloud: {
          analytics: {
            supplementalDataId: expect.any(String),
            logging: "server_side"
          }
        },
        prefetch: {
          mboxes: [
            {
              index: 2,
              name: "superfluous-mbox"
            }
          ]
        }
      },
      targetCookie: {
        name: "mbox",
        value: expect.stringContaining("session#dummy_session"),
        maxAge: 63244801
      },
      response: {
        status: 200,
        requestId: expect.any(String),
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        client: "adobesummit2018",
        prefetch: {
          mboxes: [
            {
              index: 2,
              name: "superfluous-mbox",
              options: [
                {
                  content: {
                    doMagic: true,
                    importantValue: 150
                  },
                  eventToken:
                    "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  type: "json"
                }
              ]
            }
          ]
        }
      }
    };

    // eslint-disable-next-line jest/no-test-callback
    it("produces a valid response in local execution mode", async done => {
      fetch.mockResponse(JSON.stringify(LOCAL_DECISIONING_ARTIFACT));

      let client;

      async function onClientReady() {
        const result = await client.getOffers(requestOptions);

        expect(result).toEqual(expect.objectContaining(targetResult));
        done();
      }

      client = TargetClient.create({
        ...targetClientOptions,
        executionMode: EXECUTION_MODE.LOCAL,
        clientReadyCallback: onClientReady
      });
    });

    // eslint-disable-next-line jest/no-test-callback
    it("produces a valid response in remote execution mode", async done => {
      fetch.mockResponse(JSON.stringify(DELIVERY_API_RESPONSE));

      let client;

      async function onClientReady() {
        const result = await client.getOffers(requestOptions);

        expect(result).toEqual(
          expect.objectContaining({
            ...targetResult,
            response: {
              ...targetResult.response,
              edgeHost: "mboxedge28.tt.omtrdc.net"
            },
            targetLocationHintCookie: {
              name: "mboxEdgeCluster",
              value: "28",
              maxAge: 1860
            }
          })
        );
        done();
      }

      client = TargetClient.create({
        ...targetClientOptions,
        executionMode: EXECUTION_MODE.REMOTE,
        clientReadyCallback: onClientReady
      });
    });
  });
});
