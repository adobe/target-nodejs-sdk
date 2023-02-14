const fetch = require("node-fetch");
const TargetClient = require("../src/index.server").default;

describe("Target Client supports proxy configuration", () => {
  it("By overriding the fetchApi during client initialization", () => {
    const spy = jest.fn();

    const fetchImpl = (url, options) => {
      const fetchOptions = options || {};
      fetchOptions.agent = spy;
      return fetch(url, fetchOptions);
    };

    const client = TargetClient.create({
      client: "client",
      organizationId: "orgId",
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

    client.getOffers({
      request: TARGET_REQUEST,
      sessionId: "dummy_session"
    });

    expect(spy).toHaveBeenCalledWith({
      auth: null,
      host: "client.tt.omtrdc.net",
      hostname: "client.tt.omtrdc.net",
      href: "https://client.tt.omtrdc.net/rest/v1/delivery?imsOrgId=orgId&sessionId=dummy_session",
      path: "/rest/v1/delivery?imsOrgId=orgId&sessionId=dummy_session",
      hash: null,
      pathname: "/rest/v1/delivery",
      port: null,
      protocol: "https:",
      query: "imsOrgId=orgId&sessionId=dummy_session",
      search: "?imsOrgId=orgId&sessionId=dummy_session",
      slashes: true
    });
  });
});
