import {
  createUUID,
  getFetchApi,
  getLogger,
  noop,
  getMboxNames
} from "./index";

it("has a default logger", () => {
  const logger = getLogger();
  expect(logger).not.toBeUndefined();
  expect(typeof logger.debug).toEqual("function");
  expect(typeof logger.error).toEqual("function");
  expect(logger.debug()).toBeUndefined();
  expect(logger.error()).toBeUndefined();
});

it("logger can be overridden", () => {
  const logger = getLogger({
    debug: (prefix, message) => {
      expect(prefix).toEqual("AT:");
      expect(message).toEqual("hello debug");
    },
    error: (prefix, message) => {
      expect(prefix).toEqual("AT:");
      expect(message).toEqual("hello error");
    }
  });
  expect(logger).not.toBeUndefined();
  logger.debug("hello debug");
  logger.error("hello error");
});

it("has getFetchApi", () => {
  expect(getFetchApi).toBeDefined();
  expect(typeof getFetchApi).toEqual("function");
  expect(getFetchApi(noop)).toEqual(noop);

  global.fetch = noop;
  expect(getFetchApi()).toEqual(noop);
  global.fetch = undefined;
});

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
