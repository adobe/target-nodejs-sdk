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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      offer2: [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      "browser-mbox": [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      "superfluous-mbox": [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      "redundant-mbox": [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      kitty: [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      "superfluous-mbox": [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["remote-only-mbox-a", "target-global-mbox"],
  rules: {
    mboxes: {
      "daterange-mbox": [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: [
    "remote-only-mbox-a",
    "remote-only-mbox-b",
    "target-global-mbox"
  ],
  rules: {
    mboxes: {
      "jason-flags": [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["browser-mbox", "target-global-mbox"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
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

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/xt_spa_add_text_tocontactpage
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_spa_view_changemultipletextnoaudiences
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_spa_view_changeaddtextwithaudiences
export const DECISIONING_PAYLOAD_VIEWS = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {},
    views: {
      contact: [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
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
    generatedAt: "2020-05-27T22:29:01.244Z"
  },
  globalMbox: "target-global-mbox",
  responseTokens: ["activity.id", "activity.name"],
  remoteMboxes: ["target-global-mbox"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
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
