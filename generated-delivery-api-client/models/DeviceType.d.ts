export declare enum DeviceType {
    Phone = "phone",
    Tablet = "tablet"
}
export declare function DeviceTypeFromJSON(json: any): DeviceType;
export declare function DeviceTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeviceType;
export declare function DeviceTypeToJSON(value?: DeviceType | null): any;
