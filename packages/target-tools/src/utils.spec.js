import {
  addMboxesToRequest,
  decisioningEngineReady,
  getMboxNames,
  getProperty,
  getPropertyToken,
  getViewNames,
  hasRequestedViews,
  isDefined,
  isUndefined,
  isValidIpAddress,
  noop,
  objectWithoutUndefinedValues,
  requiresDecisioningEngine,
  timeLimitExceeded,
  whenReady,
  executeTelemetries,
  isExecutePageLoad,
  executeMboxCount,
  isPrefetchPageLoad,
  prefetchMboxCount,
  prefetchViewCount
} from "./utils";
import { ChannelType } from "../delivery-api-client";
import { DECISIONING_METHOD } from "./enums";

describe("utils", () => {
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

  it("has getViewNames", () => {
    const result = getViewNames({
      context: { channel: "web" },
      execute: {
        views: [{ name: "one" }, { name: "two" }]
      },
      prefetch: {
        views: [{ name: "three" }, { name: "four" }]
      }
    });

    expect(result instanceof Set).toEqual(true);
    expect(result.size).toEqual(4);

    expect(result.has("one")).toEqual(true);
    expect(result.has("two")).toEqual(true);
    expect(result.has("three")).toEqual(true);
    expect(result.has("four")).toEqual(true);
  });

  it("getViewNames empty", () => {
    const result = getViewNames({
      context: { channel: "web" },
      prefetch: {
        views: [{}]
      }
    });

    expect(result instanceof Set).toEqual(true);
    expect(result.size).toEqual(0);
  });

  it("has requiresDecisioningEngine", () => {
    expect(requiresDecisioningEngine(DECISIONING_METHOD.SERVER_SIDE)).toEqual(
      false
    );
    expect(requiresDecisioningEngine(DECISIONING_METHOD.ON_DEVICE)).toEqual(
      true
    );
    expect(requiresDecisioningEngine(DECISIONING_METHOD.HYBRID)).toEqual(true);
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

  describe("hasRequestedViews", () => {
    it("is true when views is empty array", () => {
      expect(
        hasRequestedViews({
          context: {
            channel: ChannelType.Web
          },
          prefetch: {
            views: []
          }
        })
      ).toEqual(true);
    });

    it("is false when views is missing", () => {
      expect(
        hasRequestedViews({
          context: {
            channel: ChannelType.Web
          },
          prefetch: {
            mboxes: [{ name: "mboxname", index: 0 }]
          }
        })
      ).toEqual(false);
    });
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

  describe("whenReady", () => {
    it("is not ready", () => {
      const isReady = () => false;

      return expect(whenReady(isReady, 500, "not ready, yo")).rejects.toEqual(
        new Error("not ready, yo")
      );
    });

    it("is ready", () => {
      expect.assertions(1);

      return new Promise(done => {
        const isReady = () => true;

        whenReady(isReady, 200, "not ready, yo").then(value => {
          expect(value).toBeUndefined();
          done();
        });
      });
    });

    it("is eventually ready", () => {
      expect.assertions(1);

      return new Promise(done => {
        let itsReady = false;

        setTimeout(() => {
          itsReady = true;
        }, 200);

        const isReady = () => {
          return itsReady;
        };

        whenReady(isReady, 500, "not ready, yo").then(value => {
          expect(value).toBeUndefined();
          done();
        });
      });
    });

    it("rejects if exceeds wait time", () => {
      let itsReady = false;
      setTimeout(() => {
        itsReady = true;
      }, 500);

      const isReady = () => {
        return itsReady;
      };

      return expect(
        whenReady(isReady, 100, "not ready in time")
      ).rejects.toEqual(new Error("not ready in time"));
    });
  });

  it("executeTelemetries", () => {
    const result = executeTelemetries(
      {
        context: { channel: "web" }
      },
      [
        {
          requestId: "123"
        }
      ]
    );

    expect(result).toEqual(
      expect.objectContaining({
        context: {
          channel: "web"
        },
        telemetry: {
          entries: expect.any(Array)
        }
      })
    );
    expect(result.telemetry.entries[0]).toMatchObject({
      requestId: "123"
    });
  });

  it("isExecutePageLoad", () => {
    expect(
      isExecutePageLoad({
        execute: { pageLoad: {} }
      })
    ).toEqual(true);
    expect(
      isExecutePageLoad({
        execute: {}
      })
    ).toEqual(false);
    expect(isExecutePageLoad({})).toEqual(false);
  });

  it("executeMboxCount", () => {
    expect(
      executeMboxCount({
        execute: {
          mboxes: [{ name: "one" }, { name: "two" }]
        }
      })
    ).toEqual(2);
    expect(
      executeMboxCount({
        execute: { mboxes: [] }
      })
    ).toEqual(0);
    expect(executeMboxCount({})).toEqual(0);
  });

  it("isPrefetchPageLoad", () => {
    expect(
      isPrefetchPageLoad({
        prefetch: { pageLoad: {} }
      })
    ).toEqual(true);
    expect(
      isPrefetchPageLoad({
        prefetch: {}
      })
    ).toEqual(false);
    expect(isPrefetchPageLoad({})).toEqual(false);
  });

  it("prefetchMboxCount", () => {
    expect(
      prefetchMboxCount({
        prefetch: {
          mboxes: [{ name: "one" }, { name: "two" }]
        }
      })
    ).toEqual(2);
    expect(
      prefetchMboxCount({
        prefetch: { mboxes: [] }
      })
    ).toEqual(0);
    expect(prefetchMboxCount({})).toEqual(0);
  });

  it("prefetchViewCount", () => {
    expect(
      prefetchViewCount({
        prefetch: {
          views: [{ name: "one" }, { name: "two" }]
        }
      })
    ).toEqual(2);
    expect(
      prefetchViewCount({
        prefetch: { views: [] }
      })
    ).toEqual(0);
    expect(prefetchViewCount({})).toEqual(0);
  });
});
