export interface Property {
    token: string;
}
export declare function PropertyFromJSON(json: any): Property;
export declare function PropertyFromJSONTyped(json: any, ignoreDiscriminator: boolean): Property;
export declare function PropertyToJSON(value?: Property | null): any;
