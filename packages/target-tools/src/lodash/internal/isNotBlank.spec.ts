import isNotBlank from "./isNotBlank";

describe("isNotBlank", () => {
  it("undefined should be blank", () => {
    expect(isNotBlank(undefined)).toBe(false);
  });

  it("null should be blank", () => {
    expect(isNotBlank(null)).toBe(false);
  });

  it("empty string should be blank", () => {
    expect(isNotBlank("")).toBe(false);
  });

  it("string with spaces should be blank", () => {
    expect(isNotBlank("  ")).toBe(false);
  });

  it("string with padding should not be blank", () => {
    expect(isNotBlank(" 123 ")).toBe(true);
  });
});
