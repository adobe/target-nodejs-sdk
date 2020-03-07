import { MboxResponse, PageLoadResponse } from './index';
export interface ExecuteResponse {
    pageLoad?: PageLoadResponse;
    mboxes?: Array<MboxResponse>;
}
export declare function ExecuteResponseFromJSON(json: any): ExecuteResponse;
export declare function ExecuteResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExecuteResponse;
export declare function ExecuteResponseToJSON(value?: ExecuteResponse | null): any;
