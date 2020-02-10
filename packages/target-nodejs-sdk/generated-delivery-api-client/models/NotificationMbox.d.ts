export interface NotificationMbox {
    name?: string;
    state?: string;
}
export declare function NotificationMboxFromJSON(json: any): NotificationMbox;
export declare function NotificationMboxFromJSONTyped(json: any, ignoreDiscriminator: boolean): NotificationMbox;
export declare function NotificationMboxToJSON(value?: NotificationMbox | null): any;
