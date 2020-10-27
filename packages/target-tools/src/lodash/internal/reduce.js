import isNil from "./isNil";
import isArray from "./isArray";
import castFunction from "./_castFunction";
import baseEach from "./_baseEach";

const arrayReduce = (iteratee, accumulator, collection) =>
  collection.reduce(iteratee, accumulator);

const baseReduce = (iteratee, accumulator, collection) => {
  let localAcc = accumulator;

  baseEach((value, key) => {
    localAcc = iteratee(localAcc, value, key);
  }, collection);

  return localAcc;
};

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {Array|Object} collection The collection to iterate over.
 * @returns {*} Returns the accumulated value.
 * @see _.reduceRight
 * @example
 *
 * _.reduce(function(sum, n) {
 *   return sum + n;
 * }, 0, [1, 2]);
 * // => 3
 *
 * _.reduce(function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {}, { 'a': 1, 'b': 2, 'c': 1 });
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(iteratee, accumulator, collection) {
  if (isNil(collection)) {
    return accumulator;
  }

  const func = isArray(collection) ? arrayReduce : baseReduce;

  return func(castFunction(iteratee), accumulator, collection);
}

export default reduce;
