/* eslint-disable import/prefer-default-export */
import { NOT_MODIFIED } from "http-status-codes";
import { DEFAULT_NUM_FETCH_RETRIES } from "./constants";
import { isBrowser, isNodeJS } from "./utils";

export function getFetchApi(fetchApi) {
  if (fetchApi && typeof fetchApi === "function") return fetchApi;

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
  maxRetries = DEFAULT_NUM_FETCH_RETRIES,
  errorFunc = errorMessage => errorMessage
) {
  return function fetchWithRetry(url, options, numRetries = maxRetries) {
    return fetchApi(url, options)
      .then(res => {
        if (!res.ok && res.status !== NOT_MODIFIED) {
          throw Error(res.statusText);
        }
        return res;
      })
      .catch(err => {
        if (numRetries < 1) {
          throw new Error(errorFunc(err.message));
        }
        // TODO: Enhance this to do Exponential Backoff
        return fetchWithRetry(url, options, numRetries - 1);
      });
  };
}
