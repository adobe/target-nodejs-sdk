import TelemetryProvider from "./telemetryProvider";

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
    const request = provider.executeTelemetries(TARGET_REQUEST);

    expect(request).toHaveProperty("telemetry");
    expect(request.telemetry).toHaveProperty("entries");
    expect(request.telemetry.entries.length).toEqual(1);
    expect(request.telemetry.entries[0]).toEqual(
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
    const provider = TelemetryProvider(TARGET_REQUEST, undefined, false);

    provider.addEntry(TARGET_TELEMETRY_ENTRY);
    const request = provider.sendTelemetries(TARGET_REQUEST);

    expect(request).not.toHaveProperty("telemetry");
  });
});
