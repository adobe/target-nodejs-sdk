export interface Geo {
    latitude?: number;
    longitude?: number;
}
export declare function GeoFromJSON(json: any): Geo;
export declare function GeoFromJSONTyped(json: any, ignoreDiscriminator: boolean): Geo;
export declare function GeoToJSON(value?: Geo | null): any;
