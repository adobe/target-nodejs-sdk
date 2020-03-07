export interface MboxRequestAllOf {
    index?: number;
    name?: string;
}
export declare function MboxRequestAllOfFromJSON(json: any): MboxRequestAllOf;
export declare function MboxRequestAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): MboxRequestAllOf;
export declare function MboxRequestAllOfToJSON(value?: MboxRequestAllOf | null): any;
