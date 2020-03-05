/* eslint-disable jest/no-test-callback */
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
    constants.MINIMUM_POLLING_INTERVAL = 0;
  });

  afterEach(() => {
    provider.stopPolling();
    provider = undefined;
  });

  it("initializes", async () => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    provider = await ArtifactProvider({
      client: "clientId",
      organizationId: "orgId",
      artifactPayload: DUMMY_ARTIFACT_PAYLOAD
    });
    expect(provider).not.toBeUndefined();
    expect(provider.getArtifact()).toEqual(DUMMY_ARTIFACT_PAYLOAD);
  });

  it("subscribes", async done => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    provider = await ArtifactProvider({
      client: "clientId",
      organizationId: "orgId",
      pollingInterval: 10
    });

    const subscriptionId = provider.subscribe(data => {
      expect(data).toEqual(DUMMY_ARTIFACT_PAYLOAD);

      provider.unsubscribe(subscriptionId);
      done();
    });

    expect(subscriptionId).toEqual(expect.any(Number));
  });

  it("polls", async done => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    provider = await ArtifactProvider({
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

  it("does not poll if artifact payload is provided", async done => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    provider = await ArtifactProvider({
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
    provider = await ArtifactProvider({
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
      error: (prefix, message) => {
        expect(message).toEqual(
          Messages.ERROR_MAX_RETRY(10, "Error: Internal Server Error")
        );
      }
    };

    provider = await ArtifactProvider({
      client: "clientId",
      organizationId: "orgId",
      pollingInterval: 0,
      logger
    });

    expect(provider.getArtifact()).toBeUndefined();
    expect(fetch.mock.calls.length).toEqual(11);
  });

  it("uses the artifactLocation if one is provided", async () => {
    const artifactURL =
      "https://target-local-decisioning-test.s3.us-west-2.amazonaws.com/adobesummit2018/waters_test/rules.json";

    fetch
      .mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD))
      .doMockIf(artifactURL);

    provider = await ArtifactProvider({
      client: "clientId",
      organizationId: "orgId",
      pollingInterval: 0,
      artifactLocation: artifactURL
    });

    expect(provider.getArtifact()).toEqual(DUMMY_ARTIFACT_PAYLOAD);
    expect(fetch.mock.calls[0][0]).toEqual(artifactURL);
  });

  it("gets a cached version based on ETag", async done => {
    const eTagIdentifier = "the_original_eTag";
    const eTagIdentifierNew = "the_new_eTag";

    const IRRELEVANT_PAYLOAD = Object.assign({}, DUMMY_ARTIFACT_PAYLOAD, {
      meta: {
        message: "if this is delivered, caching is not working properly."
      }
    });

    const FIRST_PAYLOAD = Object.assign({}, DUMMY_ARTIFACT_PAYLOAD, {
      meta: {
        message: "this is the original"
      }
    });

    const NEW_VERSION_PAYLOAD = Object.assign({}, DUMMY_ARTIFACT_PAYLOAD, {
      meta: {
        message: "this is a new version"
      }
    });

    fetch
      .once(JSON.stringify(FIRST_PAYLOAD), {
        status: HttpStatus.OK,
        headers: {
          ETag: eTagIdentifier,
          "Content-Type": "application/json"
        }
      })
      .once(
        req => {
          expect(req.headers.get("If-None-Match")).toEqual(eTagIdentifier);

          return Promise.resolve(JSON.stringify(IRRELEVANT_PAYLOAD));
        },
        {
          status: HttpStatus.NOT_MODIFIED,
          headers: {
            ETag: eTagIdentifier,
            "Content-Type": "application/json"
          }
        }
      )
      .once(
        req => {
          expect(req.headers.get("If-None-Match")).toEqual(eTagIdentifier);

          return Promise.resolve(JSON.stringify(NEW_VERSION_PAYLOAD));
        },
        {
          status: HttpStatus.OK,
          headers: {
            ETag: eTagIdentifierNew,
            "Content-Type": "application/json"
          }
        }
      )
      .once(
        req => {
          expect(req.headers.get("If-None-Match")).toEqual(eTagIdentifierNew);

          return Promise.resolve(JSON.stringify(IRRELEVANT_PAYLOAD));
        },
        {
          status: HttpStatus.NOT_MODIFIED,
          headers: {
            ETag: eTagIdentifierNew,
            "Content-Type": "application/json"
          }
        }
      );

    provider = await ArtifactProvider({
      client: "clientId",
      organizationId: "orgId",
      pollingInterval: 500,
      artifactLocation: "rules.json"
    });

    // here's what we expect...
    // 1. first request is an original artifact
    // 2. second request is a cached artifact
    // 3. third request is a new artifact
    // 4. fourth request is a cached artifact

    expect(provider.getArtifact()).toEqual(FIRST_PAYLOAD); // first time getting artifact on ArtifactProvider#initialize

    provider.subscribe(artifact => {
      switch (fetch.mock.calls.length) {
        case 2: // second time getting artifact, should be cached
          expect(artifact).not.toEqual(IRRELEVANT_PAYLOAD);
          expect(artifact).toEqual(FIRST_PAYLOAD); // this is the cached response body
          break;
        case 3: // third time getting artifact is new version
          expect(artifact).toEqual(NEW_VERSION_PAYLOAD);
          break;
        case 4: // fourth time getting artifact, should be cached new version
          expect(artifact).not.toEqual(IRRELEVANT_PAYLOAD);
          expect(artifact).toEqual(NEW_VERSION_PAYLOAD); // this is the cached response body
          done();
          break;
        default:
          done.fail();
          break;
      }
    });
  });
});
