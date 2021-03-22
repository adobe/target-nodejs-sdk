/**
 *
 * @param {Object<any,any>} obj
 * @return {Array<any>}
 */
function values(obj) {
  if (obj === null || typeof obj !== "object") {
    return [];
  }

  return Object.keys(obj).map(key => obj[key]);
}

export default values;
