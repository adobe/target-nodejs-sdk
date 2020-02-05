export interface AnalyticsPayload {
    pe?: string;
    tnta?: string;
}
export declare function AnalyticsPayloadFromJSON(json: any): AnalyticsPayload;
export declare function AnalyticsPayloadFromJSONTyped(json: any, ignoreDiscriminator: boolean): AnalyticsPayload;
export declare function AnalyticsPayloadToJSON(value?: AnalyticsPayload | null): any;
