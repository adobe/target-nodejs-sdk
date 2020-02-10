const whatwfFetch = require("whatwg-fetch");
const TargetClient = require("./index").bootstrap(
  // eslint-disable-next-line no-undef
  typeof window.fetch !== "undefined"
    ? // eslint-disable-next-line no-undef
      window.fetch.bind(window)
    : whatwfFetch.fetch
);

module.exports = TargetClient;
