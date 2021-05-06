import { AnalyticsResponse, Metric, Option, TraceResponse } from './';
export interface PageLoadResponse {
    options?: Array<Option>;
    metrics?: Array<Metric>;
    analytics?: AnalyticsResponse;
    state?: string;
    trace?: TraceResponse;
}
export declare function PageLoadResponseFromJSON(json: any): PageLoadResponse;
export declare function PageLoadResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageLoadResponse;
export declare function PageLoadResponseToJSON(value?: PageLoadResponse | null): any;
