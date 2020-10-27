import isNil from "./isNil";

describe("isNil", () => {
  it("undefined should be nil", () => {
    expect(isNil(undefined)).toBe(true);
  });

  it("null should be nil", () => {
    expect(isNil(null)).toBe(true);
  });

  it("object should be not nil", () => {
    expect(isNil({})).toBe(false);
  });
});
