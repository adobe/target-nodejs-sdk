import isBlank from "./isBlank";

describe("isBlank", () => {
  it("undefined should be blank", () => {
    expect(isBlank(undefined)).toBe(true);
  });

  it("null should be blank", () => {
    expect(isBlank(null)).toBe(true);
  });

  it("empty string should be blank", () => {
    expect(isBlank("")).toBe(true);
  });

  it("string with spaces should be blank", () => {
    expect(isBlank("  ")).toBe(true);
  });
});
