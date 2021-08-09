import { ExecutionMode, TelemetryFeatures, TelemetryRequest } from './';
export interface TelemetryEntry {
    requestId?: string;
    timestamp?: number;
    mode?: ExecutionMode;
    execution?: number;
    parsing?: number;
    features?: TelemetryFeatures;
    request?: TelemetryRequest;
}
export declare function TelemetryEntryFromJSON(json: any): TelemetryEntry;
export declare function TelemetryEntryFromJSONTyped(json: any, ignoreDiscriminator: boolean): TelemetryEntry;
export declare function TelemetryEntryToJSON(value?: TelemetryEntry | null): any;
