import stringify from "./stringify";

/* eslint-disable no-bitwise */
export default function v4(rng) {
  const buffer = rng();

  buffer[6] = (buffer[6] & 0x0f) | 0x40;
  buffer[8] = (buffer[8] & 0x3f) | 0x80;

  return stringify(buffer);
}
/* eslint-enable no-bitwise */
