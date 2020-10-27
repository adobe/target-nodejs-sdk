export declare enum ChannelType {
    Mobile = "mobile",
    Web = "web"
}
export declare function ChannelTypeFromJSON(json: any): ChannelType;
export declare function ChannelTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChannelType;
export declare function ChannelTypeToJSON(value?: ChannelType | null): any;
