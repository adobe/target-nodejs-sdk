import * as HttpStatus from "http-status-codes";
import {
  ENVIRONMENT_STAGE,
  isDefined,
  TelemetryProvider
} from "@adobe/target-tools";
import ArtifactProvider from "./artifactProvider";
import * as constants from "./constants";
import {
  ARTIFACT_FORMAT_DEFAULT,
  ARTIFACT_FORMAT_JSON,
  CDN_BASE_PATH,
  SUPPORTED_ARTIFACT_MAJOR_VERSION
} from "./constants";
import Messages from "./messages";

import { determineArtifactLocation } from "./utils";
import {
  ARTIFACT_DOWNLOAD_FAILED,
  ARTIFACT_DOWNLOAD_SUCCEEDED
} from "./events";

const ARTIFACT_BLANK = require("../test/schema/artifacts/TEST_ARTIFACT_BLANK.json");

const ARTIFACT_DOWNLOAD = "ArtifactDownload";

require("jest-fetch-mock").enableMocks();

describe("artifactProvider", () => {
  let provider;
  const telemetryProvider = TelemetryProvider();
  telemetryProvider.addArtifactRequestEntry = jest.fn();

  const TEST_CONF = {
    client: "clientId",
    organizationId: "orgId",
    pollingInterval: 0,
    artifactFormat: ARTIFACT_FORMAT_JSON // setting this tells the artifactProvider deobfuscation is not needed
  };

  beforeEach(() => {
    fetch.resetMocks();
    // eslint-disable-next-line no-import-assign
    constants.MINIMUM_POLLING_INTERVAL = 0;
  });

  afterEach(() => {
    if (isDefined(provider)) {
      provider.stopPolling();
    }
    provider = undefined;
  });

  it("initializes", async () => {
    fetch.mockResponse(JSON.stringify(ARTIFACT_BLANK));

    provider = await ArtifactProvider(
      {
        ...TEST_CONF,
        artifactPayload: ARTIFACT_BLANK,
        maximumWaitReady: 500
      },
      telemetryProvider
    );
    expect(provider).not.toBeUndefined();
    expect(provider.getArtifact()).toEqual(ARTIFACT_BLANK);
  });

  it("subscribes", async done => {
    fetch.mockResponse(JSON.stringify(ARTIFACT_BLANK));

    provider = await ArtifactProvider(
      {
        ...TEST_CONF,
        pollingInterval: 10
      },
      telemetryProvider
    );

    const subscriptionId = provider.subscribe(data => {
      expect(data).toEqual(ARTIFACT_BLANK);

      provider.unsubscribe(subscriptionId);
      done();
    });

    expect(subscriptionId).toEqual(expect.any(Number));
  });

  it("polls", async done => {
    fetch.mockResponse(JSON.stringify(ARTIFACT_BLANK));

    provider = await ArtifactProvider(
      {
        ...TEST_CONF,
        pollingInterval: 10
      },
      telemetryProvider
    );

    const mockListener = jest.fn();

    provider.subscribe(mockListener);

    setTimeout(() => {
      expect(mockListener.mock.calls.length).toBeGreaterThanOrEqual(4);
      expect(telemetryProvider.addArtifactRequestEntry).toHaveBeenCalledWith(
        ARTIFACT_DOWNLOAD,
        expect.objectContaining({
          execution: expect.any(Number)
        })
      );
      done();
    }, 100);
  });

  it("polls even if artifactPayload is provided", async done => {
    fetch.mockResponse(JSON.stringify(ARTIFACT_BLANK));
    expect.assertions(2);

    provider = await ArtifactProvider(
      {
        ...TEST_CONF,
        artifactPayload: ARTIFACT_BLANK,
        pollingInterval: 10
      },
      telemetryProvider
    );

    const mockListener = jest.fn();

    provider.subscribe(mockListener);

    setTimeout(() => {
      expect(mockListener.mock.calls.length).toBeGreaterThanOrEqual(8);
      expect(telemetryProvider.addArtifactRequestEntry).toHaveBeenCalledWith(
        ARTIFACT_DOWNLOAD,
        expect.objectContaining({
          execution: expect.any(Number)
        })
      );
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
      [JSON.stringify(ARTIFACT_BLANK), { status: HttpStatus.OK }]
    );

    provider = await ArtifactProvider(
      {
        ...TEST_CONF,
        pollingInterval: 0
      },
      telemetryProvider
    );

    expect(provider.getArtifact()).toEqual(ARTIFACT_BLANK);
    expect(fetch.mock.calls.length).toEqual(11);
  });

  it("reports an error if it failed to retrieve the artifact after 10 tries", async () => {
    expect.assertions(3);

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
          Messages.ARTIFACT_FETCH_ERROR(
            Messages.ERROR_MAX_RETRY(10, "Internal Server Error")
          )
        );
      }
    };

    provider = await ArtifactProvider(
      {
        ...TEST_CONF,
        pollingInterval: 0,
        logger
      },
      telemetryProvider
    );

    expect(provider.getArtifact()).toBeUndefined();
    expect(fetch.mock.calls.length).toEqual(11);
  });

  it("uses the artifactLocation if one is provided", async () => {
    const artifactURL = "https://mywebsite.com/targettesting/rules.json";

    fetch.mockResponse(JSON.stringify(ARTIFACT_BLANK)).doMockIf(artifactURL);

    provider = await ArtifactProvider(
      {
        ...TEST_CONF,
        pollingInterval: 0,
        artifactLocation: artifactURL
      },
      telemetryProvider
    );

    expect(provider.getArtifact()).toEqual(ARTIFACT_BLANK);
    expect(fetch.mock.calls[0][0]).toEqual(artifactURL);
  });

  it("gets a cached version based on ETag", async done => {
    expect.assertions(7);

    const eTagIdentifier = "the_original_eTag";
    const eTagIdentifierNew = "the_new_eTag";

    const IRRELEVANT_PAYLOAD = Object.assign({}, ARTIFACT_BLANK, {
      meta: {
        message: "if this is delivered, caching is not working properly."
      }
    });

    const FIRST_PAYLOAD = Object.assign({}, ARTIFACT_BLANK, {
      meta: {
        message: "this is the original"
      }
    });

    const NEW_VERSION_PAYLOAD = Object.assign({}, ARTIFACT_BLANK, {
      meta: {
        message: "this is a new version"
      }
    });

    fetch
      .once(JSON.stringify(FIRST_PAYLOAD), {
        status: HttpStatus.OK,
        headers: {
          "ETag": eTagIdentifier,
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
            "ETag": eTagIdentifier,
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
            "ETag": eTagIdentifierNew,
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
            "ETag": eTagIdentifierNew,
            "Content-Type": "application/json"
          }
        }
      );

    const artifactUpdated = jest.fn();

    provider = await ArtifactProvider(
      {
        client: "clientId",
        organizationId: "orgId",
        pollingInterval: 100,
        artifactFormat: ARTIFACT_FORMAT_JSON
      },
      telemetryProvider
    );

    provider.subscribe(artifactUpdated);

    expect(provider.getArtifact()).toEqual(FIRST_PAYLOAD); // first time getting artifact on ArtifactProvider#initialize

    setTimeout(() => {
      expect(artifactUpdated).toHaveBeenCalledTimes(1); // only one update to the artifact after the initial
      expect(artifactUpdated.mock.calls[0][0]).toEqual(NEW_VERSION_PAYLOAD);
      expect(telemetryProvider.addArtifactRequestEntry).toHaveBeenCalledWith(
        ARTIFACT_DOWNLOAD,
        expect.objectContaining({
          execution: expect.any(Number)
        })
      );
      done();
    }, 350);
  });

  it("emits artifactDownloadSucceeded event", async done => {
    fetch.mockResponse(JSON.stringify(ARTIFACT_BLANK));
    expect.assertions(2);

    function eventEmitter(eventName, payload) {
      expect(eventName).toEqual(ARTIFACT_DOWNLOAD_SUCCEEDED);
      expect(payload).toMatchObject({
        artifactLocation:
          "https://assets.adobetarget.com/clientId/production/v1/rules.json",
        artifactPayload: expect.any(Object)
      });
      done();
    }

    provider = await ArtifactProvider(
      {
        ...TEST_CONF,
        pollingInterval: 0,
        eventEmitter: (eventName, payload) =>
          eventName === ARTIFACT_DOWNLOAD_SUCCEEDED
            ? eventEmitter(eventName, payload)
            : undefined
      },
      telemetryProvider
    );
  });

  it("emits artifactDownloadFailed event", async done => {
    fetch.mockResponse("", { status: HttpStatus.FORBIDDEN });

    expect.assertions(22); // (1 + 10 retries) * 2 assertions

    function eventEmitter(eventName, payload) {
      expect(eventName).toEqual(ARTIFACT_DOWNLOAD_FAILED);
      expect(payload).toEqual(
        expect.objectContaining({
          artifactLocation:
            "https://assets.adobetarget.com/clientId/production/v1/rules.json",
          error: expect.objectContaining({
            stack: expect.any(String),
            message: "Forbidden"
          })
        })
      );
      setTimeout(() => done(), 100);
    }

    provider = await ArtifactProvider(
      {
        ...TEST_CONF,
        pollingInterval: 0,
        eventEmitter
      },
      telemetryProvider
    );
  });
});

describe("determineArtifactLocation", () => {
  it("CDN host environment can be overridden", () => {
    expect(
      determineArtifactLocation({
        client: "someClientId",
        cdnEnvironment: "staging"
      })
    ).toEqual(
      `https://${CDN_BASE_PATH}/someClientId/production/v${SUPPORTED_ARTIFACT_MAJOR_VERSION}/rules.json`
    );
  });

  it("defaults to production environment", () => {
    expect(
      determineArtifactLocation({
        client: "someClientId"
      })
    ).toEqual(
      `https://${CDN_BASE_PATH}/someClientId/production/v${SUPPORTED_ARTIFACT_MAJOR_VERSION}/rules.json`
    );
  });

  it("honors artifactFormat", () => {
    expect(
      determineArtifactLocation({
        client: "someClientId",
        artifactFormat: "bin"
      })
    ).toEqual(
      `https://${CDN_BASE_PATH}/someClientId/production/v${SUPPORTED_ARTIFACT_MAJOR_VERSION}/rules.bin`
    );
  });

  it("handles invalid artifactFormat", () => {
    expect(
      determineArtifactLocation({
        client: "someClientId",
        artifactFormat: "wonk"
      })
    ).toEqual(
      `https://${CDN_BASE_PATH}/someClientId/production/v${SUPPORTED_ARTIFACT_MAJOR_VERSION}/rules.${ARTIFACT_FORMAT_DEFAULT}`
    );
  });

  it("can be any valid environment name", () => {
    expect(
      determineArtifactLocation({
        client: "someClientId",
        environment: ENVIRONMENT_STAGE
      })
    ).toEqual(
      `https://${CDN_BASE_PATH}/someClientId/${ENVIRONMENT_STAGE}/v${SUPPORTED_ARTIFACT_MAJOR_VERSION}/rules.json`
    );
  });

  it("warns on invalid environment name and defaults to prod", () => {
    expect(
      determineArtifactLocation({
        client: "someClientId",
        environment: "1-PROD"
      })
    ).toEqual(
      `https://${CDN_BASE_PATH}/someClientId/1-prod/v${SUPPORTED_ARTIFACT_MAJOR_VERSION}/rules.json`
    );
  });

  it("adds property token if provided", () => {
    expect(
      determineArtifactLocation({
        client: "someClientId",
        propertyToken: "xyz-123-abc"
      })
    ).toEqual(
      `https://${CDN_BASE_PATH}/someClientId/production/v${SUPPORTED_ARTIFACT_MAJOR_VERSION}/xyz-123-abc/rules.json`
    );
  });
});
