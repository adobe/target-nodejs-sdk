/* eslint-disable */

// https://wiki.corp.adobe.com/display/elm/Local+Decisioning%3A+Test+Artifacts

export const DUMMY_ARTIFACT_PAYLOAD = {
  version: "1.0.0",
  globalMbox: "target-global-mbox",
  hasGeoTargeting: false,
  responseTokens: [],
  remoteMboxes: [],
  localMboxes: [],
  remoteViews: [],
  localViews: [],
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      offer2: [
        {
          ruleKey: "333312",
          activityId: 333312,
          meta: {
            "activity.id": 333312,
            "activity.name":
              "Form Based Activity - offer2 - Feb 19 2020, 10:34",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "offer2",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5356811],
            "offer.id": 630815,
            "offer.name":
              "/form_based_activity-offer2-feb1920201034/experiences/0/pages/0/zones/0/1582137291528",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 333312,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "offer2",
            "locationType": "mbox",
            "audienceIds": [5356811],
            "offerIds": [630815]
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
            "activity.id": 333312,
            "activity.name":
              "Form Based Activity - offer2 - Feb 19 2020, 10:34",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "offer2",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5356811],
            "offer.id": 630814,
            "offer.name":
              "/form_based_activity-offer2-feb1920201034/experiences/1/pages/0/zones/0/1582137291524",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 333312,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "offer2",
            "locationType": "mbox",
            "audienceIds": [5356811],
            "offerIds": [630814]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "browser-mbox": [
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4873452],
            "offer.id": 632439,
            "offer.name":
              "/browser-mbox/experiences/1/pages/0/zones/0/1582915910400",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [4873452],
            "offerIds": [632439]
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
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4957566],
            "offer.id": 632440,
            "offer.name":
              "/browser-mbox/experiences/2/pages/0/zones/0/1582915910403",
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 2,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [4957566],
            "offerIds": [632440]
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
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 3,
            "experience.name": "Experience D",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [2170460],
            "offer.id": 632438,
            "offer.name":
              "/browser-mbox/experiences/3/pages/0/zones/0/1582915910396",
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 3,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [2170460],
            "offerIds": [632438]
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
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 4,
            "experience.name": "Experience E",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5372368],
            "offer.id": 632446,
            "offer.name":
              "/browser-mbox/experiences/4/pages/0/zones/0/1582917563229",
            "option.id": 6,
            "option.name": "Offer6",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 4,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [5372368],
            "offerIds": [632446]
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
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 632437,
            "offer.name":
              "/browser-mbox/experiences/0/pages/0/zones/0/1582915910375",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [632437]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "superfluous-mbox": [
        {
          ruleKey: "334411",
          activityId: 334411,
          meta: {
            "activity.id": 334411,
            "activity.name": "superfluous ab json",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "superfluous-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 631992,
            "offer.name":
              "/superfluous_ab_json/experiences/0/pages/0/zones/0/1582738346730",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 334411,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "superfluous-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [631992]
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
            "activity.id": 334411,
            "activity.name": "superfluous ab json",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "superfluous-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 631991,
            "offer.name":
              "/superfluous_ab_json/experiences/1/pages/0/zones/0/1582738346722",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 334411,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "superfluous-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [631991]
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
            "activity.id": 334640,
            "activity.name": "simple ab expendable-mbox",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "expendable-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 632233,
            "offer.name":
              "/simple_ab_expendable-mbox/experiences/0/pages/0/zones/0/1582825446969",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 334640,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "expendable-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [632233]
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
            "activity.id": 334640,
            "activity.name": "simple ab expendable-mbox",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "expendable-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 632234,
            "offer.name":
              "/simple_ab_expendable-mbox/experiences/1/pages/0/zones/0/1582825446975",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 334640,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "expendable-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [632234]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "redundant-mbox": [
        {
          ruleKey: "334717",
          activityId: 334717,
          meta: {
            "activity.id": 334717,
            "activity.name": "redundant-mbox",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "redundant-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5452799],
            "offer.id": 632331,
            "offer.name":
              "/redundant-mbox/experiences/0/pages/0/zones/0/1582842639909",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 334717,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "redundant-mbox",
            "locationType": "mbox",
            "audienceIds": [5452799],
            "offerIds": [632331]
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
            "activity.id": 334717,
            "activity.name": "redundant-mbox",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "redundant-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5452799],
            "offer.id": 632330,
            "offer.name":
              "/redundant-mbox/experiences/1/pages/0/zones/0/1582842639906",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 334717,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "redundant-mbox",
            "locationType": "mbox",
            "audienceIds": [5452799],
            "offerIds": [632330]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      kitty: [
        {
          ruleKey: "336973",
          activityId: 336973,
          meta: {
            "activity.id": 336973,
            "activity.name": "kitty high with targeting",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "kitty",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4873452],
            "offer.id": 634862,
            "offer.name":
              "/kitty_high_with_targeting/experiences/0/pages/0/zones/0/1584124723844",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 336973,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "kitty",
            "locationType": "mbox",
            "audienceIds": [4873452],
            "offerIds": [634862]
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
            "activity.id": 336973,
            "activity.name": "kitty high with targeting",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "kitty",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4957566],
            "offer.id": 634861,
            "offer.name":
              "/kitty_high_with_targeting/experiences/1/pages/0/zones/0/1584124723839",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 336973,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "kitty",
            "locationType": "mbox",
            "audienceIds": [4957566],
            "offerIds": [634861]
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
            "activity.id": 336951,
            "activity.name": "kitty high",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "kitty",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 634836,
            "offer.name":
              "/kitty_high/experiences/0/pages/0/zones/0/1584119849432",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 336951,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "kitty",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [634836]
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
            "activity.id": 336951,
            "activity.name": "kitty high",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "kitty",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 634837,
            "offer.name":
              "/kitty_high/experiences/1/pages/0/zones/0/1584119849437",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 336951,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "kitty",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [634837]
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
            "activity.id": 336950,
            "activity.name": "kitty low",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "kitty",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 634834,
            "offer.name":
              "/kitty_low/experiences/0/pages/0/zones/0/1584119759067",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 336950,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "kitty",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [634834]
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
            "activity.id": 336950,
            "activity.name": "kitty low",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "kitty",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 634835,
            "offer.name":
              "/kitty_low/experiences/1/pages/0/zones/0/1584119759075",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 336950,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "kitty",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [634835]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "superfluous-mbox": [
        {
          ruleKey: "334411",
          activityId: 334411,
          meta: {
            "activity.id": 334411,
            "activity.name": "superfluous ab json",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "superfluous-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 631992,
            "offer.name":
              "/superfluous_ab_json/experiences/0/pages/0/zones/0/1582738346730",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 334411,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "superfluous-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [631992]
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
            "activity.id": 334411,
            "activity.name": "superfluous ab json",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "superfluous-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 631991,
            "offer.name":
              "/superfluous_ab_json/experiences/1/pages/0/zones/0/1582738346722",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 334411,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "superfluous-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [631991]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["remote-only-mbox-a", "sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "daterange-mbox": [
        {
          ruleKey: "334853",
          activityId: 334853,
          meta: {
            "activity.id": 334853,
            "activity.name": "daterange-mbox",
            "activity.type": "landing",
            "experience.id": 4,
            "experience.name": "Experience D",
            "location.name": "daterange-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5372446],
            "offer.id": 632493,
            "offer.name":
              "/daterange-mbox/experiences/4/pages/0/zones/0/1582928389678",
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 334853,
            "activityType": "landing",
            "experienceId": 4,
            "locationId": 0,
            "locationName": "daterange-mbox",
            "locationType": "mbox",
            "audienceIds": [5372446],
            "offerIds": [632493]
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
            "activity.id": 334853,
            "activity.name": "daterange-mbox",
            "activity.type": "landing",
            "experience.id": 5,
            "experience.name": "Experience E",
            "location.name": "daterange-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5372445],
            "offer.id": 632494,
            "offer.name":
              "/daterange-mbox/experiences/5/pages/0/zones/0/1582928389686",
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 334853,
            "activityType": "landing",
            "experienceId": 5,
            "locationId": 0,
            "locationName": "daterange-mbox",
            "locationType": "mbox",
            "audienceIds": [5372445],
            "offerIds": [632494]
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
            "activity.id": 334853,
            "activity.name": "daterange-mbox",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "daterange-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5372444],
            "offer.id": 632451,
            "offer.name":
              "/daterange-mbox/experiences/1/pages/0/zones/0/1582918990666",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 334853,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "daterange-mbox",
            "locationType": "mbox",
            "audienceIds": [5372444],
            "offerIds": [632451]
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
            "activity.id": 334853,
            "activity.name": "daterange-mbox",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "daterange-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 632450,
            "offer.name":
              "/daterange-mbox/experiences/0/pages/0/zones/0/1582918990663",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 334853,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "daterange-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [632450]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["target-global-mbox", "sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [2170460],
            "offer.id": 635716,
            "offer.name":
              "/global_mbox_browserhtml/experiences/0/pages/0/zones/0/1584640063509",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [2170460],
            "offerIds": [635716]
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
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience C",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4873452],
            "offer.id": 635715,
            "offer.name":
              "/global_mbox_browserhtml/experiences/1/pages/0/zones/0/1584640063505",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [4873452],
            "offerIds": [635715]
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
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 2,
            "experience.name": "Experience D",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4957566],
            "offer.id": 635713,
            "offer.name":
              "/global_mbox_browserhtml/experiences/2/pages/0/zones/0/1584640063487",
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 2,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [4957566],
            "offerIds": [635713]
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
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 3,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 635714,
            "offer.name":
              "/global_mbox_browserhtml/experiences/3/pages/0/zones/0/1584640063501",
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 3,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [635714]
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
            "activity.id": 337797,
            "activity.name": "ab tres experience global mbox",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5272024],
            "offer.id": 635719,
            "offer.name":
              "/ab_tres_experienceglobalmbox/experiences/0/pages/0/zones/0/1584640298871",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 337797,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [5272024],
            "offerIds": [635719]
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
            "activity.id": 337797,
            "activity.name": "ab tres experience global mbox",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5272024],
            "offer.id": 635718,
            "offer.name":
              "/ab_tres_experienceglobalmbox/experiences/1/pages/0/zones/0/1584640298867",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 337797,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [5272024],
            "offerIds": [635718]
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
            "activity.id": 337797,
            "activity.name": "ab tres experience global mbox",
            "activity.type": "ab",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5272024],
            "offer.id": 635717,
            "offer.name":
              "/ab_tres_experienceglobalmbox/experiences/2/pages/0/zones/0/1584640298862",
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 337797,
            "activityType": "ab",
            "experienceId": 2,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [5272024],
            "offerIds": [635717]
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
            "activity.id": 337888,
            "activity.name": "global ab html",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 635778,
            "offer.name":
              "/global_ab_html/experiences/0/pages/0/zones/0/1584661883900",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 337888,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [635778]
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
            "activity.id": 337888,
            "activity.name": "global ab html",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 635776,
            "offer.name":
              "/global_ab_html/experiences/1/pages/0/zones/0/1584661883883",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 337888,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [635776]
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
            "activity.id": 337888,
            "activity.name": "global ab html",
            "activity.type": "landing",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 635779,
            "offer.name":
              "/global_ab_html/experiences/2/pages/0/zones/0/1584661883905",
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 337888,
            "activityType": "landing",
            "experienceId": 2,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [635779]
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
            "activity.id": 337888,
            "activity.name": "global ab html",
            "activity.type": "landing",
            "experience.id": 3,
            "experience.name": "Experience D",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 635777,
            "offer.name":
              "/global_ab_html/experiences/3/pages/0/zones/0/1584661883895",
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 337888,
            "activityType": "landing",
            "experienceId": 3,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [635777]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["remote-only-mbox-a", "remote-only-mbox-b", "sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "jason-flags": [
        {
          ruleKey: "335113",
          activityId: 335113,
          meta: {
            "activity.id": 335113,
            "activity.name": "jason-flags",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "jason-flags",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 632759,
            "offer.name":
              "/jason-flags/experiences/0/pages/0/zones/0/1583188989447",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 335113,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "jason-flags",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [632759]
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
            "activity.id": 335113,
            "activity.name": "jason-flags",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "jason-flags",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 632760,
            "offer.name":
              "/jason-flags/experiences/1/pages/0/zones/0/1583188989545",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 335113,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "jason-flags",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [632760]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["browser-mbox", "sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [2170460],
            "offer.id": 635716,
            "offer.name":
              "/global_mbox_browserhtml/experiences/0/pages/0/zones/0/1584640063509",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [2170460],
            "offerIds": [635716]
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
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience C",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4873452],
            "offer.id": 635715,
            "offer.name":
              "/global_mbox_browserhtml/experiences/1/pages/0/zones/0/1584640063505",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [4873452],
            "offerIds": [635715]
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
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 2,
            "experience.name": "Experience D",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4957566],
            "offer.id": 635713,
            "offer.name":
              "/global_mbox_browserhtml/experiences/2/pages/0/zones/0/1584640063487",
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 2,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [4957566],
            "offerIds": [635713]
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
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 3,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 635714,
            "offer.name":
              "/global_mbox_browserhtml/experiences/3/pages/0/zones/0/1584640063501",
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 3,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [635714]
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
      "jason-flags": [
        {
          ruleKey: "335113",
          activityId: 335113,
          meta: {
            "activity.id": 335113,
            "activity.name": "jason-flags",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "jason-flags",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 632759,
            "offer.name":
              "/jason-flags/experiences/0/pages/0/zones/0/1583188989447",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 335113,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "jason-flags",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [632759]
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
            "activity.id": 335113,
            "activity.name": "jason-flags",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "jason-flags",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 632760,
            "offer.name":
              "/jason-flags/experiences/1/pages/0/zones/0/1583188989545",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 335113,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "jason-flags",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [632760]
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
            "activity.id": 334411,
            "activity.name": "superfluous ab json",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "superfluous-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 631992,
            "offer.name":
              "/superfluous_ab_json/experiences/0/pages/0/zones/0/1582738346730",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 334411,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "superfluous-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [631992]
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
            "activity.id": 334411,
            "activity.name": "superfluous ab json",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "superfluous-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 631991,
            "offer.name":
              "/superfluous_ab_json/experiences/1/pages/0/zones/0/1582738346722",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 334411,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "superfluous-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [631991]
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
      "browser-mbox": [
        {
          ruleKey: "334845",
          activityId: 334845,
          meta: {
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4873452],
            "offer.id": 632439,
            "offer.name":
              "/browser-mbox/experiences/1/pages/0/zones/0/1582915910400",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [4873452],
            "offerIds": [632439]
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
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4957566],
            "offer.id": 632440,
            "offer.name":
              "/browser-mbox/experiences/2/pages/0/zones/0/1582915910403",
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 2,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [4957566],
            "offerIds": [632440]
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
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 3,
            "experience.name": "Experience D",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [2170460],
            "offer.id": 632438,
            "offer.name":
              "/browser-mbox/experiences/3/pages/0/zones/0/1582915910396",
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 3,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [2170460],
            "offerIds": [632438]
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
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 4,
            "experience.name": "Experience E",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5372368],
            "offer.id": 632446,
            "offer.name":
              "/browser-mbox/experiences/4/pages/0/zones/0/1582917563229",
            "option.id": 6,
            "option.name": "Offer6",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 4,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [5372368],
            "offerIds": [632446]
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
            "activity.id": 334845,
            "activity.name": "browser-mbox",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "browser-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 632437,
            "offer.name":
              "/browser-mbox/experiences/0/pages/0/zones/0/1582915910375",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 334845,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "browser-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [632437]
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

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/vegetable_ab_global-mbox
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/fruit_ab_global-mbox
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/Experience-Targeting/global_mbox_browserhtml
export const DECISIONING_PAYLOAD_PROPERTIES = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "337795",
          activityId: 337795,
          meta: {
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [2170460],
            "offer.id": 635716,
            "offer.name":
              "/global_mbox_browserhtml/experiences/0/pages/0/zones/0/1584640063509",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [2170460],
            "offerIds": [635716]
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
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience C",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4873452],
            "offer.id": 635715,
            "offer.name":
              "/global_mbox_browserhtml/experiences/1/pages/0/zones/0/1584640063505",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [4873452],
            "offerIds": [635715]
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
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 2,
            "experience.name": "Experience D",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [4957566],
            "offer.id": 635713,
            "offer.name":
              "/global_mbox_browserhtml/experiences/2/pages/0/zones/0/1584640063487",
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 2,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [4957566],
            "offerIds": [635713]
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
            "activity.id": 337795,
            "activity.name": "global mbox browser html",
            "activity.type": "landing",
            "experience.id": 3,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 635714,
            "offer.name":
              "/global_mbox_browserhtml/experiences/3/pages/0/zones/0/1584640063501",
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 337795,
            "activityType": "landing",
            "experienceId": 3,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [635714]
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
            "activity.id": 350783,
            "activity.name": "vegetable ab global-mbox",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 652741,
            "offer.name":
              "/vegetable_ab_global-mbox/experiences/0/pages/0/zones/0/1591984699476",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 350783,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [652741]
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
            "activity.id": 350783,
            "activity.name": "vegetable ab global-mbox",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 652740,
            "offer.name":
              "/vegetable_ab_global-mbox/experiences/1/pages/0/zones/0/1591984699471",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 350783,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [652740]
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
            "activity.id": 350782,
            "activity.name": "fruit ab global-mbox",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 652738,
            "offer.name":
              "/fruit_ab_global-mbox/experiences/0/pages/0/zones/0/1591984571136",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 350782,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [652738]
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
            "activity.id": 350782,
            "activity.name": "fruit ab global-mbox",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 652739,
            "offer.name":
              "/fruit_ab_global-mbox/experiences/1/pages/0/zones/0/1591984571142",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 350782,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [652739]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      geo: [
        {
          ruleKey: "349133",
          activityId: 349133,
          meta: {
            "activity.id": 349133,
            "activity.name": "Greg Geo Test A/B Jun 02 2020, 14:34",
            "activity.type": "landing",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "geo",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5753100],
            "offer.id": 651951,
            "offer.name":
              "/greg_geo_test_a_bjun0220201434/experiences/0/pages/0/zones/0/1591737073425",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 349133,
            "activityType": "landing",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "geo",
            "locationType": "mbox",
            "audienceIds": [5753100],
            "offerIds": [651951]
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
            "activity.id": 349133,
            "activity.name": "Greg Geo Test A/B Jun 02 2020, 14:34",
            "activity.type": "landing",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "geo",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [5753100],
            "offer.id": 650379,
            "offer.name":
              "/greg_geo_test_a_bjun0220201434/experiences/1/pages/0/zones/0/1591133667939",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 349133,
            "activityType": "landing",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "geo",
            "locationType": "mbox",
            "audienceIds": [5753100],
            "offerIds": [650379]
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {},
    views: {
      contact: [
        {
          ruleKey: "345798-0",
          activityId: 345798,
          meta: {
            "activity.id": 345798,
            "activity.name": "xt spa add text to contact page",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "contact",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5634562, 5653736],
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 345798,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "contact",
            "locationType": "view",
            "audienceIds": [5634562, 5653736],
            "offerIds": []
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
            "activity.id": 345798,
            "activity.name": "xt spa add text to contact page",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "contact",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5634562, 5653736],
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 345798,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 1,
            "locationName": "contact",
            "locationType": "view",
            "audienceIds": [5634562, 5653736],
            "offerIds": []
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
                      "priority": "important"
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
            "activity.id": 345798,
            "activity.name": "xt spa add text to contact page",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "contact",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5634157, 5653736],
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 345798,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "contact",
            "locationType": "view",
            "audienceIds": [5634157, 5653736],
            "offerIds": []
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
            "activity.id": 345798,
            "activity.name": "xt spa add text to contact page",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "contact",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5634157, 5653736],
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 345798,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 1,
            "locationName": "contact",
            "locationType": "view",
            "audienceIds": [5634157, 5653736],
            "offerIds": []
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
                      "priority": "important"
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
            "activity.id": 345798,
            "activity.name": "xt spa add text to contact page",
            "activity.type": "ab",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "contact",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5653736],
            "option.id": 6,
            "option.name": "Offer6",
            "activityId": 345798,
            "activityType": "ab",
            "experienceId": 2,
            "locationId": 0,
            "locationName": "contact",
            "locationType": "view",
            "audienceIds": [5653736],
            "offerIds": []
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
            "activity.id": 345798,
            "activity.name": "xt spa add text to contact page",
            "activity.type": "ab",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "contact",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5653736],
            "option.id": 7,
            "option.name": "Offer7",
            "activityId": 345798,
            "activityType": "ab",
            "experienceId": 2,
            "locationId": 1,
            "locationName": "contact",
            "locationType": "view",
            "audienceIds": [5653736],
            "offerIds": []
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
                      "priority": "important"
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "home",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5653493, 5634562],
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493, 5634562],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "home",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5653493, 5634562],
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 1,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493, 5634562],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "home",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [5653493, 5634157],
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 2,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493, 5634157],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "home",
            "location.type": "view",
            "location.id": 3,
            "audience.ids": [5653493, 5634157],
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 3,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493, 5634157],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "home",
            "location.type": "view",
            "location.id": 4,
            "audience.ids": [5653493],
            "option.id": 6,
            "option.name": "Offer6",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 4,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "home",
            "location.type": "view",
            "location.id": 5,
            "audience.ids": [5653493],
            "option.id": 7,
            "option.name": "Offer7",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 5,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "home",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5653493, 5634562],
            "option.id": 8,
            "option.name": "Offer8",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493, 5634562],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "home",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5653493, 5634562],
            "option.id": 9,
            "option.name": "Offer9",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 1,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493, 5634562],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "home",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [5653493, 5634157],
            "option.id": 10,
            "option.name": "Offer10",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 2,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493, 5634157],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "home",
            "location.type": "view",
            "location.id": 3,
            "audience.ids": [5653493, 5634157],
            "option.id": 11,
            "option.name": "Offer11",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 3,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493, 5634157],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "home",
            "location.type": "view",
            "location.id": 4,
            "audience.ids": [5653493],
            "option.id": 12,
            "option.name": "Offer12",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 4,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493],
            "offerIds": []
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
            "activity.id": 345782,
            "activity.name": "ab spa view change add text with audiences",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "home",
            "location.type": "view",
            "location.id": 5,
            "audience.ids": [5653493],
            "option.id": 13,
            "option.name": "Offer13",
            "activityId": 345782,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 5,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653493],
            "offerIds": []
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
            "activity.id": 345779,
            "activity.name": "ab spa view change multiple text no audiences",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "home",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5653426],
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 345779,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653426],
            "offerIds": []
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
            "activity.id": 345779,
            "activity.name": "ab spa view change multiple text no audiences",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "home",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5653426],
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 345779,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 1,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653426],
            "offerIds": []
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
            "activity.id": 345779,
            "activity.name": "ab spa view change multiple text no audiences",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "home",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5653426],
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 345779,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653426],
            "offerIds": []
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
            "activity.id": 345779,
            "activity.name": "ab spa view change multiple text no audiences",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "home",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5653426],
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 345779,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 1,
            "locationName": "home",
            "locationType": "view",
            "audienceIds": [5653426],
            "offerIds": []
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "345717-0",
          activityId: 345717,
          meta: {
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5634157, 5652249],
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5634157, 5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5634157, 5652249],
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 1,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5634157, 5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [5634157, 5652249],
            "option.id": 0,
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 2,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5634157, 5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 3,
            "audience.ids": [5634157, 5652249],
            "option.id": 0,
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 3,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5634157, 5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5634562, 5652249],
            "option.id": 0,
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5634562, 5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5634562, 5652249],
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 1,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5634562, 5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [5634562, 5652249],
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 2,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5634562, 5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 3,
            "audience.ids": [5634562, 5652249],
            "option.id": 0,
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 3,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5634562, 5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5652249],
            "option.id": 0,
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 2,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5652249],
            "option.id": 7,
            "option.name": "Offer7",
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 2,
            "locationId": 1,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [5652249],
            "option.id": 0,
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 2,
            "locationId": 2,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5652249],
            "offerIds": []
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
            "activity.id": 345717,
            "activity.name": "xt vec non-spa correct params local-target-test",
            "activity.type": "ab",
            "experience.id": 2,
            "experience.name": "Experience C",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 3,
            "audience.ids": [5652249],
            "option.id": 6,
            "option.name": "Offer6",
            "activityId": 345717,
            "activityType": "ab",
            "experienceId": 2,
            "locationId": 3,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5652249],
            "offerIds": []
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
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "345139-0",
          activityId: 345139,
          meta: {
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5639015, 5634157],
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634157],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5639015, 5634157],
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 1,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634157],
            "offerIds": []
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
                      "priority": "important"
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [5639015, 5634562],
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 2,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634562],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 3,
            "audience.ids": [5639015, 5634562],
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 3,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634562],
            "offerIds": []
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
                      "priority": "important"
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 4,
            "audience.ids": [5639015],
            "option.id": 6,
            "option.name": "Offer6",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 4,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 5,
            "audience.ids": [5639015, 5634157],
            "option.id": 0,
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 5,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634157],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 6,
            "audience.ids": [5639015, 5634157],
            "option.id": 0,
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 6,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634157],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 7,
            "audience.ids": [5639015, 5634562],
            "option.id": 0,
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 7,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634562],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 8,
            "audience.ids": [5639015, 5634562],
            "option.id": 0,
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 8,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634562],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5639015, 5634157],
            "option.id": 0,
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634157],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5639015, 5634157],
            "option.id": 0,
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 1,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634157],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [5639015, 5634562],
            "option.id": 0,
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 2,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634562],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 3,
            "audience.ids": [5639015, 5634562],
            "option.id": 0,
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 3,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634562],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 4,
            "audience.ids": [5639015],
            "option.id": 11,
            "option.name": "Offer11",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 4,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 5,
            "audience.ids": [5639015, 5634157],
            "option.id": 7,
            "option.name": "Offer7",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 5,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634157],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 6,
            "audience.ids": [5639015, 5634157],
            "option.id": 8,
            "option.name": "Offer8",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 6,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634157],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 7,
            "audience.ids": [5639015, 5634562],
            "option.id": 9,
            "option.name": "Offer9",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 7,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634562],
            "offerIds": []
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
            "activity.id": 345139,
            "activity.name": "ab non-spa local-target-test",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 8,
            "audience.ids": [5639015, 5634562],
            "option.id": 10,
            "option.name": "Offer10",
            "activityId": 345139,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 8,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5639015, 5634562],
            "offerIds": []
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
            "activity.id": 344512,
            "activity.name": "ab add text local-target-test 344512",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5614593],
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 344512,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5614593],
            "offerIds": []
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
            "activity.id": 344512,
            "activity.name": "ab add text local-target-test 344512",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5614593],
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 344512,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 1,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5614593],
            "offerIds": []
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
                      "priority": "important"
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
            "activity.id": 344512,
            "activity.name": "ab add text local-target-test 344512",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [5614593],
            "option.id": 0,
            "activityId": 344512,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 2,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5614593],
            "offerIds": []
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
            "activity.id": 344512,
            "activity.name": "ab add text local-target-test 344512",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [5614593],
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 344512,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5614593],
            "offerIds": []
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
            "activity.id": 344512,
            "activity.name": "ab add text local-target-test 344512",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [5614593],
            "option.id": 0,
            "activityId": 344512,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 1,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5614593],
            "offerIds": []
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
            "activity.id": 344512,
            "activity.name": "ab add text local-target-test 344512",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [5614593],
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 344512,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 2,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [5614593],
            "offerIds": []
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
                      "priority": "important"
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

// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/campaign_macros
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/macros_pageload
// https://experience.adobe.com/#/@adobesummit2018/target/activities/activitydetails/A-B/campaign_macros_view
export const DECISIONING_PAYLOAD_CAMPAIGN_MACROS = {
  version: "1.0.0",
  meta: {
    clientCode: "adobesummit2018",
    environment: "production",
    generatedAt: "2020-09-03T16:15:34.603Z"
  },
  globalMbox: "target-global-mbox",
  geoTargetingEnabled: true,
  responseTokens: [
    "experience.id",
    "activity.name",
    "geo.city",
    "activity.id",
    "geo.state",
    "option.name",
    "experience.name",
    "experience.trafficAllocationId",
    "option.id",
    "geo.country",
    "offer.name",
    "experience.trafficAllocationType",
    "offer.id"
  ],
  remoteMboxes: ["sam-mbox-2"],
  remoteViews: ["contact"],
  localMboxes: [
    "multinot",
    "demo-marketing-offer2",
    "demo-marketing-offer1",
    "alloy-test-scope-1",
    "sam-mbox-2",
    "specialk",
    "target-global-mbox",
    "kitty",
    "geo",
    "onboarding-mbox-1",
    "redundant-mbox",
    "composite2",
    "jason-flags",
    "superfluous-mbox",
    "expendable-mbox",
    "dwalling-myFlags",
    "offer2",
    "macros",
    "demo-geo-offer1",
    "fullhtml",
    "perf1",
    "daterange-mbox",
    "browser-mbox",
    "demo-engineering-flags",
    "sam-mbox",
    "local123456"
  ],
  localViews: ["contact", "about", "home"],
  rules: {
    mboxes: {
      "target-global-mbox": [
        {
          ruleKey: "362225-0",
          activityId: 362225,
          meta: {
            "activity.id": 362225,
            "activity.name": "macros pageLoad",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [6050517],
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 362225,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [6050517],
            "offerIds": []
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
                  "9y/BeTC6FllfKjSSLwOOfGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    content: "${activity.id}"
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "362225-1",
          activityId: 362225,
          meta: {
            "activity.id": 362225,
            "activity.name": "macros pageLoad",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [6050517],
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 362225,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 1,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [6050517],
            "offerIds": []
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
                  "9y/BeTC6FllfKjSSLwOOfGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    content: "${activity.name}"
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "362225-2",
          activityId: 362225,
          meta: {
            "activity.id": 362225,
            "activity.name": "macros pageLoad",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [6050517],
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 362225,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 2,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [6050517],
            "offerIds": []
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
                  "9y/BeTC6FllfKjSSLwOOfGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "${mbox.name}"
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "362225-3",
          activityId: 362225,
          meta: {
            "activity.id": 362225,
            "activity.name": "macros pageLoad",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 3,
            "audience.ids": [6050517],
            "option.id": 5,
            "option.name": "Offer5",
            "activityId": 362225,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 3,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [6050517],
            "offerIds": []
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
                  "9y/BeTC6FllfKjSSLwOOfGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello ${mbox.user}"
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "362225-0",
          activityId: 362225,
          meta: {
            "activity.id": 362225,
            "activity.name": "macros pageLoad",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience A0",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [6050517],
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 362225,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [6050517],
            "offerIds": []
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
                  "9y/BeTC6FllfKjSSLwOOfJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    content: "${activity.id}"
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "362225-1",
          activityId: 362225,
          meta: {
            "activity.id": 362225,
            "activity.name": "macros pageLoad",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience A0",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 1,
            "audience.ids": [6050517],
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 362225,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 1,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [6050517],
            "offerIds": []
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
                  "9y/BeTC6FllfKjSSLwOOfJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    content: "${activity.name}"
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "362225-2",
          activityId: 362225,
          meta: {
            "activity.id": 362225,
            "activity.name": "macros pageLoad",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience A0",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 2,
            "audience.ids": [6050517],
            "option.id": 4,
            "option.name": "Offer4",
            "activityId": 362225,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 2,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [6050517],
            "offerIds": []
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
                  "9y/BeTC6FllfKjSSLwOOfJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "${mbox.name}"
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "362225-3",
          activityId: 362225,
          meta: {
            "activity.id": 362225,
            "activity.name": "macros pageLoad",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience A0",
            "location.name": "target-global-mbox",
            "location.type": "view",
            "location.id": 3,
            "audience.ids": [6050517],
            "option.id": 6,
            "option.name": "Offer6",
            "activityId": 362225,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 3,
            "locationName": "target-global-mbox",
            "locationType": "view",
            "audienceIds": [6050517],
            "offerIds": []
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
                  "9y/BeTC6FllfKjSSLwOOfJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "What Up ${mbox.user}"
                  }
                ]
              }
            ],
            metrics: []
          }
        }
      ],
      "macros": [
        {
          ruleKey: "362147",
          activityId: 362147,
          meta: {
            "activity.id": 362147,
            "activity.name": "campaign macros",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "macros",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 667871,
            "offer.name":
              "/campaign_macros/experiences/0/pages/0/zones/0/1599065324791",
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 362147,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "macros",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [667871]
          },
          condition: { "<": [0, { var: "allocation" }, 50] },
          consequence: {
            name: "macros",
            options: [
              {
                type: "html",
                eventToken:
                  "efH5bqgzESJWpSYmTxCCCGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content:
                  "<ul>\n  <li>${offer.id}</li>\n  <li>${offer.name}</li>\n  <li>${campaign.id}</li>\n  <li>${campaign.name}</li>\n  <li>${campaign.recipe.id}</li>\n  <li>${campaign.recipe.name}</li>\n  <li>${activity.id}</li>\n  <li>${activity.name}</li>\n  <li>${activity.experience.id}</li>\n  <li>${activity.experience.name}</li>\n  <li>${mbox.name}</li>\n  <li>${mbox.user}</li>\n  <li>${mbox.pgname}</li>\n  <li>${mbox.browserWidth}</li>\n</ul>"
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "362147",
          activityId: 362147,
          meta: {
            "activity.id": 362147,
            "activity.name": "campaign macros",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "macros",
            "location.type": "mbox",
            "location.id": 0,
            "audience.ids": [],
            "offer.id": 667870,
            "offer.name":
              "/campaign_macros/experiences/1/pages/0/zones/0/1599065324776",
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 362147,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "macros",
            "locationType": "mbox",
            "audienceIds": [],
            "offerIds": [667870]
          },
          condition: { "<": [50, { var: "allocation" }, 100] },
          consequence: {
            name: "macros",
            options: [
              {
                type: "html",
                eventToken:
                  "efH5bqgzESJWpSYmTxCCCJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content:
                  "<ol>\n  <li>${offer.id}</li>\n  <li>${offer.name}</li>\n  <li>${campaign.id}</li>\n  <li>${campaign.name}</li>\n  <li>${campaign.recipe.id}</li>\n  <li>${campaign.recipe.name}</li>\n  <li>${activity.id}</li>\n  <li>${activity.name}</li>\n  <li>${activity.experience.id}</li>\n  <li>${activity.experience.name}</li>\n  <li>${mbox.name}</li>\n  <li>${mbox.user}</li>\n  <li>${mbox.pgname}</li>\n  <li>${mbox.browserWidth}</li>\n</ol>"
              }
            ],
            metrics: []
          }
        }
      ]
    },
    views: {
      contact: [
        {
          ruleKey: "362237-0",
          activityId: 362237,
          meta: {
            "activity.id": 362237,
            "activity.name": "campaign macros view",
            "activity.type": "ab",
            "experience.id": 0,
            "experience.name": "Experience A",
            "location.name": "contact",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [6050872],
            "option.id": 2,
            "option.name": "Offer2",
            "activityId": 362237,
            "activityType": "ab",
            "experienceId": 0,
            "locationId": 0,
            "locationName": "contact",
            "locationType": "view",
            "audienceIds": [6050872],
            "offerIds": []
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
            name: "contact",
            options: [
              {
                type: "actions",
                eventToken:
                  "tQFHWnWUwSTiTftbAGXrA2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<div id="action_insert_1599086396006761">${campaign.name}</div>'
                  }
                ]
              }
            ],
            metrics: []
          }
        },
        {
          ruleKey: "362237-0",
          activityId: 362237,
          meta: {
            "activity.id": 362237,
            "activity.name": "campaign macros view",
            "activity.type": "ab",
            "experience.id": 1,
            "experience.name": "Experience B",
            "location.name": "contact",
            "location.type": "view",
            "location.id": 0,
            "audience.ids": [6050872],
            "option.id": 3,
            "option.name": "Offer3",
            "activityId": 362237,
            "activityType": "ab",
            "experienceId": 1,
            "locationId": 0,
            "locationName": "contact",
            "locationType": "view",
            "audienceIds": [6050872],
            "offerIds": []
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
            name: "contact",
            options: [
              {
                type: "actions",
                eventToken:
                  "tQFHWnWUwSTiTftbAGXrA5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "insertBefore",
                    selector: "#spa-content > P:nth-of-type(1)",
                    cssSelector: "#spa-content > P:nth-of-type(1)",
                    content:
                      '<div id="action_insert_1599086448339872">${activity.name}</div>'
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
