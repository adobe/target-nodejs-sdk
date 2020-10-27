import join from "./join";

describe("join", () => {
  it("join undefined should be empty string", () => {
    expect(join("", undefined)).toEqual("");
  });

  it("join null should be empty array", () => {
    expect(join("", null)).toEqual("");
  });

  it("join with joiner should return a concatenated string", () => {
    expect(join("", [1, 2, 3])).toEqual("123");
  });
});
