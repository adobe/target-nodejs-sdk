import { TelemetryProvider } from "./telemetryProvider";

describe("TelemetryProvider", () => {
  const TARGET_REQUEST = {
    requestId: "123456"
  };

  const TARGET_TELEMETRY_ENTRY = {
    execution: 1
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("adds an entry", () => {
    const mockExecute = jest.fn();

    const provider = TelemetryProvider(TARGET_REQUEST, mockExecute);

    provider.addEntry(TARGET_TELEMETRY_ENTRY);
    provider.executeTelemetries(TARGET_REQUEST);

    expect(mockExecute.mock.calls.length).toBe(1);
    expect(mockExecute.mock.calls[0][1][0]).toEqual(
      expect.objectContaining({
        requestId: expect.any(String),
        timestamp: expect.any(Number),
        features: {
          decisioningMethod: expect.any(String)
        }
      })
    );

    const entries = provider.getEntries();
    expect(entries.length).toEqual(0);
  });

  it("disables telemetries", () => {
    const mockExecute = jest.fn();

    const provider = TelemetryProvider(TARGET_REQUEST, mockExecute, false);

    provider.addEntry(TARGET_TELEMETRY_ENTRY);

    const entries = provider.getEntries();
    expect(entries.length).toEqual(0);

    provider.executeTelemetries(TARGET_REQUEST);

    expect(mockExecute.mock.calls.length).toBe(0);
  });
});
