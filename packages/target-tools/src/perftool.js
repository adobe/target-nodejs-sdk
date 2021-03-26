/* eslint-disable import/prefer-default-export */
import now from "performance-now";
import { isDefined, isUndefined } from "./utils";

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
    reset
  };
}

export const perfTool = createPerfToolInstance();
