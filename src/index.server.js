const FormData = require("form-data");

const globals = global;

globals.FormData = FormData;

const nodeFetch = require("node-fetch");

const TargetClient = require("./index").bootstrap(
  // eslint-disable-next-line no-undef
  typeof fetch !== "undefined" ? fetch : nodeFetch.default
);

module.exports = TargetClient;
