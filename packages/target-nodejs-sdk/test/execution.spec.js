/* eslint-disable jest/no-test-callback */
import { EXECUTION_MODE } from "../src/enums";

const HttpStatus = require("http-status-codes");
require("jest-fetch-mock").enableMocks();
const { Messages } = require("../src/messages");

const TargetClient = require("../src/index.server").default;

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/jason-flags
const DECISIONING_PAYLOAD_FEATURE_FLAG = {
  version: "1.0.0",
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: ["remote-only-mbox-a", "remote-only-mbox-b"],
  meta: { generatedAt: "2020-04-10T21:45:50.503Z", environment: 11507 },
  rules: {
    mboxes: {
      "jason-flags": [
        {
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            options: [
              {
                content: {
                  paymentExperience: "legacy",
                  showFeatureX: false,
                  paymentGatewayVersion: 2.3,
                  customerFeedbackValue: 10
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "8MDICvd7bsTPYn79fLBNQmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "jason-flags"
          },
          meta: {
            activityId: 335113,
            experienceId: 0,
            type: "ab",
            mbox: "jason-flags",
            offerIds: [632759],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            options: [
              {
                content: {
                  paymentExperience: "alpha10",
                  showFeatureX: true,
                  paymentGatewayVersion: 3.1,
                  customerFeedbackValue: 99
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "8MDICvd7bsTPYn79fLBNQpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "jason-flags"
          },
          meta: {
            activityId: 335113,
            experienceId: 1,
            type: "ab",
            mbox: "jason-flags",
            offerIds: [632760],
            audienceIds: []
          }
        }
      ]
    },
    views: {}
  }
};

const DELIVERY_RESPONSE = {
  status: 200,
  requestId: "7a568cbfe3f44f0b99d1092c246660c3",
  client: "adobesummit2018",
  id: {
    tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
    marketingCloudVisitorId: "07327024324407615852294135870030620007"
  },
  edgeHost: "mboxedge28.tt.omtrdc.net",
  prefetch: {
    mboxes: [
      {
        index: 1,
        name: "jason-flags",
        options: [
          {
            content: {
              paymentExperience: "alpha10",
              showFeatureX: true,
              paymentGatewayVersion: 3.1,
              customerFeedbackValue: 99
            },
            type: "json",
            eventToken:
              "8MDICvd7bsTPYn79fLBNQpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
          }
        ]
      },
      {
        index: 2,
        name: "remote-only-mbox-a",
        options: [
          {
            content: {
              paymentExperience: "alpha10",
              showFeatureX: true,
              paymentGatewayVersion: 3.1,
              customerFeedbackValue: 99
            },
            type: "json",
            eventToken:
              "8MDIALF7bsTPYn79fLBNQpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
          }
        ]
      }
    ]
  }
};

const context = {
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
};

const visitorId = {
  tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
  marketingCloudVisitorId: "07327024324407615852294135870030620007"
};

const targetRequest = {
  id: visitorId,
  context
};

const targetClientOptions = {
  client: "someClientId",
  organizationId: "someOrgId",
  targetLocationHint: "28"
};

describe("execution mode", () => {
  let client;

  beforeEach(() => {
    fetch.resetMocks();
    if (client) {
      client = undefined;
    }
  });

  describe("local", () => {
    it("returns a list of mbox names that require remote", async done => {
      fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG));

      async function clientReadyCallback() {
        const result = await client.getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              mboxes: [
                {
                  name: "jason-flags",
                  index: 1
                },
                {
                  name: "remote-only-mbox-a",
                  index: 2
                },
                {
                  name: "remote-only-mbox-b",
                  index: 2
                }
              ]
            }
          },
          sessionId: "dummy_session"
        });

        expect(result.status).toEqual(
          expect.objectContaining({
            status: HttpStatus.PARTIAL_CONTENT,
            message: Messages.PARTIAL_RESULT,
            remoteMboxes: ["remote-only-mbox-a", "remote-only-mbox-b"]
          })
        );
        done();
      }

      client = TargetClient.create({
        executionMode: EXECUTION_MODE.LOCAL,
        pollingInterval: 0,
        ...targetClientOptions,
        clientReadyCallback
      });
    });

    it("returns OK if no mbox names require remote", async done => {
      fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG));

      async function clientReadyCallback() {
        const result = await client.getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              mboxes: [
                {
                  name: "jason-flags",
                  index: 1
                }
              ]
            }
          },
          sessionId: "dummy_session"
        });

        expect(result.status).toEqual(
          expect.objectContaining({
            status: HttpStatus.OK,
            message: Messages.LOCAL_RESULT,
            remoteMboxes: []
          })
        );
        done();
      }

      client = TargetClient.create({
        executionMode: EXECUTION_MODE.LOCAL,
        pollingInterval: 0,
        ...targetClientOptions,
        clientReadyCallback
      });
    });
  });
  describe("hybrid", () => {
    it("makes a remote request if remote is required", async done => {
      fetch
        .once(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG))
        .once(JSON.stringify(DELIVERY_RESPONSE));

      async function clientReadyCallback() {
        const result = await client.getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              mboxes: [
                {
                  name: "jason-flags",
                  index: 1
                },
                {
                  name: "remote-only-mbox-a",
                  index: 2
                },
                {
                  name: "remote-only-mbox-b",
                  index: 2
                }
              ]
            }
          },
          sessionId: "dummy_session"
        });

        expect(result.status).toEqual(
          expect.objectContaining({
            status: HttpStatus.OK,
            message: Messages.REMOTE_RESULT,
            remoteMboxes: ["remote-only-mbox-a", "remote-only-mbox-b"]
          })
        );
        done();
      }

      client = TargetClient.create({
        executionMode: EXECUTION_MODE.HYBRID,
        pollingInterval: 0,
        ...targetClientOptions,
        clientReadyCallback
      });
    });

    it("does local decisioning if remote is not required", async done => {
      fetch.once(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG));

      async function clientReadyCallback() {
        const result = await client.getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              mboxes: [
                {
                  name: "jason-flags",
                  index: 1
                }
              ]
            }
          },
          sessionId: "dummy_session"
        });

        expect(result.status).toEqual(
          expect.objectContaining({
            status: HttpStatus.OK,
            message: Messages.LOCAL_RESULT,
            remoteMboxes: []
          })
        );
        done();
      }

      client = TargetClient.create({
        executionMode: EXECUTION_MODE.HYBRID,
        pollingInterval: 0,
        ...targetClientOptions,
        clientReadyCallback
      });
    });
  });
});
