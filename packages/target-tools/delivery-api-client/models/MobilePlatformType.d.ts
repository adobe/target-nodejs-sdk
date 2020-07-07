export declare enum MobilePlatformType {
    Android = "android",
    Ios = "ios"
}
export declare function MobilePlatformTypeFromJSON(json: any): MobilePlatformType;
export declare function MobilePlatformTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): MobilePlatformType;
export declare function MobilePlatformTypeToJSON(value?: MobilePlatformType | null): any;
