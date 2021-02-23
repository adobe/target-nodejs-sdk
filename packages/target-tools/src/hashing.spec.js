import { hashUnencodedChars } from "./hashing";

const { hashString } = require("./hashing");

describe("hashing", () => {
  it("hashString", () => {
    const key = "someClientId.123456.tntId123.salty";

    expect(hashString(key)).toEqual(-785716448);
  });

  it("hashUnencodedChars", () => {
    expect(hashUnencodedChars("someClientId.123456.tntId123.salty")).toEqual(
      -1846592194
    );

    expect(
      hashUnencodedChars(
        "targettesting.125880.4c038b35f1b1453d80a3e7da8208c617.campaign"
      )
    ).toEqual(-683299703);
  });
});
