const HttpStatus = require("http-status-codes");

require("jest-fetch-mock").enableMocks();
const TargetClient = require("../src/index.server");
const { EXECUTION_MODE } = require("../src/enums");
const { PENDING_ARTIFACT_RETRIEVAL } = require("../src/messages");

const DUMMY_ARTIFACT_PAYLOAD = { version: "1.0.0", meta: {}, rules: [] };

const TARGET_REQUEST = {
  prefetch: {
    mboxes: [
      {
        name: "mbox-something",
        index: 1
      }
    ]
  }
};

describe("target local decisioning", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("creates an instance of target-decisioning-engine if evaluation mode is local", () => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    return new Promise(done => {
      const client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId",
        executionMode: EXECUTION_MODE.LOCAL,
        pollingInterval: 0,
        clientReadyCallback: () => {
          expect(client.decisioningEngine).not.toBeUndefined();
          expect(typeof client.decisioningEngine.getOffers).toEqual("function");
          done();
        }
      });
    });
  });

  it("does not create an instance of target-decisioning-engine if evaluation mode is remote", () => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    return new Promise(done => {
      const client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId",
        executionMode: EXECUTION_MODE.REMOTE,
        pollingInterval: 0,
        clientReadyCallback: () => {
          expect(client).toBeDefined();
          expect(
            Object.prototype.hasOwnProperty.call(client, "decisioningEngine")
          ).toEqual(false);
          done();
        }
      });
    });
  });

  it("returns an error if a getOffers request is made before the decisioning artifact is available", async () => {
    fetch.mockResponse(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));
        }, 100);
      });
    });

    const client = TargetClient.create({
      client: "someClientId",
      organizationId: "someOrgId",
      executionMode: EXECUTION_MODE.LOCAL,
      pollingInterval: 0
    });

    // make the request immediately (before the artifact has been fetched)
    await expect(
      client.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      })
    ).rejects.toEqual(new Error(PENDING_ARTIFACT_RETRIEVAL));
  });

  // eslint-disable-next-line jest/no-test-callback
  it("getOffers provides an error if the artifact could not be retrieved", async done => {
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

    const client = TargetClient.create({
      client: "someClientId",
      organizationId: "someOrgId",
      executionMode: EXECUTION_MODE.LOCAL,
      pollingInterval: 0
    });

    await expect(
      client.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      })
    ).rejects.toEqual(new Error(PENDING_ARTIFACT_RETRIEVAL));

    setTimeout(async () => {
      await expect(
        client.getOffers({
          request: TARGET_REQUEST,
          sessionId: "dummy_session"
        })
      ).rejects.toEqual(new Error("The decisioning artifact is not available"));

      done();
    }, 500);
  });
});
