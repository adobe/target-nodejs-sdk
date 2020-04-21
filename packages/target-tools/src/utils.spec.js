import {
  addMboxesToRequest,
  createUUID,
  decisioningEngineReady,
  getMboxNames,
  noop,
  requiresDecisioningEngine
} from "./utils";
import { ChannelType } from "../delivery-api-client";
import { EXECUTION_MODE } from "./enums";

describe("utils", () => {
  it("has createUUID", () => {
    expect(createUUID).toBeDefined();
    expect(typeof createUUID).toEqual("function");
    const uuid = createUUID();
    expect(uuid).toEqual(expect.any(String));
    expect(uuid.length).toEqual(32);
  });

  it("has noop", () => {
    expect(noop).toBeDefined();
    expect(typeof noop).toEqual("function");
    expect(noop()).toBeUndefined();
  });

  it("has getMboxNames", () => {
    const result = getMboxNames({
      context: { channel: "web" },
      execute: {
        mboxes: [{ name: "one" }, { name: "two" }]
      },
      prefetch: {
        mboxes: [{ name: "three" }, { name: "four" }]
      }
    });

    expect(result instanceof Set).toEqual(true);
    expect(result.size).toEqual(4);

    expect(result.has("one")).toEqual(true);
    expect(result.has("two")).toEqual(true);
    expect(result.has("three")).toEqual(true);
    expect(result.has("four")).toEqual(true);
  });

  it("has requiresDecisioningEngine", () => {
    expect(requiresDecisioningEngine(EXECUTION_MODE.REMOTE)).toEqual(false);
    expect(requiresDecisioningEngine(EXECUTION_MODE.LOCAL)).toEqual(true);
    expect(requiresDecisioningEngine(EXECUTION_MODE.HYBRID)).toEqual(true);
  });

  it("has decisioningEngineReady", () => {
    expect(
      decisioningEngineReady({
        isReady: () => true
      })
    ).toEqual(true);

    expect(
      decisioningEngineReady({
        isReady: () => false
      })
    ).toEqual(false);
  });

  describe("addMboxesToRequest", () => {
    it("add prefetch", () => {
      expect(
        addMboxesToRequest(
          ["mbox-foo", "mbox-bar", "mbox-baz"],
          {
            context: { channel: ChannelType.Web },
            prefetch: {
              mboxes: []
            }
          },
          "prefetch"
        )
      ).toEqual(
        expect.objectContaining({
          prefetch: {
            mboxes: [
              {
                name: "mbox-foo",
                index: 1
              },
              {
                name: "mbox-bar",
                index: 2
              },
              {
                name: "mbox-baz",
                index: 3
              }
            ]
          }
        })
      );
    });

    it("add execute", () => {
      expect(
        addMboxesToRequest(
          ["mbox-foo", "mbox-bar", "mbox-baz"],
          {
            context: { channel: ChannelType.Web },
            execute: {
              mboxes: []
            }
          },
          "execute"
        )
      ).toEqual(
        expect.objectContaining({
          execute: {
            mboxes: [
              {
                name: "mbox-foo",
                index: 1
              },
              {
                name: "mbox-bar",
                index: 2
              },
              {
                name: "mbox-baz",
                index: 3
              }
            ]
          }
        })
      );
    });

    it("add without duplicates, and preserve existing", () => {
      expect(
        addMboxesToRequest(
          ["mbox-foo", "mbox-bar", "mbox-baz"],
          {
            context: { channel: ChannelType.Web },
            prefetch: {
              mboxes: [
                {
                  name: "mbox-foo",
                  index: 6
                },
                {
                  name: "mbox-jab",
                  index: 2
                }
              ]
            }
          },
          "prefetch"
        )
      ).toEqual(
        expect.objectContaining({
          prefetch: {
            mboxes: [
              {
                name: "mbox-foo",
                index: 6
              },
              {
                name: "mbox-jab",
                index: 2
              },
              {
                name: "mbox-bar",
                index: 7
              },
              {
                name: "mbox-baz",
                index: 8
              }
            ]
          }
        })
      );
    });
  });
});
