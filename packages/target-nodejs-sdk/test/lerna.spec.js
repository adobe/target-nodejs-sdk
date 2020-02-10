const { decide } = require("@adobe/target-decisioning-engine");

it("should have target-decisioning-engine as a dependency", () => {
  expect(decide(2, 7)).toBe(9);
});
