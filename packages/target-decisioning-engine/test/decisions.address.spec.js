import TargetDecisioningEngine from "../src";
import { DECISIONING_PAYLOAD_ADDRESS } from "./decisioning-payloads";
import { ARTIFACT_FORMAT_JSON } from "../src/constants";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0,
  artifactFormat: ARTIFACT_FORMAT_JSON // setting this tells the artifactProvider deobfuscation is not needed
};

describe("decisioning outcomes - url params", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("keys off of the url provided in the base context", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_ADDRESS));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_ADDRESS);

    const result = await decisioning.getOffers({
      request: {
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
            url: "http://local-target-test:8080/home?bar=true#hello",
            referringUrl: null
          },
          geo: null,
          timeOffsetInMinutes: null,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
          beacon: false
        },
        execute: {
          mboxes: [
            {
              name: "offer2",
              index: 1
            }
          ]
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        execute: {
          mboxes: [
            {
              index: 1,
              name: "offer2",
              options: [
                {
                  type: "json",
                  content: {
                    baz: 2
                  },
                  responseTokens: expect.any(Object)
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("address attributes override context url", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_ADDRESS));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_ADDRESS);

    const result = await decisioning.getOffers({
      request: {
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
        execute: {
          mboxes: [
            {
              name: "offer2",
              address: {
                url: "http://local-target-test:8080/home?bar=true#hello"
              },
              index: 1
            }
          ]
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        execute: {
          mboxes: [
            {
              index: 1,
              name: "offer2",
              options: [
                {
                  type: "json",
                  content: {
                    baz: 2
                  },
                  responseTokens: expect.any(Object)
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("address attributes override context url return empty", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_ADDRESS));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_ADDRESS);

    const result = await decisioning.getOffers({
      request: {
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
        execute: {
          mboxes: [
            {
              name: "offer2",
              address: {
                url: "http://local-target-test"
              },
              index: 1
            }
          ]
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        execute: {
          mboxes: [
            {
              index: 1,
              name: "offer2"
            }
          ]
        }
      })
    );
  });
});
