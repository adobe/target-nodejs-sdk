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

    const client_target = TargetClient.create({
      client: clientCode,
      organizationId
    });

    const client_aep = TargetClient.create({
      client: clientCode,
      organizationId,
      edgeConfigId
    });

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
          marketingCloudVisitorId: "52777108510978688250501620102073477990",
          customerIds: [
            {
              id: "custId123",
              authenticatedState: "authenticated",
              integrationCode: "LAW"
            }
          ]
        },
        prefetch: {
          views: [{}]
        },
        execute: {
          pageLoad: {}
          // mboxes: [
          //   { name: "coin", index: 0 },
          //   { name: "currency", index: 1 },
          //   { name: "vegas", index: 2 },
          //   { name: "rainbow", index: 3 }
          // ]
        }
      }
    };

    const result_target = await client_target.getOffers(request);
    const result_aep = await client_aep.getOffers(request);

    const targetResponse = objectWithoutUndefinedValues(result_target.response);
    const { response: aepResponse } = result_aep;

    console.log("===== TARGET =====");
    console.log(JSON.stringify(targetResponse, null, 4));
    console.log("===== END TARGET =====\n\n");

    console.log("===== AEP =====");
    console.log(JSON.stringify(aepResponse, null, 4));
    console.log("===== END AEP =====\n\n");

    expect(aepResponse).toEqual(targetResponse);
  });
});
