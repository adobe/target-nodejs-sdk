import map from "./map";

describe("map", () => {
  it("map null", () => {
    const arr = map(e => e > 2, null);

    expect(arr).toEqual([]);
  });

  it("map array", () => {
    const arr = map(e => e * 2, [1, 2, 3]);

    expect(arr).toEqual([2, 4, 6]);
  });

  it("map object", () => {
    const obj = map(v => v * 2, { a: 1, b: 2, c: 3 });

    expect(obj).toEqual({ a: 2, b: 4, c: 6 });
  });

  it("map without iteratee", () => {
    const obj = map(null, { a: 1, b: 2, c: 3 });

    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });
});
