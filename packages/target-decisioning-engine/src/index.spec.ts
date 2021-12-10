import { enableFetchMocks, MockResponseInit } from "jest-fetch-mock";
enableFetchMocks();
import fetchMock from "jest-fetch-mock";
import * as HttpStatus from "http-status-codes";
import { isDefined, TelemetryProvider } from "@adobe/target-tools";
import TargetDecisioningEngine from "./index";
import * as constants from "./constants";
import {
  ARTIFACT_FORMAT_BINARY,
  ARTIFACT_FORMAT_JSON,
  SUPPORTED_ARTIFACT_MAJOR_VERSION
} from "./constants";
import Messages from "./messages";

import { ARTIFACT_DOWNLOAD_FAILED } from "./events";

const ARTIFACT_BLANK = require("../test/schema/artifacts/TEST_ARTIFACT_BLANK.json");
const ARTIFACT_UNSUPPORTED_VERSION = require("../test/schema/artifacts/TEST_ARTIFACT_UNSUPPORTED.json");

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

const CONFIG = {
  client: "clientId",
  organizationId: "orgId",
  artifactFormat: ARTIFACT_FORMAT_JSON, // setting this tells the artifactProvider deobfuscation is not needed
  maximumWaitReady: 500
};

describe("TargetDecisioningEngine", () => {
  const telemetryProvider = TelemetryProvider();
  let decisioning;

  beforeEach(async () => {
    fetchMock.resetMocks();
    (constants.MINIMUM_POLLING_INTERVAL as number) = 0;
  });

  afterEach(() => {
    if (isDefined(decisioning)) {
      decisioning.stopPolling();
      decisioning = undefined;
    }
  });

  it("initializes", async () => {
    fetchMock.mockResponse(JSON.stringify(ARTIFACT_BLANK));

    decisioning = await TargetDecisioningEngine(
      {
        ...CONFIG,
        pollingInterval: 0
      },
      telemetryProvider
    );

    expect(typeof decisioning.getOffers).toBe("function");
  });

  // eslint-disable-next-line jest/no-test-callback
  it("updates the artifact on the polling interval", async done => {
    const responses = [];
    for (let i = 1; i < 50; i += 1) {
      responses.push([
        JSON.stringify(Object.assign({}, ARTIFACT_BLANK, { version: i })),
        { status: 200 }
      ]);
    }

    fetchMock.mockResponses(...responses);

    decisioning = await TargetDecisioningEngine(
      {
        ...CONFIG,
        pollingInterval: 5
      },
      telemetryProvider
    );

    expect(typeof decisioning.getRawArtifact).toEqual("function");
    let timer;

    timer = setInterval(() => {
      const numFetchCalls = fetchMock.mock.calls.length;
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

  it("provides an error if the artifact is not available", () => {
    return new Promise((done: Function) => {
      expect.assertions(3);
      const eventEmitter = jest.fn();

      fetchMock.mockResponses(
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

      TargetDecisioningEngine(
        {
          ...CONFIG,
          pollingInterval: 0,
          eventEmitter
        },
        telemetryProvider
      )
        .then(instance => {
          decisioning = instance;
        })
        .catch(err => {
          expect(err).toEqual(new Error(Messages.ARTIFACT_NOT_AVAILABLE));
        });

      setTimeout(() => {
        expect(eventEmitter).toHaveBeenCalledTimes(11);

        expect(eventEmitter.mock.calls[0][0]).toEqual(ARTIFACT_DOWNLOAD_FAILED);
        done();
      }, 1000);
    });
  });

  it("provides an error if the artifact cannot be deobfuscated", () => {
    return new Promise((done: Function) => {
      expect.assertions(1);
      const eventEmitter = jest.fn();

      fetchMock.mockResponse(JSON.stringify(ARTIFACT_BLANK));

      TargetDecisioningEngine(
        {
          ...CONFIG,
          artifactFormat: ARTIFACT_FORMAT_BINARY,
          artifactLocation: "rules.bin", // an obfuscated artifact
          pollingInterval: 0,
          eventEmitter
        },
        telemetryProvider
      )
        .then(instance => {
          decisioning = instance;
        })
        .catch(err => {
          // the decision provider is expecting an obfuscated artifact (rules.bin), but it received a raw artifact (rules.json) and deobfuscation failed
          expect(err).toEqual(new Error(Messages.ARTIFACT_NOT_AVAILABLE));
          done();
        });
    });
  });

  it("getOffers resolves", async () => {
    fetchMock.mockResponse(JSON.stringify(ARTIFACT_BLANK));

    decisioning = await TargetDecisioningEngine(
      {
        ...CONFIG,
        pollingInterval: 0
      },
      telemetryProvider
    );

    await expect(
      decisioning.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      })
    ).resolves.not.toBeUndefined();
  });

  it("getOffers gives an error if unsupported artifact version", async () => {
    fetchMock.mockResponse(JSON.stringify(ARTIFACT_UNSUPPORTED_VERSION));

    decisioning = await TargetDecisioningEngine(
      {
        ...CONFIG,
        pollingInterval: 0
      },
      telemetryProvider
    );

    await expect(
      decisioning.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      })
    ).rejects.toEqual(
      new Error(
        Messages.ARTIFACT_VERSION_UNSUPPORTED(
          ARTIFACT_UNSUPPORTED_VERSION.version,
          SUPPORTED_ARTIFACT_MAJOR_VERSION
        )
      )
    );
  });
});
