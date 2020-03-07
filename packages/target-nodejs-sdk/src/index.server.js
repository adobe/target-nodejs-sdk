const FormData = require("form-data");

const nodeFetch = require("node-fetch");

if (!global.fetch) {
  global.fetch = nodeFetch;
  global.Response = nodeFetch.Response;
  global.Headers = nodeFetch.Headers;
  global.Request = nodeFetch.Request;
}

global.FormData = FormData;

const TargetClient = require("./index");

module.exports = TargetClient.default || TargetClient;
