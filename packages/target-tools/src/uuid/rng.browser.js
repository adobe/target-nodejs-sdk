import isNil from "../lodash/internal/isNil";
import isFunction from "../lodash/internal/isFunction";

/* eslint-disable no-undef */
function getRandomValues() {
  const crypto = window.crypto || window.msCrypto;

  return (
    !isNil(crypto) &&
    crypto.getRandomValues &&
    isFunction(crypto.getRandomValues) &&
    crypto.getRandomValues.bind(crypto)
  );
}
/* eslint-enable no-undef */

function getFallbackRandomValues() {
  /* eslint-disable no-param-reassign */
  return arr => {
    for (let i = 0; i < arr.length; i += 1) {
      arr[i] = Math.floor(256 * Math.random());
    }

    return arr;
  };
  /* eslint-enable no-param-reassign */
}

const BUFFER = new Uint8Array(256);
const GET_RANDOM_VALUES = getRandomValues() || getFallbackRandomValues();

export default function rng() {
  return GET_RANDOM_VALUES(BUFFER);
}
