import flow from "./flow";

describe("flow", () => {
  it("flow simple math", () => {
    const add = x => x + 1;
    const square = x => x * 2;
    const func = flow([add, square]);

    expect(func(2)).toEqual(6);
  });

  it("flow passing objects", () => {
    const first = x => Object.assign(x, { a: 1 });
    const second = x => Object.assign(x, { b: 2 });
    const func = flow([first, second]);

    expect(func({})).toEqual({ a: 1, b: 2 });
  });
});
