import { AnalyticsResponse, MetricType } from './';
export interface Metric {
    type?: MetricType;
    selector?: string;
    eventToken?: string;
    analytics?: AnalyticsResponse;
}
export declare function MetricFromJSON(json: any): Metric;
export declare function MetricFromJSONTyped(json: any, ignoreDiscriminator: boolean): Metric;
export declare function MetricToJSON(value?: Metric | null): any;
