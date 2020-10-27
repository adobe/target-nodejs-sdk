import isNil from "./isNil";
import isArray from "./isArray";
import castFunction from "./_castFunction";
import arrayEach from "./_arrayEach";
import baseEach from "./_baseEach";

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {Array|Object} collection The collection to iterate over.
 * @returns {Array|Object} Returns `collection`.
 * @example
 *
 * _.forEach(function(value) {
 *   console.log(value);
 * }, [1, 2]);
 * // => Logs `1` then `2`.
 *
 * _.forEach(function(value, key) {
 *   console.log(key);
 * }, { 'a': 1, 'b': 2 });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(iteratee, collection) {
  if (isNil(collection)) {
    return;
  }

  const func = isArray(collection) ? arrayEach : baseEach;

  func(castFunction(iteratee), collection);
}

export default forEach;
