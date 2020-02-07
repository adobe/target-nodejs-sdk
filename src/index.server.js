const FormData = require("form-data");

const globals = global;

globals.FormData = FormData;

const fetch = require("node-fetch");
const TargetClient = require("./index").bootstrap(fetch);

module.exports = TargetClient;
