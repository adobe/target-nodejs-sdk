require("jest-fetch-mock").enableMocks();
const TargetClient = require("../src/index.server").default;

describe("apis", () => {
  const TARGET_RESPONSE_PAYLOAD = {
    status: 200,
    requestId: "5cb761bcf38f46c2a85de373c944032a",
    id: {
      tntId: "ccbf86a7c6bd4cacbe09fa7fc4d06685.35_0"
    },
    client: "targetdataplatform",
    edgeHost: "mboxedge35.tt.omtrdc.net",
    execute: {
      mboxes: [
        {
          index: 0,
          name: "vegas",
          options: [
            {
              type: "json",
              content: {
                hotel: "Circus Circus"
              },
              responseTokens: {
                "experience.id": "2",
                "geo.connectionSpeed": "broadband",
                "activity.name": "vegas mbox",
                "profile.tntId": "ccbf86a7c6bd4cacbe09fa7fc4d06685",
                "activity.id": "543937",
                "experience.name": "Experience C",
                "option.name": "Offer4",
                "geo.domainName": "veracitynetworks.com",
                "option.id": "4",
                "profile.current_property": "no_property",
                "profile.isFirstSession": "true",
                "geo.country": "united states",
                "offer.name":
                  "/vegas_mbox/experiences/2/pages/0/zones/0/1617913012289",
                "profile.activeActivities": "543937",
                "activity.decisioningMethod": "server-side",
                "offer.id": "753663"
              }
            }
          ]
        }
      ]
    }
  };

  const AEP_RESPONSE_PAYLOAD = {
    requestId: "dac9bad6-a038-42c4-b0b0-0e6a9152a501",
    handle: [
      {
        eventIndex: 0,
        type: "personalization:decisions",
        payload: [
          {
            id: "AT:eyJhY3Rpdml0eUlkIjoiNTQzOTM3IiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
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
                  "profile.tntId": "b68417fa4c2c43afa065946ad59bf445",
                  "activity.id": "543937",
                  "experience.name": "Experience B",
                  "option.name": "Offer3",
                  "geo.domainName": "veracitynetworks.com",
                  "option.id": "3",
                  "profile.current_property": "no_property",
                  "profile.isFirstSession": "true",
                  "geo.country": "united states",
                  "offer.name":
                    "/vegas_mbox/experiences/1/pages/0/zones/0/1617913012293",
                  "profile.marketingCloudVisitorId":
                    "67987995057387431273176504937695227658",
                  "profile.activeActivities": "543937",
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
              "CiY2Nzk4Nzk5NTA1NzM4NzQzMTI3MzE3NjUwNDkzNzY5NTIyNzY1OFIQCNSgoeW6LxABGAEqA09SMvAB1KCh5bov",
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
  };

  const sessionId = "dummy_session_id";
  const clientCode = "targetdataplatform";
  const organizationId = "6FC947105BB267B70A495EE9@AdobeOrg";
  const edgeConfigId = "34610d20-3c46-4636-b22f-eb87110dfb25:dev";
  const requestId = "244f07a4895a47ef94a003bfb578d773";

  const request = {
    requestId,
    execute: {
      id: {
        marketingCloudVisitorId: "52777108510978688250501620102073477990"
      },
      mboxes: [
        {
          name: "vegas",
          index: 0
        }
      ]
    }
  };

  beforeAll(() => {
    fetch.resetMocks();
  });

  it("should make a call to AEP edge", async () => {
    fetch.mockResponse(JSON.stringify(AEP_RESPONSE_PAYLOAD));

    const client = TargetClient.create({
      client: clientCode,
      organizationId,
      edgeConfigId
    });

    const result = await client.getOffers({ request, sessionId });
    expect(fetch.mock.calls.length).toEqual(1);
    const [requestedUrl, postPayload] = fetch.mock.calls[0];
    expect(requestedUrl).toEqual(
      `https://edge.adobedc.net/ee/v1/interact?configId=${encodeURIComponent(
        edgeConfigId
      )}&requestId=${requestId}`
    );

    const requestBody = JSON.parse(postPayload.body);

    expect(requestBody).toMatchObject({
      xdm: expect.any(Object),
      events: [
        {
          query: {
            personalization: {
              schemas: expect.any(Array),
              decisionScopes: ["vegas"]
            }
          },
          xdm: expect.any(Object)
        }
      ],
      meta: expect.any(Object)
    });
    expect(result).toBeDefined();
  });

  it("should make a call to Delivery edge", async () => {
    fetch.mockResponse(JSON.stringify(TARGET_RESPONSE_PAYLOAD));

    const client = TargetClient.create({
      client: clientCode,
      organizationId
    });

    const result = await client.getOffers({ request, sessionId });

    expect(fetch.mock.calls.length).toEqual(1);
    const [requestedUrl, postPayload] = fetch.mock.calls[0];
    expect(requestedUrl).toEqual(
      `https://targetdataplatform.tt.omtrdc.net/rest/v1/delivery?imsOrgId=${encodeURIComponent(
        organizationId
      )}&sessionId=${sessionId}`
    );

    const requestBody = JSON.parse(postPayload.body);

    expect(requestBody).toMatchObject({
      requestId: "244f07a4895a47ef94a003bfb578d773",
      context: expect.any(Object),
      experienceCloud: expect.any(Object),
      execute: { mboxes: [{ index: 0, name: "vegas" }] }
    });
    expect(result).toBeDefined();
  });
});
