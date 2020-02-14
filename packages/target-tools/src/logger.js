const AT_PREFIX = "AT:";

const NOOP_LOGGER = {
  debug() {},
  error() {}
};

// eslint-disable-next-line import/prefer-default-export
export function getLogger(logger = {}) {
  const { debug, error } = logger;

  const targetLogger = Object.assign({}, NOOP_LOGGER);

  if (typeof debug === "function") {
    targetLogger.debug = (...messages) => {
      logger.debug.apply(null, [AT_PREFIX, ...messages]);
    };
  }

  if (typeof error === "function") {
    targetLogger.error = (...messages) => {
      logger.error.apply(null, [AT_PREFIX, ...messages]);
    };
  }

  return targetLogger;
}
