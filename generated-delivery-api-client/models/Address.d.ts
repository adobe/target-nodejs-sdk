export interface Address {
    url?: string;
    referringUrl?: string;
}
export declare function AddressFromJSON(json: any): Address;
export declare function AddressFromJSONTyped(json: any, ignoreDiscriminator: boolean): Address;
export declare function AddressToJSON(value?: Address | null): any;
