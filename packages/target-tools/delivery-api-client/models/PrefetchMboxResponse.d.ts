import { MboxResponse } from './';
export interface PrefetchMboxResponse extends MboxResponse {
    state?: string;
}
export declare function PrefetchMboxResponseFromJSON(json: any): PrefetchMboxResponse;
export declare function PrefetchMboxResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PrefetchMboxResponse;
export declare function PrefetchMboxResponseToJSON(value?: PrefetchMboxResponse | null): any;
