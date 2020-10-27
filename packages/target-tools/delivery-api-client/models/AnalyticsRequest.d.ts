import { LoggingType } from './';
export interface AnalyticsRequest {
    supplementalDataId?: string;
    logging?: LoggingType;
    trackingServer?: string;
    trackingServerSecure?: string;
}
export declare function AnalyticsRequestFromJSON(json: any): AnalyticsRequest;
export declare function AnalyticsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AnalyticsRequest;
export declare function AnalyticsRequestToJSON(value?: AnalyticsRequest | null): any;
