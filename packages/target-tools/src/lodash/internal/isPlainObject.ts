import baseGetTag from "./_baseGetTag";
import isObjectLike from "./isObjectLike";

const objectTag = "[object Object]";
const { prototype: funcProto } = Function;
const { prototype: objectProto } = Object;
const { toString: funcToString } = funcProto;
const { hasOwnProperty } = objectProto;
const objectCtorString = funcToString.call(Object);

function getPrototype(value) {
  return Object.getPrototypeOf(Object(value));
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
    return false;
  }

  const proto = getPrototype(value);

  if (proto === null) {
    return true;
  }

  const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;

  return (
    typeof Ctor === "function" &&
    Ctor instanceof Ctor &&
    funcToString.call(Ctor) === objectCtorString
  );
}

export default isPlainObject;
