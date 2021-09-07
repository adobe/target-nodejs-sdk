/* eslint-disable */
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

    const client = TargetClient.create({
      client: clientCode,
      organizationId,
      edgeConfigId
    });

    const result = await client.getOffers({
      // visitorCookie,
      request: {
        id: {
          marketingCloudVisitorId: "52777108510978688250501620102073477990",
          customerIds: [
            {
              id: "custId123",
              authenticatedState: "authenticated",
              primary: false
            }
          ]
        },
        execute: {
          mboxes: [
            {
              name: "vegas",
              index: 0
            }
          ]
        }
      }
    });

    console.log(JSON.stringify(result, null, 4));
    expect(true).toEqual(true);
  });
});
