/* eslint-disable no-unused-vars */
import { AuthenticatedStateAEP } from "@adobe/aep-edge-tools";
import { aepEdgeToTargetDeliveryResponse } from "./responseTransform";

const clientCode = "targetdataplatform";
const organizationId = "6FC947105BB267B70A495EE9@AdobeOrg";
const edgeConfigId = "34610d20-3c46-4636-b22f-eb87110dfb25:dev";
const visitorCookie =
  "1585540135%7CMCMID%7C52777108510978688250501620102073477990%7CMCIDTS%7C18874%7CMCAAMLH-1631311239%7C9%7CMCAAMB-1631311239%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCOPTOUT-1630713639s%7CNONE%7CvVersion%7C4.4.0";

describe("aepEdgeToTargetDeliveryResponse", () => {
  it("does", () => {
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
      deliveryRequest: {
        id: {
          customerIds: [
            {
              id: "blah",
              integrationCode: "LAW",
              authenticatedState: AuthenticatedStateAEP.Ambiguous
            }
          ]
        }
      }
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
            authenticatedState: AuthenticatedStateAEP.Ambiguous
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
});
