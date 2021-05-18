import crypto from "crypto";

const BUFFER = new Uint8Array(256);
let BUFFER_PTR = BUFFER.length;

export default function rng() {
  if (BUFFER_PTR > BUFFER.length - 16) {
    crypto.randomFillSync(BUFFER);
    BUFFER_PTR = 0;
  }

  /* eslint-disable no-return-assign */
  return BUFFER.slice(BUFFER_PTR, (BUFFER_PTR += 16));
}
