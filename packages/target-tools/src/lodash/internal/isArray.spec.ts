import isArray from "./isArray";

function test() {}

describe("isArray", () => {
  it("undefined should not be array", () => {
    expect(isArray(undefined)).toBe(false);
  });

  it("null should not be array", () => {
    expect(isArray(null)).toBe(false);
  });

  it("string should not be array", () => {
    expect(isArray("")).toBe(false);
  });

  it("object should not be array", () => {
    expect(isArray({})).toBe(false);
  });

  it("function should not be array", () => {
    expect(isArray(test)).toBe(false);
  });

  it("number should not be array", () => {
    expect(isArray(2)).toBe(false);
  });

  it("array literal should be array", () => {
    expect(isArray([1, 2])).toBe(true);
  });

  it("array object should be array", () => {
    expect(isArray(Array(3))).toBe(true);
  });
});
