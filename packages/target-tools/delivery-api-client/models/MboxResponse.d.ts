import { AnalyticsResponse, Metric, Option, TraceResponse } from './';
export interface MboxResponse {
    index?: number;
    name?: string;
    options?: Array<Option>;
    metrics?: Array<Metric>;
    analytics?: AnalyticsResponse;
    trace?: TraceResponse;
}
export declare function MboxResponseFromJSON(json: any): MboxResponse;
export declare function MboxResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MboxResponse;
export declare function MboxResponseToJSON(value?: MboxResponse | null): any;
