/* eslint-disable no-restricted-syntax */
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

const Visitor = require("@adobe-mcid/visitor-js-server");
const target = require("../src/target");
const utils = require("../src/utils");
const Messages = require("../src/messages");

const AUTH_STATE = { UNKNOWN: 0, AUTHENTICATED: 1, LOGGED_OUT: 2 };
const VISITOR_CUSTOMER_IDS = {
  userid: {
    id: "67312378756723456",
    authState: 1
  },
  puuid: "550e8400-e29b-41d4-a716-446655440000"
};
const testLogger = {
  debug: message => message,
  error: message => message
};
let TargetClient;

describe("Target Client factory", () => {
  beforeAll(() => {
    spyOn(target, "executeDelivery").and.returnValue(
      Promise.resolve({ response: "response" })
    );
    spyOn(utils, "createVisitor").and.callThrough();
    spyOn(utils, "getLogger").and.callThrough();
    TargetClient = require("../src/index"); // eslint-disable-line global-require
  });

  afterEach(() => {
    target.executeDelivery.calls.reset();
    utils.createVisitor.calls.reset();
    utils.getLogger.calls.reset();
  });

  it("should throw when instantiated via new", () => {
    expect(() => new TargetClient()).toThrow(
      new Error(Messages.PRIVATE_CONSTRUCTOR)
    );
  });

  it("should throw when options are missing", () => {
    expect(() => TargetClient.create({})).toThrow(
      new Error(Messages.OPTIONS_REQUIRED)
    );
  });

  it("should throw when client is missing", () => {
    expect(() => TargetClient.create({ organizationId: "orgId" })).toThrow(
      new Error(Messages.CLIENT_REQUIRED)
    );
  });

  it("should throw when organization ID is missing", () => {
    expect(() => TargetClient.create({ client: "client" })).toThrow(
      new Error(Messages.ORG_ID_REQUIRED)
    );
  });

  it("should not throw when client and orgId are present", () => {
    expect(() =>
      TargetClient.create({ client: "client", organizationId: "orgId" })
    ).not.toThrow();
  });

  it("should set logger on creation", () => {
    expect(() =>
      TargetClient.create({
        client: "client",
        organizationId: "orgId",
        logger: testLogger
      })
    ).not.toThrow();
    expect(utils.getLogger.calls.any()).toBe(true);
    const logger = utils.getLogger.calls.mostRecent().returnValue;
    expect(logger.debug).toEqual(jasmine.any(Function));
    expect(logger.error).toEqual(jasmine.any(Function));
  });

  it("should return Target cookie name", () => {
    expect(TargetClient.TargetCookieName).toBe("mbox");
  });

  it("should return Target location hint cookie name", () => {
    expect(TargetClient.TargetLocationHintCookieName).toBe("mboxEdgeCluster");
  });

  it("should return visitor cookie name", () => {
    expect(TargetClient.getVisitorCookieName("foo@AdobeOrg")).toBe(
      "AMCV_foo@AdobeOrg"
    );
  });

  it("should return Visitor Auth State", () => {
    expect(TargetClient.AuthState).toEqual(AUTH_STATE);
  });

  it("getOffers should throw when options are missing", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });

    await expectAsync(client.getOffers({})).toBeRejectedWith(
      new Error(Messages.OPTIONS_REQUIRED)
    );
  });

  it("getOffers should throw when request is missing", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });

    await expectAsync(
      client.getOffers({ consumerId: "test123" })
    ).toBeRejectedWith(new Error(Messages.REQUEST_REQUIRED));
  });

  it("getOffers should throw when prefetch/execute is missing", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });

    await expectAsync(
      client.getOffers({ request: { trace: {} } })
    ).toBeRejectedWith(new Error(Messages.EXECUTE_OR_PREFETCH_REQUIRED));
  });

  it("getOffers should throw when execute fields are missing", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });

    await expectAsync(
      client.getOffers({ request: { execute: { badField: "bad" } } })
    ).toBeRejectedWith(new Error(Messages.EXECUTE_FIELDS_REQUIRED));
  });

  it("getOffers should throw when prefetch fields are missing", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });

    await expectAsync(
      client.getOffers({ request: { prefetch: { badField: "bad" } } })
    ).toBeRejectedWith(new Error(Messages.PREFETCH_FIELDS_REQUIRED));
  });

  it("should return Promise response on getOffers call", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });
    const request = {
      execute: {
        mboxes: [{ name: "testmbox" }]
      }
    };
    await expectAsync(
      client.getOffers({ request, customerIds: VISITOR_CUSTOMER_IDS })
    ).toBeResolvedTo({
      response: "response"
    });
    expect(target.executeDelivery.calls.count()).toBe(1);
    expect(utils.createVisitor.calls.count()).toBe(1);
    const visitor = utils.createVisitor.calls.mostRecent().returnValue;

    expect(visitor).toEqual(jasmine.any(Visitor));
    const visitorState = JSON.stringify(visitor.getState());
    expect(visitorState).toEqual(
      '{"orgId@AdobeOrg":{"customerIDs":{"userid":{"id":"67312378756723456","authState":1},"puuid":"550e8400-e29b-41d4-a716-446655440000"}}}'
    );
  });

  it("sendNotifications should throw when options are missing", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });

    await expectAsync(client.sendNotifications({})).toBeRejectedWith(
      new Error(Messages.OPTIONS_REQUIRED)
    );
  });

  it("sendNotifications should throw when request is missing", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });

    await expectAsync(
      client.sendNotifications({ consumerId: "test123" })
    ).toBeRejectedWith(new Error(Messages.REQUEST_REQUIRED));
  });

  it("sendNotifications should throw when notifications are missing", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });

    await expectAsync(
      client.sendNotifications({ request: { trace: {} } })
    ).toBeRejectedWith(new Error(Messages.NOTIFICATIONS_REQUIRED));
  });

  it("should return Promise response on sendNotifications call", async () => {
    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId"
    });
    const request = {
      notifications: [
        {
          id: "1234",
          type: "display"
        }
      ]
    };

    await expectAsync(client.sendNotifications({ request })).toBeResolvedTo({
      response: "response"
    });
    expect(target.executeDelivery.calls.count()).toBe(1);
    expect(utils.createVisitor.calls.count()).toBe(1);
    const visitor = utils.createVisitor.calls.mostRecent().returnValue;

    expect(visitor).toEqual(jasmine.any(Visitor));
    expect(visitor.getState()).toEqual(
      jasmine.objectContaining({ "orgId@AdobeOrg": {} })
    );
  });
});
