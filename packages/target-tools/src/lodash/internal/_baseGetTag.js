const { prototype: objectProto } = Object;
const { toString: nativeObjectToString } = objectProto;

function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString(value);
}

export default baseGetTag;
