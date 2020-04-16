export const DUMMY_ARTIFACT_PAYLOAD = {
  version: "1.0.0",
  meta: {},
  rules: { mboxes: {}, views: {} }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/superfluous_ab_json
export const DECISIONING_PAYLOAD_AB_SIMPLE = {
  version: "1.0.0",
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: [],
  meta: { generatedAt: "2020-04-10T20:08:58.731Z", environment: 11507 },
  rules: {
    mboxes: {
      "superfluous-mbox": [
        {
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            options: [
              { content: { doMagic: true, importantValue: 150 }, type: "json" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "superfluous-mbox"
          },
          meta: {
            activityId: 334411,
            experienceId: 0,
            type: "ab",
            mbox: "superfluous-mbox",
            offerIds: [631992],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            options: [
              { content: { doMagic: false, importantValue: 75 }, type: "json" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "superfluous-mbox"
          },
          meta: {
            activityId: 334411,
            experienceId: 1,
            type: "ab",
            mbox: "superfluous-mbox",
            offerIds: [631991],
            audienceIds: []
          }
        }
      ]
    },
    views: {}
  }
};
