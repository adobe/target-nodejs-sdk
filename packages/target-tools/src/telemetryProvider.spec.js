import TelemetryProvider from "./telemetryProvider";

describe("TelemetryProvider", () => {
  const TARGET_REQUEST = {
    requestId: "123456"
  };

  const TARGET_TELEMETRY_ENTRY = {};

  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("adds an entry", () => {
    const mockSend = jest.fn();

    const provider = TelemetryProvider(
      TARGET_REQUEST,
      mockSend,
      undefined,
      true
    );

    provider.addEntry(TARGET_TELEMETRY_ENTRY);

    provider.sendTelemetries();
    jest.runAllTimers();
    console.log(mockSend.mock.calls);
    expect(mockSend.mock.calls.length).toBe(1);
    expect(mockSend.mock.calls[0].length).toEqual(1);
    expect(mockSend.mock.calls[0][0][0]).toEqual(
      expect.objectContaining({
        requestId: expect.any(String),
        timestamp: expect.any(Number),
        features: {
          decisioningMethod: expect.any(String)
        }
      })
    );
  });

  it("disables telemetries", () => {
    const mockSend = jest.fn();

    const provider = TelemetryProvider(
      TARGET_REQUEST,
      mockSend,
      undefined,
      false
    );

    provider.addEntry(TARGET_TELEMETRY_ENTRY);
    provider.sendTelemetries();
    jest.runAllTimers();

    expect(mockSend.mock.calls.length).toBe(0);
  });
});
