import MurmurHash3 from "./murmurhash3";
import { memoize } from "./utils";

function hashUnencodedCharsRaw(stringValue, seed = 0) {
  return MurmurHash3.hashString(stringValue, stringValue.length, seed);
}

function hashStringRaw(stringValue, seed = 0) {
  return MurmurHash3.hashBytes(stringValue, stringValue.length, seed);
}

export const hashUnencodedChars = memoize(
  hashUnencodedCharsRaw,
  arr => `${arr[0]}.${arr[1]}`
);
export const hashString = memoize(hashStringRaw, arr => `${arr[0]}.${arr[1]}`);
