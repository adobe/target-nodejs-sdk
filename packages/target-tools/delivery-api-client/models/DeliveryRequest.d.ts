import { Context, ExecuteRequest, ExperienceCloud, Notification, PrefetchRequest, Property, QAMode, Telemetry, Trace, VisitorId } from './';
export interface DeliveryRequest {
    requestId?: string;
    impressionId?: string;
    id?: VisitorId;
    organizationId?: number;
    property?: Property;
    trace?: Trace;
    context: Context;
    experienceCloud?: ExperienceCloud;
    execute?: ExecuteRequest;
    prefetch?: PrefetchRequest;
    telemetry?: Telemetry;
    notifications?: Array<Notification>;
    qaMode?: QAMode;
}
export declare function DeliveryRequestFromJSON(json: any): DeliveryRequest;
export declare function DeliveryRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeliveryRequest;
export declare function DeliveryRequestToJSON(value?: DeliveryRequest | null): any;
