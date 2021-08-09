export interface NotificationResponse {
    id?: string;
    trace?: {
        [key: string]: object;
    };
}
export declare function NotificationResponseFromJSON(json: any): NotificationResponse;
export declare function NotificationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): NotificationResponse;
export declare function NotificationResponseToJSON(value?: NotificationResponse | null): any;
