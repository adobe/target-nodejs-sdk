import FormData from "form-data";

import * as nodeFetch from "node-fetch";
import bootstrap from "./index";

const globals = global;

globals.FormData = FormData;

const TargetClient = bootstrap(
  // eslint-disable-next-line no-undef
  typeof fetch !== "undefined" ? fetch : nodeFetch.default
);

export default TargetClient;
