import { TraceResponse } from './';
export interface NotificationResponse {
    id?: string;
    trace?: TraceResponse;
}
export declare function NotificationResponseFromJSON(json: any): NotificationResponse;
export declare function NotificationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): NotificationResponse;
export declare function NotificationResponseToJSON(value?: NotificationResponse | null): any;
