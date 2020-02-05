export interface ViewRequestAllOf {
    name?: string;
    key?: string;
}
export declare function ViewRequestAllOfFromJSON(json: any): ViewRequestAllOf;
export declare function ViewRequestAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): ViewRequestAllOf;
export declare function ViewRequestAllOfToJSON(value?: ViewRequestAllOf | null): any;
