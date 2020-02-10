import { Address, MetricType, NotificationMbox, NotificationPageLoad, NotificationView, Order, Product } from './';
export interface Notification {
    address?: Address;
    parameters?: {
        [key: string]: string;
    };
    profileParameters?: {
        [key: string]: string;
    };
    order?: Order;
    product?: Product;
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
