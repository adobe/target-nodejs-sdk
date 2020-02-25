import jsonLogic from "json-logic-js";

export function getDecisions(context, rules) {
  // need a mechanism for processing rules based on version number
  const consequences = rules.reduce((result, rule) => {
    if (jsonLogic.apply(rule.condition, context)) {
      result.push(rule.consequence);
    }
    return result;
  }, []);
  return Promise.resolve(consequences);
}

export function getRules(definition) {
  // do some validation, check version number
  return definition.rules;
}
