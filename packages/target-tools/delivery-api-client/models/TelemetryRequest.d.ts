export interface TelemetryRequest {
    dns?: number;
    tls?: number;
    timeToFirstByte?: number;
    download?: number;
    responseSize?: number;
}
export declare function TelemetryRequestFromJSON(json: any): TelemetryRequest;
export declare function TelemetryRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): TelemetryRequest;
export declare function TelemetryRequestToJSON(value?: TelemetryRequest | null): any;
