export interface Trace {
    authorizationToken: string;
    usage?: {
        [key: string]: string;
    };
}
export declare function TraceFromJSON(json: any): Trace;
export declare function TraceFromJSONTyped(json: any, ignoreDiscriminator: boolean): Trace;
export declare function TraceToJSON(value?: Trace | null): any;
