import flatten from "./flatten";

describe("flatten", () => {
  it("flatten null", () => {
    expect(flatten(null)).toEqual([]);
  });

  it("flatten nested array 1 level", () => {
    expect(flatten([1, 2, [3], [4]])).toEqual([1, 2, 3, 4]);
  });

  it("flatten nested array ONLY 1 level", () => {
    expect(flatten([1, 2, [3, [5]], [4]])).toEqual([1, 2, 3, [5], 4]);
  });
});
