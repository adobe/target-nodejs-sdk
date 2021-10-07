import now from "./now";
import { isBrowser, isNodeJS } from "./utils";

describe("now", () => {
  it("should use Node.js implementation of now", () => {
    expect(now).not.toBeUndefined();
    expect(isBrowser()).toBeFalsy();
    expect(isNodeJS()).toBeTruthy();
    const measurement = now(); // Floating point number in milliseconds
    expect(measurement.toString().indexOf(".")).toBeGreaterThan(0);
  });
});
