import first from "./first";

describe("first", () => {
  it("first of undefined", () => {
    expect(first(undefined)).toEqual(undefined);
  });

  it("first of null", () => {
    expect(first(null)).toEqual(undefined);
  });

  it("first of empty array", () => {
    expect(first([])).toEqual(undefined);
  });

  it("first of array", () => {
    expect(first([1, 2, 3])).toEqual(1);
  });
});
