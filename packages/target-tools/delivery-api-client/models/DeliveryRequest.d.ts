import { Context, ExecuteRequest, ExperienceCloud, Notification, PrefetchRequest, Property, QAMode, Trace, VisitorId } from './';
export interface DeliveryRequest {
    requestId?: string;
    impressionId?: string;
    id?: VisitorId;
    environmentId?: number;
    property?: Property;
    trace?: Trace;
    context: Context;
    experienceCloud?: ExperienceCloud;
    execute?: ExecuteRequest;
    prefetch?: PrefetchRequest;
    notifications?: Array<Notification>;
    qaMode?: QAMode;
}
export declare function DeliveryRequestFromJSON(json: any): DeliveryRequest;
export declare function DeliveryRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeliveryRequest;
export declare function DeliveryRequestToJSON(value?: DeliveryRequest | null): any;
