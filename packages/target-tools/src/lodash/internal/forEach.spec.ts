import forEach from "./forEach";

describe("forEach", () => {
  it("forEach null", () => {
    const result = [];

    forEach(e => result.push(e), null);

    expect(result).toEqual([]);
  });

  it("forEach array", () => {
    const result = [];

    forEach(e => result.push(e), [1, 2, 3]);

    expect(result).toEqual([1, 2, 3]);
  });

  it("forEach object", () => {
    const result = {};

    forEach(
      (v, k) => {
        result[k] = v;
      },
      { a: 1, b: 2, c: 3 }
    );

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
});
