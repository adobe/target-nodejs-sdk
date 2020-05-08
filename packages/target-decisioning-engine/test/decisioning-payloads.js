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
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: [],
  meta: { generatedAt: "2020-04-10T20:08:59.041Z", environment: 11507 },
  rules: {
    mboxes: {
      offer2: [
        {
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              { in: ["bar", { var: "page.url_lc" }] }
            ]
          },
          consequence: {
            options: [{ content: { baz: 1 }, type: "json" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "mWtD0yDAXMnesyQOa7/jS2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "offer2"
          },
          meta: {
            activityId: 333312,
            experienceId: 0,
            activityType: "ab",
            locationName: "offer2",
            locationType: "mbox",
            offerIds: [630815],
            audienceIds: [5356811]
          }
        },
        {
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              { in: ["bar", { var: "page.url_lc" }] }
            ]
          },
          consequence: {
            options: [{ content: { baz: 2 }, type: "json" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "mWtD0yDAXMnesyQOa7/jS5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "offer2"
          },
          meta: {
            activityId: 333312,
            experienceId: 1,
            activityType: "ab",
            locationName: "offer2",
            locationType: "mbox",
            offerIds: [630814],
            audienceIds: [5356811]
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
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: [],
  meta: { generatedAt: "2020-04-10T20:08:59.356Z", environment: 11507 },
  rules: {
    mboxes: {
      "browser-mbox": [
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "firefox"] }]
          },
          consequence: {
            options: [{ content: "<h1>it's firefox</h1>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 1,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632439],
            audienceIds: [4873452]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "safari"] }]
          },
          consequence: {
            options: [{ content: "<h1>it's safari</h1>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGgreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 2,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632440],
            audienceIds: [4957566]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "chrome"] }]
          },
          consequence: {
            options: [{ content: "<h1>it's chrome</h1>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 3,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632438],
            audienceIds: [2170460]
          }
        },
        {
          condition: { and: [{ "==": [{ var: "user.browserType" }, "ie"] }] },
          consequence: {
            options: [
              { content: "<h1>it's internet explorer</h1>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGhB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 4,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632446],
            audienceIds: [5372368]
          }
        },
        {
          condition: true,
          consequence: {
            options: [
              {
                content: "<h1>not firefox, safari or chrome</h1>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 0,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632437],
            audienceIds: []
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
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: [],
  meta: { generatedAt: "2020-04-10T20:08:59.684Z", environment: 11507 },
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
            activityType: "ab",
            locationName: "superfluous-mbox",
            locationType: "mbox",
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
            activityType: "ab",
            locationName: "superfluous-mbox",
            locationType: "mbox",
            offerIds: [631991],
            audienceIds: []
          }
        }
      ],
      "expendable-mbox": [
        {
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            options: [{ content: "<div>hello</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "YPoPRnGmGGit+QxnpxYFjWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "expendable-mbox"
          },
          meta: {
            activityId: 334640,
            experienceId: 0,
            activityType: "ab",
            locationName: "expendable-mbox",
            locationType: "mbox",
            offerIds: [632233],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            options: [{ content: "<div>goodbye</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "YPoPRnGmGGit+QxnpxYFjZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "expendable-mbox"
          },
          meta: {
            activityId: 334640,
            experienceId: 1,
            activityType: "ab",
            locationName: "expendable-mbox",
            locationType: "mbox",
            offerIds: [632234],
            audienceIds: []
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
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: [],
  meta: { generatedAt: "2020-04-10T20:08:59.011Z", environment: 11507 },
  rules: {
    mboxes: {
      "redundant-mbox": [
        {
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              {
                content: { foo: "bar", isFooBar: true, experience: "A" },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Zhwxeqy1O2r9Ske1YDA9bGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "redundant-mbox"
          },
          meta: {
            activityId: 334717,
            experienceId: 0,
            activityType: "ab",
            locationName: "redundant-mbox",
            locationType: "mbox",
            offerIds: [632331],
            audienceIds: [5452799]
          }
        },
        {
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              {
                content: { foo: "bar", isFooBar: true, experience: "B" },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Zhwxeqy1O2r9Ske1YDA9bJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "redundant-mbox"
          },
          meta: {
            activityId: 334717,
            experienceId: 1,
            activityType: "ab",
            locationName: "redundant-mbox",
            locationType: "mbox",
            offerIds: [632330],
            audienceIds: [5452799]
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
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: [],
  meta: { generatedAt: "2020-04-10T20:09:00.994Z", environment: 11507 },
  rules: {
    mboxes: {
      kitty: [
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "firefox"] }]
          },
          consequence: {
            options: [
              {
                content: "<div>kitty high with targeting: Firefox</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "/DhjxnVDh9heBZ0MrYFLF2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336973,
            experienceId: 0,
            activityType: "xt",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634862],
            audienceIds: [4873452]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "safari"] }]
          },
          consequence: {
            options: [
              {
                content: "<div>kitty high with targeting: Safari</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "/DhjxnVDh9heBZ0MrYFLF5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336973,
            experienceId: 1,
            activityType: "xt",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634861],
            audienceIds: [4957566]
          }
        },
        {
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            options: [{ content: "<div>kitty high A</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "ruhwp7VESR7F74TJL2DV5WqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336951,
            experienceId: 0,
            activityType: "ab",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634836],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            options: [{ content: "<div>kitty high B</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "ruhwp7VESR7F74TJL2DV5ZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336951,
            experienceId: 1,
            activityType: "ab",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634837],
            audienceIds: []
          }
        },
        {
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            options: [{ content: "<div>kitty low A</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Ww1ZcMj/ShY5tUV/rUzSjGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336950,
            experienceId: 0,
            activityType: "ab",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634834],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            options: [{ content: "<div>kitty low B</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Ww1ZcMj/ShY5tUV/rUzSjJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336950,
            experienceId: 1,
            activityType: "ab",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634835],
            audienceIds: []
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
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: [],
  meta: { generatedAt: "2020-04-10T19:46:53.599Z", environment: 11507 },
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
            activityType: "ab",
            locationName: "superfluous-mbox",
            locationType: "mbox",
            offerIds: [631992],
            audienceIds: [5361981]
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
            activityType: "ab",
            locationName: "superfluous-mbox",
            locationType: "mbox",
            offerIds: [631991],
            audienceIds: [5361982]
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
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: ["remote-only-mbox-a", "remote-only-mbox-a"],
  meta: { generatedAt: "2020-04-10T20:08:59.355Z", environment: 11507 },
  rules: {
    mboxes: {
      "daterange-mbox": [
        {
          condition: {
            and: [
              {
                or: [
                  {
                    and: [
                      { or: [{ "==": [{ var: "current_day" }, "5"] }] },
                      { "<=": ["0000", { var: "current_time" }, "2359"] }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            options: [
              { content: "<strong>it's friday</strong>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          },
          meta: {
            activityId: 334853,
            experienceId: 4,
            activityType: "xt",
            locationName: "daterange-mbox",
            locationType: "mbox",
            offerIds: [632493],
            audienceIds: [5372446]
          }
        },
        {
          condition: {
            and: [
              {
                or: [
                  {
                    "<=": [
                      1582822800000,
                      { var: "current_timestamp" },
                      1583028000000
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            options: [
              {
                content: "<strong>date range 1 (feb 27-29)</strong>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7unJlneZxJu5VqGhXCosHhWCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          },
          meta: {
            activityId: 334853,
            experienceId: 5,
            activityType: "xt",
            locationName: "daterange-mbox",
            locationType: "mbox",
            offerIds: [632494],
            audienceIds: [5372445]
          }
        },
        {
          condition: {
            and: [
              {
                or: [
                  {
                    "<=": [
                      1583178000000,
                      { var: "current_timestamp" },
                      1583523600000
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            options: [
              {
                content: "<strong>date range 2 (mar 2 - 6)</strong>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7pNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          },
          meta: {
            activityId: 334853,
            experienceId: 1,
            activityType: "xt",
            locationName: "daterange-mbox",
            locationType: "mbox",
            offerIds: [632451],
            audienceIds: [5372444]
          }
        },
        {
          condition: true,
          consequence: {
            options: [
              { content: "<strong>default result</strong>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7mqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          },
          meta: {
            activityId: 334853,
            experienceId: 0,
            activityType: "xt",
            locationName: "daterange-mbox",
            locationType: "mbox",
            offerIds: [632450],
            audienceIds: []
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
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: ["target-global-mbox"],
  meta: { generatedAt: "2020-04-10T20:09:01.361Z", environment: 11507 },
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "chrome"] }]
          },
          consequence: {
            options: [{ content: "<div>Chrometastic</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337795,
            experienceId: 0,
            activityType: "xt",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635716],
            audienceIds: [2170460]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "firefox"] }]
          },
          consequence: {
            options: [{ content: "<div>Firetime</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337795,
            experienceId: 1,
            activityType: "xt",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635715],
            audienceIds: [4873452]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "safari"] }]
          },
          consequence: {
            options: [{ content: "<div>Safari Run</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulAreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337795,
            experienceId: 2,
            activityType: "xt",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635713],
            audienceIds: [4957566]
          }
        },
        {
          condition: true,
          consequence: {
            options: [{ content: "<div>Srsly, who dis?</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337795,
            experienceId: 3,
            activityType: "xt",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635714],
            audienceIds: []
          }
        },
        {
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 34] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              { content: "<div>foo=bar experience A</div>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "0L1rCkDps3F+UEAm1B9A4GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337797,
            experienceId: 0,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635719],
            audienceIds: [5272024]
          }
        },
        {
          condition: {
            and: [
              { "<": [34, { var: "allocation" }, 67] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              { content: "<div>foo=bar experience B</div>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "0L1rCkDps3F+UEAm1B9A4JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337797,
            experienceId: 1,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635718],
            audienceIds: [5272024]
          }
        },
        {
          condition: {
            and: [
              { "<": [67, { var: "allocation" }, 100] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              { content: "<div>foo=bar experience C</div>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "0L1rCkDps3F+UEAm1B9A4AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337797,
            experienceId: 2,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635717],
            audienceIds: [5272024]
          }
        },
        {
          condition: { "<": [0, { var: "allocation" }, 25] },
          consequence: {
            options: [{ content: "<div>whale</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337888,
            experienceId: 0,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635778],
            audienceIds: []
          }
        },
        {
          condition: { "<": [25, { var: "allocation" }, 50] },
          consequence: {
            options: [{ content: "<div>mouse</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337888,
            experienceId: 1,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635776],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 75] },
          consequence: {
            options: [{ content: "<div>lion</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AQreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337888,
            experienceId: 2,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635779],
            audienceIds: []
          }
        },
        {
          condition: { "<": [75, { var: "allocation" }, 100] },
          consequence: {
            options: [{ content: "<div>owl</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AZZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337888,
            experienceId: 3,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635777],
            audienceIds: []
          }
        }
      ]
    },
    views: {}
  }
};

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_spa_view_changemultipletextnoaudiences
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_spa_view_changeaddtextwithaudiences
export const DECISIONING_PAYLOAD_VIEWS = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    generatedAt: "2020-05-08T20:20:31.375Z",
    environment: "waters_test"
  },
  globalMbox: "target-global-mbox",
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.name",
    "experience.id",
    "offer.name",
    "offer.id",
    "option.id",
    "option.name"
  ],
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
            audienceIds: [5634562, 5653736],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<div id="action_insert_15889714592501888">Please call Jason immediately</div>'
                  }
                ],
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
            audienceIds: [5634562, 5653736],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
            audienceIds: [5634157, 5653736],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<span id="action_insert_15889714897491922">Please email Greg immediately</span>'
                  }
                ],
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
            audienceIds: [5634157, 5653736],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
            audienceIds: [5653736],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "local-target-test",
                  {
                    var: "page.domain"
                  }
                ]
              },
              {
                "==": [
                  "/",
                  {
                    var: "page.path"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<span id="action_insert_15889715194712006">Please do not contact us.</span>'
                  }
                ],
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
            audienceIds: [5653736],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "local-target-test",
                  {
                    var: "page.domain"
                  }
                ]
              },
              {
                "==": [
                  "/",
                  {
                    var: "page.path"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "contact",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
            audienceIds: [5653493, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889690271122446">jason = correct</p>'
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "jason home - exp A"
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889690455422475">greg = correct</p>'
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "greg home - exp A"
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0.0,
                  {
                    var: "allocation"
                  },
                  50.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889689998702412">experience A</p>'
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0.0,
                  {
                    var: "allocation"
                  },
                  50.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "nobody home - exp A"
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889691021902684">jason = correct</p>'
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "JASON HOME - exp B"
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889690873022655">greg = correct</p>'
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "GREG HOME - exp B"
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50.0,
                  {
                    var: "allocation"
                  },
                  100.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15889690584632570">Experience B</p>'
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653493],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50.0,
                  {
                    var: "allocation"
                  },
                  100.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "NOBODY HOME - exp B"
                  }
                ],
                eventToken:
                  "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                selector: "#spa-content > P:nth-of-type(1)"
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
            audienceIds: [5653426],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0.0,
                  {
                    var: "allocation"
                  },
                  50.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "Home - Experience A"
                  }
                ],
                eventToken:
                  "XQ6HqnRfrxl3ausAjtQJj2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
            audienceIds: [5653426],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0.0,
                  {
                    var: "allocation"
                  },
                  50.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      "experience A! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                  }
                ],
                eventToken:
                  "XQ6HqnRfrxl3ausAjtQJj2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
            audienceIds: [5653426],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50.0,
                  {
                    var: "allocation"
                  },
                  100.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > H3:nth-of-type(1)",
                    cssSelector: "#spa-content > H3:nth-of-type(1)",
                    content: "Home - Experience B"
                  }
                ],
                eventToken:
                  "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
            audienceIds: [5653426],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50.0,
                  {
                    var: "allocation"
                  },
                  100.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      "experience B! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                  }
                ],
                eventToken:
                  "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
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
    generatedAt: "2020-05-08T17:11:10.858Z",
    environment: "waters_test"
  },
  globalMbox: "target-global-mbox",
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.name",
    "experience.id",
    "offer.name",
    "offer.id",
    "option.id",
    "option.name"
  ],
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
            audienceIds: [5634157, 5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    content: "greg is correct"
                  }
                ],
                eventToken:
                  "39UdigzDfmb97ogXP1PN62qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5634157, 5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello greg"
                  }
                ],
                eventToken:
                  "39UdigzDfmb97ogXP1PN62qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5634157, 5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5634157, 5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5634562, 5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5634562, 5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello jason"
                  }
                ],
                eventToken:
                  "39UdigzDfmb97ogXP1PN65NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5634562, 5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    content: "jason is correct"
                  }
                ],
                eventToken:
                  "39UdigzDfmb97ogXP1PN65NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5634562, 5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "local-target-test",
                  {
                    var: "page.domain"
                  }
                ]
              },
              {
                "==": [
                  "/",
                  {
                    var: "page.path"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "local-target-test",
                  {
                    var: "page.domain"
                  }
                ]
              },
              {
                "==": [
                  "/",
                  {
                    var: "page.path"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello everyone"
                  }
                ],
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "local-target-test",
                  {
                    var: "page.domain"
                  }
                ]
              },
              {
                "==": [
                  "/",
                  {
                    var: "page.path"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
            audienceIds: [5652249],
            offerIds: []
          },
          condition: {
            and: [
              {
                "==": [
                  "local-target-test",
                  {
                    var: "page.domain"
                  }
                ]
              },
              {
                "==": [
                  "/",
                  {
                    var: "page.path"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "all visitors"
                  }
                ],
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)"
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
    generatedAt: "2020-05-08T17:37:00.793Z",
    environment: "waters_test"
  },
  globalMbox: "target-global-mbox",
  responseTokens: [
    "activity.id",
    "activity.name",
    "experience.name",
    "experience.id",
    "offer.name",
    "offer.id",
    "option.id",
    "option.name"
  ],
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
            audienceIds: [5639015, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    content: "greg is correct"
                  }
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    content: "jason is correct"
                  }
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0.0,
                  {
                    var: "allocation"
                  },
                  50.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      0.0,
                      {
                        var: "allocation"
                      },
                      50.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50.0,
                  {
                    var: "allocation"
                  },
                  100.0
                ]
              },
              {
                and: [
                  {
                    "==": [
                      "local-target-test",
                      {
                        var: "page.domain"
                      }
                    ]
                  },
                  {
                    "==": [
                      "/",
                      {
                        var: "page.path"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "greg is correct"
                  }
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634157],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.greg"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "HTML > BODY > UL:nth-of-type(1)",
                    cssSelector: "HTML > BODY > UL:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887181614905265"> gregggggg</p>'
                  }
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "jason is correct"
                  }
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5639015, 5634562],
            offerIds: []
          },
          condition: {
            and: [
              {
                and: [
                  {
                    "<": [
                      50.0,
                      {
                        var: "allocation"
                      },
                      100.0
                    ]
                  },
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "==": [
                  "correct",
                  {
                    var: "mbox.jason"
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "HTML > BODY > UL:nth-of-type(1)",
                    cssSelector: "HTML > BODY > UL:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887181773115309"> jasonnnnnnnn</p>'
                  }
                ],
                eventToken:
                  "/SXLXTYTqMY5xlnwaQZrEZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
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
            audienceIds: [5614593],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0.0,
                  {
                    var: "allocation"
                  },
                  50.0
                ]
              },
              {
                or: [
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    in: [
                      "adbeld.surge.sh",
                      {
                        var: "page.url_lc"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "6Na6eWan1u0HrN32JDT54GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "/GMYvcjhUsR6WVqQElppUw==",
                selector: "#action_insert_15882853393943012"
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
            audienceIds: [5614593],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0.0,
                  {
                    var: "allocation"
                  },
                  50.0
                ]
              },
              {
                or: [
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    in: [
                      "adbeld.surge.sh",
                      {
                        var: "page.url_lc"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "6Na6eWan1u0HrN32JDT54GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "/GMYvcjhUsR6WVqQElppUw==",
                selector: "#action_insert_15882853393943012"
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
            audienceIds: [5614593],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0.0,
                  {
                    var: "allocation"
                  },
                  50.0
                ]
              },
              {
                or: [
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    in: [
                      "adbeld.surge.sh",
                      {
                        var: "page.url_lc"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "/GMYvcjhUsR6WVqQElppUw==",
                selector: "#action_insert_15882853393943012"
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
            audienceIds: [5614593],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50.0,
                  {
                    var: "allocation"
                  },
                  100.0
                ]
              },
              {
                or: [
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    in: [
                      "adbeld.surge.sh",
                      {
                        var: "page.url_lc"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "/GMYvcjhUsR6WVqQElppUw==",
                selector: "#action_insert_15882853393943012"
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
            audienceIds: [5614593],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50.0,
                  {
                    var: "allocation"
                  },
                  100.0
                ]
              },
              {
                or: [
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    in: [
                      "adbeld.surge.sh",
                      {
                        var: "page.url_lc"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "/GMYvcjhUsR6WVqQElppUw==",
                selector: "#action_insert_15882853393943012"
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
            audienceIds: [5614593],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50.0,
                  {
                    var: "allocation"
                  },
                  100.0
                ]
              },
              {
                or: [
                  {
                    and: [
                      {
                        "==": [
                          "local-target-test",
                          {
                            var: "page.domain"
                          }
                        ]
                      },
                      {
                        "==": [
                          "/",
                          {
                            var: "page.path"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    in: [
                      "adbeld.surge.sh",
                      {
                        var: "page.url_lc"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "actions",
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
                ],
                eventToken:
                  "6Na6eWan1u0HrN32JDT54JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE5D1i1VIvi6hLUaKBzNXfVcQ=="
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "/GMYvcjhUsR6WVqQElppUw==",
                selector: "#action_insert_15882853393943012"
              }
            ]
          }
        }
      ]
    },
    views: {}
  }
};

export const DECISIONING_PAYLOAD_ALL = {
  version: "1.0.0",
  globalMbox: "target-global-mbox",
  responseTokens: [],
  remoteMboxes: ["remote-only-mbox-a", "remote-only-mbox-b"],
  meta: { generatedAt: "2020-04-14T19:02:04.557Z", environment: 11507 },
  rules: {
    mboxes: {
      kitty: [
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "firefox"] }]
          },
          consequence: {
            options: [
              {
                content: "<div>kitty high with targeting: Firefox</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "/DhjxnVDh9heBZ0MrYFLF2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336973,
            experienceId: 0,
            activityType: "xt",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634862],
            audienceIds: [4873452]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "safari"] }]
          },
          consequence: {
            options: [
              {
                content: "<div>kitty high with targeting: Safari</div>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "/DhjxnVDh9heBZ0MrYFLF5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336973,
            experienceId: 1,
            activityType: "xt",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634861],
            audienceIds: [4957566]
          }
        },
        {
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            options: [{ content: "<div>kitty high A</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "ruhwp7VESR7F74TJL2DV5WqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336951,
            experienceId: 0,
            activityType: "ab",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634836],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            options: [{ content: "<div>kitty high B</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "ruhwp7VESR7F74TJL2DV5ZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336951,
            experienceId: 1,
            activityType: "ab",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634837],
            audienceIds: []
          }
        },
        {
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            options: [{ content: "<div>kitty low A</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Ww1ZcMj/ShY5tUV/rUzSjGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336950,
            experienceId: 0,
            activityType: "ab",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634834],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            options: [{ content: "<div>kitty low B</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Ww1ZcMj/ShY5tUV/rUzSjJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "kitty"
          },
          meta: {
            activityId: 336950,
            experienceId: 1,
            activityType: "ab",
            locationName: "kitty",
            locationType: "mbox",
            offerIds: [634835],
            audienceIds: []
          }
        }
      ],
      "target-global-mbox": [
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "chrome"] }]
          },
          consequence: {
            options: [{ content: "<div>Chrometastic</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337795,
            experienceId: 0,
            activityType: "xt",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635716],
            audienceIds: [2170460]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "firefox"] }]
          },
          consequence: {
            options: [{ content: "<div>Firetime</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337795,
            experienceId: 1,
            activityType: "xt",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635715],
            audienceIds: [4873452]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "safari"] }]
          },
          consequence: {
            options: [{ content: "<div>Safari Run</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulAreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337795,
            experienceId: 2,
            activityType: "xt",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635713],
            audienceIds: [4957566]
          }
        },
        {
          condition: true,
          consequence: {
            options: [{ content: "<div>Srsly, who dis?</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337795,
            experienceId: 3,
            activityType: "xt",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635714],
            audienceIds: []
          }
        },
        {
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 34] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              { content: "<div>foo=bar experience A</div>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "0L1rCkDps3F+UEAm1B9A4GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337797,
            experienceId: 0,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635719],
            audienceIds: [5272024]
          }
        },
        {
          condition: {
            and: [
              { "<": [34, { var: "allocation" }, 67] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              { content: "<div>foo=bar experience B</div>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "0L1rCkDps3F+UEAm1B9A4JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337797,
            experienceId: 1,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635718],
            audienceIds: [5272024]
          }
        },
        {
          condition: {
            and: [
              { "<": [67, { var: "allocation" }, 100] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              { content: "<div>foo=bar experience C</div>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "0L1rCkDps3F+UEAm1B9A4AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337797,
            experienceId: 2,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635717],
            audienceIds: [5272024]
          }
        },
        {
          condition: { "<": [0, { var: "allocation" }, 25] },
          consequence: {
            options: [{ content: "<div>whale</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337888,
            experienceId: 0,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635778],
            audienceIds: []
          }
        },
        {
          condition: { "<": [25, { var: "allocation" }, 50] },
          consequence: {
            options: [{ content: "<div>mouse</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337888,
            experienceId: 1,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635776],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 75] },
          consequence: {
            options: [{ content: "<div>lion</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AQreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337888,
            experienceId: 2,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635779],
            audienceIds: []
          }
        },
        {
          condition: { "<": [75, { var: "allocation" }, 100] },
          consequence: {
            options: [{ content: "<div>owl</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AZZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "target-global-mbox"
          },
          meta: {
            activityId: 337888,
            experienceId: 3,
            activityType: "ab",
            locationName: "target-global-mbox",
            locationType: "mbox",
            offerIds: [635777],
            audienceIds: []
          }
        }
      ],
      offer2: [
        {
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              { in: ["bar", { var: "page.url_lc" }] }
            ]
          },
          consequence: {
            options: [{ content: { baz: 1 }, type: "json" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "mWtD0yDAXMnesyQOa7/jS2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "offer2"
          },
          meta: {
            activityId: 333312,
            experienceId: 0,
            activityType: "ab",
            locationName: "offer2",
            locationType: "mbox",
            offerIds: [630815],
            audienceIds: [5356811]
          }
        },
        {
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              { in: ["bar", { var: "page.url_lc" }] }
            ]
          },
          consequence: {
            options: [{ content: { baz: 2 }, type: "json" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "mWtD0yDAXMnesyQOa7/jS5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "offer2"
          },
          meta: {
            activityId: 333312,
            experienceId: 1,
            activityType: "ab",
            locationName: "offer2",
            locationType: "mbox",
            offerIds: [630814],
            audienceIds: [5356811]
          }
        }
      ],
      "daterange-mbox": [
        {
          condition: {
            and: [
              {
                or: [
                  {
                    and: [
                      { or: [{ "==": [{ var: "current_day" }, "5"] }] },
                      { "<=": ["0000", { var: "current_time" }, "2359"] }
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            options: [
              { content: "<strong>it's friday</strong>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          },
          meta: {
            activityId: 334853,
            experienceId: 4,
            activityType: "xt",
            locationName: "daterange-mbox",
            locationType: "mbox",
            offerIds: [632493],
            audienceIds: [5372446]
          }
        },
        {
          condition: {
            and: [
              {
                or: [
                  {
                    "<=": [
                      1582822800000,
                      { var: "current_timestamp" },
                      1583028000000
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            options: [
              {
                content: "<strong>date range 1 (feb 27-29)</strong>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7unJlneZxJu5VqGhXCosHhWCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          },
          meta: {
            activityId: 334853,
            experienceId: 5,
            activityType: "xt",
            locationName: "daterange-mbox",
            locationType: "mbox",
            offerIds: [632494],
            audienceIds: [5372445]
          }
        },
        {
          condition: {
            and: [
              {
                or: [
                  {
                    "<=": [
                      1583178000000,
                      { var: "current_timestamp" },
                      1583523600000
                    ]
                  }
                ]
              }
            ]
          },
          consequence: {
            options: [
              {
                content: "<strong>date range 2 (mar 2 - 6)</strong>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7pNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          },
          meta: {
            activityId: 334853,
            experienceId: 1,
            activityType: "xt",
            locationName: "daterange-mbox",
            locationType: "mbox",
            offerIds: [632451],
            audienceIds: [5372444]
          }
        },
        {
          condition: true,
          consequence: {
            options: [
              { content: "<strong>default result</strong>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "wQY/V1IOYec8T4fAT5ww7mqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "daterange-mbox"
          },
          meta: {
            activityId: 334853,
            experienceId: 0,
            activityType: "xt",
            locationName: "daterange-mbox",
            locationType: "mbox",
            offerIds: [632450],
            audienceIds: []
          }
        }
      ],
      "browser-mbox": [
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "firefox"] }]
          },
          consequence: {
            options: [{ content: "<h1>it's firefox</h1>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 1,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632439],
            audienceIds: [4873452]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "safari"] }]
          },
          consequence: {
            options: [{ content: "<h1>it's safari</h1>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGgreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 2,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632440],
            audienceIds: [4957566]
          }
        },
        {
          condition: {
            and: [{ "==": [{ var: "user.browserType" }, "chrome"] }]
          },
          consequence: {
            options: [{ content: "<h1>it's chrome</h1>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGpZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 3,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632438],
            audienceIds: [2170460]
          }
        },
        {
          condition: { and: [{ "==": [{ var: "user.browserType" }, "ie"] }] },
          consequence: {
            options: [
              { content: "<h1>it's internet explorer</h1>", type: "html" }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGhB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 4,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632446],
            audienceIds: [5372368]
          }
        },
        {
          condition: true,
          consequence: {
            options: [
              {
                content: "<h1>not firefox, safari or chrome</h1>",
                type: "html"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "B8C2FP2IuBgmeJcDfXHjGmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "browser-mbox"
          },
          meta: {
            activityId: 334845,
            experienceId: 0,
            activityType: "xt",
            locationName: "browser-mbox",
            locationType: "mbox",
            offerIds: [632437],
            audienceIds: []
          }
        }
      ],
      "redundant-mbox": [
        {
          condition: {
            and: [
              { "<": [0, { var: "allocation" }, 50] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              {
                content: { foo: "bar", isFooBar: true, experience: "A" },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Zhwxeqy1O2r9Ske1YDA9bGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "redundant-mbox"
          },
          meta: {
            activityId: 334717,
            experienceId: 0,
            activityType: "ab",
            locationName: "redundant-mbox",
            locationType: "mbox",
            offerIds: [632331],
            audienceIds: [5452799]
          }
        },
        {
          condition: {
            and: [
              { "<": [50, { var: "allocation" }, 100] },
              { "==": ["bar", { var: "mbox.foo" }] }
            ]
          },
          consequence: {
            options: [
              {
                content: { foo: "bar", isFooBar: true, experience: "B" },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "Zhwxeqy1O2r9Ske1YDA9bJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "redundant-mbox"
          },
          meta: {
            activityId: 334717,
            experienceId: 1,
            activityType: "ab",
            locationName: "redundant-mbox",
            locationType: "mbox",
            offerIds: [632330],
            audienceIds: [5452799]
          }
        }
      ],
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
            activityType: "ab",
            locationName: "superfluous-mbox",
            locationType: "mbox",
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
            activityType: "ab",
            locationName: "superfluous-mbox",
            locationType: "mbox",
            offerIds: [631991],
            audienceIds: []
          }
        }
      ],
      "jason-flags": [
        {
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            options: [
              {
                content: {
                  paymentExperience: "legacy",
                  showFeatureX: false,
                  paymentGatewayVersion: 2.3,
                  customerFeedbackValue: 10
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "8MDICvd7bsTPYn79fLBNQmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "jason-flags"
          },
          meta: {
            activityId: 335113,
            experienceId: 0,
            activityType: "ab",
            locationName: "jason-flags",
            locationType: "mbox",
            offerIds: [632759],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            options: [
              {
                content: {
                  paymentExperience: "alpha10",
                  showFeatureX: true,
                  paymentGatewayVersion: 3.1,
                  customerFeedbackValue: 99
                },
                type: "json"
              }
            ],
            metrics: [
              {
                type: "display",
                eventToken:
                  "8MDICvd7bsTPYn79fLBNQpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "jason-flags"
          },
          meta: {
            activityId: 335113,
            experienceId: 1,
            activityType: "ab",
            locationName: "jason-flags",
            locationType: "mbox",
            offerIds: [632760],
            audienceIds: []
          }
        }
      ],
      "expendable-mbox": [
        {
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            options: [{ content: "<div>hello</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "YPoPRnGmGGit+QxnpxYFjWqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "expendable-mbox"
          },
          meta: {
            activityId: 334640,
            experienceId: 0,
            activityType: "ab",
            locationName: "expendable-mbox",
            locationType: "mbox",
            offerIds: [632233],
            audienceIds: []
          }
        },
        {
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            options: [{ content: "<div>goodbye</div>", type: "html" }],
            metrics: [
              {
                type: "display",
                eventToken:
                  "YPoPRnGmGGit+QxnpxYFjZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ],
            name: "expendable-mbox"
          },
          meta: {
            activityId: 334640,
            experienceId: 1,
            activityType: "ab",
            locationName: "expendable-mbox",
            locationType: "mbox",
            offerIds: [632234],
            audienceIds: []
          }
        }
      ]
    },
    views: {}
  }
};
