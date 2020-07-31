import reverse from "./reverse";

describe("reverse", () => {
  it("reverse null or undefined", () => {
    expect(reverse(null)).toEqual(null);
    expect(reverse(undefined)).toEqual(undefined);
  });

  it("reverse empty array", () => {
    expect(reverse([])).toEqual([]);
  });

  it("reverse array", () => {
    expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  });
});
