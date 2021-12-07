import keys from "./keys";

describe("keys", () => {
  it("keys null", () => {
    expect(keys(null)).toEqual([]);
  });

  it("keys array", () => {
    expect(keys([1, 2, 3])).toEqual(["0", "1", "2"]);
  });

  it("keys object", () => {
    expect(keys({ a: 1, b: 2, c: 3 })).toEqual(["a", "b", "c"]);
  });
});
