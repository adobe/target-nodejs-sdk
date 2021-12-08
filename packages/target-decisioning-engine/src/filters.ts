/* eslint-disable import/prefer-default-export */
import { includes, isUndefined } from "@adobe/target-tools";

/**
 *
 * @param {String} propertyToken
 * @return {function(import("../types/DecisioningArtifact").Rule): boolean}
 */
export function byPropertyToken(propertyToken) {
  /**
   * @param {import("../types/DecisioningArtifact").Rule} rule
   * @return {boolean}
   */
  function filter(rule) {
    const { propertyTokens = [] } = rule;

    return isUndefined(propertyToken)
      ? propertyTokens.length === 0
      : propertyTokens.length === 0 || includes(propertyToken, propertyTokens);
  }
  return filter;
}
