import TelemetryProvider from "./telemetryProvider";
import { DECISIONING_METHOD, EXECUTION_MODE } from "./enums";

describe("TelemetryProvider", () => {
  const EDGE_TELEMETRY_BLOB = "dsbnoew05vnlsd";
  const TARGET_REQUEST = {
    requestId: "123456",
    execute: {
      mboxes: [{}],
      pageLoad: {}
    },
    prefetch: {
      mboxes: [{}],
      pageLoad: {},
      views: [{}]
    }
  };
  const DELIVERY_RESPONSE = {
    status: 200,
    requestId: "7a568cbfe3f44f0b99d1092c246660c1",
    client: "targettesting",
    id: {
      tntId: "338e3c1e51f7416a8e1ccba4f81acea0.27_0",
      marketingCloudVisitorId: "07327024324407615852294135870030620007"
    },
    edgeHost: "mboxedge28.tt.omtrdc.net",
    telemetryServerToken: "encryptedtelemetry"
  };
  const TARGET_NOTIFICATION_REQUEST = {
    notifications: []
  };
  const TARGET_TELEMETRY_ENTRY = {
    execution: 1.111111,
    parsing: 2.2222222,
    request: {
      dns: 13.205916000000002,
      tls: 66.416338,
      timeToFirstByte: 37.84904800000004,
      download: 0.7802439999999251,
      responseSize: 241
    }
  };
  const EDGE_TELEMETRY_ENTRY = {
    ...TARGET_TELEMETRY_ENTRY,
    blob: EDGE_TELEMETRY_BLOB
  };
  it("adds and executes Delivery request entries", () => {
    const provider = TelemetryProvider();

    for (let i = 0; i < 3; i += 1) {
      provider.addDeliveryRequestEntry(
        TARGET_REQUEST,
        EDGE_TELEMETRY_ENTRY,
        DELIVERY_RESPONSE
      );
    }

    expect(provider.hasEntries()).toBe(true);

    const updatedDeliveryRequest = provider.addTelemetryToDeliveryRequest(
      TARGET_NOTIFICATION_REQUEST
    );

    expect(provider.getAndClearEntries().length).toBe(0);
    expect(updatedDeliveryRequest).toEqual(
      expect.objectContaining({
        notifications: expect.any(Array),
        telemetry: {
          entries: expect.any(Array)
        }
      })
    );
    expect(updatedDeliveryRequest.telemetry.entries.length).toBe(3);
    updatedDeliveryRequest.telemetry.entries.forEach(entry => {
      expect(entry).toEqual(
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
          execution: 1.11,
          parsing: 2.22,
          request: {
            dns: 13.21,
            tls: 66.42,
            timeToFirstByte: 37.85,
            download: 0.78,
            responseSize: 241
          },
          blob: EDGE_TELEMETRY_BLOB
        })
      );
    });
  });

  it("adds render entries", () => {
    const provider = TelemetryProvider();

    provider.addRenderEntry(
      TARGET_REQUEST.requestId,
      TARGET_TELEMETRY_ENTRY.execution
    );

    const entries = provider.getAndClearEntries();

    expect(entries.length).toBe(1);
    expect(entries[0]).toEqual(
      expect.objectContaining({
        requestId: TARGET_REQUEST.requestId,
        timestamp: expect.any(Number),
        execution: 1.11
      })
    );
  });
  it("assigns edge execution mode for server side", () => {
    const provider = TelemetryProvider();
    provider.addDeliveryRequestEntry(
      TARGET_REQUEST,
      TARGET_TELEMETRY_ENTRY,
      DELIVERY_RESPONSE,
      DECISIONING_METHOD.SERVER_SIDE
    );
    const entries = provider.getAndClearEntries();
    expect(entries[0].mode).toEqual(EXECUTION_MODE.EDGE);
  });

  it("assigns local execution mode for on device", () => {
    const provider = TelemetryProvider();
    const DELIVERY_RESPONSE_ON_DEVICE = Object.assign({}, DELIVERY_RESPONSE, {
      edgeHost: null
    });

    provider.addDeliveryRequestEntry(
      TARGET_REQUEST,
      TARGET_TELEMETRY_ENTRY,
      DELIVERY_RESPONSE_ON_DEVICE,
      DECISIONING_METHOD.ON_DEVICE
    );
    const entries = provider.getAndClearEntries();
    expect(entries[0].mode).toEqual(EXECUTION_MODE.LOCAL);
  });

  it("assigns edge execution mode for hybrid when execution in not all local", () => {
    const provider = TelemetryProvider();

    const DELIVERY_RESPONSE_HYBRID_1 = Object.assign({}, DELIVERY_RESPONSE, {
      edgeHost: "mboxedge28.tt.omtrdc.net"
    });

    provider.addDeliveryRequestEntry(
      TARGET_REQUEST,
      TARGET_TELEMETRY_ENTRY,
      DELIVERY_RESPONSE_HYBRID_1,
      DECISIONING_METHOD.HYBRID
    );
    const entries = provider.getAndClearEntries();

    expect(entries[0].mode).toEqual(EXECUTION_MODE.EDGE);
  });

  it("assigns local execution mode for hybrid when execution in  all local", () => {
    const provider = TelemetryProvider();

    const DELIVERY_RESPONSE_HYBRID_2 = Object.assign({}, DELIVERY_RESPONSE, {
      edgeHost: null
    });

    provider.addDeliveryRequestEntry(
      TARGET_REQUEST,
      TARGET_TELEMETRY_ENTRY,
      DELIVERY_RESPONSE_HYBRID_2,
      DECISIONING_METHOD.HYBRID
    );
    const entries = provider.getAndClearEntries();

    expect(entries[0].mode).toEqual(EXECUTION_MODE.LOCAL);
  });

  it("disables telemetries", () => {
    const provider = TelemetryProvider(false);

    provider.addDeliveryRequestEntry(TARGET_REQUEST, TARGET_TELEMETRY_ENTRY);

    const entries = provider.getAndClearEntries();
    expect(entries.length).toEqual(0);

    const updatedDeliveryRequest = provider.addTelemetryToDeliveryRequest(
      TARGET_NOTIFICATION_REQUEST
    );
    expect(updatedDeliveryRequest).toBe(TARGET_NOTIFICATION_REQUEST);
  });

  it("adds and executes artifact request entries", () => {
    const requestId = "ArtifactRequest";

    const provider = TelemetryProvider();

    for (let i = 0; i < 3; i += 1) {
      provider.addArtifactRequestEntry(requestId, TARGET_TELEMETRY_ENTRY);
    }

    expect(provider.hasEntries()).toBe(true);

    const updatedDeliveryRequest = provider.addTelemetryToDeliveryRequest(
      TARGET_NOTIFICATION_REQUEST
    );

    expect(provider.getAndClearEntries().length).toBe(0);
    expect(updatedDeliveryRequest).toEqual(
      expect.objectContaining({
        notifications: expect.any(Array),
        telemetry: {
          entries: expect.any(Array)
        }
      })
    );
    expect(updatedDeliveryRequest.telemetry.entries.length).toBe(3);
    updatedDeliveryRequest.telemetry.entries.forEach(entry => {
      expect(entry).toEqual(
        expect.objectContaining({
          requestId,
          timestamp: expect.any(Number),
          execution: 1.11,
          parsing: 2.22,
          request: {
            dns: 13.21,
            tls: 66.42,
            timeToFirstByte: 37.85,
            download: 0.78,
            responseSize: 241
          }
        })
      );
    });
  });

  it("omits features fields that are falsy", () => {
    const provider = TelemetryProvider();
    const request = {
      execute: {
        mboxes: []
      }
    };

    provider.addDeliveryRequestEntry(
      request,
      TARGET_TELEMETRY_ENTRY,
      DELIVERY_RESPONSE,
      DECISIONING_METHOD.ON_DEVICE
    );

    const entries = provider.getAndClearEntries();

    expect(entries[0].features).toEqual({
      decisioningMethod: "on-device"
    });
  });
});
