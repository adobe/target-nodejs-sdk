import { targetDeliveryToAepEdgeRequest } from "./requestTransform";

describe("targetDeliveryToAepEdgeRequest", () => {
  // requestId?: string;
  // impressionId?: string;
  // id?: VisitorId;
  // environmentId?: number;
  // property?: Property;
  // trace?: Trace;
  // context: Context;
  // experienceCloud?: ExperienceCloud;
  // execute?: ExecuteRequest;
  // prefetch?: PrefetchRequest;
  // telemetry?: Telemetry;
  // notifications?: Array<Notification>;
  // qaMode?: QAMode;
  // preview?: Preview;
  it("does", () => {
    const interactRequest = targetDeliveryToAepEdgeRequest(
      "123",
      "abc",
      {
        requestId: "requestId123",
        id: {
          tntId: "tnt123",
          thirdPartyId: "thirdPartyId123",
          marketingCloudVisitorId: "ecid123",
          customerIds: [
            {
              id: "custId123",
              integrationCode: "LAW",
              authenticatedState: "authenticated"
            },
            {
              id: "custIdAbc",
              integrationCode: "CHE",
              authenticatedState: "logged_out"
            }
          ]
        },
        context: {
          channel: "web",
          mobilePlatform: {
            deviceName: "iPhone 6",
            deviceType: "phone",
            platformType: "ios",
            version: "A1586"
          },
          application: {
            id: "abc",
            name: "Monkey Time",
            version: "99:5"
          },
          screen: {
            width: 1600,
            height: 1200,
            colorDepth: 32,
            orientation: "portrait"
          },
          window: {
            width: 1024,
            height: 768
          },
          browser: {
            host: "https://apple.com"
          },
          address: {
            url: "https://apple.com",
            referringUrl: "https://microsoft.com"
          },
          geo: {
            ipAddress: "127.0.0.1",
            latitude: 37.773972,
            longitude: -122.431297,
            city: "SANFRANCISCO",
            countryCode: "US",
            stateCode: "CA",
            zip: "94102"
          },
          timeOffsetInMinutes: -420,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0"
        }
      },
      "1",
      "edgeConfigId123"
    );

    expect(interactRequest).toMatchObject({
      requestId: "requestId123",
      configId: "edgeConfigId123",
      edgeRequest: {
        xdm: {
          identityMap: {
            ECID: [
              {
                id: "ecid123",
                authenticatedState: "ambiguous",
                primary: true
              }
            ],
            LAW: [
              {
                id: "custId123",
                authenticatedState: "authenticated",
                primary: false
              }
            ],
            CHE: [
              {
                id: "custIdAbc",
                authenticatedState: "loggedOut",
                primary: false
              }
            ]
          },
          environment: {
            type: "browser",
            browserDetails: {
              viewportWidth: 1024,
              viewportHeight: 768,
              userAgent:
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0"
            }
          },
          device: {
            screenWidth: 1600,
            screenHeight: 1200,
            colorDepth: 32,
            screenOrientation: "portrait",
            model: "iPhone 6",
            type: "mobile",
            modelNumber: "A1586"
          },
          application: {
            id: "abc",
            name: "Monkey Time",
            version: "99:5"
          },
          web: {
            webPageDetails: {
              url: "https://apple.com"
            },
            webReferrer: {
              url: "https://microsoft.com"
            }
          },
          placeContext: {
            geo: {
              latitude: 37.773972,
              longitude: -122.431297
            },
            localTimezoneOffset: -7
          }
        }
      }
    });
  });

  it("handles blankness", () => {
    const result = targetDeliveryToAepEdgeRequest(
      "123",
      "abc",
      {},
      "1",
      "edgeConfigId123"
    );
    expect(result).toMatchObject({
      configId: "edgeConfigId123"
    });
  });

  it("fff", () => {
    function dof(r) {
      const { context = {} } = r;

      const newContext = {
        ...context,
        channel: "jar",
        fruits: [...(context.fruits || [])],
        veggies: [...(context.veggies || [])]
      };

      newContext.fruits.push("pear");
      newContext.veggies.push("carrot");

      return {
        context: newContext
      };
    }

    const request = {
      context: {
        channel: "web",
        fruits: ["apple", "banana"]
      }
    };

    expect(dof(request)).toMatchObject({
      context: {
        channel: "jar",
        fruits: ["apple", "banana", "pear"],
        veggies: ["carrot"]
      }
    });

    expect(request).toMatchObject({
      context: {
        channel: "web",
        fruits: ["apple", "banana"]
      }
    });
  });
});
