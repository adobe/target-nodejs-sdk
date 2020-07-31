import reduce from "./reduce";

describe("reduce", () => {
  it("reduce null", () => {
    const sum = reduce((a, b) => a + b, 0, null);

    expect(sum).toEqual(0);
  });

  it("reduce empty", () => {
    const sum = reduce((a, b) => a + b, 0, []);

    expect(sum).toEqual(0);
  });

  it("reduce array", () => {
    const sum = reduce((a, b) => a + b, 0, [1, 2]);

    expect(sum).toEqual(3);
  });

  it("reduce object", () => {
    const grouped = reduce(
      (acc, value, key) => {
        if (!acc[value]) {
          acc[value] = [];
        }

        acc[value].push(key);

        return acc;
      },
      {},
      { a: 1, b: 2, c: 1 }
    );

    expect(grouped).toEqual({ 1: ["a", "c"], 2: ["b"] });
  });
});
