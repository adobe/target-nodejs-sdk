import FormData from "form-data";
import { URLSearchParams } from "url";
import "fast-text-encoding";

import { getFetchWithTelemetry, isDefined } from "@adobe/target-tools";
import bootstrap from "./index";

global.FormData = FormData;
global.URLSearchParams = URLSearchParams;

const TargetClient = bootstrap(
  // eslint-disable-next-line no-undef
  isDefined(global.fetch) ? global.fetch : getFetchWithTelemetry()
);

export default TargetClient.default || TargetClient;
