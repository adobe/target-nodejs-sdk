import { Address, Order, Product } from './index';
export interface RequestDetails {
    address?: Address;
    parameters?: {
        [key: string]: string;
    };
    profileParameters?: {
        [key: string]: string;
    };
    order?: Order;
    product?: Product;
}
export declare function RequestDetailsFromJSON(json: any): RequestDetails;
export declare function RequestDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestDetails;
export declare function RequestDetailsToJSON(value?: RequestDetails | null): any;
