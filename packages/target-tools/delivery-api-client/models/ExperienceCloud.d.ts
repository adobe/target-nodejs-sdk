import { AnalyticsRequest, AudienceManager } from './index';
export interface ExperienceCloud {
    audienceManager?: AudienceManager;
    analytics?: AnalyticsRequest;
}
export declare function ExperienceCloudFromJSON(json: any): ExperienceCloud;
export declare function ExperienceCloudFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExperienceCloud;
export declare function ExperienceCloudToJSON(value?: ExperienceCloud | null): any;
