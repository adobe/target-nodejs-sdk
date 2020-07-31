import isString from "./isString";

/**
 * Hashes a `string`
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to hash.
 * @returns {Number} Returns the hash.
 * @example
 *
 * _.hash('test');
 * // => 3556498
 */

function hash(string) {
  if (!isString(string)) {
    return -1;
  }

  let result = 0;
  const { length } = string;

  for (let i = 0; i < length; i += 1) {
    /* eslint-disable */
    result = ((result << 5) - result + string.charCodeAt(i)) & 0xffffffff;
    /* eslint-enable */
  }

  return result;
}

export default hash;
