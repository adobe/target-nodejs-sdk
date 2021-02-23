import { ATTRIBUTE_NOT_EXIST } from "@adobe/target-tools";

require("jest-fetch-mock").enableMocks();
const HttpStatus = require("http-status-codes");

const TargetClient = require("../src/index.server").default;

describe("SDK.getAttributes()", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const DELIVERY_API_RESPONSE = {
    status: 200,
    requestId: "0c22fb957e8b4297b29ab3932bb179c3",
    client: "targettesting",
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

    const featureA = await client.getAttributes(["feature-flag-a"], {
      request: targetRequest,
      sessionId: "dummy_session"
    });

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

    expect(featureA.asObject("feature-flag-a")).toMatchObject({
      paymentExperience: "legacy",
      showFeatureX: false,
      paymentGatewayVersion: 2.3,
      customerFeedbackValue: 10
    });

    const features = await client.getAttributes([
      "feature-flag-a",
      "feature-flag-b"
    ]);

    expect(features.getValue("feature-flag-b", "purchaseExperience")).toEqual(
      "beta2"
    );
    expect(features.getValue("feature-flag-b", "showFeatureY")).toEqual(true);
    expect(features.getValue("feature-flag-b", "cartVersion")).toEqual(1.3);
    expect(features.getValue("feature-flag-b", "customerSurveyValue")).toEqual(
      102
    );

    expect(features.asObject("feature-flag-b")).toMatchObject({
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
      },
      execute: {
        mboxes: [
          {
            name: "feature-flag-b",
            index: 2
          }
        ]
      }
    };

    const client = TargetClient.create({
      client: "someClientId",
      organizationId: " someOrgId"
    });

    const attributes = await client.getAttributes(["unknown-flag"], {
      request: targetRequest,
      sessionId: "dummy_session"
    });

    expect(attributes.getValue("unknown-flag", "paymentExperience")).toEqual(
      new Error(ATTRIBUTE_NOT_EXIST("paymentExperience", "unknown-flag"))
    );

    expect(attributes.asObject("unknown-flag")).toMatchObject({});
  });

  it("adds mbox names to the delivery request as needed", async () => {
    fetch.mockResponse(
      async req => {
        const payload = await req.json();
        expect(payload.execute).toMatchObject({
          mboxes: [
            {
              name: "feature-flag-b"
            }
          ]
        });
        expect(payload.prefetch).toMatchObject({
          mboxes: [
            {
              name: "feature-flag-a",
              index: 2
            }
          ]
        });

        return Promise.resolve(JSON.stringify(DELIVERY_API_RESPONSE));
      },
      {
        status: HttpStatus.OK,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

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

    const attributes = await client.getAttributes(["feature-flag-b"], {
      request: targetRequest,
      sessionId: "dummy_session"
    });

    expect(attributes.getValue("feature-flag-b", "showFeatureY")).toEqual(true);

    expect(attributes.asObject("feature-flag-b")).toMatchObject({});
  });
});
