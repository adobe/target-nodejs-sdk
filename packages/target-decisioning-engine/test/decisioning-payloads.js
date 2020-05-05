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
            type: "ab",
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
            type: "ab",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "xt",
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
            type: "xt",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_vec_spa_changehomeaddtitleandbullets
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/ab_vec_spa_changeparagraphbackground
export const DECISIONING_PAYLOAD_VIEWS = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    generatedAt: "2020-04-30T23:35:09.015Z",
    environment: "production"
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
  remoteMboxes: [],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          meta: {
            activityId: 344512,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
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
                  "yYWdmhDasVXGPWlpX1TRZDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              },
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
                  "yYWdmhDasVXGPWlpX1TRZDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
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
                  "yYWdmhDasVXGPWlpX1TRZAincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
              },
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
                  "yYWdmhDasVXGPWlpX1TRZAincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
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
            activityId: 343718,
            activityType: "ab",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            audienceIds: [5600153],
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
                  34.0
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
                    type: "setImageSource",
                    selector:
                      "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                    content:
                      "http://files.jasonwaters.dev.s3.us-west-1.amazonaws.com/demo-marketing-offer1-exp-A.png"
                  }
                ],
                eventToken:
                  "JAHX6fQG8zpxwbkBd933WzSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "L0+AILo8bZTAkg9wSkGRcQ==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 343718,
            activityType: "ab",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            audienceIds: [5600153],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  34.0,
                  {
                    var: "allocation"
                  },
                  67.0
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
                    type: "setImageSource",
                    selector:
                      "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                    content:
                      "http://files.jasonwaters.dev.s3.us-west-1.amazonaws.com/demo-marketing-offer1-exp-B.png"
                  }
                ],
                eventToken:
                  "JAHX6fQG8zpxwbkBd933WwincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "L0+AILo8bZTAkg9wSkGRcQ==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 343718,
            activityType: "ab",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "view",
            audienceIds: [5600153],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  67.0,
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
                  "JAHX6fQG8zpxwbkBd933W30gWGoMtBqXksS4P3HyOWjf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "L0+AILo8bZTAkg9wSkGRcQ==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 344854,
            activityType: "landing",
            experienceId: 0,
            locationName: "target-global-mbox",
            locationType: "view",
            audienceIds: [5632413, 5632437, 5632546, 5632450],
            offerIds: []
          },
          condition: {
            "==": [
              "chrome",
              {
                var: "mbox.browser"
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
                    content: "Greetings Chrome!"
                  }
                ],
                eventToken:
                  "neZRmUp4w2JJPxnOS+UTvjSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setStyle",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: {
                      "background-color": "rgba(255,255,170,1)",
                      priority: "important"
                    }
                  }
                ],
                eventToken:
                  "neZRmUp4w2JJPxnOS+UTvjSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "QWWpEMH8FTeKXvGWDQG7JQ==",
                selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 344854,
            activityType: "landing",
            experienceId: 1,
            locationName: "target-global-mbox",
            locationType: "view",
            audienceIds: [5632413, 5632437, 5632546, 5632450],
            offerIds: []
          },
          condition: {
            "==": [
              "safari",
              {
                var: "mbox.browser"
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
                    content: "Oh hi, Safari!"
                  }
                ],
                eventToken:
                  "neZRmUp4w2JJPxnOS+UTvgincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setStyle",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: {
                      "background-color": "rgba(170,255,255,1)",
                      priority: "important"
                    }
                  }
                ],
                eventToken:
                  "neZRmUp4w2JJPxnOS+UTvgincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "QWWpEMH8FTeKXvGWDQG7JQ==",
                selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 344854,
            activityType: "landing",
            experienceId: 2,
            locationName: "target-global-mbox",
            locationType: "view",
            audienceIds: [5632413, 5632437, 5632546, 5632450],
            offerIds: []
          },
          condition: {
            "==": [
              "firefox",
              {
                var: "mbox.browser"
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
                    content: "Hey Firefox!"
                  }
                ],
                eventToken:
                  "neZRmUp4w2JJPxnOS+UTvn0gWGoMtBqXksS4P3HyOWjf5r+rP39VCIaiiZlXOAYq"
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setStyle",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: {
                      "background-color": "rgba(255,170,212,1)",
                      priority: "important"
                    }
                  }
                ],
                eventToken:
                  "neZRmUp4w2JJPxnOS+UTvn0gWGoMtBqXksS4P3HyOWjf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "QWWpEMH8FTeKXvGWDQG7JQ==",
                selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 344854,
            activityType: "landing",
            experienceId: 3,
            locationName: "target-global-mbox",
            locationType: "view",
            audienceIds: [5632413, 5632437, 5632546, 5632450],
            offerIds: []
          },
          condition: true,
          consequence: {
            name: "target-global-mbox",
            options: [
              {
                type: "default",
                eventToken:
                  "neZRmUp4w2JJPxnOS+UTvtRFWStd/HIAxvWXk7GGEI7f5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "QWWpEMH8FTeKXvGWDQG7JQ==",
                selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)"
              }
            ]
          }
        }
      ]
    },
    views: {
      home: [
        {
          meta: {
            activityId: 344627,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            audienceIds: [5617250],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0,
                  {
                    var: "allocation"
                  },
                  50
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
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa > H1:nth-of-type(1)",
                    cssSelector: "#spa > H1:nth-of-type(1)",
                    content: "Company Website"
                  }
                ],
                eventToken:
                  "kUaEC8amAVyoGv9fclUocTSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              },
              {
                type: "actions",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      "<div id=\"action_insert_1588356504219968\"><h4>We're awesome because…</h4>\n<ol>\n<li>we do cool stuff</li>\n<li>we like you</li>\n<li>we're affordable</li>\n</ol></div>"
                  }
                ],
                eventToken:
                  "kUaEC8amAVyoGv9fclUocTSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "l1MU85ewOVIpA//AMIXNVA==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 344627,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            audienceIds: [5617250],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50,
                  {
                    var: "allocation"
                  },
                  100
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
            name: "home",
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector: "#spa > H1:nth-of-type(1)",
                    cssSelector: "#spa > H1:nth-of-type(1)",
                    content: "Widgets Are Us"
                  }
                ],
                eventToken:
                  "kUaEC8amAVyoGv9fclUocQincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
              },
              {
                type: "actions",
                content: [
                  {
                    type: "insertAfter",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<div id="action_insert_15883565735821007"><h4>You might like us because…</h4>\n<ol>\n<li>our stuff is cool</li>\n<li>you are important to us</li>\n<li>you can afford to buy from us</li>\n</ol></div>'
                  }
                ],
                eventToken:
                  "kUaEC8amAVyoGv9fclUocQincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "l1MU85ewOVIpA//AMIXNVA==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 344626,
            activityType: "ab",
            experienceId: 0,
            locationName: "home",
            locationType: "view",
            audienceIds: [5617118],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0,
                  {
                    var: "allocation"
                  },
                  50
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
            name: "home",
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
                  "Jc+a2hGbxIZZ6KZOuJ59jDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: []
          }
        },
        {
          meta: {
            activityId: 344626,
            activityType: "ab",
            experienceId: 1,
            locationName: "home",
            locationType: "view",
            audienceIds: [5617118],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50,
                  {
                    var: "allocation"
                  },
                  100
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
            name: "home",
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
                  "Jc+a2hGbxIZZ6KZOuJ59jAincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: []
          }
        }
      ],
      contact: [
        {
          meta: {
            activityId: 344682,
            activityType: "ab",
            experienceId: 0,
            locationName: "contact",
            locationType: "view",
            audienceIds: [5621204],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  0,
                  {
                    var: "allocation"
                  },
                  50
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
                      '<p id="action_insert_15883725029394712">Please email us any time at: contact@ourcompany.com</p>'
                  }
                ],
                eventToken:
                  "MCqgP0tYVVh5Es6mHZJosDSAQdPpz2XBromX4n+pX9jf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "355TUgmhMpxnMLw2HgiPBA==",
                selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)"
              }
            ]
          }
        },
        {
          meta: {
            activityId: 344682,
            activityType: "ab",
            experienceId: 1,
            locationName: "contact",
            locationType: "view",
            audienceIds: [5621204],
            offerIds: []
          },
          condition: {
            and: [
              {
                "<": [
                  50,
                  {
                    var: "allocation"
                  },
                  100
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
                      '<p id="action_insert_15883724759054688">Please give us a call any time at: 800-532-2002</p>'
                  }
                ],
                eventToken:
                  "MCqgP0tYVVh5Es6mHZJosAincmumygxIUftu5lUZGQnf5r+rP39VCIaiiZlXOAYq"
              }
            ],
            metrics: [
              {
                type: "click",
                eventToken: "355TUgmhMpxnMLw2HgiPBA==",
                selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)"
              }
            ]
          }
        }
      ]
    }
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
            type: "xt",
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
            type: "xt",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "xt",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
            type: "ab",
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
