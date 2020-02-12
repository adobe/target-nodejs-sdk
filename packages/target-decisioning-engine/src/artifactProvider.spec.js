import ArtifactProvider from "./artifactProvider";

require("jest-fetch-mock").enableMocks();

describe("artifactProvider", () => {
  const DUMMY_ARTIFACT_PAYLOAD = { version: "1.0.0", meta: {}, rules: [] };
  let provider;

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));
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
        artifactPayload: { version: "1.0.0", meta: {}, rules: [] },
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
});
