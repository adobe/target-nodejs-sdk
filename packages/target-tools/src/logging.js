/* eslint-disable import/prefer-default-export */
import { assign, isFunction } from "./lodash";

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

  const targetLogger = assign({ built: true }, NOOP_LOGGER);

  if (isFunction(debug)) {
    targetLogger.debug = (...messages) => {
      logger.debug.apply(null, [AT_PREFIX, ...messages]);
    };
  }

  if (isFunction(error)) {
    targetLogger.error = (...messages) => {
      logger.error.apply(null, [AT_PREFIX, ...messages]);
    };
  }

  return targetLogger;
}
