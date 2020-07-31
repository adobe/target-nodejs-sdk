import isNil from "./isNil";
import isArray from "./isArray";
import castFunction from "./_castFunction";
import baseEach from "./_baseEach";

const arrayFilter = (predicate, collection) => collection.filter(predicate);

const baseFilter = (predicate, collection) => {
  const result = {};

  baseEach((value, key) => {
    if (predicate(value, key)) {
      result[key] = value;
    }
  }, collection);

  return result;
};

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {Array|Object} collection The collection to iterate over.
 * @returns {Array|Object} Returns the new filtered collection.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(function(o) { return !o.active; }, users);
 * // => objects for [{ 'user': 'fred',   'age': 40, 'active': false }]
 *
 * var params = {
 * 'param1': 'abc',
 * 'param2': null,
 * 'param3': 123
 * };
 *
 * _.filter(function(value, key) {
 *   return value !== null;
 * }, params);
 * // => * {'param1': 'abc', 'param3': 123}
 */
function filter(predicate, collection) {
  if (isNil(collection)) {
    return [];
  }

  const func = isArray(collection) ? arrayFilter : baseFilter;

  return func(castFunction(predicate), collection);
}

export default filter;
