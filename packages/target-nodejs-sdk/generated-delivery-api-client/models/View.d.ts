import { AnalyticsResponse, Metric, Option } from './';
export interface View {
    name?: string;
    key?: string;
    options?: Array<Option>;
    metrics?: Array<Metric>;
    analytics?: AnalyticsResponse;
    state?: string;
    trace?: {
        [key: string]: object;
    };
}
export declare function ViewFromJSON(json: any): View;
export declare function ViewFromJSONTyped(json: any, ignoreDiscriminator: boolean): View;
export declare function ViewToJSON(value?: View | null): any;
