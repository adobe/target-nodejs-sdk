import { RequestDetails } from './';
export interface MboxRequest extends RequestDetails {
    index?: number;
    name?: string;
}
export declare function MboxRequestFromJSON(json: any): MboxRequest;
export declare function MboxRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): MboxRequest;
export declare function MboxRequestToJSON(value?: MboxRequest | null): any;
