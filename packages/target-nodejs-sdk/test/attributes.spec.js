require("jest-fetch-mock").enableMocks();

const TargetClient = require("../src/index.server");

const attributesProvider = require("../src/attributesProvider");
const { ATTRIBUTE_NOT_EXIST } = require("../src/messages");

const targetResponse = {
  visitorState: {
    "65453EA95A70434F0A495D34@AdobeOrg": {
      sdid: {
        supplementalDataIDCurrent: "37D04BA8ED0E2962-71B165AC17259331",
        supplementalDataIDCurrentConsumed: {
          "payload:target-global-mbox": true
        },
        supplementalDataIDLastConsumed: {}
      }
    }
  },
  request: {
    requestId: "2e401dcc43ea437b8cb6d178d49303e2",
    id: {
      tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
      marketingCloudVisitorId: "07327024324407615852294135870030620007"
    },
    context: {
      channel: "web",
      address: {
        url: "http://adobe.com"
      },
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
      beacon: false
    },
    experienceCloud: {
      analytics: {
        supplementalDataId: "37D04BA8ED0E2962-71B165AC17259331",
        logging: "server_side"
      }
    },
    prefetch: {
      mboxes: [
        {
          index: 2,
          name: "feature-flag-a"
        }
      ]
    }
  },
  targetCookie: {
    name: "mbox",
    value:
      "session#dummy_session#1583190919|PC#338e3c1e51f7416a8e1ccba4f81acea0.28_0#1646433859",
    maxAge: 63244801
  },
  targetLocationHintCookie: {
    name: "mboxEdgeCluster",
    value: "28",
    maxAge: 1860
  },
  response: {
    status: 200,
    requestId: "2e401dcc43ea437b8cb6d178d49303e2",
    id: {
      tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
      marketingCloudVisitorId: "07327024324407615852294135870030620007"
    },
    client: "adobesummit2018",
    edgeHost: "mboxedge28.tt.omtrdc.net",
    prefetch: {
      mboxes: [
        {
          index: 1,
          name: "feature-flag-a",
          options: [
            {
              type: "json",
              content: {
                paymentExperience: "legacy",
                showFeatureX: false,
                paymentGatewayVersion: 2.3,
                customerFeedbackValue: 10
              },
              eventToken:
                "8MDICvd7bsTPYn79fLBNQmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
            }
          ]
        }
      ]
    },
    execute: {
      mboxes: [
        {
          index: 1,
          name: "feature-flag-b",
          options: [
            {
              type: "json",
              content: {
                purchaseExperience: "beta2",
                showFeatureY: true,
                cartVersion: 1.3,
                customerSurveyValue: 102
              }
            }
          ]
        }
      ]
    }
  }
};

describe("attributes", () => {
  describe("attributesProvider", () => {
    it("gets value", () => {
      const featureA = attributesProvider(
        "feature-flag-a",
        targetResponse.response
      );

      expect(featureA.getValue("paymentExperience")).toEqual("legacy");
      expect(featureA.getValue("showFeatureX")).toEqual(false);
      expect(featureA.getValue("paymentGatewayVersion")).toEqual(2.3);
      expect(featureA.getValue("customerFeedbackValue")).toEqual(10);

      const featureB = attributesProvider(
        "feature-flag-b",
        targetResponse.response
      );

      expect(featureB.getValue("purchaseExperience")).toEqual("beta2");
      expect(featureB.getValue("showFeatureY")).toEqual(true);
      expect(featureB.getValue("cartVersion")).toEqual(1.3);
      expect(featureB.getValue("customerSurveyValue")).toEqual(102);
    });

    it("gets as object", () => {
      const featureA = attributesProvider(
        "feature-flag-a",
        targetResponse.response
      );

      expect(featureA.asObject()).toMatchObject({
        paymentExperience: "legacy",
        showFeatureX: false,
        paymentGatewayVersion: 2.3,
        customerFeedbackValue: 10
      });

      const featureB = attributesProvider(
        "feature-flag-b",
        targetResponse.response
      );

      expect(featureB.asObject()).toMatchObject({
        purchaseExperience: "beta2",
        showFeatureY: true,
        cartVersion: 1.3,
        customerSurveyValue: 102
      });
    });

    it("throws an error if an attribute does not exist", () => {
      const attributes = attributesProvider(
        "feature-flag-a",
        targetResponse.response
      );

      expect(attributes.getValue("myPropertyName")).toEqual(
        new Error(ATTRIBUTE_NOT_EXIST("myPropertyName", "feature-flag-a"))
      );
    });
  });

  describe("SDK.getAttributes()", () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    const DELIVERY_API_RESPONSE = {
      status: 200,
      requestId: "0c22fb957e8b4297b29ab3932bb179c3",
      client: "adobesummit2018",
      id: {
        tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
        marketingCloudVisitorId: "07327024324407615852294135870030620007"
      },
      edgeHost: "mboxedge28.tt.omtrdc.net",
      prefetch: {
        mboxes: [
          {
            index: 2,
            name: "feature-flag-a",
            options: [
              {
                content: {
                  paymentExperience: "legacy",
                  showFeatureX: false,
                  paymentGatewayVersion: 2.3,
                  customerFeedbackValue: 10
                },
                type: "json",
                eventToken:
                  "8MDICvd7bsTPYn79fLBNQmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              }
            ]
          }
        ]
      },
      execute: {
        mboxes: [
          {
            index: 1,
            name: "feature-flag-b",
            options: [
              {
                type: "json",
                content: {
                  purchaseExperience: "beta2",
                  showFeatureY: true,
                  cartVersion: 1.3,
                  customerSurveyValue: 102
                }
              }
            ]
          }
        ]
      }
    };

    it("gets attributes from API response", async () => {
      fetch.mockResponse(JSON.stringify(DELIVERY_API_RESPONSE));

      const targetRequest = {
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        context: {
          channel: "web",
          mobilePlatform: null,
          application: null,
          screen: null,
          window: null,
          browser: null,
          address: {
            url: "http://adobe.com",
            referringUrl: null
          },
          geo: null,
          timeOffsetInMinutes: null,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
          beacon: false
        },
        prefetch: {
          mboxes: [
            {
              name: "feature-flag-a",
              index: 1
            }
          ]
        },
        execute: {
          mboxes: [
            {
              index: 1,
              name: "feature-flag-b"
            }
          ]
        }
      };

      const client = TargetClient.create({
        client: "someClientId",
        organizationId: " someOrgId"
      });

      const featureA = await client.getAttributes("feature-flag-a", {
        request: targetRequest,
        sessionId: "dummy_session"
      });

      expect(featureA.getValue("paymentExperience")).toEqual("legacy");
      expect(featureA.getValue("showFeatureX")).toEqual(false);
      expect(featureA.getValue("paymentGatewayVersion")).toEqual(2.3);
      expect(featureA.getValue("customerFeedbackValue")).toEqual(10);

      expect(featureA.asObject()).toMatchObject({
        paymentExperience: "legacy",
        showFeatureX: false,
        paymentGatewayVersion: 2.3,
        customerFeedbackValue: 10
      });

      const featureB = await client.getAttributes("feature-flag-b", {
        request: targetRequest,
        sessionId: "dummy_session"
      });

      expect(featureB.getValue("purchaseExperience")).toEqual("beta2");
      expect(featureB.getValue("showFeatureY")).toEqual(true);
      expect(featureB.getValue("cartVersion")).toEqual(1.3);
      expect(featureB.getValue("customerSurveyValue")).toEqual(102);

      expect(featureB.asObject()).toMatchObject({
        purchaseExperience: "beta2",
        showFeatureY: true,
        cartVersion: 1.3,
        customerSurveyValue: 102
      });
    });

    it("fails gracefully if an attribute does not exist", async () => {
      fetch.mockResponse(JSON.stringify(DELIVERY_API_RESPONSE));

      const targetRequest = {
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        context: {
          channel: "web",
          mobilePlatform: null,
          application: null,
          screen: null,
          window: null,
          browser: null,
          address: {
            url: "http://adobe.com",
            referringUrl: null
          },
          geo: null,
          timeOffsetInMinutes: null,
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
          beacon: false
        },
        prefetch: {
          mboxes: [
            {
              name: "feature-flag-a",
              index: 2
            }
          ]
        }
      };

      const client = TargetClient.create({
        client: "someClientId",
        organizationId: " someOrgId"
      });

      const attributes = await client.getAttributes("unknown-flag", {
        request: targetRequest,
        sessionId: "dummy_session"
      });

      expect(attributes.getValue("paymentExperience")).toEqual(
        new Error(ATTRIBUTE_NOT_EXIST("paymentExperience", "unknown-flag"))
      );

      expect(attributes.asObject()).toMatchObject({});
    });
  });
});
