/* eslint-disable import/prefer-default-export */
const AT_PREFIX = "AT:";

const NOOP_LOGGER = {
  // eslint-disable-next-line no-unused-vars
  debug(...messages) {},
  // eslint-disable-next-line no-unused-vars
  error(...messages) {}
};

export function getLogger(logger = {}) {
  // don't do anything if the logger was previously built
  if (logger.built) {
    return logger;
  }

  const { debug, error } = logger;

  const targetLogger = Object.assign({ built: true }, NOOP_LOGGER);

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
