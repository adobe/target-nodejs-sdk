import { fetch as whatwfFetch } from "whatwg-fetch";

import { isDefined } from "@adobe/target-tools";
import bootstrap from "./index";

const TargetClient = bootstrap(
  // eslint-disable-next-line no-undef
  isDefined(window.fetch)
    ? // eslint-disable-next-line no-undef
      window.fetch.bind(window)
    : whatwfFetch
);

export default TargetClient;
