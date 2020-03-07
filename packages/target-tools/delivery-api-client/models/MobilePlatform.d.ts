import { DeviceType, MobilePlatformType } from './index';
export interface MobilePlatform {
    deviceName?: string;
    deviceType: DeviceType;
    platformType: MobilePlatformType;
    version?: string;
}
export declare function MobilePlatformFromJSON(json: any): MobilePlatform;
export declare function MobilePlatformFromJSONTyped(json: any, ignoreDiscriminator: boolean): MobilePlatform;
export declare function MobilePlatformToJSON(value?: MobilePlatform | null): any;
