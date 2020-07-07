/* eslint-disable */

// https://wiki.corp.adobe.com/display/elm/Local+Decisioning%3A+Test+Artifacts

export const DUMMY_ARTIFACT_PAYLOAD = {
  version: "1.0.0",
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: [],
  meta: {},
  rules: { mboxes: {}, views: {} }
};

export const DUMMY_ARTIFACT_PAYLOAD_UNSUPPORTED_VERSION = {
  ...DUMMY_ARTIFACT_PAYLOAD,
  version: "99.0.0"
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/form_based_activity-offer2-feb1920201034
export const DECISIONING_PAYLOAD_ADDRESS = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      offer2: [
        {
          ruleKey: "333312",
          activityId: 333312,
          meta: {
            activityId: 333312,
            activityType: "ab",
            experienceId: 0,
            locationName: "offer2",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5356811],
            offerIds: [630815]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              { in: ["bar", { var: "page.url_lc" }] }
            ]
          },
          consequence: {
            name: "offer2",
            options: [
              {
                type: "json",
                eventToken:
                  "mWtD0yDAXMnesyQOa7/jS2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { baz: 1 }
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "333312",
          activityId: 333312,
          meta: {
            activityId: 333312,
            activityType: "ab",
            experienceId: 1,
            locationName: "offer2",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5356811],
            offerIds: [630814]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              { in: ["bar", { var: "page.url_lc" }] }
            ]
          },
          consequence: {
            name: "offer2",
            options: [
              {
                type: "json",
                eventToken:
                  "mWtD0yDAXMnesyQOa7/jS5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { baz: 2 }
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/browser-mbox
export const DECISIONING_PAYLOAD_BROWSER = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "browser-mbox": [
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 1,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4873452],
            offerIds: [632439]
          },
          condition: { "==": [{ var: "user.browserType" }, "firefox"] },
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>it's firefox</h1>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 2,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4957566],
            offerIds: [632440]
          },
          condition: { "==": [{ var: "user.browserType" }, "safari"] },
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGgreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>it's safari</h1>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 3,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [2170460],
            offerIds: [632438]
          },
          condition: { "==": [{ var: "user.browserType" }, "chrome"] },
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>it's chrome</h1>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 4,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5372368],
            offerIds: [632446]
          },
          condition: { "==": [{ var: "user.browserType" }, "ie"] },
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGhB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>it's internet explorer</h1>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 0,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [632437]
          },
          condition: true,
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>not firefox, safari or chrome</h1>"
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/simple_ab_expendable-mbox
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/superfluous_ab_json
export const DECISIONING_PAYLOAD_AB_MULTI_SIMPLE = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "superfluous-mbox": [
        {
          ruleKey: "334411",
          activityId: 334411,
          meta: {
            activityId: 334411,
            activityType: "ab",
            experienceId: 0,
            locationName: "superfluous-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [631992]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "superfluous-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { doMagic: true, importantValue: 150 }
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334411",
          activityId: 334411,
          meta: {
            activityId: 334411,
            activityType: "ab",
            experienceId: 1,
            locationName: "superfluous-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [631991]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "superfluous-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { doMagic: false, importantValue: 75 }
              }
            ],
            metrics: []
          }
        }
      ],
      "expendable-mbox": [
        {
          ruleKey: "334640",
          activityId: 334640,
          meta: {
            activityId: 334640,
            activityType: "ab",
            experienceId: 0,
            locationName: "expendable-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [632233]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "expendable-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "YPoPRnGmGGit+QxnpxYFjWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>hello</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334640",
          activityId: 334640,
          meta: {
            activityId: 334640,
            activityType: "ab",
            experienceId: 1,
            locationName: "expendable-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [632234]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "expendable-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "YPoPRnGmGGit+QxnpxYFjZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>goodbye</div>"
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/redundant-mbox
export const DECISIONING_PAYLOAD_PARAMS = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "redundant-mbox": [
        {
          ruleKey: "334717",
          activityId: 334717,
          meta: {
            activityId: 334717,
            activityType: "ab",
            experienceId: 0,
            locationName: "redundant-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5452799],
            offerIds: [632331]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            name: "redundant-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "Zhwxeqy1O2r9Ske1YDA9bGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { foo: "bar", isFooBar: true, experience: "A" }
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334717",
          activityId: 334717,
          meta: {
            activityId: 334717,
            activityType: "ab",
            experienceId: 1,
            locationName: "redundant-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5452799],
            offerIds: [632330]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            name: "redundant-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "Zhwxeqy1O2r9Ske1YDA9bJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { foo: "bar", isFooBar: true, experience: "B" }
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/kitty_low
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/kitty_high
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/kitty_high_with_targeting
export const DECISIONING_PAYLOAD_PRIORITIES = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      kitty: [
        {
          ruleKey: "336973",
          activityId: 336973,
          meta: {
            activityId: 336973,
            activityType: "landing",
            experienceId: 0,
            locationName: "kitty",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4873452],
            offerIds: [634862]
          },
          condition: { "==": [{ var: "user.browserType" }, "firefox"] },
          consequence: {
            name: "kitty",
            options: [
              {
                type: "html",
                eventToken:
                  "/DhjxnVDh9heBZ0MrYFLF2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>kitty high with targeting: Firefox</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "336973",
          activityId: 336973,
          meta: {
            activityId: 336973,
            activityType: "landing",
            experienceId: 1,
            locationName: "kitty",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4957566],
            offerIds: [634861]
          },
          condition: { "==": [{ var: "user.browserType" }, "safari"] },
          consequence: {
            name: "kitty",
            options: [
              {
                type: "html",
                eventToken:
                  "/DhjxnVDh9heBZ0MrYFLF5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>kitty high with targeting: Safari</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "336951",
          activityId: 336951,
          meta: {
            activityId: 336951,
            activityType: "ab",
            experienceId: 0,
            locationName: "kitty",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [634836]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "kitty",
            options: [
              {
                type: "html",
                eventToken:
                  "ruhwp7VESR7F74TJL2DV5WqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>kitty high A</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "336951",
          activityId: 336951,
          meta: {
            activityId: 336951,
            activityType: "ab",
            experienceId: 1,
            locationName: "kitty",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [634837]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "kitty",
            options: [
              {
                type: "html",
                eventToken:
                  "ruhwp7VESR7F74TJL2DV5ZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>kitty high B</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "336950",
          activityId: 336950,
          meta: {
            activityId: 336950,
            activityType: "ab",
            experienceId: 0,
            locationName: "kitty",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [634834]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "kitty",
            options: [
              {
                type: "html",
                eventToken:
                  "Ww1ZcMj/ShY5tUV/rUzSjGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>kitty low A</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "336950",
          activityId: 336950,
          meta: {
            activityId: 336950,
            activityType: "ab",
            experienceId: 1,
            locationName: "kitty",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [634835]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "kitty",
            options: [
              {
                type: "html",
                eventToken:
                  "Ww1ZcMj/ShY5tUV/rUzSjJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>kitty low B</div>"
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/superfluous_ab_json
export const DECISIONING_PAYLOAD_AB_SIMPLE = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "superfluous-mbox": [
        {
          ruleKey: "334411",
          activityId: 334411,
          meta: {
            activityId: 334411,
            activityType: "ab",
            experienceId: 0,
            locationName: "superfluous-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [631992]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "superfluous-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { doMagic: true, importantValue: 150 }
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334411",
          activityId: 334411,
          meta: {
            activityId: 334411,
            activityType: "ab",
            experienceId: 1,
            locationName: "superfluous-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [631991]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "superfluous-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { doMagic: false, importantValue: 75 }
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/daterange-mbox
export const DECISIONING_PAYLOAD_TIMEFRAME = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["remote-only-mbox-a", "geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "daterange-mbox": [
        {
          ruleKey: "334853",
          activityId: 334853,
          meta: {
            activityId: 334853,
            activityType: "landing",
            experienceId: 4,
            locationName: "daterange-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5372446],
            offerIds: [632493]
          },
          condition: {
            and: [
              { or: [{ "==": [{ var: "current_day" }, "5"] }] },
              { "<=": ["0000", { var: "current_time" }, "2359"] }
            ]
          },
          consequence: {
            name: "daterange-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<strong>it's friday</strong>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334853",
          activityId: 334853,
          meta: {
            activityId: 334853,
            activityType: "landing",
            experienceId: 5,
            locationName: "daterange-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5372445],
            offerIds: [632494]
          },
          condition: {
            "<=": [1582794000000, { var: "current_timestamp" }, 1582999200000]
          },
          consequence: {
            name: "daterange-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7unJlneZxJu5VqGhXCosHhWCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<strong>date range 1 (feb 27-29)</strong>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334853",
          activityId: 334853,
          meta: {
            activityId: 334853,
            activityType: "landing",
            experienceId: 1,
            locationName: "daterange-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5372444],
            offerIds: [632451]
          },
          condition: {
            "<=": [1583149200000, { var: "current_timestamp" }, 1583494800000]
          },
          consequence: {
            name: "daterange-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7pNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<strong>date range 2 (mar 2 - 6)</strong>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334853",
          activityId: 334853,
          meta: {
            activityId: 334853,
            activityType: "landing",
            experienceId: 0,
            locationName: "daterange-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [632450]
          },
          condition: true,
          consequence: {
            name: "daterange-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7mqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<strong>default result</strong>"
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/global_mbox_browserhtml
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_tres_experienceglobalmbox
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/global_ab_html
export const DECISIONING_PAYLOAD_GLOBAL_MBOX = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["target-global-mbox", "geo"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [2170460],
            offerIds: [635716]
          },
          condition: { "==": [{ var: "user.browserType" }, "chrome"] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Chrometastic</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4873452],
            offerIds: [635715]
          },
          condition: { "==": [{ var: "user.browserType" }, "firefox"] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Firetime</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4957566],
            offerIds: [635713]
          },
          condition: { "==": [{ var: "user.browserType" }, "safari"] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulAreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Safari Run</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 3,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [635714]
          },
          condition: true,
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Srsly, who dis?</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337797",
          activityId: 337797,
          meta: {
            activityId: 337797,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5272024],
            offerIds: [635719]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 34] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "0L1rCkDps3F+UEAm1B9A4GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>foo=bar experience A</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337797",
          activityId: 337797,
          meta: {
            activityId: 337797,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5272024],
            offerIds: [635718]
          },
          condition: {
            and: [
              { "<": [34, { var: "allocation" }, 67] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "0L1rCkDps3F+UEAm1B9A4JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>foo=bar experience B</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337797",
          activityId: 337797,
          meta: {
            activityId: 337797,
            activityType: "ab",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5272024],
            offerIds: [635717]
          },
          condition: {
            and: [
              { "<": [67, { var: "allocation" }, 100] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "0L1rCkDps3F+UEAm1B9A4AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>foo=bar experience C</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337888",
          activityId: 337888,
          meta: {
            activityId: 337888,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [635778]
          },
          condition: { "<": [0, { var: "allocation" }, 25] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>whale</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337888",
          activityId: 337888,
          meta: {
            activityId: 337888,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [635776]
          },
          condition: { "<": [25, { var: "allocation" }, 50] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>mouse</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337888",
          activityId: 337888,
          meta: {
            activityId: 337888,
            activityType: "ab",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [635779]
          },
          condition: { "<": [50, { var: "allocation" }, 75] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AQreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>lion</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337888",
          activityId: 337888,
          meta: {
            activityId: 337888,
            activityType: "ab",
            experienceId: 3,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [635777]
          },
          condition: { "<": [75, { var: "allocation" }, 100] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AZZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>owl</div>"
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/jason-flags
export const DECISIONING_PAYLOAD_FEATURE_FLAG = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: [
    "remote-only-mbox-a",
    "remote-only-mbox-b",
    "geo",
    "target-global-mbox"
  ],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "jason-flags": [
        {
          ruleKey: "335113",
          activityId: 335113,
          meta: {
            activityId: 335113,
            activityType: "ab",
            experienceId: 0,
            locationName: "jason-flags",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [632759]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "jason-flags",
            options: [
              {
                type: "json",
                eventToken:
                  "8MDICvd7bsTPYn79fLBNQmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  paymentExperience: "legacy",
                  showFeatureX: false,
                  paymentGatewayVersion: 2.3,
                  customerFeedbackValue: 10
                }
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "335113",
          activityId: 335113,
          meta: {
            activityId: 335113,
            activityType: "ab",
            experienceId: 1,
            locationName: "jason-flags",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [632760]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "jason-flags",
            options: [
              {
                type: "json",
                eventToken:
                  "8MDICvd7bsTPYn79fLBNQpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  paymentExperience: "alpha10",
                  showFeatureX: true,
                  paymentGatewayVersion: 3.1,
                  customerFeedbackValue: 99
                }
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/global_mbox_browserhtml
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/browser-mbox
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/superfluous_ab_json
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/jason-flags
export const DECISIONING_PAYLOAD_ATJS = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["browser-mbox", "geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [2170460],
            offerIds: [635716]
          },
          condition: { "==": [{ var: "user.browserType" }, "chrome"] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Chrometastic</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4873452],
            offerIds: [635715]
          },
          condition: { "==": [{ var: "user.browserType" }, "firefox"] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Firetime</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4957566],
            offerIds: [635713]
          },
          condition: { "==": [{ var: "user.browserType" }, "safari"] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulAreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Safari Run</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 3,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [635714]
          },
          condition: true,
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Srsly, who dis?</div>"
              }
            ],
            metrics: []
          }
        }
      ],
      "browser-mbox": [
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 1,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4873452],
            offerIds: [632439]
          },
          condition: { "==": [{ var: "user.browserType" }, "firefox"] },
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>it's firefox</h1>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 2,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4957566],
            offerIds: [632440]
          },
          condition: { "==": [{ var: "user.browserType" }, "safari"] },
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGgreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>it's safari</h1>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 3,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [2170460],
            offerIds: [632438]
          },
          condition: { "==": [{ var: "user.browserType" }, "chrome"] },
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>it's chrome</h1>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 4,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5372368],
            offerIds: [632446]
          },
          condition: { "==": [{ var: "user.browserType" }, "ie"] },
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGhB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>it's internet explorer</h1>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            activityId: 334845,
            activityType: "landing",
            experienceId: 0,
            locationName: "browser-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [632437]
          },
          condition: true,
          consequence: {
            name: "browser-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<h1>not firefox, safari or chrome</h1>"
              }
            ],
            metrics: []
          }
        }
      ],
      "jason-flags": [
        {
          ruleKey: "335113",
          activityId: 335113,
          meta: {
            activityId: 335113,
            activityType: "ab",
            experienceId: 0,
            locationName: "jason-flags",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [632759]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "jason-flags",
            options: [
              {
                type: "json",
                eventToken:
                  "8MDICvd7bsTPYn79fLBNQmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  paymentExperience: "legacy",
                  showFeatureX: false,
                  paymentGatewayVersion: 2.3,
                  customerFeedbackValue: 10
                }
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "335113",
          activityId: 335113,
          meta: {
            activityId: 335113,
            activityType: "ab",
            experienceId: 1,
            locationName: "jason-flags",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [632760]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "jason-flags",
            options: [
              {
                type: "json",
                eventToken:
                  "8MDICvd7bsTPYn79fLBNQpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  paymentExperience: "alpha10",
                  showFeatureX: true,
                  paymentGatewayVersion: 3.1,
                  customerFeedbackValue: 99
                }
              }
            ],
            metrics: []
          }
        }
      ],
      "superfluous-mbox": [
        {
          ruleKey: "334411",
          activityId: 334411,
          meta: {
            activityId: 334411,
            activityType: "ab",
            experienceId: 0,
            locationName: "superfluous-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [631992]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "superfluous-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { doMagic: true, importantValue: 150 }
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "334411",
          activityId: 334411,
          meta: {
            activityId: 334411,
            activityType: "ab",
            experienceId: 1,
            locationName: "superfluous-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [631991]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "superfluous-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { doMagic: false, importantValue: 75 }
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/vegetable_ab_global-mbox
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/fruit_ab_global-mbox
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/global_mbox_browserhtml
export const DECISIONING_PAYLOAD_PROPERTIES = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [2170460],
            offerIds: [635716]
          },
          condition: { "==": [{ var: "user.browserType" }, "chrome"] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Chrometastic</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4873452],
            offerIds: [635715]
          },
          condition: { "==": [{ var: "user.browserType" }, "firefox"] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Firetime</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [4957566],
            offerIds: [635713]
          },
          condition: { "==": [{ var: "user.browserType" }, "safari"] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulAreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Safari Run</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            activityId: 337795,
            activityType: "landing",
            experienceId: 3,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [635714]
          },
          condition: true,
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Srsly, who dis?</div>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "350783",
          activityId: 350783,
          meta: {
            activityId: 350783,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [652741]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "FP4I48cIaitld6Qi9EQI5mqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  mbox: "target-global-mbox",
                  experience: "A",
                  vegetable: "Asparagus",
                  property: "property Y"
                }
              }
            ],
            metrics: []
          },
          propertyTokens: ["e63fc881-65c7-97b4-a16f-f63ce86c0434"]
        },
        {
          ruleKey: "350783",
          activityId: 350783,
          meta: {
            activityId: 350783,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [652740]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "FP4I48cIaitld6Qi9EQI5pNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  mbox: "target-global-mbox",
                  experience: "B",
                  vegetable: "Brussel Sprouts",
                  property: "property Y"
                }
              }
            ],
            metrics: []
          },
          propertyTokens: ["e63fc881-65c7-97b4-a16f-f63ce86c0434"]
        },
        {
          ruleKey: "350782",
          activityId: 350782,
          meta: {
            activityId: 350782,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [652738]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "0+xiYgJFaaB6s6ZUF9QhIGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  mbox: "target-global-mbox",
                  experience: "A",
                  fruit: "Apple",
                  property: "property X"
                }
              }
            ],
            metrics: []
          },
          propertyTokens: ["9a327144-63fe-a7fc-5fdb-515e0c0175a8"]
        },
        {
          ruleKey: "350782",
          activityId: 350782,
          meta: {
            activityId: 350782,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [],
            offerIds: [652739]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "json",
                eventToken:
                  "0+xiYgJFaaB6s6ZUF9QhIJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  mbox: "target-global-mbox",
                  experience: "B",
                  fruit: "Blueberry",
                  property: "property X"
                }
              }
            ],
            metrics: []
          },
          propertyTokens: ["9a327144-63fe-a7fc-5fdb-515e0c0175a8"]
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/greg_geo_test_a_bjun0220201434
export const DECISIONING_PAYLOAD_GEO = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      geo: [
        {
          ruleKey: "349133",
          activityId: 349133,
          meta: {
            activityId: 349133,
            activityType: "ab",
            experienceId: 0,
            locationName: "geo",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5753100],
            offerIds: [651951]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  {
                    or: [
                      { "==": ["UNITED STATES", { var: "geo.country" }] },
                      { "==": ["US", { var: "geo.country" }] },
                      { "==": ["CANADA", { var: "geo.country" }] },
                      { "==": ["CA", { var: "geo.country" }] }
                    ]
                  },
                  {
                    or: [
                      { "==": ["CALIFORNIA", { var: "geo.region" }] },
                      { "==": ["CA", { var: "geo.region" }] },
                      { "==": ["BRITISH COLUMBIA", { var: "geo.region" }] },
                      { "==": ["BC", { var: "geo.region" }] }
                    ]
                  },
                  {
                    or: [
                      { "==": ["SAN FRANCISCO", { var: "geo.city" }] },
                      { "==": ["SANFRANCISCO", { var: "geo.city" }] },
                      { "==": ["VANCOUVER", { var: "geo.city" }] }
                    ]
                  },
                  { "<": ["37.70", { var: "geo.latitude" }] },
                  { ">=": ["37.80", { var: "geo.latitude" }] },
                  { "<=": ["-122.5", { var: "geo.longitude" }] },
                  { ">": ["-122.3", { var: "geo.longitude" }] },
                  {
                    "!": {
                      or: [
                        { "==": ["SOUTH SAN FRANCISCO", { var: "geo.city" }] },
                        { "==": ["SOUTHSANFRANCISCO", { var: "geo.city" }] }
                      ]
                    }
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "geo",
            options: [
              {
                type: "json",
                eventToken:
                  "LYJSFrgKxsp5ZlEO5o4jpGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { geo: true, exp: "geo.a" }
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "349133",
          activityId: 349133,
          meta: {
            activityId: 349133,
            activityType: "ab",
            experienceId: 1,
            locationName: "geo",
            locationType: "mbox",
            locationId: 0,
            audienceIds: [5753100],
            offerIds: [650379]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  {
                    or: [
                      { "==": ["UNITED STATES", { var: "geo.country" }] },
                      { "==": ["US", { var: "geo.country" }] },
                      { "==": ["CANADA", { var: "geo.country" }] },
                      { "==": ["CA", { var: "geo.country" }] }
                    ]
                  },
                  {
                    or: [
                      { "==": ["CALIFORNIA", { var: "geo.region" }] },
                      { "==": ["CA", { var: "geo.region" }] },
                      { "==": ["BRITISH COLUMBIA", { var: "geo.region" }] },
                      { "==": ["BC", { var: "geo.region" }] }
                    ]
                  },
                  {
                    or: [
                      { "==": ["SAN FRANCISCO", { var: "geo.city" }] },
                      { "==": ["SANFRANCISCO", { var: "geo.city" }] },
                      { "==": ["VANCOUVER", { var: "geo.city" }] }
                    ]
                  },
                  { "<": ["37.70", { var: "geo.latitude" }] },
                  { ">=": ["37.80", { var: "geo.latitude" }] },
                  { "<=": ["-122.5", { var: "geo.longitude" }] },
                  { ">": ["-122.3", { var: "geo.longitude" }] },
                  {
                    "!": {
                      or: [
                        { "==": ["SOUTH SAN FRANCISCO", { var: "geo.city" }] },
                        { "==": ["SOUTHSANFRANCISCO", { var: "geo.city" }] }
                      ]
                    }
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "geo",
            options: [
              {
                type: "json",
                eventToken:
                  "LYJSFrgKxsp5ZlEO5o4jpJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: { geo: true, exp: "geo.b" }
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/xt_spa_add_text_tocontactpage
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_spa_view_changemultipletextnoaudiences
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_spa_view_changeaddtextwithaudiences
export const DECISIONING_PAYLOAD_VIEWS = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {},
    views: {
      contact: [
        {
          ruleKey: "345798-0",
          activityId: 345798,
          meta: {
            activityId: 345798,
            activityType: "landing",
            experienceId: 0,
            locationName: "contact",
            locationType: "view",
            locationId: 0,
            audienceIds: [5634562, 5653736]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.jason" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<div id="action_insert_15889714592501888">Please call Jason immediately</div>'
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "345798-1",
          activityId: 345798,
          meta: {
            activityId: 345798,
            activityType: "landing",
            experienceId: 0,
            locationName: "contact",
            locationType: "view",
            locationId: 1,
            audienceIds: [5634562, 5653736]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.jason" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setStyle",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content: {
                      "background-color": "rgba(255,255,170,1)",
                      priority: "important"
                    }
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "345798-0",
          activityId: 345798,
          meta: {
            activityId: 345798,
            activityType: "landing",
            experienceId: 1,
            locationName: "contact",
            locationType: "view",
            locationId: 0,
            audienceIds: [5634157, 5653736]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.greg" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<span id="action_insert_15889714897491922">Please email Greg immediately</span>'
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "345798-1",
          activityId: 345798,
          meta: {
            activityId: 345798,
            activityType: "landing",
            experienceId: 1,
            locationName: "contact",
            locationType: "view",
            locationId: 1,
            audienceIds: [5634157, 5653736]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.greg" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setStyle",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content: {
                      "background-color": "rgba(170,255,255,1)",
                      priority: "important"
                    }
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "345798-0",
          activityId: 345798,
          meta: {
            activityId: 345798,
            activityType: "landing",
            experienceId: 2,
            locationName: "contact",
            locationType: "view",
            locationId: 0,
            audienceIds: [5653736]
          },
          condition: {
            and: [
              { "==": ["local-target-test", { var: "page.domain" }] },
              { "==": ["/", { var: "page.path" }] }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<span id="action_insert_15889715194712006">Please do not contact us.</span>'
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "345798-1",
          activityId: 345798,
          meta: {
            activityId: 345798,
            activityType: "landing",
            experienceId: 2,
            locationName: "contact",
            locationType: "view",
            locationId: 1,
            audienceIds: [5653736]
          },
          condition: {
            and: [
              { "==": ["local-target-test", { var: "page.domain" }] },
              { "==": ["/", { var: "page.path" }] }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setStyle",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content: {
                      "background-color": "rgba(127,0,0,1)",
                      priority: "important"
                    }
                  }
                ]
              }
            ],
            metrics: []
          }
        }
      ],
      home: [
        {
          ruleKey: "345782-0",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            locationId: 0,
            audienceIds: [5653493, 5634562]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889690271122446">jason = correct</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-1",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            locationId: 1,
            audienceIds: [5653493, 5634562]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "jason home - exp A"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-2",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            locationId: 2,
            audienceIds: [5653493, 5634157]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889690455422475">greg = correct</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-3",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            locationId: 3,
            audienceIds: [5653493, 5634157]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "greg home - exp A"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-4",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            locationId: 4,
            audienceIds: [5653493]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889689998702412">experience A</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-5",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            locationId: 5,
            audienceIds: [5653493]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "nobody home - exp A"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-0",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            locationId: 0,
            audienceIds: [5653493, 5634562]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889691021902684">jason = correct</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-1",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            locationId: 1,
            audienceIds: [5653493, 5634562]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "JASON HOME - exp B"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-2",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            locationId: 2,
            audienceIds: [5653493, 5634157]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889690873022655">greg = correct</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-3",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            locationId: 3,
            audienceIds: [5653493, 5634157]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "GREG HOME - exp B"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-4",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            locationId: 4,
            audienceIds: [5653493]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889690584632570">Experience B</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345782-5",
          activityId: 345782,
          meta: {
            activityId: 345782,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            locationId: 5,
            audienceIds: [5653493]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "NOBODY HOME - exp B"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#spa-content > P:nth-of-type(1)",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ=="
              }
            ]
          }
        },
        {
          ruleKey: "345779-0",
          activityId: 345779,
          meta: {
            activityId: 345779,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            locationId: 0,
            audienceIds: [5653426]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "XQ6HqnRfrxl3ausAjtQJj2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "Home - Experience A"
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "345779-1",
          activityId: 345779,
          meta: {
            activityId: 345779,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            locationId: 1,
            audienceIds: [5653426]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "XQ6HqnRfrxl3ausAjtQJj2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      "experience A! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "345779-0",
          activityId: 345779,
          meta: {
            activityId: 345779,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            locationId: 0,
            audienceIds: [5653426]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "Home - Experience B"
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "345779-1",
          activityId: 345779,
          meta: {
            activityId: 345779,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            locationId: 1,
            audienceIds: [5653426]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                eventToken:
                  "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      "experience B! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                  }
                ]
              }
            ],
            metrics: []
          }
        }
      ]
    }
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/xt_vec_non-spa_correctparamslocal-target-test
export const DECISIONING_PAYLOAD_PAGELOAD_VEC_XT = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "345717-0",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 0,
            audienceIds: [5634157, 5652249]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.greg" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "39UdigzDfmb97ogXP1PN62qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    content: "greg is correct"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-1",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 1,
            audienceIds: [5634157, 5652249]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.greg" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "39UdigzDfmb97ogXP1PN62qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello greg"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-2",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 2,
            audienceIds: [5634157, 5652249]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.greg" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "39UdigzDfmb97ogXP1PN62qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-3",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 3,
            audienceIds: [5634157, 5652249]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.greg" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "39UdigzDfmb97ogXP1PN62qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-0",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 0,
            audienceIds: [5634562, 5652249]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.jason" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "39UdigzDfmb97ogXP1PN65NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-1",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 1,
            audienceIds: [5634562, 5652249]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.jason" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "39UdigzDfmb97ogXP1PN65NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello jason"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-2",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 2,
            audienceIds: [5634562, 5652249]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.jason" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "39UdigzDfmb97ogXP1PN65NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    content: "jason is correct"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-3",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 3,
            audienceIds: [5634562, 5652249]
          },
          condition: {
            and: [
              { "==": ["correct", { var: "mbox.jason" }] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "39UdigzDfmb97ogXP1PN65NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-0",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 0,
            audienceIds: [5652249]
          },
          condition: {
            and: [
              { "==": ["local-target-test", { var: "page.domain" }] },
              { "==": ["/", { var: "page.path" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-1",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 1,
            audienceIds: [5652249]
          },
          condition: {
            and: [
              { "==": ["local-target-test", { var: "page.domain" }] },
              { "==": ["/", { var: "page.path" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello everyone"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-2",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 2,
            audienceIds: [5652249]
          },
          condition: {
            and: [
              { "==": ["local-target-test", { var: "page.domain" }] },
              { "==": ["/", { var: "page.path" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        },
        {
          ruleKey: "345717-3",
          activityId: 345717,
          meta: {
            activityId: 345717,
            activityType: "landing",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 3,
            audienceIds: [5652249]
          },
          condition: {
            and: [
              { "==": ["local-target-test", { var: "page.domain" }] },
              { "==": ["/", { var: "page.path" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "all visitors"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg=="
              }
            ]
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_add_text_local-target-test
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_non-spa_local-target-test
export const DECISIONING_PAYLOAD_PAGELOAD_VEC_AB = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-06-23T22:29:36.910Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.id",
    "geo.country",
    "geo.city",
    "geo.state"
  ],
  remoteMboxes: ["geo", "target-global-mbox"],
  remoteViews: ["home"],
  localMboxes: [
    "offer2",
    "multinot",
    "demo-geo-offer1",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "daterange-mbox",
    "browser-mbox",
    "onboarding-mbox-1",
    "demo-engineering-flags",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "local123456",
    "sam-mbox"
  ],
  localViews: ["contact", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "345139-0",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 0,
            audienceIds: [5639015, 5634157]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    content: "greg is correct"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-1",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 1,
            audienceIds: [5639015, 5634157]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setStyle",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    content: {
                      "background-color": "rgba(127,255,0,1)",
                      priority: "important"
                    }
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-2",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 2,
            audienceIds: [5639015, 5634562]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    content: "jason is correct"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-3",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 3,
            audienceIds: [5639015, 5634562]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setStyle",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    content: {
                      "background-color": "rgba(170,255,255,1)",
                      priority: "important"
                    }
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-4",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 4,
            audienceIds: [5639015]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector:
                      "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887183492726231">experience A</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-5",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 5,
            audienceIds: [5639015, 5634157]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-6",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 6,
            audienceIds: [5639015, 5634157]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-7",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 7,
            audienceIds: [5639015, 5634562]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-8",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 8,
            audienceIds: [5639015, 5634562]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-0",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 0,
            audienceIds: [5639015, 5634157]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-1",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 1,
            audienceIds: [5639015, 5634157]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-2",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 2,
            audienceIds: [5639015, 5634562]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-3",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 3,
            audienceIds: [5639015, 5634562]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-4",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 4,
            audienceIds: [5639015]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector:
                      "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887183664846489">experience B</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-5",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 5,
            audienceIds: [5639015, 5634157]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "greg is correct"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-6",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 6,
            audienceIds: [5639015, 5634157]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.greg" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector: "HTML > BODY > UL:nth-of-type(1)",
                    cssSelector: "HTML > BODY > UL:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887181614905265"> gregggggg</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-7",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 7,
            audienceIds: [5639015, 5634562]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "jason is correct"
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "345139-8",
          activityId: 345139,
          meta: {
            activityId: 345139,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 8,
            audienceIds: [5639015, 5634562]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                and: [
                  { "==": ["local-target-test", { var: "page.domain" }] },
                  { "==": ["/", { var: "page.path" }] }
                ]
              },
              { "==": ["correct", { var: "mbox.jason" }] }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector: "HTML > BODY > UL:nth-of-type(1)",
                    cssSelector: "HTML > BODY > UL:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887181773115309"> jasonnnnnnnn</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg=="
              }
            ]
          }
        },
        {
          ruleKey: "344512-0",
          activityId: 344512,
          meta: {
            activityId: 344512,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 0,
            audienceIds: [5614593]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                or: [
                  {
                    and: [
                      { "==": ["local-target-test", { var: "page.domain" }] },
                      { "==": ["/", { var: "page.path" }] }
                    ]
                  },
                  { in: ["adbeld.surge.sh", { var: "page.url_lc" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "6Na6eWan1u0HrN32JDT54GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertAfter",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15882850825432970">Better to remain silent and be thought a fool than to speak out and remove all doubt.</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#action_insert_15882853393943012",
                eventToken: "/GMYvcjhUsR6WVqQElppUw=="
              }
            ]
          }
        },
        {
          ruleKey: "344512-1",
          activityId: 344512,
          meta: {
            activityId: 344512,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 1,
            audienceIds: [5614593]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                or: [
                  {
                    and: [
                      { "==": ["local-target-test", { var: "page.domain" }] },
                      { "==": ["/", { var: "page.path" }] }
                    ]
                  },
                  { in: ["adbeld.surge.sh", { var: "page.url_lc" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "6Na6eWan1u0HrN32JDT54GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setStyle",
                    selector: "#action_insert_15882850825432970",
                    cssSelector: "#action_insert_15882850825432970",
                    content: {
                      "background-color": "rgba(255,255,170,1)",
                      priority: "important"
                    }
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#action_insert_15882853393943012",
                eventToken: "/GMYvcjhUsR6WVqQElppUw=="
              }
            ]
          }
        },
        {
          ruleKey: "344512-2",
          activityId: 344512,
          meta: {
            activityId: 344512,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 2,
            audienceIds: [5614593]
          },
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              {
                or: [
                  {
                    and: [
                      { "==": ["local-target-test", { var: "page.domain" }] },
                      { "==": ["/", { var: "page.path" }] }
                    ]
                  },
                  { in: ["adbeld.surge.sh", { var: "page.url_lc" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "6Na6eWan1u0HrN32JDT54GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#action_insert_15882853393943012",
                eventToken: "/GMYvcjhUsR6WVqQElppUw=="
              }
            ]
          }
        },
        {
          ruleKey: "344512-0",
          activityId: 344512,
          meta: {
            activityId: 344512,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 0,
            audienceIds: [5614593]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                or: [
                  {
                    and: [
                      { "==": ["local-target-test", { var: "page.domain" }] },
                      { "==": ["/", { var: "page.path" }] }
                    ]
                  },
                  { in: ["adbeld.surge.sh", { var: "page.url_lc" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertAfter",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15882853393943012">Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.</p>'
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#action_insert_15882853393943012",
                eventToken: "/GMYvcjhUsR6WVqQElppUw=="
              }
            ]
          }
        },
        {
          ruleKey: "344512-1",
          activityId: 344512,
          meta: {
            activityId: 344512,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 1,
            audienceIds: [5614593]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                or: [
                  {
                    and: [
                      { "==": ["local-target-test", { var: "page.domain" }] },
                      { "==": ["/", { var: "page.path" }] }
                    ]
                  },
                  { in: ["adbeld.surge.sh", { var: "page.url_lc" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                eventToken:
                  "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#action_insert_15882853393943012",
                eventToken: "/GMYvcjhUsR6WVqQElppUw=="
              }
            ]
          }
        },
        {
          ruleKey: "344512-2",
          activityId: 344512,
          meta: {
            activityId: 344512,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            locationId: 2,
            audienceIds: [5614593]
          },
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              {
                or: [
                  {
                    and: [
                      { "==": ["local-target-test", { var: "page.domain" }] },
                      { "==": ["/", { var: "page.path" }] }
                    ]
                  },
                  { in: ["adbeld.surge.sh", { var: "page.url_lc" }] }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                eventToken:
                  "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setStyle",
                    selector: "#action_insert_15882853393943012",
                    cssSelector: "#action_insert_15882853393943012",
                    content: {
                      "background-color": "rgba(86,255,86,1)",
                      priority: "important"
                    }
                  }
                ]
              }
            ],
            metrics: [
              {
                type: "click",
                selector: "#action_insert_15882853393943012",
                eventToken: "/GMYvcjhUsR6WVqQElppUw=="
              }
            ]
          }
        }
      ]
    },
    views: {}
  }
};
