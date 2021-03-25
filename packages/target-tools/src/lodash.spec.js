import { uuid } from "./lodash";

describe("lodash", () => {
  it("has uuid", () => {
    expect(uuid).toBeDefined();
    expect(typeof uuid).toEqual("function");
    const id = uuid();
    expect(id).toEqual(expect.any(String));
    expect(id.length).toEqual(32);
  });
});
