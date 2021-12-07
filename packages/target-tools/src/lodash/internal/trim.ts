import isNil from "./isNil";

const { prototype: stringProto } = String;
const { trim: nativeStringTrim } = stringProto;

function trim(string) {
  return isNil(string) ? "" : nativeStringTrim.call(string);
}

export default trim;
