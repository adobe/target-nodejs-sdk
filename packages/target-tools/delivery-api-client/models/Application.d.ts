export interface Application {
    id?: string;
    name?: string;
    version?: string;
}
export declare function ApplicationFromJSON(json: any): Application;
export declare function ApplicationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Application;
export declare function ApplicationToJSON(value?: Application | null): any;
