import { Action, OptionType, ResponseTokens } from './';
export interface Option {
    type?: OptionType;
    content?: string | object | Array<Action>;
    eventToken?: string;
    responseTokens?: ResponseTokens;
}
export declare function OptionFromJSON(json: any): Option;
export declare function OptionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Option;
export declare function OptionToJSON(value?: Option | null): any;
