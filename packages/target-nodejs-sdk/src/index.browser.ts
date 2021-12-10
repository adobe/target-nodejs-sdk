import { fetch as whatwfFetch } from "whatwg-fetch";

import { isDefined } from "@adobe/target-tools";
import { bootstrap, TargetClientFactory } from "./bootstrap";

const TargetClientFac: TargetClientFactory = bootstrap(
  // eslint-disable-next-line no-undef
  isDefined(window.fetch)
    ? // eslint-disable-next-line no-undef
      window.fetch.bind(window)
    : whatwfFetch
);

export default TargetClientFac;
