/* eslint-disable import/prefer-default-export */
import FormData from "form-data";
import { URLSearchParams } from "url";
import "fast-text-encoding";

import { getFetchWithTelemetry, isDefined } from "@adobe/target-tools";
import { bootstrap, TargetClientFactory } from "./bootstrap";

// @ts-ignore: global is a-ok here
global.FormData = FormData;
// @ts-ignore: global is a-ok here
global.URLSearchParams = URLSearchParams;

const TargetClientFac: TargetClientFactory = bootstrap(
  // eslint-disable-next-line no-undef
  isDefined(global.fetch) ? global.fetch : getFetchWithTelemetry()
);

const {
  create,
  getVisitorCookieName,
  TargetCookieName,
  TargetLocationHintCookieName,
  AuthState
} = TargetClientFac;

export {
  create as createTargetClient,
  getVisitorCookieName,
  TargetCookieName,
  TargetLocationHintCookieName,
  AuthState
};
