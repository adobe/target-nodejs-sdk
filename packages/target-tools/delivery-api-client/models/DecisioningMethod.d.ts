export declare enum DecisioningMethod {
    ServerSide = "server-side",
    OnDevice = "on-device",
    Hybrid = "hybrid"
}
export declare function DecisioningMethodFromJSON(json: any): DecisioningMethod;
export declare function DecisioningMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): DecisioningMethod;
export declare function DecisioningMethodToJSON(value?: DecisioningMethod | null): any;
