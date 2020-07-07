export declare enum MetricType {
    Click = "click",
    Display = "display"
}
export declare function MetricTypeFromJSON(json: any): MetricType;
export declare function MetricTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetricType;
export declare function MetricTypeToJSON(value?: MetricType | null): any;
