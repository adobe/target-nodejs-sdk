import assign from "./assign";

describe("assign", () => {
  it("assign null", () => {
    const obj = assign({}, null);

    expect(obj).toEqual({});
  });

  it("assign multiple objs", () => {
    const obj = assign({}, { a: 1 }, { b: 2 }, { c: 3 });

    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("assign multiple objs with overrides from right", () => {
    const obj = assign({}, { a: 1 }, { b: 2 }, { a: 3 });

    expect(obj).toEqual({ a: 3, b: 2 });
  });
});
