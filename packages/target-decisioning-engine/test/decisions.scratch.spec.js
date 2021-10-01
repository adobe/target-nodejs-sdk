/* eslint-disable jest/no-disabled-tests */
import * as HttpsProxyAgent from "https-proxy-agent";
import { getFetchWithTelemetry } from "@adobe/target-tools";
import TargetDecisioningEngine from "../src";

const fetchWithTelemetry = getFetchWithTelemetry();

/**
 * Use this method to proxy requests to Proxyman or Charles Proxy
 */
// eslint-disable-next-line no-unused-vars
function getFetchWithProxy() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  const ProxyAgent = HttpsProxyAgent.default;

  return (url, options) => {
    return fetchWithTelemetry(url, {
      ...options,
      agent: new ProxyAgent("http://127.0.0.1:9090")
    });
  };
}

const TEST_CONF = {
  client: "targettesting",
  organizationId: "74F652E95F1B16FE0A495C92@AdobeOrg",
  fetchApi: fetchWithTelemetry, // getFetchWithProxy(),
  pollingInterval: 0,
  logger: {
    // eslint-disable-next-line no-console
    debug: (...messages) => console.log("DEBUG", ...messages),
    // eslint-disable-next-line no-console
    error: (...messages) => console.log("ERROR", ...messages)
  }
};

const targetRequest = {
  id: {
    tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
  },
  context: {
    channel: "web",
    browser: {
      host: "local-target-test"
    },
    address: {
      url: "http://local-target-test/"
    },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
  }
};

/**
 * This can be useful for testing/troubleshooting the decisioning engine
 */
describe.skip("target-decisioning-engine scratch", () => {
  let decisioning;

  beforeEach(async () => {
    decisioning = await TargetDecisioningEngine({
      ...TEST_CONF
    });
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("test", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          pageLoad: {}
        },
        property: {
          token: "e63fc881-65c7-97b4-a16f-f63ce86c0434"
        }
      }
    });

    expect(result.prefetch.pageLoad).toBeDefined();
  });
});
