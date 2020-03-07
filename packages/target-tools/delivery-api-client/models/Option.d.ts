import { OneOfstringobjectarray, OptionType } from './index';
export interface Option {
    type?: OptionType;
    content?: OneOfstringobjectarray;
    eventToken?: string;
    responseTokens?: {
        [key: string]: object;
    };
}
export declare function OptionFromJSON(json: any): Option;
export declare function OptionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Option;
export declare function OptionToJSON(value?: Option | null): any;
