import { TelemetryEntry } from './';
export interface Telemetry {
    entries?: Array<TelemetryEntry>;
}
export declare function TelemetryFromJSON(json: any): Telemetry;
export declare function TelemetryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Telemetry;
export declare function TelemetryToJSON(value?: Telemetry | null): any;
