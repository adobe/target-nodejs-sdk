import { Address, Order, Parameters, Product } from './';
export interface ViewRequest {
    address?: Address;
    parameters?: Parameters;
    profileParameters?: Parameters;
    order?: Order;
    product?: Product;
    name?: string;
    key?: string;
}
export declare function ViewRequestFromJSON(json: any): ViewRequest;
export declare function ViewRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ViewRequest;
export declare function ViewRequestToJSON(value?: ViewRequest | null): any;
