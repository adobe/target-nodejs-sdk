/* eslint-disable no-console */
const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");
const TargetClient = require("../dist/targetclient.server");

function getFetchWithProxy() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  return (url, options) => {
    return fetch(url, {
      ...options,
      agent: new HttpsProxyAgent("http://127.0.0.1:9090")
    });
  };
}

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
      console.log(err.message);
    });
}

client = TargetClient.create({
  client: "adobesummit2018",
  organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
  fetchApi: getFetchWithProxy(),
  executionMode: "local",
  // environment: "staging",
  // cdnEnvironment: "staging",
  clientReadyCallback: getOffers,
  logger: {
    debug: (...messages) => console.log(...messages),
    error: (...messages) => console.log(...messages)
  }
});
