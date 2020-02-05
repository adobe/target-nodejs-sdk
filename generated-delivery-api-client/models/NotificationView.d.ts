export interface NotificationView {
    name?: string;
    key?: string;
    state?: string;
}
export declare function NotificationViewFromJSON(json: any): NotificationView;
export declare function NotificationViewFromJSONTyped(json: any, ignoreDiscriminator: boolean): NotificationView;
export declare function NotificationViewToJSON(value?: NotificationView | null): any;
