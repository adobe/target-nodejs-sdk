import { MetricType, NotificationMbox, NotificationPageLoad, NotificationView, RequestDetails } from './';
export interface Notification extends RequestDetails {
    id?: string;
    impressionId?: string;
    type?: MetricType;
    timestamp?: number;
    tokens?: Array<string>;
    mbox?: NotificationMbox;
    view?: NotificationView;
    pageLoad?: NotificationPageLoad;
}
export declare function NotificationFromJSON(json: any): Notification;
export declare function NotificationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Notification;
export declare function NotificationToJSON(value?: Notification | null): any;
