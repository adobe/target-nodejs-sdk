import isBlank from "./isBlank";

/**
 * Checks if `value` is a blank string.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isNotBlank(null);
 * // => false
 *
 * _.isNotBlank(undefined);
 * // => false
 *
 * _.isNotBlank('');
 * // => false
 *
 * * _.isNotBlank('   ');
 * // => false
 */
const isNotBlank = value => !isBlank(value);

export default isNotBlank;
