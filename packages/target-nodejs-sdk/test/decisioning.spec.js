require("jest-fetch-mock").enableMocks();
const TargetClient = require("../src/index.server");
const { EVALUATION_MODE } = require("../src/enums");

const DUMMY_ARTIFACT_PAYLOAD = { version: "1.0.0", meta: {}, rules: [] };

describe("target local decisioning", () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));
  });

  it("creates an instance of target-decisioning-engine if evaluation mode is local", () => {
    return new Promise(done => {
      let client = TargetClient.create({
        client: "adobesummit2018",
        organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
        evaluationMode: EVALUATION_MODE.LOCAL,
        pollingInterval: 0,
        clientReadyCallback: () => {
          expect(client.decisioningEngine).not.toBeUndefined();
          expect(typeof client.decisioningEngine.getOffers).toEqual("function");
          client.decisioningEngine.stopPolling();
          client = undefined;
          done();
        }
      });
    });
  });

  it("does not create an instance of target-decisioning-engine if evaluation mode is remote", () => {
    return new Promise(done => {
      let client = TargetClient.create({
        client: "adobesummit2018",
        organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
        evaluationMode: EVALUATION_MODE.REMOTE,
        pollingInterval: 0,
        clientReadyCallback: () => {
          // eslint-disable-next-line no-prototype-builtins
          expect(client).toBeDefined();
          expect(
            Object.prototype.hasOwnProperty.call(client, "decisioningEngine")
          ).toEqual(false);
          client = undefined;
          done();
        }
      });
    });
  });
});
