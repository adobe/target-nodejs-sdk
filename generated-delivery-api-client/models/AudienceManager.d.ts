export interface AudienceManager {
    locationHint?: number;
    blob?: string;
}
export declare function AudienceManagerFromJSON(json: any): AudienceManager;
export declare function AudienceManagerFromJSONTyped(json: any, ignoreDiscriminator: boolean): AudienceManager;
export declare function AudienceManagerToJSON(value?: AudienceManager | null): any;
