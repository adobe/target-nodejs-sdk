import { memoize } from "./utils";

describe("memoize", () => {
  it("memoizes with default key", () => {
    const someFunction = jest.fn(x => x * 2);

    const memoizedFunction = memoize(someFunction);

    for (let i = 0; i < 10; i += 1) {
      expect(memoizedFunction(i)).toEqual(i * 2);
    }

    expect(someFunction).toHaveBeenCalledTimes(10);

    for (let i = 0; i < 10; i += 1) {
      expect(memoizedFunction(i)).toEqual(i * 2);
    }

    expect(someFunction).toHaveBeenCalledTimes(10);
  });

  it("memoizes with unique key", () => {
    const someFunction = jest.fn(x => x * 2);

    const memoizedFunction = memoize(someFunction, arr => `key-${arr[0]}`);

    for (let i = 0; i < 10; i += 1) {
      expect(memoizedFunction(i)).toEqual(i * 2);
    }

    expect(someFunction).toHaveBeenCalledTimes(10);

    for (let i = 0; i < 10; i += 1) {
      expect(memoizedFunction(i)).toEqual(i * 2);
    }

    expect(someFunction).toHaveBeenCalledTimes(10);
  });

  it("passes all arguments to original function", () => {
    const someFunction = jest.fn((x, y, z) => x + y + z);

    const memoizedFunction = memoize(someFunction, arr => arr.join("."));

    expect(memoizedFunction(5, 10, 15)).toEqual(30);
    expect(memoizedFunction(5, 10, 15)).toEqual(30);

    expect(someFunction).toHaveBeenCalledTimes(1);
  });
});
