import isEmpty from "./isEmpty";

describe("isEmpty", () => {
  it("undefined should be empty", () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it("null should be empty", () => {
    expect(isEmpty(null)).toBe(true);
  });

  it("empty object should be empty", () => {
    expect(isEmpty({})).toBe(true);
  });

  it("empty array should be empty", () => {
    expect(isEmpty([])).toBe(true);
  });

  it("object without keys should be empty", () => {
    expect(isEmpty({})).toBe(true);
  });

  it("object with keys should not be empty", () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it("array with should values not be empty", () => {
    expect(isEmpty([1, 2])).toBe(false);
  });

  it("object with constructor with keys should not be empty", () => {
    function Test() {
      this.a = 1;
    }

    expect(isEmpty(new Test())).toBe(false);
  });
});
