import { CustomerId } from './';
export interface VisitorId {
    tntId?: string;
    thirdPartyId?: string;
    marketingCloudVisitorId?: string;
    customerIds?: Array<CustomerId>;
}
export declare function VisitorIdFromJSON(json: any): VisitorId;
export declare function VisitorIdFromJSONTyped(json: any, ignoreDiscriminator: boolean): VisitorId;
export declare function VisitorIdToJSON(value?: VisitorId | null): any;
