export interface Preview {
    token?: string;
}
export declare function PreviewFromJSON(json: any): Preview;
export declare function PreviewFromJSONTyped(json: any, ignoreDiscriminator: boolean): Preview;
export declare function PreviewToJSON(value?: Preview | null): any;
