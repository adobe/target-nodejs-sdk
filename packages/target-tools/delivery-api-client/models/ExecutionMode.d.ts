export declare enum ExecutionMode {
    Edge = "edge",
    Local = "local"
}
export declare function ExecutionModeFromJSON(json: any): ExecutionMode;
export declare function ExecutionModeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExecutionMode;
export declare function ExecutionModeToJSON(value?: ExecutionMode | null): any;
