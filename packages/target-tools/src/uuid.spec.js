import uuid from "./uuid";
import rng from "./uuid/rng";
import v4 from "./uuid/v4";

describe("uuid", () => {
  it("subsequent uuid invocations should not be equal", () => {
    expect(uuid()).not.toEqual(uuid());
  });

  it("has uuid", () => {
    expect(uuid).toBeDefined();
    expect(typeof uuid).toEqual("function");
    const id = uuid();
    expect(id).toEqual(expect.any(String));
    expect(id.length).toEqual(32);
  });

  it("subsequent v4 invocations should not be equal", () => {
    const result1 = v4(rng);
    const result2 = v4(rng);

    expect(result1.length).toEqual(32);
    expect(result2.length).toEqual(32);
    expect(result1).not.toEqual(result2);
  });
});
