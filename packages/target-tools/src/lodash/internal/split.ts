import isBlank from "./isBlank";

/**
 * Splits `string` by `separator`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {string} [string=''] The string to split.
 * @returns {Array} Returns the string segments.
 * @example
 *
 * _.split('-', 'a-b-c');
 * // => ['a', 'b', 'c']
 */
function split(separator, string) {
  if (isBlank(string)) {
    return [];
  }

  return string.split(separator || "");
}

export default split;
