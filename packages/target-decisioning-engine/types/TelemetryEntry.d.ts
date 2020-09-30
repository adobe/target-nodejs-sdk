export interface TelemetryFeatures {
  decisioningMethod: String;
}

export interface TelemetryEntry {
  requestId: String;
  timestamp: Number;
  execution?: Number;
  features: TelemetryFeatures;
}
