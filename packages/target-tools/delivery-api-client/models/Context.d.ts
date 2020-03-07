import { Address, Application, Browser, ChannelType, Geo, MobilePlatform, Screen, Window } from './index';
export interface Context {
    channel: ChannelType;
    mobilePlatform?: MobilePlatform;
    application?: Application;
    screen?: Screen;
    window?: Window;
    browser?: Browser;
    address?: Address;
    geo?: Geo;
    timeOffsetInMinutes?: number;
    userAgent?: string;
    beacon?: boolean;
}
export declare function ContextFromJSON(json: any): Context;
export declare function ContextFromJSONTyped(json: any, ignoreDiscriminator: boolean): Context;
export declare function ContextToJSON(value?: Context | null): any;
