import * as MockDate from "mockdate";
import TargetDecisioningEngine from "../src";
import { DECISIONING_PAYLOAD_TIMEFRAME } from "./decisioning-payloads";

require("jest-fetch-mock").enableMocks();

const TEST_CONF = {
  client: "someClientId",
  organizationId: "someOrgId",
  pollingInterval: 0
};

const TARGET_REQUEST = {
  id: {
    tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
    marketingCloudVisitorId: "07327024324407615852294135870030620007"
  },
  context: {
    channel: "web",
    address: {
      url: "http://local-target-test:8080/home?bar=true#hello"
    },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
    beacon: false
  },
  prefetch: {
    mboxes: [
      {
        name: "daterange-mbox",
        index: 1
      }
    ]
  }
};

describe("decisioning outcomes - timeframe", () => {
  let decisioning;

  beforeEach(async () => {
    MockDate.reset();
    fetch.resetMocks();
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("targets date range 1 (feb 27 - feb 29 2020)", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_TIMEFRAME));
    MockDate.set(Date.UTC(2020, 1, 27, 19)); // Thursday, February 27, 2020 11:00 AM (PST)

    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_TIMEFRAME);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>date range 1 (feb 27-29)</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7unJlneZxJu5VqGhXCosHhWCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("targets date range 2 (mar 2 - mar 6 2020)", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_TIMEFRAME));
    MockDate.set(Date.UTC(2020, 2, 4, 19)); // Wednesday, March 4, 2020 11:00 AM (PST)

    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_TIMEFRAME);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>date range 2 (mar 2 - 6)</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7pNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("targets friday, even if within range of other rules", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_TIMEFRAME));
    MockDate.set(Date.UTC(2020, 2, 6, 19)); // Friday, March 6, 2020 11:00 AM (PST)

    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_TIMEFRAME);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>it's friday</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("targets friday out of range of other rules", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_TIMEFRAME));
    MockDate.set(Date.UTC(2020, 2, 20, 18)); // Friday, March 20, 2020 11:00 AM (PST)

    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_TIMEFRAME);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>it's friday</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });

  it("doesn't match any date rules", async () => {
    fetch.mockResponse(JSON.stringify(DECISIONING_PAYLOAD_TIMEFRAME));
    MockDate.set(Date.UTC(2020, 4, 26, 18)); // Tuesday, May 26, 2020 11:00 AM (PST)

    decisioning = await TargetDecisioningEngine(TEST_CONF);

    expect(decisioning.getRawArtifact()).toEqual(DECISIONING_PAYLOAD_TIMEFRAME);

    const result = await decisioning.getOffers({
      request: {
        ...TARGET_REQUEST
      },
      sessionId: "dummy_session"
    });

    expect(result).toEqual(
      expect.objectContaining({
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>default result</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7mqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      })
    );
  });
});
