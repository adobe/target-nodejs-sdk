export interface ResponseTokens {
    [key: string]: object;
}
export declare function ResponseTokensFromJSON(json: any): ResponseTokens;
export declare function ResponseTokensFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseTokens;
export declare function ResponseTokensToJSON(value?: ResponseTokens | null): any;
