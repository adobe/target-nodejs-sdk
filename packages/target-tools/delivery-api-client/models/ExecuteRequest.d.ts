import { MboxRequest, RequestDetails } from './';
export interface ExecuteRequest {
    pageLoad?: RequestDetails;
    mboxes?: Array<MboxRequest>;
}
export declare function ExecuteRequestFromJSON(json: any): ExecuteRequest;
export declare function ExecuteRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExecuteRequest;
export declare function ExecuteRequestToJSON(value?: ExecuteRequest | null): any;
