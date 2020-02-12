const TargetDecisioningEngine = require("@adobe/target-decisioning-engine");

it("should have target-decisioning-engine as a dependency", () => {
  expect(typeof TargetDecisioningEngine.initialize).toBe("function");
});
