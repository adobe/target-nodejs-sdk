import { AnalyticsResponse, Metric, Option } from './index';
export interface PrefetchMboxResponse {
    index?: number;
    name?: string;
    options?: Array<Option>;
    metrics?: Array<Metric>;
    analytics?: AnalyticsResponse;
    trace?: {
        [key: string]: object;
    };
    state?: string;
}
export declare function PrefetchMboxResponseFromJSON(json: any): PrefetchMboxResponse;
export declare function PrefetchMboxResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PrefetchMboxResponse;
export declare function PrefetchMboxResponseToJSON(value?: PrefetchMboxResponse | null): any;
