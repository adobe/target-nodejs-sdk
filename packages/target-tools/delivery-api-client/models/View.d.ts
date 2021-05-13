import { AnalyticsResponse, Metric, Option, TraceResponse } from './';
export interface View {
    name?: string;
    key?: string;
    options?: Array<Option>;
    metrics?: Array<Metric>;
    analytics?: AnalyticsResponse;
    state?: string;
    trace?: TraceResponse;
}
export declare function ViewFromJSON(json: any): View;
export declare function ViewFromJSONTyped(json: any, ignoreDiscriminator: boolean): View;
export declare function ViewToJSON(value?: View | null): any;
