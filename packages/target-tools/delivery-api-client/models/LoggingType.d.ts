export declare enum LoggingType {
    ServerSide = "server_side",
    ClientSide = "client_side"
}
export declare function LoggingTypeFromJSON(json: any): LoggingType;
export declare function LoggingTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoggingType;
export declare function LoggingTypeToJSON(value?: LoggingType | null): any;
