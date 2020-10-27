import isFunction from "./isFunction";

/* eslint-disable no-cond-assign */
function flow(funcs) {
  const length = funcs ? funcs.length : 0;
  let index = length;

  while ((index -= 1)) {
    if (!isFunction(funcs[index])) {
      throw new TypeError("Expected a function");
    }
  }

  return (...args) => {
    let i = 0;
    let result = length ? funcs[i].apply(this, args) : args[0];

    while ((i += 1) < length) {
      result = funcs[i].call(this, result);
    }

    return result;
  };
}

export default flow;
