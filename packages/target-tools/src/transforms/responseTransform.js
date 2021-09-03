/* eslint-disable import/prefer-default-export,no-unused-vars */
/**
 *
 * @param { import("@adobe/aep-edge-tools/aep-edge-api-client/models/InteractResponse").InteractResponse } aepEdgeResponse
 * @returns { import("../../delivery-api-client/models/DeliveryResponse").DeliveryResponse }
 */
export function aepEdgeToTargetDeliveryResponse(aepEdgeResponse) {
  // TODO: remove the dummy object below and implement this method!
  return {
    status: 200,
    requestId: "1d3d404e377048ba8fc451825924f918",
    id: {
      tntId: "54135304efd84415a41163b36ae2a1bf.35_0"
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
                hotel: "Bellagio"
              },
              responseTokens: {
                "experience.id": "0",
                "geo.connectionSpeed": "broadband",
                "activity.name": "vegas mbox",
                "profile.tntId": "54135304efd84415a41163b36ae2a1bf",
                "activity.id": "543937",
                "experience.name": "Experience A",
                "option.name": "Offer2",
                "geo.domainName": "veracitynetworks.com",
                "option.id": "2",
                "profile.current_property": "no_property",
                "profile.isFirstSession": "true",
                "geo.country": "united states",
                "offer.name":
                  "/vegas_mbox/experiences/0/pages/0/zones/0/1617913012281",
                "profile.activeActivities": "543937",
                "activity.decisioningMethod": "server-side",
                "offer.id": "753662"
              }
            }
          ]
        }
      ]
    }
  };
}
