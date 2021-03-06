import isNil from "./isNil";

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  if (isNil(array)) {
    return [];
  }

  /* eslint-disable */
  return [].concat.apply([], array);
  /* eslint-enable */
}

export default flatten;
