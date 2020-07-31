import toArray from "./toArray";

describe("toArray", () => {
  it("toArray null", () => {
    expect(toArray(null)).toEqual([]);
  });

  it("toArray string", () => {
    expect(toArray("123")).toEqual(["1", "2", "3"]);
  });

  it("toArray object", () => {
    expect(toArray({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3]);
  });

  it("toArray array", () => {
    expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
