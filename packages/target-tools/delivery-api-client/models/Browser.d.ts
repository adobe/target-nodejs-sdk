export interface Browser {
    host?: string;
    language?: string;
    webGLRenderer?: string;
}
export declare function BrowserFromJSON(json: any): Browser;
export declare function BrowserFromJSONTyped(json: any, ignoreDiscriminator: boolean): Browser;
export declare function BrowserToJSON(value?: Browser | null): any;
