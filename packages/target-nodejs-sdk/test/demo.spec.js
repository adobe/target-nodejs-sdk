// const TargetClient = require("../dist/targetclient.server");
const TargetClient = require("../src/index.server");

describe.skip("demo", () => {
  it("works", () => {
    expect(true).toEqual(true);
    const doLocalDecisioning = true;

    let client;

    const context = {
      channel: "web",
      mobilePlatform: null,
      application: null,
      screen: null,
      window: null,
      browser: null,
      address: {
        url: "http://adobe.com",
        referringUrl: null
      },
      geo: null,
      timeOffsetInMinutes: null,
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
      beacon: false
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
      // eslint-disable-next-line jest/valid-expect-in-promise
      client
        .getOffers({
          request: {
            ...targetRequest,
            prefetch: {
              mboxes: [
                {
                  name: "jason-flags",
                  index: 1
                },
                {
                  name: "remote-only-mbox-a",
                  index: 2
                }
              ]
            }
          },
          sessionId: "dummy_session"
        })
        .then(res => {
          expect(res).not.toBeUndefined();
          console.log("Result: Success", JSON.stringify(res, null, 4));
        });
    }

    const targetClientOptions = {
      client: "adobesummit2018",
      organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
      clientReadyCallback: getOffers
    };

    client = TargetClient.create(
      Object.assign(
        {},
        targetClientOptions,
        doLocalDecisioning
          ? {
              executionMode: "local",
              artifactLocation:
                "https://target-local-decisioning-test.s3.us-west-2.amazonaws.com/adobesummit2018/waters_test/rules.json"
            }
          : {}
      )
    );
  });
});
