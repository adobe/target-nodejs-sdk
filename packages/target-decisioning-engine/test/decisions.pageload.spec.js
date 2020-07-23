import TargetDecisioningEngine from "../src";
import { DECISIONING_PAYLOAD_GLOBAL_MBOX } from "./decisioning-payloads";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0
};

function byContent(a, b) {
  const contentA = a.content.toLowerCase();
  const contentB = b.content.toLowerCase();

  if (contentA > contentB) {
    return 1;
  }

  if (contentA < contentB) {
    return -1;
  }

  return 0;
}

describe("decisioning outcomes - pageload", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("does simple pageload - prefetch", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_GLOBAL_MBOX));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(
      DECISIONING_PAYLOAD_GLOBAL_MBOX
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
            url: "http://local-target-test:8080/home?fabulous=true#sosumi",
            referringUrl: null
          },
          geo: null,
          timeOffsetInMinutes: null,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
          beacon: false
        },
        prefetch: {
          pageLoad: {}
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          pageLoad: {
            options: [
              {
                type: "html",
                content: "<div>Firetime</div>",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                responseTokens: expect.any(Object)
              },
              {
                type: "html",
                content: "<div>mouse</div>",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                responseTokens: expect.any(Object)
              }
            ]
          }
        }
      })
    );
  });

  it("does simple pageload - execute", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_GLOBAL_MBOX));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(
      DECISIONING_PAYLOAD_GLOBAL_MBOX
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
            url: "http://local-target-test:8080/home?fabulous=true#sosumi",
            referringUrl: null
          },
          geo: null,
          timeOffsetInMinutes: null,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
          beacon: false
        },
        execute: {
          pageLoad: {}
        }
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        execute: {
          pageLoad: {
            options: [
              {
                type: "html",
                content: "<div>Firetime</div>",
                responseTokens: expect.any(Object)
              },
              {
                type: "html",
                content: "<div>mouse</div>",
                responseTokens: expect.any(Object)
              }
            ]
          }
        }
      })
    );
  });
  it("returns multiple pageload decisions including one that matches params - pageload", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_GLOBAL_MBOX));
    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(
      DECISIONING_PAYLOAD_GLOBAL_MBOX
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
            url: "http://local-target-test:8080/home?fabulous=true#sosumi",
            referringUrl: null
          },
          geo: null,
          timeOffsetInMinutes: null,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
          beacon: false
        },
        execute: {
          pageLoad: {
            parameters: {
              foo: "bar"
            }
          }
        }
      },
      sessionId: "dummy_session"
    });

    expect(result.execute.pageLoad.options.sort(byContent)).toEqual([
      {
        content: "<div>Chrometastic</div>",
        responseTokens: expect.any(Object),
        type: "html"
      },
      {
        content: "<div>foo=bar experience A</div>",
        responseTokens: expect.any(Object),
        type: "html"
      },
      {
        content: "<div>mouse</div>",
        responseTokens: expect.any(Object),
        type: "html"
      }
    ]);
  });
});
