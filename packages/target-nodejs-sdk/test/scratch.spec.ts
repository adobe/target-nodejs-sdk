/* eslint-disable jest/no-disabled-tests */
import { TargetClient } from "../src/bootstrap";
import { ChannelType } from "@adobe/target-tools/delivery-api-client";
import { TargetDeliveryResponse } from "../types/SDKResponse";

const { createTargetClient } = require("../src/index");

/**
 * This can be useful for testing/troubleshooting the SDK
 */
describe("target-nodejs-sdk scratch", () => {
  it("test", () => {
    expect.assertions(1);
    return new Promise<void>(done => {
      const client: TargetClient = createTargetClient({
        client: "adobesummit2018",
        organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
        decisioningMethod: "server-side",
        pollingInterval: 0,
        events: {
          clientReady: async () => {
            const result: TargetDeliveryResponse = await client.getOffers({
              request: {
                id: {
                  tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
                },
                context: {
                  channel: ChannelType.Web
                },
                prefetch: {
                  mboxes: [{ index: 0, name: "demo-marketing-offer1" }]
                },
                qaMode: {
                  token: "QCfbJvlzWVIdSjvDOUtz+J7srqQZYj1dadvKwaf8yb8=",
                  listedActivitiesOnly: true,
                  previewIndexes: [
                    {
                      activityIndex: 1,
                      experienceIndex: 2
                    }
                  ]
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
