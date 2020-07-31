import hash from "./hash";

describe("hash", () => {
  it("hash null", () => {
    expect(hash(null)).toEqual(-1);
  });

  it("hash undefined", () => {
    expect(hash(undefined)).toEqual(-1);
  });

  it("hash empty string", () => {
    expect(hash("")).toEqual(0);
  });

  it("hash not string", () => {
    expect(hash([1, 2, 3])).toEqual(-1);
  });

  it("hash string", () => {
    expect(hash("test")).toEqual(hash("test"));
  });

  it("hash string should differ is strings are different", () => {
    expect(hash("test")).not.toEqual(hash("test1"));
  });
});
