/* eslint-disable no-undef */
import { isBrowser, isNodeJS, noop } from "./utils";
import { now as defaultNow } from "./lodash";

const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;

let nodeJsNow = noop;

function getNanoSeconds() {
  const hr = process.hrtime();

  return hr[0] * NS_PER_SEC + hr[1];
}

if (isNodeJS()) {
  const upTime = process.uptime() * NS_PER_SEC;
  const moduleLoadTime = getNanoSeconds();
  const nodeLoadTime = moduleLoadTime - upTime;

  // Same nano-precision implementation as performance-now lib
  nodeJsNow = function nanoPrecisionNow() {
    return (getNanoSeconds() - nodeLoadTime) / MS_PER_NS;
  };
}

function getNowImpl() {
  if (isBrowser()) {
    if (window.performance && typeof window.performance.now === "function") {
      return window.performance.now.bind(window.performance);
    }
    return defaultNow;
  }
  return nodeJsNow;
}

export default getNowImpl();
