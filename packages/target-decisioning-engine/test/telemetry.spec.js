import { DECISIONING_METHOD } from "@adobe/target-tools";
import { DECISIONING_PAYLOAD_AB_MULTI_SIMPLE } from "./decisioning-payloads";
import TargetDecisioningEngine from "../src";
import { ARTIFACT_FORMAT_JSON } from "../src/constants";

require("jest-fetch-mock").enableMocks();

const sendNotificationFunc = jest.fn();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0,
  artifactFormat: ARTIFACT_FORMAT_JSON,
  sendNotificationFunc
};

const targetRequest = {
  id: {
    tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
    marketingCloudVisitorId: "07327024324407615852294135870030620007"
  },
  context: {
    channel: "web",
    address: {
      url: "http://local-target-test:8080/"
    },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
    beacon: false
  }
};

describe("telemetry", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("sends telemetry", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    await decisioning.getOffers({
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
      }
    });

    expect(sendNotificationFunc.mock.calls.length).toEqual(1);
    const notificationPayload = sendNotificationFunc.mock.calls[0][0];

    expect(notificationPayload.request.telemetry).toMatchObject({
      entries: [
        {
          requestId: expect.any(String),
          timestamp: expect.any(Number),
          execution: expect.any(Number),
          features: {
            decisioningMethod: DECISIONING_METHOD.ON_DEVICE
          }
        }
      ]
    });
  });

  it("does not send telemetry if telemetryEnabled=false", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_MULTI_SIMPLE));
    decisioning = await TargetDecisioningEngine({
      ...TEST_CONF,
      telemetryEnabled: false
    });

    await decisioning.getOffers({
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
      }
    });

    expect(sendNotificationFunc.mock.calls.length).toEqual(0);
  });
});
