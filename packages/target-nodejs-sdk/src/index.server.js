import FormData from "form-data";
import { URLSearchParams } from "url";
import * as nodeFetch from "node-fetch";

import { isUndefined } from "@adobe/target-tools";
import bootstrap from "./index";

global.FormData = FormData;
global.URLSearchParams = URLSearchParams;

const TargetClient = bootstrap(
  // eslint-disable-next-line no-undef
  !isUndefined(global.fetch) ? global.fetch : nodeFetch.default
);

export default TargetClient.default || TargetClient;
