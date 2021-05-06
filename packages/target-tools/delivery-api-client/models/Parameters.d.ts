export interface Parameters {
    [key: string]: string;
}
export declare function ParametersFromJSON(json: any): Parameters;
export declare function ParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): Parameters;
export declare function ParametersToJSON(value?: Parameters | null): any;
