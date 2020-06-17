import TargetDecisioningEngine from "../src";

import { DECISIONING_PAYLOAD_PROPERTIES } from "./decisioning-payloads";

const TEST_CONF = {
  client: "adobesummit2018",
  organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
  pollingInterval: 0,
  artifactPayload: DECISIONING_PAYLOAD_PROPERTIES
};

const targetRequest = {
  id: {
    tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
  },
  context: {
    channel: "web",
    browser: {
      host: "local-target-test"
    },
    address: {
      url: "http://local-target-test/"
    },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
  }
};

const PROPERTY_X_TOKEN = "9a327144-63fe-a7fc-5fdb-515e0c0175a8";
const PROPERTY_Y_TOKEN = "e63fc881-65c7-97b4-a16f-f63ce86c0434";

describe("properties", () => {
  let decisioning;

  beforeEach(async () => {
    decisioning = await TargetDecisioningEngine({
      ...TEST_CONF
    });
  });

  afterEach(() => {
    decisioning.stopPolling();
    decisioning = undefined;
  });

  it("evaluates experiences for property x and not property y", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          pageLoad: {}
        },
        property: {
          token: PROPERTY_X_TOKEN
        }
      }
    });

    expect(result.prefetch.pageLoad.options.length).toEqual(2); // has the property x activity and browser-mbox

    const optionX = result.prefetch.pageLoad.options.find(
      opt => opt.content.property === "property X"
    );
    expect(optionX).toBeDefined();

    const optionY = result.prefetch.pageLoad.options.find(
      opt => opt.content.property === "property Y"
    );
    expect(optionY).toBeUndefined();

    expect(optionX.content).toEqual({
      mbox: "target-global-mbox",
      experience: "A",
      fruit: "Apple",
      property: "property X"
    });
  });

  it("evaluates experiences for property y and not property x", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          pageLoad: {}
        },
        property: {
          token: PROPERTY_Y_TOKEN
        }
      }
    });

    expect(result.prefetch.pageLoad.options.length).toEqual(2); // has the property y activity and browser-mbox

    const optionY = result.prefetch.pageLoad.options.find(
      opt => opt.content.property === "property Y"
    );
    expect(optionY).toBeDefined();

    const optionX = result.prefetch.pageLoad.options.find(
      opt => opt.content.property === "property X"
    );
    expect(optionX).toBeUndefined();

    expect(optionY.content).toEqual({
      experience: "A",
      mbox: "target-global-mbox",
      property: "property Y",
      vegetable: "Asparagus"
    });
  });

  it("evaluates only activities without a property designation when no property token is specified", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          pageLoad: {}
        }
      }
    });

    expect(result.prefetch.pageLoad.options.length).toEqual(1); // a single activity without a property designation

    const optionY = result.prefetch.pageLoad.options.find(
      opt => opt.content.property === "property Y"
    );
    expect(optionY).toBeUndefined();

    const optionX = result.prefetch.pageLoad.options.find(
      opt => opt.content.property === "property X"
    );
    expect(optionX).toBeUndefined();
  });

  it("filters out rules with propertyTokens that don't match the one specified", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          pageLoad: {}
        },
        property: {
          token: "token_not_in_a_rule"
        }
      }
    });

    expect(result.prefetch.pageLoad.options.length).toEqual(1); // includes an activity without a property designation

    const optionY = result.prefetch.pageLoad.options.find(
      opt => opt.content.property === "property Y"
    );
    expect(optionY).toBeUndefined();

    const optionX = result.prefetch.pageLoad.options.find(
      opt => opt.content.property === "property X"
    );
    expect(optionX).toBeUndefined();
  });
});
