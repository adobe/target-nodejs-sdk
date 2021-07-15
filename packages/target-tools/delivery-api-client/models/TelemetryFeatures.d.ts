import { DecisioningMethod } from './';
export interface TelemetryFeatures {
    decisioningMethod?: DecisioningMethod;
}
export declare function TelemetryFeaturesFromJSON(json: any): TelemetryFeatures;
export declare function TelemetryFeaturesFromJSONTyped(json: any, ignoreDiscriminator: boolean): TelemetryFeatures;
export declare function TelemetryFeaturesToJSON(value?: TelemetryFeatures | null): any;
