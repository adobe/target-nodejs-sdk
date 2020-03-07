import { QAModePreviewIndex } from './index';
export interface QAMode {
    token?: string;
    listedActivitiesOnly?: boolean;
    evaluateAsTrueAudienceIds?: Array<number>;
    evaluateAsFalseAudienceIds?: Array<number>;
    previewIndexes?: Array<QAModePreviewIndex>;
}
export declare function QAModeFromJSON(json: any): QAMode;
export declare function QAModeFromJSONTyped(json: any, ignoreDiscriminator: boolean): QAMode;
export declare function QAModeToJSON(value?: QAMode | null): any;
