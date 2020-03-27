/* eslint-disable jest/no-test-callback */
import {
  DUMMY_ARTIFACT_PAYLOAD,
  DECISIONING_PAYLOAD_SIMPLE
} from "./decisioning-payloads";

const HttpStatus = require("http-status-codes");

const MockDate = require("mockdate");
require("jest-fetch-mock").enableMocks();
const TargetClient = require("../src/index.server").default;
const { EXECUTION_MODE } = require("../src/enums");
const { Messages } = require("../src/messages");

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
  let client;

  beforeEach(() => {
    MockDate.reset();
    fetch.resetMocks();
    if (client) {
      client = undefined;
    }
  });

  describe("initializes", () => {
    it("creates an instance of target-decisioning-engine if evaluation mode is local", () => {
      fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

      return new Promise(done => {
        client = TargetClient.create({
          client: "someClientId",
          organizationId: "someOrgId",
          executionMode: EXECUTION_MODE.LOCAL,
          targetLocationHint: "28",
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

    it("does not create an instance of target-decisioning-engine if evaluation mode is remote", async done => {
      fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

      client = TargetClient.create({
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

  describe("throws an error", () => {
    it("if a getOffers request is made before the decisioning artifact is available", async done => {
      let timer;

      fetch.mockResponse(() => {
        return new Promise(resolve => {
          timer = setTimeout(() => {
            resolve(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));
          }, 100);
        });
      });

      client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId",
        executionMode: EXECUTION_MODE.LOCAL,
        targetLocationHint: "28",
        pollingInterval: 0
      });

      // make the request immediately (before the artifact has been fetched)
      await expect(
        client.getOffers({
          request: TARGET_REQUEST,
          sessionId: "dummy_session"
        })
      ).rejects.toEqual(new Error(Messages.PENDING_ARTIFACT_RETRIEVAL));

      if (timer) clearTimeout(timer);
      done();
    });

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

      client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId",
        executionMode: EXECUTION_MODE.LOCAL,
        targetLocationHint: "28",
        pollingInterval: 0
      });

      await expect(
        client.getOffers({
          request: TARGET_REQUEST,
          sessionId: "dummy_session"
        })
      ).rejects.toEqual(new Error(Messages.PENDING_ARTIFACT_RETRIEVAL));

      const timer = setTimeout(async () => {
        await expect(
          client.getOffers({
            request: TARGET_REQUEST,
            sessionId: "dummy_session"
          })
        ).rejects.toEqual(new Error(Messages.PENDING_ARTIFACT_RETRIEVAL));

        clearTimeout(timer);
        done();
      }, 500);
    });
  });

  describe("models delivery api responses", () => {
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
        address: {
          url: "http://adobe.com"
        },
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
        beacon: false
      }
    };

    const prefetchRequestOptions = {
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
      },
      sessionId: "dummy_session"
    };

    const executeRequestOptions = {
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
      },
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
    describe("targetLocationHintCookie", () => {
      it("is makes a preemptive delivery request to get the mboxEdgeCluster on init", async done => {
        fetch
          .once(
            JSON.stringify({
              status: 200,
              requestId: "1387f0ea-51d6-43df-ba32-f2fe79c356bd",
              client: "someClientId",
              id: {
                tntId: "someSessionId.28_0"
              },
              edgeHost: "mboxedge28.tt.omtrdc.net"
            })
          )
          .once(JSON.stringify(DECISIONING_PAYLOAD_SIMPLE));

        async function onClientReady() {
          const result = await client.getOffers(prefetchRequestOptions);

          expect(result.targetLocationHintCookie).toEqual({
            name: "mboxEdgeCluster",
            value: "28",
            maxAge: 1860
          });
          done();
        }

        client = TargetClient.create({
          ...targetClientOptions,
          executionMode: EXECUTION_MODE.LOCAL,
          pollingInterval: 0,
          clientReadyCallback: onClientReady
        });
      });

      it("is recovers if the delivery request fails", async done => {
        fetch.mockResponses(
          ["", { status: HttpStatus.SERVICE_UNAVAILABLE }],
          [
            JSON.stringify(DECISIONING_PAYLOAD_SIMPLE),
            { status: HttpStatus.OK }
          ]
        );

        async function onClientReady() {
          const result = await client.getOffers(prefetchRequestOptions);

          expect(result.targetLocationHintCookie).toBeUndefined();
          done();
        }

        client = TargetClient.create({
          ...targetClientOptions,
          executionMode: EXECUTION_MODE.LOCAL,
          pollingInterval: 0,
          clientReadyCallback: onClientReady
        });
      });

      it("can be passed in as a config option to be used instead of of a preemptive delivery request", async done => {
        fetch.once(JSON.stringify(DECISIONING_PAYLOAD_SIMPLE));

        async function onClientReady() {
          const result = await client.getOffers(prefetchRequestOptions);

          expect(result.targetLocationHintCookie).toEqual({
            name: "mboxEdgeCluster",
            value: "28",
            maxAge: 1860
          });
          done();
        }

        client = TargetClient.create({
          ...targetClientOptions,
          executionMode: EXECUTION_MODE.LOCAL,
          pollingInterval: 0,
          targetLocationHint: "28",
          clientReadyCallback: onClientReady
        });
      });
    });

    it("produces a valid response in local execution mode", async done => {
      fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_SIMPLE));

      async function onClientReady() {
        const result = await client.getOffers(prefetchRequestOptions);

        expect(result).toEqual(expect.objectContaining(targetResult));
        done();
      }

      client = TargetClient.create({
        ...targetClientOptions,
        executionMode: EXECUTION_MODE.LOCAL,
        targetLocationHint: "28",
        pollingInterval: 0,
        clientReadyCallback: onClientReady
      });
    });

    it("emits notifications for local decision outcomes; execute request", async done => {
      const now = new Date("2020-02-25T01:05:00");
      MockDate.set(now);

      fetch.once(JSON.stringify(DECISIONING_PAYLOAD_SIMPLE)).once(
        async req => {
          expect(req).not.toBeUndefined();
          expect(req.method).toEqual("POST");
          const requestBody = await req.json();
          expect(requestBody).toMatchObject({
            ...targetRequest,
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
          });

          return Promise.resolve("");
        },
        {
          status: HttpStatus.NO_CONTENT
        }
      );

      async function onClientReady() {
        await client.getOffers(executeRequestOptions);
        expect(fetch.mock.calls.length).toEqual(2);
        done();
      }

      client = TargetClient.create({
        ...targetClientOptions,
        executionMode: EXECUTION_MODE.LOCAL,
        pollingInterval: 0,
        targetLocationHint: "28",
        clientReadyCallback: onClientReady
      });
    });

    it("produces a valid response in remote execution mode", async done => {
      fetch.mockResponse(JSON.stringify(DELIVERY_API_RESPONSE));

      async function onClientReady() {
        const result = await client.getOffers(prefetchRequestOptions);

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
