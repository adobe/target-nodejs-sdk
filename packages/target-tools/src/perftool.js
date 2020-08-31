/* eslint-disable import/prefer-default-export */
import { now } from "./lodash";
import { isDefined, isUndefined } from "./utils";

let timingIds = {};
let startTimes = {};
let timings = {};

function getUniqueTimingId(id) {
  const count = (isDefined(timingIds[id]) ? timingIds[id] : 0) + 1;
  timingIds[id] = count;

  return `${id}${count}`;
}

function timeStart(id, incrementTimer = false) {
  const timingId = incrementTimer ? getUniqueTimingId(id) : id;
  if (isUndefined(startTimes[timingId])) {
    startTimes[timingId] = now();
  }
  return timingId;
}

function timeEnd(id, offset = 0) {
  if (isUndefined(startTimes[id])) return `No timer was started for "${id}"`;

  const timing = now() - startTimes[id] - offset;
  timings[id] = timing;
  return timing;
}

function reset() {
  timingIds = {};
  startTimes = {};
  timings = {};
}

export const perfTool = {
  timeStart,
  timeEnd,
  getTimings: () => timings,
  getTiming: key => timings[key],
  reset
};
