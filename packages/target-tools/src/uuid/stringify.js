import { join } from "../lodash";

function createByteToHex() {
  const result = [];

  for (let i = 0; i < 256; i += 1) {
    result.push((i + 0x100).toString(16).substr(1));
  }

  return result;
}

const BYTE_TO_HEX = createByteToHex();

export default function stringify(arr) {
  const result = [];

  for (let i = 0; i < 16; i += 1) {
    result.push(BYTE_TO_HEX[arr[i]]);
  }

  return join("", result).toLowerCase();
}
