require("jest-fetch-mock").enableMocks();
const TargetClient = require("../src/index.server");

describe("Requests to target delivery API", () => {
  it("Makes a request to the target API", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        status: 200,
        requestId: "3a129512b421419eac736120c607e5b9",
        client: "adobesummit2018",
        id: { tntId: "dummy_session.28_0" },
        edgeHost: "mboxedge28.tt.omtrdc.net",
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "mbox-waters",
              options: [
                {
                  content: { browserName: "Google Chrome" },
                  type: "json",
                  eventToken:
                    "hi+ys8FLH8AC6VEf02b7k5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ],
              metrics: [
                { type: "click", eventToken: "YkhqwhXNq2tRoWQ/jt8MZw==" }
              ]
            }
          ]
        }
      })
    );

    const client = TargetClient.create({
      client: "adobesummit2018",
      organizationId: "65453EA95A70434F0A495D34@AdobeOrg"
    });

    const targetRequest = {
      prefetch: {
        mboxes: [
          {
            name: "mbox-waters",
            index: 1
          }
        ]
      }
    };

    const result = await client.getOffers({
      request: targetRequest,
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
              name: "mbox-waters"
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
              name: "mbox-waters",
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
});
