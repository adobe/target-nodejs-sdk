import { AnalyticsResponse, Metric, Option } from './';
export interface MboxResponse {
    $type?: string;
    index?: number;
    name?: string;
    options?: Array<Option>;
    metrics?: Array<Metric>;
    analytics?: AnalyticsResponse;
    trace?: {
        [key: string]: object;
    };
}
export declare function MboxResponseFromJSON(json: any): MboxResponse;
export declare function MboxResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MboxResponse;
export declare function MboxResponseToJSON(value?: MboxResponse | null): any;
