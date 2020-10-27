import { ScreenOrientationType } from './';
export interface Screen {
    width?: number;
    height?: number;
    colorDepth?: number;
    pixelRatio?: number;
    orientation?: ScreenOrientationType;
}
export declare function ScreenFromJSON(json: any): Screen;
export declare function ScreenFromJSONTyped(json: any, ignoreDiscriminator: boolean): Screen;
export declare function ScreenToJSON(value?: Screen | null): any;
