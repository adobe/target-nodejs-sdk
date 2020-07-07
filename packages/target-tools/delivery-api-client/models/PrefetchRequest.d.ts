import { MboxRequest, RequestDetails, ViewRequest } from './';
export interface PrefetchRequest {
    views?: Array<ViewRequest>;
    pageLoad?: RequestDetails;
    mboxes?: Array<MboxRequest>;
}
export declare function PrefetchRequestFromJSON(json: any): PrefetchRequest;
export declare function PrefetchRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PrefetchRequest;
export declare function PrefetchRequestToJSON(value?: PrefetchRequest | null): any;
