import { Address, Order, Parameters, Product } from './';
export interface MboxRequest {
    address?: Address;
    parameters?: Parameters;
    profileParameters?: Parameters;
    order?: Order;
    product?: Product;
    index: number;
    name?: string;
}
export declare function MboxRequestFromJSON(json: any): MboxRequest;
export declare function MboxRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): MboxRequest;
export declare function MboxRequestToJSON(value?: MboxRequest | null): any;
