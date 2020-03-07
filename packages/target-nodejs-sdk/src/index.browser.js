import { fetch as whatwfFetch } from "whatwg-fetch";
import bootstrap from "./index";

const TargetClient = bootstrap(
  // eslint-disable-next-line no-undef
  typeof window.fetch !== "undefined"
    ? // eslint-disable-next-line no-undef
      window.fetch.bind(window)
    : whatwfFetch.fetch
);

export default TargetClient;
