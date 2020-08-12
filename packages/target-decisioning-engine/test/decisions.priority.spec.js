import TargetDecisioningEngine from "../src";
import { DECISIONING_PAYLOAD_PRIORITIES } from "./decisioning-payloads";
import { ARTIFACT_FORMAT_JSON } from "../src/constants";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0,
  artifactFormat: ARTIFACT_FORMAT_JSON // setting this tells the artifactProvider deobfuscation is not needed
};

describe("decisioning outcomes - priority", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("prefers audience targeted rules and returns one result for the mbox requested", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_PRIORITIES));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(
      DECISIONING_PAYLOAD_PRIORITIES
    );

    const result = await decisioning.getOffers({
      request: {
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
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
        },
        prefetch: {
          mboxes: [
            {
              name: "kitty",
              index: 7
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
              index: 7,
              name: "kitty",
              options: [
                {
                  type: "html",
                  content: "<div>kitty high with targeting: Firefox</div>",
                  eventToken:
                    "/DhjxnVDh9heBZ0MrYFLF2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  responseTokens: expect.any(Object)
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("only returns one result for the mbox requested", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_PRIORITIES));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(
      DECISIONING_PAYLOAD_PRIORITIES
    );

    const result = await decisioning.getOffers({
      request: {
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
            "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)"
        },
        prefetch: {
          mboxes: [
            {
              name: "kitty",
              index: 7
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
              index: 7,
              name: "kitty",
              options: [
                {
                  type: "html",
                  content: "<div>kitty high A</div>",
                  eventToken:
                    "ruhwp7VESR7F74TJL2DV5WqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
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
