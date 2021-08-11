import { TelemetryProvider } from "./telemetryProvider";
import { DECISIONING_METHOD, EXECUTION_MODE } from "./enums";
import { noop } from "./utils";

describe("TelemetryProvider", () => {
  const TARGET_REQUEST = {
    requestId: "123456"
  };
  const TARGET_NOTIFICATION_REQUEST = {
    notifications: []
  };
  const TARGET_TELEMETRY_ENTRY = {
    execution: 1
  };
  const STATUS_OK = 200;
  const PARTIAL_CONTENT = 206;

  it("adds and executes entries", () => {
    const mockExecute = jest.fn();

    const provider = TelemetryProvider(mockExecute);

    provider.addEntry(TARGET_REQUEST, TARGET_TELEMETRY_ENTRY, STATUS_OK);
    provider.addEntry(TARGET_REQUEST, TARGET_TELEMETRY_ENTRY, STATUS_OK);
    provider.addEntry(TARGET_REQUEST, TARGET_TELEMETRY_ENTRY, STATUS_OK);

    expect(provider.getEntries().length).toBe(3);

    provider.executeTelemetries(TARGET_NOTIFICATION_REQUEST);

    expect(provider.getEntries().length).toBe(0);
    expect(mockExecute.mock.calls.length).toBe(1);
    expect(mockExecute.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        notifications: expect.any(Array)
      })
    );
    expect(mockExecute.mock.calls[0][1][0]).toEqual(
      expect.objectContaining({
        requestId: expect.any(String),
        timestamp: expect.any(Number),
        mode: "edge",
        features: {
          decisioningMethod: expect.any(String),
          executePageLoad: expect.any(Boolean),
          executeMboxCount: expect.any(Number),
          prefetchPageLoad: expect.any(Boolean),
          prefetchMboxCount: expect.any(Number),
          prefetchViewCount: expect.any(Number)
        },
        execution: 1
      })
    );

    const entries = provider.getEntries();
    expect(entries.length).toEqual(0);
  });

  it("adds render entries", () => {
    const provider = TelemetryProvider(noop);

    provider.addRenderEntry(
      TARGET_REQUEST.requestId,
      TARGET_TELEMETRY_ENTRY.execution
    );

    const entries = provider.getEntries();

    expect(entries.length).toBe(1);
    expect(entries[0]).toEqual(
      expect.objectContaining({
        requestId: TARGET_REQUEST.requestId,
        timestamp: expect.any(Number),
        execution: 1
      })
    );
  });

  it("assigns local execution mode", () => {
    const provider = TelemetryProvider(noop);

    provider.addEntry(
      TARGET_REQUEST,
      TARGET_TELEMETRY_ENTRY,
      STATUS_OK,
      DECISIONING_METHOD.ON_DEVICE
    );
    provider.addEntry(
      TARGET_REQUEST,
      TARGET_TELEMETRY_ENTRY,
      STATUS_OK,
      DECISIONING_METHOD.HYBRID
    );

    const entries = provider.getEntries();

    expect(entries[0].mode).toEqual(EXECUTION_MODE.LOCAL);
    expect(entries[1].mode).toEqual(EXECUTION_MODE.LOCAL);
  });

  it("assigns edge execution mode", () => {
    const provider = TelemetryProvider(noop);

    provider.addEntry(
      TARGET_REQUEST,
      TARGET_TELEMETRY_ENTRY,
      STATUS_OK,
      DECISIONING_METHOD.SERVER_SIDE
    );
    provider.addEntry(
      TARGET_REQUEST,
      TARGET_TELEMETRY_ENTRY,
      PARTIAL_CONTENT,
      DECISIONING_METHOD.ON_DEVICE
    );
    provider.addEntry(
      TARGET_REQUEST,
      TARGET_TELEMETRY_ENTRY,
      PARTIAL_CONTENT,
      DECISIONING_METHOD.HYBRID
    );

    const entries = provider.getEntries();

    expect(entries[0].mode).toEqual(EXECUTION_MODE.EDGE);
    expect(entries[1].mode).toEqual(EXECUTION_MODE.EDGE);
    expect(entries[2].mode).toEqual(EXECUTION_MODE.EDGE);
  });

  it("disables telemetries", () => {
    const mockExecute = jest.fn();

    const provider = TelemetryProvider(mockExecute, false);

    provider.addEntry(TARGET_REQUEST, TARGET_TELEMETRY_ENTRY);

    const entries = provider.getEntries();
    expect(entries.length).toEqual(0);

    provider.executeTelemetries(TARGET_NOTIFICATION_REQUEST);

    expect(mockExecute.mock.calls.length).toBe(0);
  });
});
