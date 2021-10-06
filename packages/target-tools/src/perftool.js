/* eslint-disable import/prefer-default-export */
import { isDefined, isUndefined } from "./utils";

const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;

function getNanoSeconds() {
  const hr = process.hrtime();

  return hr[0] * NS_PER_SEC + hr[1];
}

const UP_TIME = process.uptime() * NS_PER_SEC;
const MODULE_LOAD_TIME = getNanoSeconds();
const NODE_LOAD_TIME = MODULE_LOAD_TIME - UP_TIME;

// Same nano-precision implementation as performance-now lib
export function now() {
  return (getNanoSeconds() - NODE_LOAD_TIME) / MS_PER_NS;
}

export function createPerfToolInstance() {
  let timingIds = {};
  let startTimes = {};
  let timings = {};

  /**
   * getUniqueTimingId
   * @param {string} id
   * @return {string}
   */
  function getUniqueTimingId(id) {
    const count = (isDefined(timingIds[id]) ? timingIds[id] : 0) + 1;
    timingIds[id] = count;

    return `${id}${count}`;
  }

  /**
   * timeStart
   * @param {string} id
   * @param {boolean} incrementTimer
   * @return {string}
   */
  function timeStart(id, incrementTimer = false) {
    const timingId = incrementTimer ? getUniqueTimingId(id) : id;
    if (isUndefined(startTimes[timingId])) {
      startTimes[timingId] = now();
    }
    return timingId;
  }

  /**
   * timeEnd
   * @param {string} id
   * @param {number} offset
   * @return {number}
   */
  function timeEnd(id, offset = 0) {
    if (isUndefined(startTimes[id])) {
      return -1;
    }

    const timing = now() - startTimes[id] - offset;
    timings[id] = timing;
    return timing;
  }

  function clearTiming(id) {
    delete timingIds[id];
    delete startTimes[id];
    delete timings[id];
  }

  function reset() {
    timingIds = {};
    startTimes = {};
    timings = {};
  }

  return {
    timeStart,
    timeEnd,
    getTimings: () => timings,
    getTiming: key => timings[key],
    clearTiming,
    reset
  };
}

export const perfTool = createPerfToolInstance();
