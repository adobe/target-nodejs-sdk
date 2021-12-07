import isNil from "./isNil";
import isString from "./isString";
import isArrayLike from "./isArrayLike";
import arrayMap from "./_arrayMap";
import keys from "./keys";

function baseValues(props, object) {
  return arrayMap(key => object[key], props);
}

function copyArray(source) {
  let index = 0;
  const { length } = source;
  const array = Array(length);

  while (index < length) {
    array[index] = source[index];
    index += 1;
  }

  return array;
}

function stringToArray(str) {
  return str.split("");
}

/**
 * Converts `value` to an array.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * _.toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * _.toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * _.toArray(1);
 * // => []
 *
 * _.toArray(null);
 * // => []
 */
function toArray(value) {
  if (isNil(value)) {
    return [];
  }

  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }

  return baseValues(keys(value), value);
}

export default toArray;
