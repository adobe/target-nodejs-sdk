/* eslint-disable no-bitwise */
import { memoize } from "./utils";

interface HashFunction {
  (key: string): number;
}

function mul32(m, n) {
  const nlo = n & 0xffff;
  const nhi = n - nlo;
  return (((nhi * m) | 0) + ((nlo * m) | 0)) | 0;
}

/**
 * Optimized MurmurHash3 (32-bit) hashing algorithm to generate a signed numeric 10-digit hash
 * This method matches the java method used on Target Edge
 * @param stringValue
 * @param seed
 * @returns {number}
 */
function hashUnencodedCharsRaw(stringValue, seed = 0) {
  let k1;
  const len = stringValue.length;
  const c1 = 0xcc9e2d51;
  const c2 = 0x1b873593;

  let h1 = seed;
  const roundedEnd = len & ~0x1;

  for (let i = 0; i < roundedEnd; i += 2) {
    k1 = stringValue.charCodeAt(i) | (stringValue.charCodeAt(i + 1) << 16);

    k1 = mul32(k1, c1);
    k1 = ((k1 & 0x1ffff) << 15) | (k1 >>> 17); // ROTL32(k1,15);
    k1 = mul32(k1, c2);

    h1 ^= k1;
    h1 = ((h1 & 0x7ffff) << 13) | (h1 >>> 19); // ROTL32(h1,13);
    h1 = (h1 * 5 + 0xe6546b64) | 0;
  }

  if (len % 2 === 1) {
    k1 = stringValue.charCodeAt(roundedEnd);
    k1 = mul32(k1, c1);
    k1 = ((k1 & 0x1ffff) << 15) | (k1 >>> 17); // ROTL32(k1,15);
    k1 = mul32(k1, c2);
    h1 ^= k1;
  }

  // finalization
  h1 ^= len << 1;

  // fmix(h1);
  h1 ^= h1 >>> 16;
  h1 = mul32(h1, 0x85ebca6b);
  h1 ^= h1 >>> 13;
  h1 = mul32(h1, 0xc2b2ae35);
  h1 ^= h1 >>> 16;

  return h1;
}

/**
 * MurmurHash3 (32-bit) hashing algorithm to generate a signed numeric 10-digit hash
 * @param stringValue
 * @param seed
 * @returns {number}
 */
function hashStringRaw(stringValue, seed = 0) {
  let k1;
  const len = stringValue.length;
  const c1 = 0xcc9e2d51;
  const c2 = 0x1b873593;

  let h1 = seed;
  const roundedEnd = len & ~0x3;

  for (let i = 0; i < roundedEnd; i += 4) {
    k1 =
      (stringValue.charCodeAt(i) & 0xff) |
      ((stringValue.charCodeAt(i + 1) & 0xff) << 8) |
      ((stringValue.charCodeAt(i + 2) & 0xff) << 16) |
      ((stringValue.charCodeAt(i + 3) & 0xff) << 24);

    k1 = mul32(k1, c1);
    k1 = ((k1 & 0x1ffff) << 15) | (k1 >>> 17); // ROTL32(k1,15);
    k1 = mul32(k1, c2);

    h1 ^= k1;
    h1 = ((h1 & 0x7ffff) << 13) | (h1 >>> 19); // ROTL32(h1,13);
    h1 = (h1 * 5 + 0xe6546b64) | 0;
  }

  k1 = 0;

  switch (len % 4) {
    case 3:
      k1 = (stringValue.charCodeAt(roundedEnd + 2) & 0xff) << 16;
    // FALLS THROUGH to 2
    case 2:
      k1 |= (stringValue.charCodeAt(roundedEnd + 1) & 0xff) << 8;
    // FALLS THROUGH to 1
    case 1:
      k1 |= stringValue.charCodeAt(roundedEnd) & 0xff;
      k1 = mul32(k1, c1);
      k1 = ((k1 & 0x1ffff) << 15) | (k1 >>> 17); // ROTL32(k1,15);
      k1 = mul32(k1, c2);
      h1 ^= k1;
  }

  // finalization
  h1 ^= len;

  // fmix(h1);
  h1 ^= h1 >>> 16;
  h1 = mul32(h1, 0x85ebca6b);
  h1 ^= h1 >>> 13;
  h1 = mul32(h1, 0xc2b2ae35);
  h1 ^= h1 >>> 16;

  return h1;
}

export const hashUnencodedChars: HashFunction = memoize(
  hashUnencodedCharsRaw,
  arr => arr.join("-")
) as HashFunction;

export const hashString: HashFunction = memoize(hashStringRaw, arr =>
  arr.join("-")
) as HashFunction;
