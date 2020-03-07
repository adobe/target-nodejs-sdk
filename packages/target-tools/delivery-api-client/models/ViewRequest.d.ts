import { Address, Order, Product } from './index';
export interface ViewRequest {
    address?: Address;
    parameters?: {
        [key: string]: string;
    };
    profileParameters?: {
        [key: string]: string;
    };
    order?: Order;
    product?: Product;
    name?: string;
    key?: string;
}
export declare function ViewRequestFromJSON(json: any): ViewRequest;
export declare function ViewRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ViewRequest;
export declare function ViewRequestToJSON(value?: ViewRequest | null): any;
