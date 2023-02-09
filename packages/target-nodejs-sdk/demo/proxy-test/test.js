const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");
// eslint-disable-next-line no-unused-vars
const undici = require("undici");
const TargetClient = require("../../dist/targetclient.server");

let client;

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

function getOffers() {
  client
    .getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          mboxes: [
            {
              name: "jason-flags",
              index: 1
            }
          ]
        }
      },
      sessionId: "dummy_session"
    })
    .then(res => {
      console.log("Result: Success", JSON.stringify(res, null, 4));
    })
    .catch(err => {
      console.log("ERROR");
      console.log(err.message);
    });
}

// proxy test for Node 18.2+ users
// const proxyAgent = new undici.ProxyAgent("http://localhost:8080");
// client = TargetClient.create({
//   client: "targettesting",
//   organizationId: "74F652E95F1B16FE0A495C92@AdobeOrg",
//   decisioningMethod: "on-device",
//   // environment: "staging",
//   // cdnEnvironment: "staging",
//   events: { clientReady: getOffers },
//   logger: {
//     debug: (...messages) => console.log(...messages),
//     error: (...messages) => console.log(...messages)
//   },
//   proxyAgent
// });

// proxy test for Node 16.8+ users
// const proxyAgent = new undici.ProxyAgent("http://localhost:8080");
// client = TargetClient.create({
//   client: "targettesting",
//   fetchApi: undici.fetch,
//   organizationId: "74F652E95F1B16FE0A495C92@AdobeOrg",
//   decisioningMethod: "on-device",
//   // environment: "staging",
//   // cdnEnvironment: "staging",
//   events: { clientReady: getOffers },
//   logger: {
//     debug: (...messages) => console.log(...messages),
//     error: (...messages) => console.log(...messages)
//   },
//   proxyAgent
// });

// proxy test for Node 14 users
const oldProxy = HttpsProxyAgent("http://localhost:8080");

const fetchImpl = (url, options) => {
  const fetchOptions = options;
  fetchOptions.agent = oldProxy;
  return fetch(url, fetchOptions);
};

client = TargetClient.create({
  client: "targettesting",
  organizationId: "74F652E95F1B16FE0A495C92@AdobeOrg",
  fetchApi: fetchImpl,
  decisioningMethod: "on-device",
  // environment: "staging",
  // cdnEnvironment: "staging",
  events: { clientReady: getOffers },
  logger: {
    debug: (...messages) => console.log(...messages),
    error: (...messages) => console.log(...messages)
  }
});
