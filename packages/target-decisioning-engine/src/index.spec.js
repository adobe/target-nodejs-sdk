import * as HttpStatus from "http-status-codes";
import { isDefined } from "@adobe/target-tools";
import TargetDecisioningEngine from "./index";
import * as constants from "./constants";
import { SUPPORTED_ARTIFACT_MAJOR_VERSION } from "./constants";
import Messages from "./messages";
import {
  DUMMY_ARTIFACT_PAYLOAD,
  DUMMY_ARTIFACT_PAYLOAD_UNSUPPORTED_VERSION
} from "../test/decisioning-payloads";
import { ARTIFACT_DOWNLOAD_FAILED } from "./events";

require("jest-fetch-mock").enableMocks();

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
  maximumWaitReady: 500
};

describe("TargetDecisioningEngine", () => {
  let decisioning;

  beforeEach(async () => {
    fetch.resetMocks();
    constants.MINIMUM_POLLING_INTERVAL = 0;
  });

  afterEach(() => {
    if (isDefined(decisioning)) {
      decisioning.stopPolling();
      decisioning = undefined;
    }
  });

  it("initializes", async () => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    decisioning = await TargetDecisioningEngine({
      ...CONFIG,
      pollingInterval: 0
    });

    expect(typeof decisioning.getOffers).toBe("function");
  });

  // eslint-disable-next-line jest/no-test-callback
  it("updates the artifact on the polling interval", async done => {
    const responses = [];
    for (let i = 1; i < 50; i += 1) {
      responses.push([
        JSON.stringify(
          Object.assign({}, DUMMY_ARTIFACT_PAYLOAD, { version: i })
        ),
        { status: 200 }
      ]);
    }

    fetch.mockResponses(...responses);

    decisioning = await TargetDecisioningEngine({
      ...CONFIG,
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

  it("provides an error if the artifact is not available", () => {
    return new Promise(done => {
      expect.assertions(3);
      const eventEmitter = jest.fn();

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

      TargetDecisioningEngine({
        ...CONFIG,
        pollingInterval: 0,
        eventEmitter
      })
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

  it("getOffers resolves", async () => {
    fetch.mockResponse(JSON.stringify(DUMMY_ARTIFACT_PAYLOAD));

    decisioning = await TargetDecisioningEngine({
      ...CONFIG,
      pollingInterval: 0
    });

    await expect(
      decisioning.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      })
    ).resolves.not.toBeUndefined();
  });

  it("getOffers gives an error if unsupported artifact version", async () => {
    fetch.mockResponse(
      JSON.stringify(DUMMY_ARTIFACT_PAYLOAD_UNSUPPORTED_VERSION)
    );

    decisioning = await TargetDecisioningEngine({
      ...CONFIG,
      pollingInterval: 0
    });

    await expect(
      decisioning.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      })
    ).rejects.toEqual(
      new Error(
        Messages.ARTIFACT_VERSION_UNSUPPORTED(
          DUMMY_ARTIFACT_PAYLOAD_UNSUPPORTED_VERSION.version,
          SUPPORTED_ARTIFACT_MAJOR_VERSION
        )
      )
    );
  });
});
