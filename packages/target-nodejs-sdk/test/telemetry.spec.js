import { DECISIONING_METHOD } from "@adobe/target-tools";
import mockTelemetryProvider from "./mockTelemetryProvider";

jest.mock("@adobe/target-tools", () => ({
  ...jest.requireActual("@adobe/target-tools"),
  TelemetryProvider: () => mockTelemetryProvider
}));

require("jest-fetch-mock").enableMocks();

const DECISIONING_PAYLOAD_FEATURE_FLAG = require("@adobe/target-decisioning-engine/test/schema/artifacts/TEST_ARTIFACT_FEATURE_FLAG.json");

const TargetClient = require("../src/index.server").default;

const DELIVERY_RESPONSE = {
  status: 200,
  requestId: "7a568cbfe3f44f0b99d1092c246660c3",
  client: "targettesting",
  id: {
    tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
    marketingCloudVisitorId: "07327024324407615852294135870030620007"
  },
  edgeHost: "mboxedge28.tt.omtrdc.net",
  prefetch: {
    mboxes: [
      {
        index: 1,
        name: "mbox-feature-flags",
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
  telemetryEnabled: true
};

describe("telemetry mode", () => {
  let client;
  let addTelemetryToDeliveryRequestSpy;
  let addArtifactRequestEntrySpy;
  let addDeliveryRequestEntrySpy;

  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();

    mockTelemetryProvider.getAndClearEntries();

    addTelemetryToDeliveryRequestSpy = jest.spyOn(
      mockTelemetryProvider,
      "addTelemetryToDeliveryRequest"
    );

    addArtifactRequestEntrySpy = jest.spyOn(
      mockTelemetryProvider,
      "addArtifactRequestEntry"
    );

    addDeliveryRequestEntrySpy = jest.spyOn(
      mockTelemetryProvider,
      "addDeliveryRequestEntry"
    );

    if (client) {
      client = undefined;
    }
  });

  function verifyTelemetryEntries(expectedCount, callNumber = 0) {
    if (expectedCount === 0) {
      expect(
        addTelemetryToDeliveryRequestSpy.mock.results[callNumber].value
          .telemetry
      ).toBeUndefined();
      return;
    }
    expect(
      addTelemetryToDeliveryRequestSpy.mock.results[callNumber].value.telemetry
        .entries.length
    ).toBe(expectedCount);
  }

  describe("on-device", () => {
    it("immediately executes telemetries", () => {
      expect.assertions(4);

      return new Promise(done => {
        fetch
          .once(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG))
          .once(JSON.stringify(DELIVERY_RESPONSE));

        async function clientReady() {
          await client.getOffers({
            request: {
              ...targetRequest,
              prefetch: {
                mboxes: [
                  {
                    name: "mbox-feature-flags",
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

          setTimeout(() => {
            expect(addArtifactRequestEntrySpy).toHaveBeenCalledTimes(1);
            // Called once via getOffers and subsequently for the notifications call
            expect(addDeliveryRequestEntrySpy).toHaveBeenCalledTimes(2);
            expect(addTelemetryToDeliveryRequestSpy).toHaveBeenCalledTimes(1);
            verifyTelemetryEntries(2);
            done();
          }, 100);
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
    it("executes telemetries as part of sendNotifications call when on-device used", () => {
      expect.assertions(5);

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
                    name: "mbox-feature-flags",
                    index: 1
                  }
                ]
              }
            },
            sessionId: "dummy_session"
          });

          expect(result.meta.decisioningMethod).toBe(
            DECISIONING_METHOD.ON_DEVICE
          );
          setTimeout(() => {
            expect(addArtifactRequestEntrySpy).toHaveBeenCalledTimes(1);
            expect(addDeliveryRequestEntrySpy).toHaveBeenCalledTimes(2);
            expect(
              mockTelemetryProvider.addTelemetryToDeliveryRequest
            ).toHaveBeenCalledTimes(1);
            verifyTelemetryEntries(2);
            done();
          }, 300);
        }

        client = TargetClient.create({
          decisioningMethod: DECISIONING_METHOD.HYBRID,
          ...targetClientOptions,
          events: { clientReady }
        });
      });
    });

    it("executes telemetries on next getOffers call when server-side used", () => {
      expect.assertions(7);

      return new Promise(done => {
        fetch
          .once(JSON.stringify(DECISIONING_PAYLOAD_FEATURE_FLAG))
          .once(JSON.stringify(DELIVERY_RESPONSE))
          .once(JSON.stringify(DELIVERY_RESPONSE));

        async function clientReady() {
          let result = await client.getOffers({
            request: {
              ...targetRequest,
              prefetch: {
                mboxes: [
                  {
                    name: "mbox-feature-flags",
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

          expect(result.meta.decisioningMethod).toBe(
            DECISIONING_METHOD.SERVER_SIDE
          );

          result = await client.getOffers({
            request: {
              ...targetRequest,
              prefetch: {
                mboxes: [
                  {
                    name: "mbox-feature-flags",
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

          expect(result.meta.decisioningMethod).toBe(
            DECISIONING_METHOD.SERVER_SIDE
          );
          setTimeout(() => {
            expect(addArtifactRequestEntrySpy).toHaveBeenCalledTimes(1);
            expect(addDeliveryRequestEntrySpy).toHaveBeenCalledTimes(2);
            expect(
              mockTelemetryProvider.addTelemetryToDeliveryRequest
            ).toHaveBeenCalledTimes(2);
            verifyTelemetryEntries(1, 0);
            verifyTelemetryEntries(1, 1);
            done();
          }, 300);
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
    it("executes telemetries with next getOffer", () => {
      expect.assertions(7);

      return new Promise(done => {
        fetch
          .once(JSON.stringify(DELIVERY_RESPONSE))
          .once(JSON.stringify(DELIVERY_RESPONSE));

        async function clientReady() {
          let result = await client.getOffers({
            request: {
              ...targetRequest,
              prefetch: {
                mboxes: [
                  {
                    name: "mbox-feature-flags",
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

          expect(result.meta.decisioningMethod).toBe(
            DECISIONING_METHOD.SERVER_SIDE
          );

          result = await client.getOffers({
            request: {
              ...targetRequest,
              prefetch: {
                mboxes: [
                  {
                    name: "mbox-feature-flags",
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

          expect(result.meta.decisioningMethod).toBe(
            DECISIONING_METHOD.SERVER_SIDE
          );
          setTimeout(() => {
            expect(addArtifactRequestEntrySpy).not.toHaveBeenCalled();
            expect(addDeliveryRequestEntrySpy).toHaveBeenCalledTimes(2);
            expect(
              mockTelemetryProvider.addTelemetryToDeliveryRequest
            ).toHaveBeenCalledTimes(2);
            verifyTelemetryEntries(0, 0);
            verifyTelemetryEntries(1, 1);
            done();
          }, 100);
        }

        client = TargetClient.create({
          decisioningMethod: DECISIONING_METHOD.SERVER_SIDE,
          ...targetClientOptions,
          events: { clientReady }
        });
      });
    });

    it("executes telemetries with next sendNotifications", () => {
      expect.assertions(7);

      return new Promise(done => {
        fetch
          .once(JSON.stringify(DELIVERY_RESPONSE))
          .once(JSON.stringify(DELIVERY_RESPONSE));

        async function clientReady() {
          let result = await client.getOffers({
            request: {
              ...targetRequest,
              prefetch: {
                mboxes: [
                  {
                    name: "mbox-feature-flags",
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

          expect(result.meta.decisioningMethod).toBe(
            DECISIONING_METHOD.SERVER_SIDE
          );

          result = await client.sendNotifications({
            request: {
              notifications: [
                {
                  id: "1234",
                  type: "display"
                }
              ]
            }
          });

          expect(result.meta.decisioningMethod).toBe(
            DECISIONING_METHOD.SERVER_SIDE
          );
          setTimeout(() => {
            expect(addArtifactRequestEntrySpy).not.toHaveBeenCalled();
            expect(addDeliveryRequestEntrySpy).toHaveBeenCalledTimes(2);
            expect(
              mockTelemetryProvider.addTelemetryToDeliveryRequest
            ).toHaveBeenCalledTimes(2);
            verifyTelemetryEntries(0, 0);
            verifyTelemetryEntries(1, 1);
            done();
          }, 100);
        }

        client = TargetClient.create({
          decisioningMethod: DECISIONING_METHOD.SERVER_SIDE,
          ...targetClientOptions,
          events: { clientReady }
        });
      });
    });
  });
});
