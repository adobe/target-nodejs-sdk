import { TelemetryFeatures } from './';
export interface TelemetryEntry {
    requestId?: string;
    timestamp?: number;
    execution?: number;
    features?: TelemetryFeatures;
}
export declare function TelemetryEntryFromJSON(json: any): TelemetryEntry;
export declare function TelemetryEntryFromJSONTyped(json: any, ignoreDiscriminator: boolean): TelemetryEntry;
export declare function TelemetryEntryToJSON(value?: TelemetryEntry | null): any;
