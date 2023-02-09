import { DEFAULT_NUM_FETCH_RETRIES } from "./constants";
import { isBrowser, isDefined, isNodeJS, noop } from "./utils";
import { isFunction } from "./lodash";

const NOT_MODIFIED = 304;

export function getFetchApi(fetchApi) {
  if (isFunction(fetchApi)) {
    return fetchApi;
  }

  let api;

  if (isNodeJS() && typeof global.fetch === "function") {
    api = global.fetch;
  } else if (
    isBrowser() &&
    // eslint-disable-next-line no-undef
    typeof window.fetch === "function"
  ) {
    // eslint-disable-next-line no-undef
    api = window.fetch.bind(window);
  }

  return api;
}

export function getFetchWithRetry(
  fetchApi,
  proxyAgent = undefined,
  maxRetries = DEFAULT_NUM_FETCH_RETRIES,
  errorFunc = errorMessage => errorMessage,
  incidentalFailureCallback = noop
) {
  return function fetchWithRetry(url, options, numRetries = maxRetries) {
    const fetchOptions = options || {};
    if (isDefined(proxyAgent)) {
      fetchOptions.dispatcher = proxyAgent;
    }

    return fetchApi(url, fetchOptions)
      .then(res => {
        if (!res.ok && res.status !== NOT_MODIFIED) {
          throw Error(res.statusText);
        }
        return res;
      })
      .catch(err => {
        if (isFunction(incidentalFailureCallback)) {
          incidentalFailureCallback.call(undefined, err);
        }

        if (numRetries < 1) {
          throw new Error(errorFunc(err.message));
        }
        // TODO: Enhance this to do Exponential Backoff
        return fetchWithRetry(url, options, numRetries - 1);
      });
  };
}
