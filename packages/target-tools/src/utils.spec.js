import {
  addMboxesToRequest,
  createUUID,
  decisioningEngineReady,
  getMboxNames,
  isUndefined,
  noop,
  objectWithoutUndefinedValues,
  requiresDecisioningEngine,
  getProperty,
  getPropertyToken,
  isDefined,
  timeLimitExceeded,
  isValidIpAddress
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

  it("isUndefined", () => {
    expect(isUndefined(undefined)).toEqual(true);
    expect(isUndefined({})).toEqual(false);
    expect(isUndefined([])).toEqual(false);
    expect(isUndefined(true)).toEqual(false);
    expect(isUndefined(1)).toEqual(false);
    expect(isUndefined(1.25)).toEqual(false);
    expect(isUndefined(null)).toEqual(false); // null is an 'object'
  });

  it("isDefined", () => {
    expect(isDefined(undefined)).toEqual(false);
    expect(isDefined({})).toEqual(true);
    expect(isDefined([])).toEqual(true);
    expect(isDefined(true)).toEqual(true);
    expect(isDefined(1)).toEqual(true);
    expect(isDefined(1.25)).toEqual(true);
    expect(isDefined(null)).toEqual(true); // null is an 'object'
  });

  it("objectWithoutUndefinedValues", () => {
    expect(
      objectWithoutUndefinedValues({
        a: true,
        b: false,
        c: undefined,
        d: {},
        e: new Set(),
        f: [],
        g: undefined
      })
    ).toEqual({
      a: true,
      b: false,
      d: {},
      e: new Set(),
      f: []
    });
  });

  it("getProperty", () => {
    expect(
      getProperty({ propertyToken: "abc" }, { property: { token: "xyz" } })
    ).toEqual({ token: "xyz" });

    expect(getProperty({}, { property: { token: "xyz" } })).toEqual({
      token: "xyz"
    });

    expect(getProperty({ propertyToken: "abc" }, {})).toEqual({ token: "abc" });
    expect(getProperty({}, {})).toEqual(undefined);
    expect(getProperty(undefined, undefined)).toEqual(undefined);
  });

  it("getPropertyToken", () => {
    expect(getPropertyToken(undefined)).toEqual(undefined);
    expect(getPropertyToken({})).toEqual(undefined);
    expect(getPropertyToken({ token: undefined })).toEqual(undefined);
    expect(getPropertyToken({ token: "abc_xyz" })).toEqual("abc_xyz");
  });

  it("timeLimitExceeded", () => {
    const now = new Date().getTime();

    expect(timeLimitExceeded(now - 1100, 1000)).toBeTruthy();
    expect(timeLimitExceeded(now - 1100, 500)).toBeTruthy();
    expect(timeLimitExceeded(now - 1100, 2000)).toBeFalsy();
    expect(timeLimitExceeded(now, -1)).toBeFalsy();
  });

  it("isValidIpAddress", () => {
    expect(isValidIpAddress(undefined)).toEqual(false);
    expect(isValidIpAddress("")).toEqual(false);
    expect(isValidIpAddress("70.25.14.5")).toEqual(true);
    expect(isValidIpAddress("2001:cdba:0000:0000:0000:0000:3257:9652")).toEqual(
      true
    );
    expect(isValidIpAddress("invalid_ip")).toEqual(false);
  });
});
