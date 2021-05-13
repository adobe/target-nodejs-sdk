import { Address, Order, Parameters, Product } from './';
export interface RequestDetails {
    address?: Address;
    parameters?: Parameters;
    profileParameters?: Parameters;
    order?: Order;
    product?: Product;
}
export declare function RequestDetailsFromJSON(json: any): RequestDetails;
export declare function RequestDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestDetails;
export declare function RequestDetailsToJSON(value?: RequestDetails | null): any;
