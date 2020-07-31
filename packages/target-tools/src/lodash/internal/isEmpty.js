import isArray from "./isArray";
import isArrayLike from "./isArrayLike";
import isString from "./isString";
import isFunction from "./isFunction";

const { prototype: objectProto } = Object;
const { hasOwnProperty } = objectProto;

/**
 * Checks if `value` is an empty object, collection, map, or set.
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
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (isArray(value) || isString(value) || isFunction(value.splice))
  ) {
    return !value.length;
  }

  /* eslint-disable */
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  /* eslint-enable */

  return true;
}

export default isEmpty;
