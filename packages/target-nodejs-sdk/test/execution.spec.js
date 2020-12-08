import {
  DECISIONING_ENGINE_NOT_READY,
  DECISIONING_METHOD
} from "@adobe/target-tools";

const DECISIONING_PAYLOAD_FEATURE_FLAG = require("@adobe/target-decisioning-engine/test/test-artifacts/TEST_ARTIFACT_FEATURE_FLAG.json");

require("jest-fetch-mock").enableMocks();

const TargetClient = require("../src/index.server").default;

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
  artifactFormat: "json", // setting this tells the artifactProvider deobfuscation is not needed
  targetLocationHint: "28",
  pollingInterval: 0,
  maximumWaitReady: 500,
  telemetryEnabled: false
};

describe("execution mode", () => {
  let client;

  beforeEach(() => {
    fetch.resetMocks();
    if (client) {
      client = undefined;
    }
  });

  describe("on-device", () => {
    it("returns a list of mbox names that require remote", () => {
      expect.assertions(1);

      return new Promise(done => {
        fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG));

        async function clientReady() {
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

          expect(result.meta).toEqual(
            expect.objectContaining({
              decisioningMethod: DECISIONING_METHOD.ON_DEVICE,
              remoteMboxes: ["remote-only-mbox-a", "remote-only-mbox-b"]
            })
          );
          done();
        }

        client = TargetClient.create({
          decisioningMethod: DECISIONING_METHOD.ON_DEVICE,
          ...targetClientOptions,
          events: { clientReady }
        });
      });
    });

    it("returns OK if no mbox names require remote", () => {
      expect.assertions(1);

      return new Promise(done => {
        fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG));

        async function clientReady() {
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

          expect(result.meta).toEqual(
            expect.objectContaining({
              decisioningMethod: DECISIONING_METHOD.ON_DEVICE,
              remoteMboxes: [],
              remoteViews: []
            })
          );
          done();
        }

        client = TargetClient.create({
          decisioningMethod: DECISIONING_METHOD.ON_DEVICE,
          ...targetClientOptions,
          events: { clientReady }
        });
      });
    });
  });
  describe("hybrid", () => {
    it("makes a remote request if remote is required", () => {
      expect.assertions(1);

      return new Promise(done => {
        fetch
          .once(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG))
          .once(JSON.stringify(DELIVERY_RESPONSE));

        async function clientReady() {
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

          expect(result.meta).toEqual(
            expect.objectContaining({
              decisioningMethod: DECISIONING_METHOD.SERVER_SIDE,
              remoteMboxes: ["remote-only-mbox-a", "remote-only-mbox-b"]
            })
          );
          done();
        }

        client = TargetClient.create({
          decisioningMethod: DECISIONING_METHOD.HYBRID,
          ...targetClientOptions,
          events: { clientReady }
        });
      });
    });

    it("does local decisioning if remote is not required", () => {
      expect.assertions(1);

      return new Promise(done => {
        fetch.once(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG));

        async function clientReady() {
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

          expect(result.meta).toEqual(
            expect.objectContaining({
              decisioningMethod: DECISIONING_METHOD.ON_DEVICE,
              remoteMboxes: []
            })
          );
          done();
        }

        client = TargetClient.create({
          decisioningMethod: DECISIONING_METHOD.HYBRID,
          ...targetClientOptions,
          events: { clientReady }
        });
      });
    });
  });

  describe("server side", () => {
    it("throws an error if local decisioningMethod is used in getOffers call but the global decisioningMethod is remote", () => {
      expect.assertions(1);
      return new Promise(done => {
        client = TargetClient.create({
          decisioningMethod: DECISIONING_METHOD.SERVER_SIDE,
          ...targetClientOptions,
          events: {
            clientReady: () => {
              client
                .getOffers({
                  decisioningMethod: DECISIONING_METHOD.ON_DEVICE,
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
                  }
                })
                .catch(err => {
                  expect(err).toEqual(new Error(DECISIONING_ENGINE_NOT_READY));
                  done();
                });
            }
          }
        });
      });
    });

    it("makes a request to delivery API if hybrid decisioningMethod is used in a getOffers call and decisioning engine is not ready", () => {
      fetch.once(JSON.stringify(DELIVERY_RESPONSE));

      expect.assertions(1);
      return new Promise(done => {
        client = TargetClient.create({
          decisioningMethod: DECISIONING_METHOD.SERVER_SIDE,
          ...targetClientOptions,
          events: {
            clientReady: () => {
              client
                .getOffers({
                  decisioningMethod: DECISIONING_METHOD.HYBRID,
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
                  }
                })
                .then(result => {
                  expect(result).toEqual(
                    expect.objectContaining({
                      meta: {
                        decisioningMethod: DECISIONING_METHOD.SERVER_SIDE,
                        remoteMboxes: [],
                        remoteViews: []
                      }
                    })
                  );
                  done();
                });
            }
          }
        });
      });
    });
  });
});
