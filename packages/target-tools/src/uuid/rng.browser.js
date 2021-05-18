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

const BUFFER = new Uint8Array(256);
const GET_RANDOM_VALUES = getRandomValues();

export default function rng() {
  return GET_RANDOM_VALUES(BUFFER);
}
