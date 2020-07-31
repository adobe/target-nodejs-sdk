import isFunction from "./isFunction";

function test() {}

describe("isFunction", () => {
  it("undefined should be not function", () => {
    expect(isFunction(undefined)).toBe(false);
  });

  it("null should be not function", () => {
    expect(isFunction(null)).toBe(false);
  });

  it("object should be not function", () => {
    expect(isFunction({})).toBe(false);
  });

  it("function should be function", () => {
    expect(isFunction(test)).toBe(true);
  });

  it("lambda should be function", () => {
    expect(isFunction(() => {})).toBe(true);
  });
});
