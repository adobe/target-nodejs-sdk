import { AttributesProvider } from "./attributesProvider";
import { ATTRIBUTE_NOT_EXIST } from "./messages";
import { OptionType } from "../delivery-api-client";

const targetResponse = {
  visitorState: {
    "74F652E95F1B16FE0A495C92@AdobeOrg": {
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
    client: "targettesting",
    edgeHost: "mboxedge28.tt.omtrdc.net",
    prefetch: {
      mboxes: [
        {
          index: 1,
          name: "feature-flag-a",
          options: [
            {
              type: OptionType.Json,
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
              type: OptionType.Json,
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

describe("attributesProvider", () => {
  it("has appropriate method calls", () => {
    const feature = AttributesProvider(targetResponse);

    expect(typeof feature.getValue).toEqual("function");
    expect(typeof feature.asObject).toEqual("function");
    expect(typeof feature.toJSON).toEqual("function");
    expect(typeof feature.getResponse).toEqual("function");

    expect(feature.getResponse()).toEqual(targetResponse);
  });

  it("gets value for a single mbox", () => {
    const featureA = AttributesProvider(targetResponse);

    expect(featureA.getValue("feature-flag-a", "paymentExperience")).toEqual(
      "legacy"
    );
    expect(featureA.getValue("feature-flag-a", "showFeatureX")).toEqual(false);
    expect(
      featureA.getValue("feature-flag-a", "paymentGatewayVersion")
    ).toEqual(2.3);
    expect(
      featureA.getValue("feature-flag-a", "customerFeedbackValue")
    ).toEqual(10);

    const featureB = AttributesProvider(targetResponse);

    expect(featureB.getValue("feature-flag-b", "purchaseExperience")).toEqual(
      "beta2"
    );
    expect(featureB.getValue("feature-flag-b", "showFeatureY")).toEqual(true);
    expect(featureB.getValue("feature-flag-b", "cartVersion")).toEqual(1.3);
    expect(featureB.getValue("feature-flag-b", "customerSurveyValue")).toEqual(
      102
    );
  });

  it("gets value for multiple mboxes at once", () => {
    const features = AttributesProvider(targetResponse);

    expect(features.getValue("feature-flag-a", "paymentExperience")).toEqual(
      "legacy"
    );
    expect(features.getValue("feature-flag-a", "showFeatureX")).toEqual(false);
    expect(
      features.getValue("feature-flag-a", "paymentGatewayVersion")
    ).toEqual(2.3);
    expect(
      features.getValue("feature-flag-a", "customerFeedbackValue")
    ).toEqual(10);

    expect(features.getValue("feature-flag-b", "purchaseExperience")).toEqual(
      "beta2"
    );
    expect(features.getValue("feature-flag-b", "showFeatureY")).toEqual(true);
    expect(features.getValue("feature-flag-b", "cartVersion")).toEqual(1.3);
    expect(features.getValue("feature-flag-b", "customerSurveyValue")).toEqual(
      102
    );
  });

  it("gets as object", () => {
    const features = AttributesProvider(targetResponse);

    expect(features.asObject("feature-flag-a")).toMatchObject({
      paymentExperience: "legacy",
      showFeatureX: false,
      paymentGatewayVersion: 2.3,
      customerFeedbackValue: 10
    });

    expect(features.asObject("feature-flag-b")).toMatchObject({
      purchaseExperience: "beta2",
      showFeatureY: true,
      cartVersion: 1.3,
      customerSurveyValue: 102
    });

    expect(features.asObject()).toMatchObject({
      "feature-flag-a": {
        paymentExperience: "legacy",
        showFeatureX: false,
        paymentGatewayVersion: 2.3,
        customerFeedbackValue: 10
      },
      "feature-flag-b": {
        purchaseExperience: "beta2",
        showFeatureY: true,
        cartVersion: 1.3,
        customerSurveyValue: 102
      }
    });

    expect(features.toJSON()).toMatchObject({
      "feature-flag-a": {
        paymentExperience: "legacy",
        showFeatureX: false,
        paymentGatewayVersion: 2.3,
        customerFeedbackValue: 10
      },
      "feature-flag-b": {
        purchaseExperience: "beta2",
        showFeatureY: true,
        cartVersion: 1.3,
        customerSurveyValue: 102
      }
    });
  });

  it("throws an error if an attribute does not exist", () => {
    const features = AttributesProvider(targetResponse);

    expect(features.getValue("feature-flag-a", "myPropertyName")).toEqual(
      new Error(ATTRIBUTE_NOT_EXIST("myPropertyName", "feature-flag-a"))
    );

    expect(features.getValue("feature-flag-xyz", "myPropertyName")).toEqual(
      new Error(ATTRIBUTE_NOT_EXIST("myPropertyName", "feature-flag-xyz"))
    );
  });
});
