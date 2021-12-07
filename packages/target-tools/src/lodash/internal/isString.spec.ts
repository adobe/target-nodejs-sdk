import isString from "./isString";

describe("isString", () => {
  it("undefined should not be string", () => {
    expect(isString(undefined)).toBe(false);
  });

  it("null should not be string", () => {
    expect(isString(null)).toBe(false);
  });

  it("string literal should be string", () => {
    expect(isString("123")).toBe(true);
  });

  it("string object should be string", () => {
    expect(isString(String("123"))).toBe(true);
  });

  it("string object via new should be string", () => {
    /* eslint-disable */
    const str = new String("123");
    /* eslint-enable */

    expect(isString(str)).toBe(true);
  });
});
