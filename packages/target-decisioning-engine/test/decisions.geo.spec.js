import TargetDecisioningEngine from "../src";
import { DECISIONING_PAYLOAD_GEO } from "./decisioning-payloads";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0,
  executionMode: "local",
  artifactPayload: DECISIONING_PAYLOAD_GEO
};

describe("decisioning outcomes - geo params", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("can determine geo outcomes based on geo values in context", async () => {
    decisioning = await TargetDecisioningEngine({
      ...TEST_CONF
    });

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_GEO);

    const result = await decisioning.getOffers({
      request: {
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
        },
        context: {
          channel: "web",
          browser: {
            host: "local-target-test"
          },
          geo: {
            city: "SAN FRANCISCO",
            countryCode: "UNITED STATES",
            stateCode: "CALIFORNIA",
            latitude: 37.75,
            longitude: -122.4
          },
          address: {
            url: "http://local-target-test/"
          },
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
        },
        execute: {
          mboxes: [
            {
              name: "geo",
              index: 1
            }
          ]
        },
        sessionId: "dummy_session"
      }
    });
    expect(result).toEqual(
      expect.objectContaining({
        execute: {
          mboxes: [
            {
              index: 1,
              name: "geo",
              options: [
                {
                  type: "json",
                  content: {
                    geo: true,
                    exp: "geo.b"
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

  it("can determine geo outcomes when geo context is missing but ipAddress exists in context", async () => {
    fetch.mockResponse(
      JSON.stringify({
        "x-geo-longitude": -122.4,
        "x-geo-latitude": 37.75,
        "x-geo-city": "SAN FRANCISCO",
        "x-geo-region-code": "CA",
        "x-geo-country-code": "US"
      })
    );

    decisioning = await TargetDecisioningEngine({
      ...TEST_CONF
    });

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_GEO);

    const result = await decisioning.getOffers({
      request: {
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
        },
        context: {
          channel: "web",
          browser: {
            host: "local-target-test"
          },
          geo: {
            ipAddress: "127.0.0.1"
          },
          address: {
            url: "http://local-target-test/"
          },
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
        },
        execute: {
          mboxes: [
            {
              name: "geo",
              index: 1
            }
          ]
        },
        sessionId: "dummy_session"
      }
    });
    expect(result).toEqual(
      expect.objectContaining({
        execute: {
          mboxes: [
            {
              index: 1,
              name: "geo",
              options: [
                {
                  type: "json",
                  content: {
                    geo: true,
                    exp: "geo.b"
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
});
