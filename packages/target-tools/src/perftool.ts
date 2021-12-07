/* eslint-disable import/prefer-default-export */
import now from "performance-now";
import { isDefined, isUndefined } from "./utils";

export function createPerfToolInstance() {
  let timingIds = {};
  let startTimes = {};
  let timings: Record<string, number> = {};

  function getUniqueTimingId(id: string): string {
    const count = (isDefined(timingIds[id]) ? timingIds[id] : 0) + 1;
    timingIds[id] = count;

    return `${id}${count}`;
  }

  function timeStart(id: string, incrementTimer: boolean = false): string {
    const timingId = incrementTimer ? getUniqueTimingId(id) : id;
    if (isUndefined(startTimes[timingId])) {
      startTimes[timingId] = now();
    }
    return timingId;
  }

  function timeEnd(id: string, offset: number = 0): number {
    if (isUndefined(startTimes[id])) {
      return -1;
    }

    const timing = now() - startTimes[id] - offset;
    timings[id] = timing;
    return timing;
  }

  function clearTiming(id: string) {
    delete timingIds[id];
    delete startTimes[id];
    delete timings[id];
  }

  function reset(): void {
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
