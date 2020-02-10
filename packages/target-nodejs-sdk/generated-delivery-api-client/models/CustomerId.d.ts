import { AuthenticatedState } from './';
export interface CustomerId {
    id: string;
    integrationCode: string;
    authenticatedState: AuthenticatedState;
}
export declare function CustomerIdFromJSON(json: any): CustomerId;
export declare function CustomerIdFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomerId;
export declare function CustomerIdToJSON(value?: CustomerId | null): any;
