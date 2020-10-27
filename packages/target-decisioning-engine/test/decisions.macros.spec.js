/* eslint-disable no-template-curly-in-string */
import TargetDecisioningEngine from "../src";

import { DECISIONING_PAYLOAD_CAMPAIGN_MACROS } from "./decisioning-payloads";

const TEST_CONF = {
  client: "adobesummit2018",
  organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
  pollingInterval: 0,
  artifactPayload: DECISIONING_PAYLOAD_CAMPAIGN_MACROS
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

describe("campaign macros", () => {
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

  it("replaces html mbox macro template strings with values", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          mboxes: [
            {
              name: "macros",
              index: 0,
              parameters: {
                user: "Mickey Mouse",
                pgname: "blippi",
                browserWidth: 1024
              }
            }
          ]
        }
      }
    });
    expect(result.prefetch.mboxes.length).toEqual(1);

    const mbox = result.prefetch.mboxes[0];
    expect(mbox.name).toEqual("macros");
    const option = result.prefetch.mboxes[0].options[0];

    expect(option.type).toEqual("html");
    expect(option.content).toEqual(
      "<ul>\n" +
        "  <li>667871</li>\n" +
        "  <li>/campaign_macros/experiences/0/pages/0/zones/0/1599065324791</li>\n" +
        "  <li>362147</li>\n" +
        "  <li>campaign macros</li>\n" +
        "  <li>0</li>\n" +
        "  <li>Experience A</li>\n" +
        "  <li>362147</li>\n" +
        "  <li>campaign macros</li>\n" +
        "  <li>0</li>\n" +
        "  <li>Experience A</li>\n" +
        "  <li>macros</li>\n" +
        "  <li>Mickey Mouse</li>\n" +
        "  <li>blippi</li>\n" +
        "  <li>1024</li>\n" +
        "</ul>"
    );
  });

  it("does not replace macro template strings if acceptable values are not available", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          mboxes: [
            {
              name: "macros",
              index: 0,
              parameters: {
                user: "Donald"
              }
            }
          ]
        }
      }
    });
    expect(result.prefetch.mboxes.length).toEqual(1);

    const mbox = result.prefetch.mboxes[0];
    expect(mbox.name).toEqual("macros");
    const option = result.prefetch.mboxes[0].options[0];

    expect(option.type).toEqual("html");
    expect(option.content).toEqual(
      "<ul>\n" +
        "  <li>667871</li>\n" +
        "  <li>/campaign_macros/experiences/0/pages/0/zones/0/1599065324791</li>\n" +
        "  <li>362147</li>\n" +
        "  <li>campaign macros</li>\n" +
        "  <li>0</li>\n" +
        "  <li>Experience A</li>\n" +
        "  <li>362147</li>\n" +
        "  <li>campaign macros</li>\n" +
        "  <li>0</li>\n" +
        "  <li>Experience A</li>\n" +
        "  <li>macros</li>\n" +
        "  <li>Donald</li>\n" +
        "  <li>${mbox.pgname}</li>\n" +
        "  <li>${mbox.browserWidth}</li>\n" +
        "</ul>"
    );
  });

  it("replaces pageload option macro template strings with values", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        execute: {
          pageLoad: {
            parameters: {
              user: "Mickey Mouse",
              pgname: "blippi",
              browserWidth: 1024
            }
          }
        }
      }
    });

    const pageLoadOptions = result.execute.pageLoad.options;

    expect(pageLoadOptions.length).toEqual(4);

    const actionContents = [];

    pageLoadOptions.forEach(option => {
      option.content.forEach(action => {
        actionContents.push(action.content);
      });
    });

    expect(actionContents.sort()).toEqual([
      "362225",
      "Hello Mickey Mouse",
      "macros pageLoad",
      "target-global-mbox"
    ]);
  });

  it("replaces view option macro template strings with values", async () => {
    const result = await decisioning.getOffers({
      request: {
        ...targetRequest,
        prefetch: {
          views: [{}]
        }
      }
    });

    const viewOptions = result.prefetch.views[0].options;

    expect(viewOptions.length).toEqual(1);

    const actionContents = [];

    viewOptions.forEach(option => {
      option.content.forEach(action => {
        actionContents.push(action.content);
      });
    });

    expect(actionContents.sort()).toEqual([
      '<div id="action_insert_1599086396006761">campaign macros view</div>'
    ]);
  });
});
