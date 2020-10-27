import filter from "./filter";

describe("filter", () => {
  it("filter null", () => {
    const arr = filter(e => e > 2, null);

    expect(arr).toEqual([]);
  });

  it("filter array", () => {
    const arr = filter(e => e > 2, [1, 2, 3]);

    expect(arr).toEqual([3]);
  });

  it("filter object value", () => {
    const obj = filter(v => v !== null, { a: 1, b: 2, c: null });

    expect(obj).toEqual({ a: 1, b: 2 });
  });

  it("filter object key", () => {
    const obj = filter((v, k) => k !== "", { "a": 1, "b": 2, "": 3 });

    expect(obj).toEqual({ a: 1, b: 2 });
  });
});
