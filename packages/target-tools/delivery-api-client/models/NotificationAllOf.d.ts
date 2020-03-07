import { MetricType, NotificationMbox, NotificationPageLoad, NotificationView } from './index';
export interface NotificationAllOf {
    id?: string;
    impressionId?: string;
    type?: MetricType;
    timestamp?: number;
    tokens?: Array<string>;
    mbox?: NotificationMbox;
    view?: NotificationView;
    pageLoad?: NotificationPageLoad;
}
export declare function NotificationAllOfFromJSON(json: any): NotificationAllOf;
export declare function NotificationAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): NotificationAllOf;
export declare function NotificationAllOfToJSON(value?: NotificationAllOf | null): any;
