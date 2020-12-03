import { PROPERTY_TOKEN_MISMATCH } from "@adobe/target-tools";

require("jest-fetch-mock").enableMocks();
const TargetClient = require("../src/index.server").default;

const RESPONSE_PAYLOAD = {
  status: 200,
  requestId: "3a129512b421419eac736120c607e5b9",
  client: "someClientId",
  id: { tntId: "dummy_session.28_0" },
  edgeHost: "mboxedge28.tt.omtrdc.net",
  prefetch: {
    mboxes: [
      {
        index: 1,
        name: "mbox-something",
        options: [
          {
            content: { browserName: "Google Chrome" },
            type: "json",
            eventToken:
              "hi+ys8FLH8AC6VEf02b7k5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
          }
        ],
        metrics: [{ type: "click", eventToken: "YkhqwhXNq2tRoWQ/jt8MZw==" }]
      }
    ]
  }
};

const TARGET_REQUEST = {
  prefetch: {
    mboxes: [
      {
        name: "mbox-something",
        index: 1
      }
    ]
  }
};

describe("Requests to target delivery API", () => {
  beforeAll(() => {
    fetch.resetMocks();

    fetch.mockResponse(JSON.stringify(RESPONSE_PAYLOAD));
  });

  it("Makes a request to the target API", async () => {
    const client = TargetClient.create({
      client: "someClientId",
      organizationId: "someOrgId"
    });

    const result = await client.getOffers({
      request: TARGET_REQUEST,
      sessionId: "dummy_session"
    });
    expect(result).not.toBeUndefined();
    expect(fetch.mock.calls.length).toEqual(1);
    expect(result).toMatchObject({
      request: {
        requestId: expect.any(String),
        context: {
          channel: "web",
          timeOffsetInMinutes: expect.any(Number)
        },
        experienceCloud: {
          analytics: {
            supplementalDataId: expect.any(String),
            logging: "server_side"
          }
        },
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "mbox-something"
            }
          ]
        }
      },
      response: {
        status: 200,
        requestId: expect.any(String),
        id: {
          tntId: "dummy_session.28_0"
        },
        client: "someClientId",
        edgeHost: "mboxedge28.tt.omtrdc.net",
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "mbox-something",
              options: [
                {
                  type: "json",
                  content: {
                    browserName: "Google Chrome"
                  },
                  eventToken: expect.any(String)
                }
              ]
            }
          ]
        }
      }
    });
    expect(fetch.mock.calls.length).toEqual(1);
  });

  it("Can make a request with only the organizationId as param to the target API", async () => {
    const client = TargetClient.create({
      organizationId: "someOrgId"
    });

    const result = await client.getOffers({
      request: TARGET_REQUEST,
      sessionId: "dummy_session"
    });
    expect(result).not.toBeUndefined();
    expect(fetch.mock.calls.length).toEqual(1);
    expect(result).toMatchObject({
      request: {
        requestId: expect.any(String),
        context: {
          channel: "web",
          timeOffsetInMinutes: expect.any(Number)
        },
        experienceCloud: {
          analytics: {
            supplementalDataId: expect.any(String),
            logging: "server_side"
          }
        },
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "mbox-something"
            }
          ]
        }
      },
      response: {
        status: 200,
        requestId: expect.any(String),
        id: {
          tntId: "dummy_session.28_0"
        },
        client: "someClientId",
        edgeHost: "mboxedge28.tt.omtrdc.net",
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "mbox-something",
              options: [
                {
                  type: "json",
                  content: {
                    browserName: "Google Chrome"
                  },
                  eventToken: expect.any(String)
                }
              ]
            }
          ]
        }
      }
    });
    expect(fetch.mock.calls.length).toEqual(1);
    const fetchRequestBody = JSON.parse(fetch.mock.calls[0][1].body);
    expect(fetchRequestBody.organizationId).toEqual("someOrgId");
  });

  describe("environment ID", () => {
    it("includes environmentID in request if specified", async () => {
      const client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId",
        environmentId: 12345
      });

      const result = await client.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      });
      expect(result).not.toBeUndefined();

      expect(fetch.mock.calls.length).toEqual(1);
      const fetchRequestBody = JSON.parse(fetch.mock.calls[0][1].body);

      expect(fetchRequestBody.environmentId).toEqual(12345);
    });

    it("does not include environmentID in request if not specified", async () => {
      const client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId"
      });

      const result = await client.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      });
      expect(result).not.toBeUndefined();

      expect(fetch.mock.calls.length).toEqual(1);
      const fetchRequestBody = JSON.parse(fetch.mock.calls[0][1].body);

      expect(fetchRequestBody.environmentId).toBeUndefined();
    });
  });

  describe("property token", () => {
    it("includes propertyToken in request if specified in global config", async () => {
      const client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId",
        propertyToken: "token_abc"
      });

      const result = await client.getOffers({
        request: TARGET_REQUEST,
        sessionId: "dummy_session"
      });
      expect(result).not.toBeUndefined();

      expect(fetch.mock.calls.length).toEqual(1);
      const fetchRequestBody = JSON.parse(fetch.mock.calls[0][1].body);

      expect(fetchRequestBody.property).toEqual({
        token: "token_abc"
      });
    });

    it("includes propertyToken in request if specified in request", async () => {
      const client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId"
      });

      const result = await client.getOffers({
        request: {
          ...TARGET_REQUEST,
          property: { token: "token_xyz" }
        },
        sessionId: "dummy_session"
      });
      expect(result).not.toBeUndefined();

      expect(fetch.mock.calls.length).toEqual(1);
      const fetchRequestBody = JSON.parse(fetch.mock.calls[0][1].body);

      expect(fetchRequestBody.property).toEqual({
        token: "token_xyz"
      });
    });

    it("prefers request property token over config property token", async () => {
      const debugLogMessages = [];

      const client = TargetClient.create({
        client: "someClientId",
        organizationId: "someOrgId",
        propertyToken: "token_abc",
        logger: {
          debug: (prefix, message) => {
            debugLogMessages.push(message);
          }
        }
      });

      const result = await client.getOffers({
        request: {
          ...TARGET_REQUEST,
          property: { token: "token_xyz" }
        },
        sessionId: "dummy_session"
      });
      expect(result).not.toBeUndefined();

      expect(fetch.mock.calls.length).toEqual(1);
      const fetchRequestBody = JSON.parse(fetch.mock.calls[0][1].body);

      expect(fetchRequestBody.property).toEqual({
        token: "token_xyz"
      });

      const expectedLogMessage = PROPERTY_TOKEN_MISMATCH(
        "token_xyz",
        "token_abc"
      );

      expect(
        debugLogMessages.find(message => message === expectedLogMessage)
      ).toEqual(expectedLogMessage);
    });
  });
});
