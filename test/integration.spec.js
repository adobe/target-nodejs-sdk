const TargetClient = require("../src/index.server");

describe("Requests to target delivery API", () => {
  it("Makes a request to the target API", async () => {
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
                    browserName: "?idk?"
                  },
                  eventToken: expect.any(String)
                }
              ]
            }
          ]
        }
      }
    });
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });
});
