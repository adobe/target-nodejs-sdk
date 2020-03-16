import { AnalyticsPayload } from './';
export interface AnalyticsResponse {
    payload?: AnalyticsPayload;
}
export declare function AnalyticsResponseFromJSON(json: any): AnalyticsResponse;
export declare function AnalyticsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AnalyticsResponse;
export declare function AnalyticsResponseToJSON(value?: AnalyticsResponse | null): any;
