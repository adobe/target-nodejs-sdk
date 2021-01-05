import { getTestArtifacts, getTestModels } from "./test.utils";

describe("test utils", () => {
  it("has artifacts", () => {
    const testArtifacts = getTestArtifacts();
    expect(testArtifacts.length).toBeGreaterThan(0);
  });
  it("has test models", () => {
    const testModels = getTestModels();
    expect(testModels.length).toBeGreaterThan(0);
  });
});
