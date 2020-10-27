import isNil from "./isNil";
import isArray from "./isArray";
import castFunction from "./_castFunction";
import arrayMap from "./_arrayMap";
import baseEach from "./_baseEach";

const baseMap = (iteratee, collection) => {
  const result = {};

  baseEach((value, key) => {
    result[key] = iteratee(value, key);
  }, collection);

  return result;
};

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {Array|Object} collection The collection to iterate over.
 * @returns {Array|Object} Returns the new mapped collection.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map(square, [4, 8]);
 * // => [16, 64]
 *
 * _.map(square, { 'a': 4, 'b': 8 });
 * // => { 'a': 16, 'b': 64 } (iteration order is not guaranteed)
 *
 */
function map(iteratee, collection) {
  if (isNil(collection)) {
    return [];
  }

  const func = isArray(collection) ? arrayMap : baseMap;

  return func(castFunction(iteratee), collection);
}

export default map;
