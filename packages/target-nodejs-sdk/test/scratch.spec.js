const TargetClient = require("../src/index.server").default;

/**
 * This can be useful for testing/troubleshooting the SDK
 */
describe.skip("target-nodejs-sdk scratch", () => {
  const context = {
    channel: "web",
    address: {
      url: "http://local-target-test"
    },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
  };

  const visitorId = {
    tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
    marketingCloudVisitorId: "07327024324407615852294135870030620007"
  };

  const targetRequest = {
    id: visitorId,
    context
  };

  it("test", () => {
    expect.assertions(1);
    return new Promise(done => {
      const propertyToken = "9a327144-63fe-a7fc-5fdb-515e0c0175a8";

      const client = TargetClient.create({
        client: "adobesummit2018",
        organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
        propertyToken,
        executionMode: "local",
        pollingInterval: 0,
        events: {
          clientReady: async () => {
            const result = await client.getOffers({
              request: {
                ...targetRequest,
                execute: {
                  pageLoad: {}
                },
                property: {
                  token: propertyToken
                }
              }
            });
            expect(result.response.status).toEqual(200);

            done();
          }
        },
        logger: {
          // eslint-disable-next-line no-console
          debug: (...messages) => console.log(...messages),
          // eslint-disable-next-line no-console
          error: (...messages) => console.log(...messages)
        }
      });
    });
  });
});
