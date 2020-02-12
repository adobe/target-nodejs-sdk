require("jest-fetch-mock").enableMocks();
const TargetClient = require("../src/index.server");

const RESPONSE_PAYLOAD = {
  status: 200,
  requestId: "3a129512b421419eac736120c607e5b9",
  client: "adobesummit2018",
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
      client: "adobesummit2018",
      organizationId: "65453EA95A70434F0A495D34@AdobeOrg"
    });

    const result = await client.getOffers({
      request: TARGET_REQUEST,
      sessionId: "dummy_session"
    });
    expect(result).not.toBeUndefined();
    expect(result).toMatchObject({
      request: {
        requestId: expect.any(String),
        context: {
          channel: "web",
          timeOffsetInMinutes: -480
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
        client: "adobesummit2018",
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

  it("includes environmentID in request if specified", async () => {
    const client = TargetClient.create({
      client: "adobesummit2018",
      organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
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
      client: "adobesummit2018",
      organizationId: "65453EA95A70434F0A495D34@AdobeOrg"
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
