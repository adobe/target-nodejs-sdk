import { fetch as whatwfFetch } from "whatwg-fetch";

import { isUndefined } from "@adobe/target-tools";
import bootstrap from "./index";

const TargetClient = bootstrap(
  // eslint-disable-next-line no-undef
  !isUndefined(window.fetch)
    ? // eslint-disable-next-line no-undef
      window.fetch.bind(window)
    : whatwfFetch
);

export default TargetClient;
