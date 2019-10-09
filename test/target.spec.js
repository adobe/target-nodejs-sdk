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

const MockDate = require("mockdate");
const target = require("../src/target");

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

describe("Target Delivery API client", () => {
  beforeAll(() => {
    MockDate.set("2019-10-06");
    createDeliveryApiSpy = jasmine
      .createSpy("createDeliveryApiSpy")
      .and.returnValue({
        execute: () =>
          Promise.resolve({
            status: 200,
            body: "responseBody"
          })
      });
    spyOnAllFunctions(EMPTY_VISITOR); // eslint-disable-line no-undef
    EMPTY_VISITOR.getVisitorValues.and.callThrough();
    EMPTY_VISITOR.getSupplementalDataID.and.callThrough();
    EMPTY_VISITOR.getState.and.callThrough();
    spyOnAllFunctions(testLogger); // eslint-disable-line no-undef
    testLogger.debug.and.callThrough();
  });

  afterAll(() => {
    MockDate.reset();
  });

  afterEach(() => {
    createDeliveryApiSpy.calls.reset();
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

    let result = await target.executeDelivery(options);
    let serializedResult = JSON.stringify(result);
    expect(serializedResult).toEqual(
      '{"visitorState":{"B8A054D958807F770A495DD6@AdobeOrg":{}},"request":{"requestId":"123","id":{"tntId":"08210e2d751a44779b8313e2d2692b96.21_27"},"context":{"channel":"web","timeOffsetInMinutes":0},"experienceCloud":{"analytics":{"logging":"server_side","supplementalDataId":null}},"execute":{"pageLoad":{}}},"targetCookie":{"name":"mbox","value":"session#a0bb222be4154f3f97e20dfa1c1d1750#1570321860","maxAge":1860},"targetLocationHintCookie":{"name":"mboxEdgeCluster","value":"21","maxAge":1860},"response":"responseBody"}'
    );
    expect(EMPTY_VISITOR.getState.calls.count()).toBe(2);
    expect(testLogger.debug.calls.count()).toBe(2);

    createDeliveryApiSpy = jasmine
      .createSpy("createDeliveryApiSpy")
      .and.returnValue({
        execute: () => Promise.resolve(undefined)
      });
    options.createDeliveryApiMethod = createDeliveryApiSpy;

    result = await target.executeDelivery(options);
    serializedResult = JSON.stringify(result);
    expect(serializedResult).toEqual(
      '{"visitorState":{"B8A054D958807F770A495DD6@AdobeOrg":{}},"request":{"requestId":"123","id":{"tntId":"08210e2d751a44779b8313e2d2692b96.21_27"},"context":{"channel":"web","timeOffsetInMinutes":0},"experienceCloud":{"analytics":{"logging":"server_side","supplementalDataId":null}},"execute":{"pageLoad":{}}},"targetCookie":{"name":"mbox","value":"session#a0bb222be4154f3f97e20dfa1c1d1750#1570321860","maxAge":1860},"targetLocationHintCookie":{"name":"mboxEdgeCluster","value":"21","maxAge":1860},"response":{}}'
    );
  });
});
