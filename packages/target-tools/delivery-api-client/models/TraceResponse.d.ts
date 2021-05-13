export interface TraceResponse {
    [key: string]: object;
}
export declare function TraceResponseFromJSON(json: any): TraceResponse;
export declare function TraceResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TraceResponse;
export declare function TraceResponseToJSON(value?: TraceResponse | null): any;
