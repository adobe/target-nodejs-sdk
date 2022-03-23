export interface ClientHints {
    mobile?: boolean;
    model?: string;
    platform?: string;
    platformVersion?: string;
    browserUAWithMajorVersion?: string;
    browserUAWithFullVersion?: string;
    architecture?: string;
    bitness?: string;
}
export declare function ClientHintsFromJSON(json: any): ClientHints;
export declare function ClientHintsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ClientHints;
export declare function ClientHintsToJSON(value?: ClientHints | null): any;
