import * as MockDate from "mockdate";
import { isDefined, isUndefined, TelemetryProvider } from "@adobe/target-tools";

import TargetDecisioningEngine from "../src";
import { ARTIFACT_FORMAT_JSON } from "../src/constants";
import { expectToMatchObject, getTestSuites, setMockDate } from "./test.utils";

require("jest-fetch-mock").enableMocks();

const JUST_THIS_TEST = undefined;

/** *
 * By default this file runs all suites.  But, you can isolate just one suite or even a single test within the suite by uncommenting the line below.
 * Simply specify a suite filename (without extension), and a (optional) test key.
 */

// const JUST_THIS_TEST = {
//   suite: "TEST_SUITE_TIMEFRAME",
//   test: "friday_out_of_range"
// };

const TEST_SUITES = getTestSuites(
  isDefined(JUST_THIS_TEST) ? JUST_THIS_TEST.suite : undefined
);

describe("decisioning engine", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("has tests", () => {
    expect(TEST_SUITES.length).toBeGreaterThanOrEqual(1);
  });

  it("runs all tests on CI", () => {
    const isCI = process.env.CI || false;
    if (isCI) {
      expect(JUST_THIS_TEST).toBeUndefined();
    }
  });

  describe.each(
    TEST_SUITES.map(suite => [suite.description, suite, undefined])
  )("%s", (suiteDescription, TEST_SUITE) => {
    let decisioning;

    beforeEach(async () => {
      MockDate.reset();
      fetch.resetMocks();
    });

    afterEach(() => {
      decisioning.stopPolling();
      decisioning = undefined;
    });

    const TESTS = Object.keys(TEST_SUITE.test)
      .filter(testKey => {
        return isUndefined(JUST_THIS_TEST) || isUndefined(JUST_THIS_TEST.test)
          ? true
          : JUST_THIS_TEST.test === testKey;
      })
      .map(key => {
        return [
          TEST_SUITE.test[key].description,
          TEST_SUITE,
          TEST_SUITE.test[key]
        ];
      });

    test.each(TESTS)("%s", async (testDescription, suiteData, testData) => {
      const sendNotificationFunc = jest.fn();

      const { input, output, notificationOutput, mockDate, mockGeo } = testData;

      const conf = testData.conf || suiteData.conf;
      const artifact = testData.artifact || suiteData.artifact;

      if (isDefined(mockDate)) {
        setMockDate(mockDate);
      }

      const mockResponses = [];
      mockResponses.push([JSON.stringify(artifact), { status: 200 }]);

      if (isDefined(mockGeo)) {
        mockResponses.push([JSON.stringify(mockGeo), { status: 200 }]);
      }

      fetch.mockResponses(...mockResponses);

      function executeTelementries(request, entries) {
        return {
          ...request,
          telemetry: {
            entries
          }
        };
      }

      const telemetryProvider = TelemetryProvider(
        executeTelementries,
        conf.telemetryEnabled
      );

      decisioning = await TargetDecisioningEngine({
        ...conf,
        sendNotificationFunc,
        artifactFormat: ARTIFACT_FORMAT_JSON, // setting this tells the artifactProvider deobfuscation is not needed
        telemetryProvider
      });

      expect(decisioning.getRawArtifact()).toEqual(artifact);

      const result = await decisioning.getOffers({
        ...input
      });

      expectToMatchObject(result, output);

      if (isDefined(notificationOutput)) {
        jest.runAllTimers();

        if (notificationOutput === null) {
          expect(sendNotificationFunc.mock.calls.length).toEqual(0);
        } else {
          expect(sendNotificationFunc.mock.calls.length).toEqual(1);
          const notificationPayload = sendNotificationFunc.mock.calls[0][0];

          expectToMatchObject(notificationPayload, notificationOutput);
        }
      }
    });
  });
});
