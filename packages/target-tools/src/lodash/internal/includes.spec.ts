import includes from "./includes";

describe("includes", () => {
  it("includes for null and undefined", () => {
    expect(includes(null, null)).toBe(false);
    expect(includes(undefined, undefined)).toBe(false);
    expect(includes(null, undefined)).toBe(false);
    expect(includes(undefined, null)).toBe(false);
  });

  it("includes for array", () => {
    expect(includes(1, [1, 2, 3])).toBe(true);
  });

  it("includes for object", () => {
    expect(includes(1, { a: 1, b: 2, c: 3 })).toBe(true);
  });
});
