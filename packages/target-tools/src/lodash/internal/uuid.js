import now from "./now";

/**
 * Generates uuid 4
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @returns {String} Returns uuid.
 * @example
 *
 * _.uuid();
 * // => 9e2b9553b62a4d47960d0914e5c77370
 */

function random(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

function uuid() {
  let d = now();

  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, c => {
    /* eslint-disable */
    const r = (d + random(0, 16)) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    /* eslint-enable */
  });
}

export default uuid;
