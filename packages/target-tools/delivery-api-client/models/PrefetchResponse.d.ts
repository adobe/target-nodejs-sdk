import { Metric, PageLoadResponse, PrefetchMboxResponse, View } from './';
export interface PrefetchResponse {
    views?: Array<View>;
    pageLoad?: PageLoadResponse;
    mboxes?: Array<PrefetchMboxResponse>;
    metrics?: Array<Metric>;
}
export declare function PrefetchResponseFromJSON(json: any): PrefetchResponse;
export declare function PrefetchResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PrefetchResponse;
export declare function PrefetchResponseToJSON(value?: PrefetchResponse | null): any;
