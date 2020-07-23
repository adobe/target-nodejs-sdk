import TargetDecisioningEngine from "../src";
import {
  DECISIONING_PAYLOAD_GEO,
  DECISIONING_PAYLOAD_VIEWS
} from "./decisioning-payloads";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0,
  executionMode: "local"
};

describe("decisioning outcomes - response tokens", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  describe("execute", () => {
    it("has correct response tokens for execute", async () => {
      decisioning = await TargetDecisioningEngine({
        ...TEST_CONF,
        artifactPayload: DECISIONING_PAYLOAD_GEO
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

      expect(result.execute.mboxes[0].options[0].responseTokens).toMatchObject({
        "activity.decisioningMethod": "on-device",
        "activity.id": 349133,
        "activity.name": "Greg Geo Test A/B Jun 02 2020, 14:34",
        "experience.id": 1,
        "experience.name": "Experience B",
        "geo.city": "SAN FRANCISCO",
        "geo.country": "UNITED STATES",
        "geo.state": "CALIFORNIA",
        "offer.id": 650379,
        "offer.name":
          "/greg_geo_test_a_bjun0220201434/experiences/1/pages/0/zones/0/1591133667939",
        "option.id": 3,
        "option.name": "Offer3"
      });
    });
  });

  describe("prefetch", () => {
    it("has correct response tokens for prefetch", async () => {
      decisioning = await TargetDecisioningEngine({
        ...TEST_CONF,
        artifactPayload: DECISIONING_PAYLOAD_GEO
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
          prefetch: {
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

      expect(result.prefetch.mboxes[0].options[0].responseTokens).toMatchObject(
        {
          "activity.decisioningMethod": "on-device",
          "activity.id": 349133,
          "activity.name": "Greg Geo Test A/B Jun 02 2020, 14:34",
          "experience.id": 1,
          "experience.name": "Experience B",
          "geo.city": "SAN FRANCISCO",
          "geo.country": "UNITED STATES",
          "geo.state": "CALIFORNIA",
          "offer.id": 650379,
          "offer.name":
            "/greg_geo_test_a_bjun0220201434/experiences/1/pages/0/zones/0/1591133667939",
          "option.id": 3,
          "option.name": "Offer3"
        }
      );
    });

    it("has correct response tokens for views", async () => {
      decisioning = await TargetDecisioningEngine({
        ...TEST_CONF,
        artifactPayload: DECISIONING_PAYLOAD_VIEWS
      });

      expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_VIEWS);

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
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [{}]
          }
        }
      });

      expect(result.prefetch.views[0].options[0].responseTokens).toMatchObject({
        "activity.id": 345798,
        "activity.name": "xt spa add text to contact page",
        "experience.id": 2,
        "experience.name": "Experience C",
        "option.id": 6,
        "option.name": "Offer6",
        "activity.decisioningMethod": "on-device"
      });
    });
  });
});
