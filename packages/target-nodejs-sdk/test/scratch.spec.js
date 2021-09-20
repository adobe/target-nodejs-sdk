/* eslint-disable */
const { objectWithoutUndefinedValues } = require("../../target-tools");
const TargetClient = require("../src/index.server").default;

/**
 * This can be useful for testing/troubleshooting the SDK
 */
describe.skip("target-nodejs-sdk scratch", () => {
  it("test", async () => {
    const clientCode = "targetdataplatform";
    const organizationId = "6FC947105BB267B70A495EE9@AdobeOrg";
    const edgeConfigId = "34610d20-3c46-4636-b22f-eb87110dfb25:dev";
    const visitorCookie =
      "1585540135%7CMCMID%7C52777108510978688250501620102073477990%7CMCIDTS%7C18874%7CMCAAMLH-1631311239%7C9%7CMCAAMB-1631311239%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCOPTOUT-1630713639s%7CNONE%7CvVersion%7C4.4.0";

    const baseConfig = {
      client: clientCode,
      logger: console,
      organizationId,
      pollingInterval: 0
    };

    const configs = [
      {
        ...baseConfig
      },
      {
        ...baseConfig,
        edgeConfigId
      }
    ];

    const request = {
      // visitorCookie,
      request: {
        context: {
          address: { url: "http://local-target-test" },
          browser: {
            host: "local-target-test"
          },
          channel: "web"
        },
        id: {
          marketingCloudVisitorId: "52777108510978688250501620102073477990"
        },
        // prefetch: {
        //   views: [{}]
        // },
        execute: {
          pageLoad: {}
          // mboxes: [
          // { name: "coin", index: 0 }
          //   { name: "currency", index: 1 },
          //   { name: "vegas", index: 2 },
          //   { name: "rainbow", index: 3 }
          // ]
        }
      }
    };

    const clients = await Promise.all(
      configs.map(config => {
        return new Promise((resolve, reject) => {
          const client = TargetClient.create({
            ...config,
            events: {
              clientReady: () => {
                resolve(client);
              }
            }
          });
        });
      })
    );

    const responses = [];

    for (const client of clients) {
      const result = await client.getOffers(request);
      const { response } = result;
      responses.push(objectWithoutUndefinedValues(response));
    }

    for (let i = 1; i < responses.length; i++) {
      expect(responses[i]).toEqual(responses[0]);
    }
  });
});
