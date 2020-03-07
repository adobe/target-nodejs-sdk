import { AnalyticsResponse, Metric, Option } from './index';
export interface PageLoadResponse {
    options?: Array<Option>;
    metrics?: Array<Metric>;
    analytics?: AnalyticsResponse;
    state?: string;
    trace?: {
        [key: string]: object;
    };
}
export declare function PageLoadResponseFromJSON(json: any): PageLoadResponse;
export declare function PageLoadResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageLoadResponse;
export declare function PageLoadResponseToJSON(value?: PageLoadResponse | null): any;
