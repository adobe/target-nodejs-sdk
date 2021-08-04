import { DecisioningMethod } from './';
export interface TelemetryFeatures {
    decisioningMethod?: DecisioningMethod;
    executeMboxCount?: number;
    executePageLoad?: boolean;
    prefetchMboxCount?: number;
    prefetchPageLoad?: boolean;
    prefetchViewCount?: number;
}
export declare function TelemetryFeaturesFromJSON(json: any): TelemetryFeatures;
export declare function TelemetryFeaturesFromJSONTyped(json: any, ignoreDiscriminator: boolean): TelemetryFeatures;
export declare function TelemetryFeaturesToJSON(value?: TelemetryFeatures | null): any;
