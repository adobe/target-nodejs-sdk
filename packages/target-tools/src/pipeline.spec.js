import { createPipeline, createStep } from "./pipeline";
import {
  browserFromUserAgent,
  operatingSystemFromUserAgent
} from "./clientInfo";
import { assign } from "./lodash";

describe("pipeline", () => {
  it("creates an empty pipeline", () => {
    const pipeline = createPipeline();
    expect(pipeline).not.toBeNull();
    expect(pipeline.stepCount()).toEqual(0);
  });

  it("simple pipeline", () => {
    const pipeline = createPipeline();

    const incrementStep = createStep((value, context) => {
      const { incrementBy } = context;
      return value + incrementBy;
    });

    pipeline.addStep(incrementStep);
    pipeline.addStep(incrementStep);

    expect(pipeline.stepCount()).toEqual(2);

    const result = pipeline.execute(1, { incrementBy: 2 });

    expect(result).toEqual(5);
  });

  it("object pipeline", () => {
    const pipeline = createPipeline();

    const browserStep = createStep((value, context) => {
      const { userAgent } = context;

      return assign({}, value, {
        browser: browserFromUserAgent(userAgent).name
      });
    });

    const osStep = createStep((value, context) => {
      const { userAgent } = context;

      return assign({}, value, {
        os: operatingSystemFromUserAgent(userAgent)
      });
    });

    pipeline.addStep(browserStep);
    pipeline.addStep(osStep);
    pipeline.addStep({
      execute: (value, context) => {
        const { user, id, color } = context;
        return assign({}, value, {
          identity: {
            username: user,
            id,
            color
          }
        });
      }
    });

    const pipelineContext = {
      user: "james",
      id: 14343,
      color: "orange",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
    };

    const result = pipeline.execute({}, pipelineContext);

    expect(result).toEqual({
      browser: "Chrome",
      os: "Mac OS",
      identity: {
        username: "james",
        id: 14343,
        color: "orange"
      }
    });
  });

  it("nested pipeline", () => {
    const incrementStep = createStep((value, context) => {
      const { incrementBy } = context;
      return value + incrementBy;
    });

    const decrementStep = (value, context) => {
      const { decrementBy } = context;
      return value - decrementBy;
    };

    const pipeline = createPipeline([incrementStep, incrementStep]);

    const anotherPipeline = createPipeline([decrementStep, decrementStep]);
    pipeline.addStep(anotherPipeline);
    pipeline.addStep(incrementStep);

    expect(
      pipeline.execute(0, {
        incrementBy: 3,
        decrementBy: 1
      })
    ).toEqual(7);
  });
});
