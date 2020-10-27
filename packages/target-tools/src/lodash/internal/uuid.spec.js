import uuid from "./uuid";

describe("uuid", () => {
  it("subsequent uuid invocations should not be equal", () => {
    expect(uuid()).not.toEqual(uuid());
  });
});
