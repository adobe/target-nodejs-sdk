import { getLogger } from "./logging";

describe("logging", () => {
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

  it("returns existing logger if the one passed in is valid", () => {
    const logger = getLogger();
    const logger2 = getLogger(logger);

    expect(logger2).toEqual(logger);
    expect(logger.built).toEqual(true);
  });
});
