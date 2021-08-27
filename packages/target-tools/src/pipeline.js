import { isFunction } from "./lodash";
import { isUndefined } from "./utils";

function isAStep(step) {
  if (isUndefined(step)) {
    return false;
  }

  if (
    !Object.prototype.hasOwnProperty.call(step, "execute") ||
    !isFunction(step.execute)
  ) {
    return false;
  }

  return true;
}

export function createStep(fn) {
  return {
    execute: (...args) => {
      return fn.apply(null, [...args]);
    }
  };
}

export function createPipeline(initialSteps = []) {
  const steps = [];

  function addStep(step) {
    if (isAStep(step)) {
      steps.push(step);
    }

    if (isFunction(step)) {
      steps.push(createStep(step));
    }
  }

  initialSteps.forEach(step => addStep(step));

  return {
    addStep,

    stepCount: () => steps.length,

    execute: (value, context = {}) => {
      let result = value;
      steps.forEach(step => {
        result = step.execute.apply(null, [result, context]);
      });

      return result;
    }
  };
}
