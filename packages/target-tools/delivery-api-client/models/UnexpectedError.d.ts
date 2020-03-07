export interface UnexpectedError {
    status: number;
    message: string;
}
export declare function UnexpectedErrorFromJSON(json: any): UnexpectedError;
export declare function UnexpectedErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnexpectedError;
export declare function UnexpectedErrorToJSON(value?: UnexpectedError | null): any;
