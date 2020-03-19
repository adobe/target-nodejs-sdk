import TargetDecisioningEngine from "../src";
import { DECISIONING_PAYLOAD_AB_SIMPLE } from "./decisioning-payloads";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0
};

describe("decisioning outcomes - single activity", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  describe("execute", () => {
    it("simple ab form-based activity", async () => {
      fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_SIMPLE));
      decisioning = await TargetDecisioningEngine(TEST_CONF);

      expect(decisioning.getRawArtifact()).toEqual(
        DECISIONING_PAYLOAD_AB_SIMPLE
      );

      const result = await decisioning.getOffers({
        request: {
          requestId: "request123456",
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
              url: "http://local-target-test:8080/",
              referringUrl: null
            },
            geo: null,
            timeOffsetInMinutes: null,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          execute: {
            pageLoad: null,
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 2
              }
            ]
          }
        },
        sessionId: "dummy_session"
      });

      expect(result).toEqual(
        expect.objectContaining({
          status: 200,
          requestId: "request123456",
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          client: "someClientId",
          execute: {
            mboxes: [
              {
                index: 2,
                name: "superfluous-mbox",
                options: [
                  {
                    type: "json",
                    content: {
                      doMagic: true,
                      importantValue: 150
                    }
                  }
                ]
              }
            ]
          }
        })
      );
    });
  });

  describe("prefetch", () => {
    it("simple ab form-based activity", async () => {
      fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_AB_SIMPLE));
      decisioning = await TargetDecisioningEngine(TEST_CONF);

      expect(decisioning.getRawArtifact()).toEqual(
        DECISIONING_PAYLOAD_AB_SIMPLE
      );

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
              url: "http://local-target-test:8080/",
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
                index: 4
              }
            ]
          }
        },
        sessionId: "dummy_session"
      });

      expect(result).toEqual(
        expect.objectContaining({
          prefetch: {
            mboxes: [
              {
                index: 4,
                name: "superfluous-mbox",
                options: [
                  {
                    type: "json",
                    content: {
                      doMagic: true,
                      importantValue: 150
                    },
                    eventToken:
                      "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                  }
                ]
              }
            ]
          }
        })
      );
    });
  });
});
