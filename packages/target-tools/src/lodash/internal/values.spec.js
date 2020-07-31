import values from "./values";

describe("values", () => {
  it("empty array", () => {
    expect(values({})).toEqual([]);
    expect(values(undefined)).toEqual([]);
    expect(values(null)).toEqual([]);
  });

  it("values array", () => {
    expect(
      values({
        a: 1,
        b: 2,
        c: 3,
        d: false,
        e: { alf: true },
        f: "moo"
      })
    ).toEqual([1, 2, 3, false, { alf: true }, "moo"]);
  });
});
