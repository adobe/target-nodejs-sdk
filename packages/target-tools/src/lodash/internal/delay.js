/**
 * The base implementation of `_.delay` and `_.defer` which accepts `args`
 * to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation
 * @returns {Number} timer ID
 */
export function delay(func, wait = 0) {
  return setTimeout(func, Number(wait) || 0);
}

export function cancelDelay(id) {
  clearTimeout(id);
}
