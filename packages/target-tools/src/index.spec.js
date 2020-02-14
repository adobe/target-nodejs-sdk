import TargetTools from "./index";

it("has a default logger", () => {
  const logger = TargetTools.getLogger();
  expect(logger).not.toBeUndefined();
  expect(typeof logger.debug).toEqual("function");
  expect(typeof logger.error).toEqual("function");
});

it("logger can be overridden", () => {
  const logger = TargetTools.getLogger({
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
