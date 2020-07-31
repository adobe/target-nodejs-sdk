import split from "./split";

describe("split", () => {
  it("split undefined should be empty array", () => {
    expect(split("|", undefined)).toEqual([]);
  });

  it("split null should be empty array", () => {
    expect(split("|", null)).toEqual([]);
  });

  it("split by separator should return an array of values", () => {
    expect(split("|", "1|2|3")).toEqual(["1", "2", "3"]);
  });
});
