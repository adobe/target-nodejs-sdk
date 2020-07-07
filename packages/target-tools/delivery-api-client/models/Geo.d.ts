export interface Geo {
    ipAddress?: string;
    latitude?: number;
    longitude?: number;
    countryCode?: string;
    stateCode?: string;
    city?: string;
    zip?: string;
}
export declare function GeoFromJSON(json: any): Geo;
export declare function GeoFromJSONTyped(json: any, ignoreDiscriminator: boolean): Geo;
export declare function GeoToJSON(value?: Geo | null): any;
