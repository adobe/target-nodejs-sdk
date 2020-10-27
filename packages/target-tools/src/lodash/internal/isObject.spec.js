import isObject from "./isObject";

describe("isObject", () => {
  it("undefined should not be object", () => {
    expect(isObject(undefined)).toBe(false);
  });

  it("null should not be object", () => {
    expect(isObject(null)).toBe(false);
  });

  it("object should be object", () => {
    expect(isObject({})).toBe(true);
  });

  it("object with constructor should be object", () => {
    function Test() {}

    expect(isObject(new Test())).toBe(true);
  });

  it("object via new should be object", () => {
    /* eslint-disable */
    const obj = new Object(123);
    /* eslint-enable */

    expect(isObject(obj)).toBe(true);
  });
});
