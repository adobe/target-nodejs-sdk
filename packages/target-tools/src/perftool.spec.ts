import { perfTool, createPerfToolInstance } from "./perftool";

describe("perfTool", () => {
  beforeEach(() => {
    perfTool.reset();
  });

  it("can time", () =>
    new Promise<void>(done => {
      perfTool.timeStart("moo");
      setTimeout(() => {
        const timing = perfTool.timeEnd("moo");
        expect(perfTool.getTimings()).toEqual({
          moo: expect.any(Number)
        });
        expect(perfTool.getTimings().moo).toBeGreaterThanOrEqual(90);
        expect(timing).toBeGreaterThanOrEqual(90);
        done();
      }, 100);
    }));

  it("can time with offset", () =>
    new Promise<void>(done => {
      perfTool.timeStart("moo");
      setTimeout(() => {
        perfTool.timeEnd("moo", 50);
        expect(perfTool.getTimings()).toEqual({
          moo: expect.any(Number)
        });
        expect(perfTool.getTimings().moo).toBeLessThan(100);
        done();
      }, 100);
    }));

  it("can time many", () =>
    new Promise<void>(done => {
      perfTool.timeStart("moo");
      perfTool.timeStart("meow");
      perfTool.timeStart("woof");

      setTimeout(() => perfTool.timeEnd("moo"), 100);
      setTimeout(() => perfTool.timeEnd("meow"), 200);
      setTimeout(() => perfTool.timeEnd("woof"), 300);

      setTimeout(() => {
        expect(perfTool.getTimings()).toEqual({
          moo: expect.any(Number),
          meow: expect.any(Number),
          woof: expect.any(Number)
        });
        expect(perfTool.getTimings().moo).toBeGreaterThanOrEqual(90);
        expect(perfTool.getTimings().meow).toBeGreaterThanOrEqual(180);
        expect(perfTool.getTimings().woof).toBeGreaterThanOrEqual(270);
        done();
      }, 300);
    }));

  it("fails gracefully", () => {
    expect(perfTool.timeEnd("bleh")).toEqual(-1);
  });

  it("can remove by id", () => {
    const id = "moo";
    perfTool.timeStart(id);
    perfTool.clearTiming(id);
    expect(perfTool.timeEnd(id)).toEqual(-1);
  });

  it("can time repeats", () =>
    new Promise<void>(done => {
      const firstTime = perfTool.timeStart("moo", true);
      const secondTime = perfTool.timeStart("moo", true);
      const thirdTime = perfTool.timeStart("moo", true);

      expect(firstTime).toEqual("moo1");
      expect(secondTime).toEqual("moo2");
      expect(thirdTime).toEqual("moo3");

      setTimeout(() => {
        perfTool.timeEnd(firstTime);
        perfTool.timeEnd(secondTime);
        perfTool.timeEnd(thirdTime);

        const timings = perfTool.getTimings();
        expect(timings).toEqual({
          moo1: expect.any(Number),
          moo2: expect.any(Number),
          moo3: expect.any(Number)
        });
        done();
      }, 100);
    }));

  it("has microsecond precision", () => {
    const timingTool = createPerfToolInstance();
    timingTool.timeStart("abcdefg");

    expect(timingTool.timeEnd("abcdefg")).toBeGreaterThan(0);
  });
});
