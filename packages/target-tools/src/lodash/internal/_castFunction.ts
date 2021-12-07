import isFunction from "./isFunction";
import identity from "./identity";

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return isFunction(value) ? value : identity;
}

export default castFunction;
