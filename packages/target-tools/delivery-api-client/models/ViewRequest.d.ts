import { RequestDetails } from './';
export interface ViewRequest extends RequestDetails {
    name?: string;
    key?: string;
}
export declare function ViewRequestFromJSON(json: any): ViewRequest;
export declare function ViewRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ViewRequest;
export declare function ViewRequestToJSON(value?: ViewRequest | null): any;
