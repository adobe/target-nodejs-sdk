import FormData from "form-data";
import { URLSearchParams } from "url";
import "fast-text-encoding";

import { defaultFetch, isDefined } from "@adobe/target-tools";
import bootstrap from "./index";

global.FormData = FormData;
global.URLSearchParams = URLSearchParams;

const TargetClient = bootstrap(
  // eslint-disable-next-line no-undef
  isDefined(global.fetch) ? global.fetch : defaultFetch
);

export default TargetClient.default || TargetClient;
