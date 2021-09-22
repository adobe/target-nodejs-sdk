/* eslint-disable no-unused-vars */
import { aepEdgeToTargetDeliveryResponse } from "./responseTransform";
import { AuthenticatedState } from "../constants";

const clientCode = "targetdataplatform";
const organizationId = "6FC947105BB267B70A495EE9@AdobeOrg";
const edgeConfigId = "34610d20-3c46-4636-b22f-eb87110dfb25:dev";
const visitorCookie =
  "1585540135%7CMCMID%7C52777108510978688250501620102073477990%7CMCIDTS%7C18874%7CMCAAMLH-1631311239%7C9%7CMCAAMB-1631311239%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCOPTOUT-1630713639s%7CNONE%7CvVersion%7C4.4.0";

const deliveryRequest = {
  id: {
    customerIds: [
      {
        id: "blah",
        integrationCode: "LAW",
        authenticatedState: AuthenticatedState.Unknown
      }
    ]
  }
};

describe("aepEdgeToTargetDeliveryResponse", () => {
  it("execute mbox", () => {
    const deliveryResponse = aepEdgeToTargetDeliveryResponse({
      status: 200,
      client: clientCode,
      imsOrgId: organizationId,
      interactResponse: {
        requestId: "af8a8bcf-6092-4b32-8192-0585b13a40ea",
        handle: [
          {
            eventIndex: 0,
            type: "personalization:decisions",
            payload: [
              {
                id:
                  "AT:eyJhY3Rpdml0eUlkIjoiNTQzOTM3IiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
                scope: "vegas",
                scopeDetails: {
                  decisionProvider: "TGT",
                  activity: {
                    id: "543937"
                  },
                  experience: {
                    id: "0"
                  },
                  strategies: [
                    {
                      algorithmID: "0",
                      trafficType: "0"
                    }
                  ]
                },
                items: [
                  {
                    id: "753664",
                    schema:
                      "https://ns.adobe.com/personalization/json-content-item",
                    meta: {
                      "experience.id": "1",
                      "geo.connectionSpeed": "broadband",
                      "activity.name": "vegas mbox",
                      "profile.tntId": "b8321a3daf074df7ae2c7d62ac9aeb27",
                      "activity.id": "543937",
                      "experience.name": "Experience B",
                      "option.name": "Offer3",
                      "geo.domainName": "veracitynetworks.com",
                      "option.id": "3",
                      "profile.current_property": "no_property",
                      "profile.isFirstSession": "false",
                      "geo.country": "united states",
                      "offer.name":
                        "/vegas_mbox/experiences/1/pages/0/zones/0/1617913012293",
                      "profile.marketingCloudVisitorId":
                        "52777108510978688250501620102073477990",
                      "profile.activeActivities": "543549,543937",
                      "activity.decisioningMethod": "server-side",
                      "offer.id": "753664"
                    },
                    data: {
                      id: "753664",
                      format: "application/json",
                      content: {
                        hotel: "Wynn"
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            type: "consent:preferences",
            payload: [
              {
                collect: {
                  val: "y"
                }
              }
            ]
          },
          {
            type: "state:store",
            payload: [
              {
                key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_identity",
                value:
                  "CiY1Mjc3NzEwODUxMDk3ODY4ODI1MDUwMTYyMDEwMjA3MzQ3Nzk5MFIOCNir1e26LxgBKgNPUjLwAdir1e26Lw==",
                maxAge: 34128000
              },
              {
                key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_consent",
                value: "general=in",
                maxAge: 15552000
              },
              {
                key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_consent_check",
                value: "1",
                maxAge: 7200
              }
            ]
          }
        ]
      },
      deliveryRequest
    });
    expect(deliveryResponse).toMatchObject({
      status: 200,
      requestId: "af8a8bcf-6092-4b32-8192-0585b13a40ea",
      id: {
        // tntId: expect.any(String),
        marketingCloudVisitorId: "52777108510978688250501620102073477990",
        customerIds: [
          {
            id: "blah",
            integrationCode: "LAW",
            authenticatedState: AuthenticatedState.Unknown
          }
        ]
      },
      client: clientCode,
      // edgeHost: "mboxedge35.tt.omtrdc.net",
      execute: {
        mboxes: [
          {
            index: 0,
            name: "vegas",
            options: [
              {
                type: "json",
                content: {
                  hotel: "Wynn"
                },
                responseTokens: {
                  "experience.id": "1",
                  "geo.connectionSpeed": "broadband",
                  "activity.name": "vegas mbox",
                  "profile.tntId": "b8321a3daf074df7ae2c7d62ac9aeb27",
                  "activity.id": "543937",
                  "experience.name": "Experience B",
                  "option.name": "Offer3",
                  "geo.domainName": "veracitynetworks.com",
                  "option.id": "3",
                  "profile.current_property": "no_property",
                  "profile.isFirstSession": "false",
                  "geo.country": "united states",
                  "offer.name":
                    "/vegas_mbox/experiences/1/pages/0/zones/0/1617913012293",
                  "profile.marketingCloudVisitorId":
                    "52777108510978688250501620102073477990",
                  "profile.activeActivities": "543549,543937",
                  "activity.decisioningMethod": "server-side",
                  "offer.id": "753664"
                }
              }
            ]
          }
        ]
      }
    });
  });

  it("execute pageLoad", () => {
    const deliveryResponse = aepEdgeToTargetDeliveryResponse({
      status: 200,
      client: clientCode,
      imsOrgId: organizationId,
      interactResponse: {
        requestId: "bb803672-396a-41d6-8502-ea83503f508e",
        handle: [
          {
            eventIndex: 0,
            type: "personalization:decisions",
            payload: [
              {
                id:
                  "AT:eyJhY3Rpdml0eUlkIjoiNTQzNTQ5IiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
                scope: "__view__",
                scopeDetails: {
                  decisionProvider: "TGT",
                  activity: {
                    id: "543549"
                  },
                  experience: {
                    id: "0"
                  },
                  strategies: [
                    {
                      algorithmID: "0",
                      trafficType: "0"
                    }
                  ]
                },
                items: [
                  {
                    id: "0",
                    schema: "https://ns.adobe.com/personalization/dom-action",
                    meta: {
                      "experience.id": "0",
                      "geo.connectionSpeed": "broadband",
                      "activity.name": "local-target-test (image swap)",
                      "activity.id": "543549",
                      "experience.name": "Experience A",
                      "option.name": "Offer2",
                      "geo.domainName": "veracitynetworks.com",
                      "option.id": "2",
                      "profile.current_property": "no_property",
                      "profile.isFirstSession": "false",
                      "geo.country": "united states",
                      "offer.name": "Default Content",
                      "profile.marketingCloudVisitorId":
                        "52777108510978688250501620102073477990",
                      "profile.activeActivities": "543549,551631,543937",
                      "activity.decisioningMethod": "server-side",
                      "offer.id": "0"
                    },
                    data: {
                      type: "setImageSource",
                      format: "application/vnd.adobe.target.dom-action",
                      content: "img/demo-marketing-offer1-exp-A.png",
                      selector:
                        "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                      prehidingSelector:
                        "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)"
                    }
                  }
                ]
              },
              {
                id:
                  "AT:eyJhY3Rpdml0eUlkIjoiNTQzNTQ5IiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
                scope: "__view__",
                scopeDetails: {
                  decisionProvider: "TGT",
                  activity: {
                    id: "543549"
                  }
                },
                items: [
                  {
                    id: "543549",
                    schema: "https://ns.adobe.com/personalization/dom-action",
                    data: {
                      type: "click",
                      format: "application/vnd.adobe.target.dom-action",
                      selector:
                        "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
                    }
                  }
                ]
              }
            ]
          },
          {
            type: "consent:preferences",
            payload: [
              {
                collect: {
                  val: "y"
                }
              }
            ]
          },
          {
            type: "state:store",
            payload: [
              {
                key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_identity",
                value:
                  "CiY1Mjc3NzEwODUxMDk3ODY4ODI1MDUwMTYyMDEwMjA3MzQ3Nzk5MFIOCP3L1LK8LxgBKgNPUjLwAf3L1LK8Lw==",
                maxAge: 34128000
              },
              {
                key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_consent",
                value: "general=in",
                maxAge: 15552000
              },
              {
                key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_consent_check",
                value: "1",
                maxAge: 7200
              }
            ]
          }
        ]
      },
      deliveryRequest
    });

    expect(deliveryResponse).toMatchObject({
      execute: {
        pageLoad: {
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
                  content: "img/demo-marketing-offer1-exp-A.png"
                }
              ],
              responseTokens: {
                "experience.id": "0",
                "geo.connectionSpeed": "broadband",
                "activity.name": "local-target-test (image swap)",
                "activity.id": "543549",
                "experience.name": "Experience A",
                "option.name": "Offer2",
                "geo.domainName": "veracitynetworks.com",
                "option.id": "2",
                "profile.current_property": "no_property",
                "profile.isFirstSession": "false",
                "geo.country": "united states",
                "offer.name": "Default Content",
                "profile.marketingCloudVisitorId":
                  "52777108510978688250501620102073477990",
                "profile.activeActivities": "543549,551631,543937",
                "activity.decisioningMethod": "server-side",
                "offer.id": "0"
              }
            }
          ],
          metrics: [
            {
              type: "click",
              selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
              // TODO: implement --> eventToken: "cfU4L0xsni7AOf3AYyLHLg=="
            }
          ]
        }
      }
    });
  });

  it("prefetch views", () => {
    const deliveryResponse = aepEdgeToTargetDeliveryResponse({
      status: 200,
      client: clientCode,
      imsOrgId: organizationId,
      interactResponse: {
        requestId: "0452ff64-4827-4111-87aa-c6a0653fff51",
        handle: [
          {
            eventIndex: 0,
            type: "personalization:decisions",
            payload: [
              {
                id:
                  "AT:eyJhY3Rpdml0eUlkIjoiNTQzNTQ5IiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
                scope: "__view__",
                scopeDetails: {
                  decisionProvider: "TGT",
                  activity: {
                    id: "543549"
                  }
                },
                items: [
                  {
                    id: "543549",
                    schema: "https://ns.adobe.com/personalization/dom-action",
                    data: {
                      type: "click",
                      format: "application/vnd.adobe.target.dom-action",
                      selector:
                        "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)"
                    }
                  }
                ]
              },
              {
                id:
                  "AT:eyJhY3Rpdml0eUlkIjoiNTUxNjcyIiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
                scope: "home",
                scopeDetails: {
                  decisionProvider: "TGT",
                  activity: {
                    id: "551672"
                  },
                  experience: {
                    id: "0"
                  },
                  strategies: [
                    {
                      step: "entry",
                      algorithmID: "0",
                      trafficType: "0"
                    },
                    {
                      step: "display",
                      algorithmID: "0",
                      trafficType: "0"
                    }
                  ]
                },
                items: [
                  {
                    id: "0",
                    schema: "https://ns.adobe.com/personalization/dom-action",
                    meta: {
                      "experience.id": "1",
                      "geo.connectionSpeed": "broadband",
                      "activity.name": "blaarg",
                      "profile.tntId": "9033e74dd1ae4b428e8f874c24163405",
                      "activity.id": "551672",
                      "experience.name": "Experience B",
                      "option.name": "Offer7",
                      "geo.domainName": "veracitynetworks.com",
                      "option.id": "7",
                      "profile.current_property": "no_property",
                      "profile.isFirstSession": "false",
                      "geo.country": "united states",
                      "offer.name": "Default Content",
                      "profile.marketingCloudVisitorId":
                        "52777108510978688250501620102073477990",
                      "profile.activeActivities":
                        "551672,551660,543549,551631,543937,551654",
                      "activity.decisioningMethod": "server-side",
                      "offer.id": "0"
                    },
                    data: {
                      type: "setHtml",
                      format: "application/vnd.adobe.target.dom-action",
                      content: "Experience B",
                      selector: "#spa > H1:nth-of-type(1)",
                      prehidingSelector: "#spa > H1:nth-of-type(1)"
                    }
                  }
                ]
              },
              {
                id:
                  "AT:eyJhY3Rpdml0eUlkIjoiNTQzNTQ5IiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
                scope: "__view__",
                scopeDetails: {
                  decisionProvider: "TGT",
                  activity: {
                    id: "543549"
                  },
                  experience: {
                    id: "0"
                  },
                  strategies: [
                    {
                      algorithmID: "0",
                      trafficType: "0"
                    }
                  ]
                },
                items: [
                  {
                    id: "0",
                    schema: "https://ns.adobe.com/personalization/dom-action",
                    meta: {
                      "experience.id": "0",
                      "geo.connectionSpeed": "broadband",
                      "activity.name": "local-target-test (image swap)",
                      "profile.tntId": "9033e74dd1ae4b428e8f874c24163405",
                      "activity.id": "543549",
                      "experience.name": "Experience A",
                      "option.name": "Offer2",
                      "geo.domainName": "veracitynetworks.com",
                      "option.id": "2",
                      "profile.current_property": "no_property",
                      "profile.isFirstSession": "false",
                      "geo.country": "united states",
                      "offer.name": "Default Content",
                      "profile.marketingCloudVisitorId":
                        "52777108510978688250501620102073477990",
                      "profile.activeActivities":
                        "551672,551660,543549,551631,543937,551654",
                      "activity.decisioningMethod": "server-side",
                      "offer.id": "0"
                    },
                    data: {
                      type: "setImageSource",
                      format: "application/vnd.adobe.target.dom-action",
                      content: "img/demo-marketing-offer1-exp-A.png",
                      selector:
                        "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                      prehidingSelector:
                        "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)"
                    }
                  }
                ]
              },
              {
                id:
                  "AT:eyJhY3Rpdml0eUlkIjoiNTUxNjcyIiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
                scope: "__view__",
                scopeDetails: {
                  decisionProvider: "TGT",
                  activity: {
                    id: "551672"
                  },
                  experience: {
                    id: "0"
                  },
                  strategies: [
                    {
                      algorithmID: "0",
                      trafficType: "0"
                    }
                  ]
                },
                items: [
                  {
                    id: "0",
                    schema: "https://ns.adobe.com/personalization/dom-action",
                    meta: {
                      "experience.id": "1",
                      "geo.connectionSpeed": "broadband",
                      "activity.name": "blaarg",
                      "profile.tntId": "9033e74dd1ae4b428e8f874c24163405",
                      "activity.id": "551672",
                      "experience.name": "Experience B",
                      "option.name": "Offer6",
                      "geo.domainName": "veracitynetworks.com",
                      "option.id": "6",
                      "profile.current_property": "no_property",
                      "profile.isFirstSession": "false",
                      "geo.country": "united states",
                      "offer.name": "Default Content",
                      "profile.marketingCloudVisitorId":
                        "52777108510978688250501620102073477990",
                      "profile.activeActivities":
                        "551672,551660,543549,551631,543937,551654",
                      "activity.decisioningMethod": "server-side",
                      "offer.id": "0"
                    },
                    data: {
                      type: "setHtml",
                      format: "application/vnd.adobe.target.dom-action",
                      content: "Hello B",
                      selector:
                        "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                      prehidingSelector:
                        "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)"
                    }
                  },
                  {
                    id: "0",
                    schema: "https://ns.adobe.com/personalization/dom-action",
                    meta: {
                      "experience.id": "1",
                      "geo.connectionSpeed": "broadband",
                      "activity.name": "blaarg",
                      "profile.tntId": "9033e74dd1ae4b428e8f874c24163405",
                      "activity.id": "551672",
                      "experience.name": "Experience B",
                      "option.name": "Offer8",
                      "geo.domainName": "veracitynetworks.com",
                      "option.id": "8",
                      "profile.current_property": "no_property",
                      "profile.isFirstSession": "false",
                      "geo.country": "united states",
                      "offer.name": "Default Content",
                      "profile.marketingCloudVisitorId":
                        "52777108510978688250501620102073477990",
                      "profile.activeActivities":
                        "551672,551660,543549,551631,543937,551654",
                      "activity.decisioningMethod": "server-side",
                      "offer.id": "0"
                    },
                    data: {
                      type: "insertAfter",
                      format: "application/vnd.adobe.target.dom-action",
                      content:
                        '<div id="action_insert_16311374148087705">789</div>',
                      selector: "#result",
                      prehidingSelector: "#result"
                    }
                  },
                  {
                    id: "0",
                    schema: "https://ns.adobe.com/personalization/dom-action",
                    meta: {
                      "experience.id": "1",
                      "geo.connectionSpeed": "broadband",
                      "activity.name": "blaarg",
                      "profile.tntId": "9033e74dd1ae4b428e8f874c24163405",
                      "activity.id": "551672",
                      "experience.name": "Experience B",
                      "option.name": "Offer9",
                      "geo.domainName": "veracitynetworks.com",
                      "option.id": "9",
                      "profile.current_property": "no_property",
                      "profile.isFirstSession": "false",
                      "geo.country": "united states",
                      "offer.name": "Default Content",
                      "profile.marketingCloudVisitorId":
                        "52777108510978688250501620102073477990",
                      "profile.activeActivities":
                        "551672,551660,543549,551631,543937,551654",
                      "activity.decisioningMethod": "server-side",
                      "offer.id": "0"
                    },
                    data: {
                      type: "setStyle",
                      format: "application/vnd.adobe.target.dom-action",
                      content: {
                        "background-color": "rgba(191,0,191,1)",
                        "priority": "important"
                      },
                      selector: "#action_insert_16311374148087705",
                      prehidingSelector: "#action_insert_16311374148087705"
                    }
                  }
                ]
              }
            ]
          },
          {
            type: "consent:preferences",
            payload: [
              {
                collect: {
                  val: "y"
                }
              }
            ]
          },
          {
            type: "identity:result",
            payload: [
              {
                id: "52777108510978688250501620102073477990",
                namespace: {
                  code: "ECID"
                }
              }
            ]
          },
          {
            type: "state:store",
            payload: [
              {
                key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_identity",
                value:
                  "CiY1Mjc3NzEwODUxMDk3ODY4ODI1MDUwMTYyMDEwMjA3MzQ3Nzk5MFIOCLe9ouO8LxgBKgNPUjLwAbe9ouO8Lw==",
                maxAge: 34128000
              },
              {
                key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_consent",
                value: "general=in",
                maxAge: 15552000
              },
              {
                key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_consent_check",
                value: "1",
                maxAge: 7200
              }
            ]
          }
        ]
      },
      deliveryRequest
    });

    expect(deliveryResponse).toMatchObject({
      execute: {
        pageLoad: {
          metrics: [
            {
              // TODO: eventToken: "cfU4L0xsni7AOf3AYyLHLg==",
              selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
              type: "click"
            }
          ],
          options: [
            {
              content: [
                {
                  content: "Hello B",
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  selector:
                    "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                  type: "setHtml"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  content:
                    '<div id="action_insert_16311374148087705">789</div>',
                  cssSelector: "#result",
                  selector: "#result",
                  type: "insertAfter"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  content: {
                    "background-color": "rgba(191,0,191,1)",
                    "priority": "important"
                  },
                  cssSelector: "#action_insert_16311374148087705",
                  selector: "#action_insert_16311374148087705",
                  type: "setStyle"
                }
              ],
              type: "actions"
            },
            {
              content: [
                {
                  content: "img/demo-marketing-offer1-exp-A.png",
                  cssSelector:
                    "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                  selector:
                    "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                  type: "setImageSource"
                }
              ],
              type: "actions"
            }
          ]
        }
      },
      prefetch: {
        views: [
          {
            key: "home",
            name: "home",
            options: [
              {
                content: [
                  {
                    content: "Experience B",
                    cssSelector: "#spa > H1:nth-of-type(1)",
                    selector: "#spa > H1:nth-of-type(1)",
                    type: "setHtml"
                  }
                ],
                eventToken:
                  "bTi5IHPB8f/uzjgsMKmn62qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                type: "actions"
              }
            ]
            // TODO:  state:
            //   "XCaUwE34xavlUlyQO5oY2gnnbkXypYkiblAloQktBv3wafS3BmEtnlFz9B2aZHkbN7PVuyrzfo/Pkk+paVt/YmoH3IzSnyd2/c40QM9H0zVv0HQo0gKfvkksPZbFuW1liH9piDQcmfdvYHEfxWURPy3dLG7gCtbEnbj4wn+oz4vVff3kJpTrr4g98MxbLQp+IGTMJF2NSQqzVGxPjhZeuAbcuNXCmK3qDVjQIbvukE1KuraxqM07b3YUVsRSINArtuAyimp6MPndQiYi3iDKCX1dKD+hYTXrGKHVcW8Ha/Bndff7sjiY81Dvdxndq8s0a20nQMCKmujg96vopESsxA=="
          }
        ]
      }
    });
  });
});
