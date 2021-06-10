/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { noop, TelemetryProvider } = require("@adobe/target-tools");
const MockDate = require("mockdate");
const target = require("../src/target");

const telemetryProvider = TelemetryProvider(noop, false);

const testLogger = {
  debug: message => message,
  error: message => message
};
const EMPTY_VISITOR = {
  getVisitorValues: () => ({}),
  getSupplementalDataID: () => null,
  getState: () => ({
    "B8A054D958807F770A495DD6@AdobeOrg": {}
  })
};
const targetCookie =
  "session#a0bb222be4154f3f97e20dfa1c1d1750#9596233214|PC#08210e2d751a44779b8313e2d2692b96.21_27#9596233214";
let createDeliveryApiSpy;

function spyOnAllFunctions(obj) {
  Object.keys(obj).forEach(prop => {
    if (
      Object.prototype.hasOwnProperty.call(obj, prop) &&
      obj[prop] instanceof Function
    ) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      if ((descriptor.writable || descriptor.set) && descriptor.configurable) {
        jest.spyOn(obj, prop);
      }
    }
  });
}

describe("Target Delivery API client", () => {
  beforeAll(() => {
    MockDate.set("2019-10-06");
    createDeliveryApiSpy = jest.fn(() => ({
      execute: () =>
        Promise.resolve({
          status: 200,
          body: "responseBody"
        })
    }));
    spyOnAllFunctions(EMPTY_VISITOR);
    spyOnAllFunctions(testLogger);
  });

  afterAll(() => {
    MockDate.reset();
  });

  afterEach(() => {
    createDeliveryApiSpy.mockClear();
  });

  it("executeDelivery should execute Delivery API call", async () => {
    const options = {
      visitor: EMPTY_VISITOR,
      config: {
        serverDomain: "test.com",
        client: "testclient",
        timeout: 2000
      },
      logger: testLogger,
      targetCookie,
      consumerId: "consumer1",
      request: {
        requestId: "123",
        execute: {
          pageLoad: {}
        }
      },
      createDeliveryApiMethod: createDeliveryApiSpy
    };

    const serializedResult = await target.executeDelivery(
      options,
      telemetryProvider
    );
    expect(serializedResult).toEqual(
      expect.objectContaining({
        visitorState: { "B8A054D958807F770A495DD6@AdobeOrg": {} },
        request: {
          requestId: "123",
          id: { tntId: "08210e2d751a44779b8313e2d2692b96.21_27" },
          context: { channel: "web", timeOffsetInMinutes: expect.any(Number) },
          experienceCloud: {
            analytics: { logging: "server_side", supplementalDataId: undefined }
          },
          execute: { pageLoad: {} }
        },
        targetCookie: {
          name: "mbox",
          value: "session#a0bb222be4154f3f97e20dfa1c1d1750#1570321860",
          maxAge: 1860
        },
        targetLocationHintCookie: {
          name: "mboxEdgeCluster",
          value: "21",
          maxAge: 1860
        },
        response: {
          status: 200,
          body: "responseBody"
        }
      })
    );
    expect(EMPTY_VISITOR.getState.mock.calls.length).toBe(3);
    expect(testLogger.debug.mock.calls.length).toBe(2);

    createDeliveryApiSpy = jest.fn(() => ({
      execute: () => Promise.resolve(undefined)
    }));
    options.createDeliveryApiMethod = createDeliveryApiSpy;

    const result = await target.executeDelivery(options, telemetryProvider);
    expect(result).toEqual(
      expect.objectContaining({
        visitorState: { "B8A054D958807F770A495DD6@AdobeOrg": {} },
        request: {
          requestId: "123",
          id: { tntId: "08210e2d751a44779b8313e2d2692b96.21_27" },
          context: { channel: "web", timeOffsetInMinutes: expect.any(Number) },
          experienceCloud: {
            analytics: { logging: "server_side", supplementalDataId: undefined }
          },
          execute: { pageLoad: {} }
        },
        targetCookie: {
          name: "mbox",
          value: "session#a0bb222be4154f3f97e20dfa1c1d1750#1570321860",
          maxAge: 1860
        },
        targetLocationHintCookie: {
          name: "mboxEdgeCluster",
          value: "21",
          maxAge: 1860
        },
        response: {}
      })
    );
  });
});
