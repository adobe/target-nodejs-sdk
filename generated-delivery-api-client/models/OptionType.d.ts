export declare enum OptionType {
    Html = "html",
    Json = "json",
    Redirect = "redirect",
    Dynamic = "dynamic",
    Actions = "actions"
}
export declare function OptionTypeFromJSON(json: any): OptionType;
export declare function OptionTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): OptionType;
export declare function OptionTypeToJSON(value?: OptionType | null): any;
