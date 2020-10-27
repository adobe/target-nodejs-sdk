import trim from "./trim";

describe("trim", () => {
  it("trim of undefined should be empty", () => {
    expect(trim(undefined)).toBe("");
  });

  it("trim of null should be empty", () => {
    expect(trim(null)).toBe("");
  });

  it("trim should remove leading and trailing spaces", () => {
    expect(trim("  123 ")).toBe("123");
  });

  it("trim should leave spaces inside string", () => {
    expect(trim("  12 3 ")).toBe("12 3");
  });

  it("trim should not modify ordinary string", () => {
    expect(trim("12 3")).toBe("12 3");
  });
});
