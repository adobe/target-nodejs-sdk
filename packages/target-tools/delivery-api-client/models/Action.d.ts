import { OneOfstringobject } from './index';
export interface Action {
    type?: string;
    selector?: string;
    cssSelector?: string;
    content?: OneOfstringobject;
}
export declare function ActionFromJSON(json: any): Action;
export declare function ActionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Action;
export declare function ActionToJSON(value?: Action | null): any;
