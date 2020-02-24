import * as HttpStatus from "http-status-codes";
import ArtifactProvider from "./artifactProvider";
import * as constants from "./constants";
import Messages from "./messages";

require("jest-fetch-mock").enableMocks();

describe("artifactProvider", () => {
  const DUMMY_ARTIFACT_PAYLOAD = { version: "1.0.0", meta: {}, rules: [] };
  let provider;

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));
    constants.MINIMUM_POLLING_INTERVAL = 0;
  });

  afterEach(() => {
    provider.stopPolling();
    provider = undefined;
  });

  it("initializes", async () => {
    provider = await ArtifactProvider.initialize({
      client: "clientId",
      organizationId: "orgId",
      artifactPayload: DUMMY_ARTIFACT_PAYLOAD
    });
    expect(provider).not.toBeUndefined();
    expect(provider.getArtifact()).toEqual(DUMMY_ARTIFACT_PAYLOAD);
  });

  it("subscribes", async () => {
    provider = await ArtifactProvider.initialize({
      client: "clientId",
      organizationId: "orgId",
      pollingInterval: 100
    });

    const subscriptionId = provider.subscribe(data => {
      expect(data).toEqual(DUMMY_ARTIFACT_PAYLOAD);

      provider.unsubscribe(subscriptionId);
    });

    expect(subscriptionId).toEqual(expect.any(Number));
  });

  it("polls", () => {
    return new Promise(async done => {
      provider = await ArtifactProvider.initialize({
        client: "clientId",
        organizationId: "orgId",
        pollingInterval: 10
      });

      const mockListener = jest.fn();

      provider.subscribe(mockListener);

      setTimeout(() => {
        expect(mockListener.mock.calls.length).toBeGreaterThanOrEqual(3);
        done();
      }, 100);
    });
  });

  it("does not poll if artifact payload is provided", () => {
    return new Promise(async done => {
      provider = await ArtifactProvider.initialize({
        client: "clientId",
        organizationId: "orgId",
        artifactPayload: DUMMY_ARTIFACT_PAYLOAD,
        pollingInterval: 10
      });

      const mockListener = jest.fn();

      provider.subscribe(mockListener);

      setTimeout(() => {
        expect(mockListener.mock.calls.length).toBe(0);
        done();
      }, 100);
    });
  });

  it("retries failed artifact request 10 times", async () => {
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
      [JSON.stringify(DUMMY_ARTIFACT_PAYLOAD), { status: HttpStatus.OK }]
    );
    // HttpStatus.NOT_MODIFIED
    provider = await ArtifactProvider.initialize({
      client: "clientId",
      organizationId: "orgId",
      pollingInterval: 0
    });

    expect(provider.getArtifact()).toEqual(DUMMY_ARTIFACT_PAYLOAD);
    expect(fetch.mock.calls.length).toEqual(11);
  });

  // eslint-disable-next-line jest/no-test-callback
  it("reports an error if it failed to retrieve the artifact after 10 tries", async () => {
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

    const logger = {
      debug: () => {},
      error: err => {
        expect(err).toEqual(
          Messages.ERROR_MAX_RETRY(10, "Error: Internal Server Error")
        );
      }
    };

    provider = await ArtifactProvider.initialize({
      client: "clientId",
      organizationId: "orgId",
      pollingInterval: 0,
      logger
    });

    expect(provider.getArtifact()).toBeUndefined();
    expect(fetch.mock.calls.length).toEqual(11);
  });
});

// TODO: test ["", { status: HttpStatus.NOT_MODIFIED }],
