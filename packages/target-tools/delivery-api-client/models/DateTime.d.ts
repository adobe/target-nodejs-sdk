export declare type DateTime = Date;
export declare function DateTimeFromJSON(value: any): Date;
export declare function DateTimeFromJSONTyped(value: any, ignoreDiscriminator: boolean): Date;
export declare function DateTimeToJSON(value?: DateTime | null): any;
