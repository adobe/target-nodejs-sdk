import * as HttpStatus from "http-status-codes";
import TargetDecisioningEngine from "./index";
import * as constants from "./constants";
import Messages from "./messages";

require("jest-fetch-mock").enableMocks();

const DUMMY_ARTIFACT_PAYLOAD = { version: "1.0.0", meta: {}, rules: [] };
const TARGET_REQUEST = {
  context: {
    channel: "web",
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
        name: "mbox-something",
        index: 1
      }
    ]
  }
};

describe("TargetDecisioningEngine", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
    constants.MINIMUM_POLLING_INTERVAL = 0;
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("initializes", async () => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    decisioning = await TargetDecisioningEngine({
      client: "clientId",
      organizationId: "orgId",
      pollingInterval: 0 // do not poll
    });

    expect(typeof decisioning.getOffers).toBe("function");
  });

  // eslint-disable-next-line jest/no-test-callback
  it("updates the artifact on the polling interval", async done => {
    const responses = [];
    for (let i = 1; i < 50; i++) {
      responses.push([
        JSON.stringify(
          Object.assign({}, DUMMY_ARTIFACT_PAYLOAD, { version: i })
        ),
        { status: 200 }
      ]);
    }

    fetch.mockResponses(...responses);

    decisioning = await TargetDecisioningEngine({
      client: "clientId",
      organizationId: "orgId",
      pollingInterval: 5
    });

    expect(typeof decisioning.getRawArtifact).toEqual("function");
    let timer;

    timer = setInterval(() => {
      const numFetchCalls = fetch.mock.calls.length;
      const artifact = decisioning.getRawArtifact();

      expect(artifact).not.toBeUndefined();

      expect(artifact.version).toEqual(numFetchCalls);

      if (artifact.version > 9) {
        clearInterval(timer);
        timer = undefined;
        done();
      }
    }, 7);
  });

  it("getOffers provides an error if the artifact is not available", async () => {
    fetch.mockResponses(
      ["", { status: HttpStatus.UNAUTHORIZED }],
      ["", { status: HttpStatus.NOT_FOUND }],
      ["", { status: HttpStatus.NOT_ACCEPTABLE }],
      ["", { status: HttpStatus.NOT_IMPLEMENTED }],
      ["", { status: HttpStatus.FORBIDDEN }],
      ["", { status: HttpStatus.SERVICE_UNAVAILABLE }],
      ["", { status: HttpStatus.BAD_REQUEST }],
      ["", { status: HttpStatus.BAD_GATEWAY }],
      ["", { status: HttpStatus.TOO_MANY_REQUESTS }],
      ["", { status: HttpStatus.GONE }],
      ["", { status: HttpStatus.INTERNAL_SERVER_ERROR }]
    );

    decisioning = await TargetDecisioningEngine({
      client: "someClientId",
      organizationId: "someOrgId",
      pollingInterval: 0
    });

    await expect(
      decisioning.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      })
    ).rejects.toEqual(new Error(Messages.ARTIFACT_NOT_AVAILABLE));
  });

  it("getOffers resolves", async () => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    decisioning = await TargetDecisioningEngine({
      client: "someClientId",
      organizationId: "someOrgId",
      pollingInterval: 0
    });

    await expect(
      decisioning.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      })
    ).resolves.not.toBeUndefined();
  });

  it("fetches a json artifact", async () => {
    fetch.dontMock();

    decisioning = await TargetDecisioningEngine({
      client: "someClientId",
      organizationId: "someOrgId",
      pollingInterval: 0,
      artifactLocation:
        "https://target-local-decisioning-test.s3.us-west-2.amazonaws.com/adobesummit2018/waters_test/rules.json"
    });

    expect(decisioning.getRawArtifact()).not.toBeUndefined();
  });
});
