const whatwfFetch = require("whatwg-fetch");
const TargetClient = require("./index").bootstrap(whatwfFetch.fetch);

module.exports = TargetClient;
