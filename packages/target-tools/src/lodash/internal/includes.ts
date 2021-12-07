import isArrayLike from "./isArrayLike";
import toArray from "./toArray";

/**
 * Checks if `value` is in `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 */
function includes(value, collection) {
  const coll = isArrayLike(collection) ? collection : toArray(collection);

  return coll.indexOf(value) > -1;
}

export default includes;
