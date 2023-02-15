import { Agent } from "https";

const { getFetchWithTelemetry } = require("@adobe/target-tools");
const TargetClient = require("../src/index.server").default;

describe("Target Client supports proxy configuration", () => {
  it("By overriding the fetchApi during client initialization", async () => {
    const proxyAgentSpy = jest.spyOn(Agent.prototype, "createConnection");

    const fetchImpl = (url, options) => {
      const fetchOptions = options || {};
      fetchOptions.agent = new Agent({
        keepAlive: true
      });
      const telemetryFetch = getFetchWithTelemetry();
      return telemetryFetch(url, fetchOptions);
    };

    const client = TargetClient.create({
      client: "adobesummit2018",
      organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
      decisioningMethod: "server-side",
      fetchApi: fetchImpl
    });

    const TARGET_REQUEST = {
      prefetch: {
        mboxes: [
          {
            name: "mbox-droptop",
            index: 1
          }
        ]
      }
    };

    await client.getOffers({
      request: TARGET_REQUEST,
      sessionId: "dummy_session"
    });

    const proxyAgentSpyCall = proxyAgentSpy.mock.calls[0][0];

    expect(proxyAgentSpyCall.keepAlive).toEqual(true);
    expect(proxyAgentSpyCall.servername).toEqual(
      "adobesummit2018.tt.omtrdc.net"
    );
    expect(proxyAgentSpyCall.headers["X-EXC-SDK"]).toEqual("AdobeTargetNode");
  });
});
