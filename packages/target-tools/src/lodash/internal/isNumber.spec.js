import isNumber from "./isNumber";

describe("isNumber", () => {
  it("undefined should not be number", () => {
    expect(isNumber(undefined)).toBe(false);
  });

  it("null should not be number", () => {
    expect(isNumber(null)).toBe(false);
  });

  it("object should not be number", () => {
    expect(isNumber({})).toBe(false);
  });

  it("number literal should be number", () => {
    expect(isNumber(1)).toBe(true);
  });

  it("number object should be number", () => {
    /* eslint-disable */
    const num = new Number(123);
    /* eslint-enable */

    expect(isNumber(num)).toBe(true);
  });
});
