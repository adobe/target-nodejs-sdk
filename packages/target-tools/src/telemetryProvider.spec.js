import { TelemetryProvider } from "./telemetryProvider";

describe("TelemetryProvider", () => {
  const OK = 200;
  const TARGET_REQUEST = {
    requestId: "123456"
  };
  const TARGET_NOTIFICATION_REQUEST = {
    notifications: []
  };
  const TARGET_TELEMETRY_ENTRY = {
    execution: 1
  };

  it("adds and executes entries", () => {
    const mockExecute = jest.fn();

    const provider = TelemetryProvider(mockExecute);

    provider.addEntry(TARGET_REQUEST, TARGET_TELEMETRY_ENTRY, OK);
    provider.addEntry(TARGET_REQUEST, TARGET_TELEMETRY_ENTRY, OK);
    provider.addEntry(TARGET_REQUEST, TARGET_TELEMETRY_ENTRY, OK);

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
