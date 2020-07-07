export interface Window {
    width?: number;
    height?: number;
}
export declare function WindowFromJSON(json: any): Window;
export declare function WindowFromJSONTyped(json: any, ignoreDiscriminator: boolean): Window;
export declare function WindowToJSON(value?: Window | null): any;
