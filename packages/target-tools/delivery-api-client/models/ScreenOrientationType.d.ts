export declare enum ScreenOrientationType {
    Portrait = "portrait",
    Landscape = "landscape"
}
export declare function ScreenOrientationTypeFromJSON(json: any): ScreenOrientationType;
export declare function ScreenOrientationTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ScreenOrientationType;
export declare function ScreenOrientationTypeToJSON(value?: ScreenOrientationType | null): any;
