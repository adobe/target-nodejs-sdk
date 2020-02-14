import TargetDecisioningEngine from "./index";
import * as constants from "./constants";

require("jest-fetch-mock").enableMocks();

describe("TargetDecisioningEngine", () => {
  const DUMMY_ARTIFACT_PAYLOAD = { version: "1.0.0", meta: {}, rules: [] };
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

    decisioning = await TargetDecisioningEngine.initialize({
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

    decisioning = await TargetDecisioningEngine.initialize({
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
});
