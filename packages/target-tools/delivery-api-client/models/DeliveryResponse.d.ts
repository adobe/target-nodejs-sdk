import { ExecuteResponse, NotificationResponse, PrefetchResponse, VisitorId } from './';
export interface DeliveryResponse {
    status?: number;
    requestId?: string;
    id?: VisitorId;
    client?: string;
    edgeHost?: string;
    execute?: ExecuteResponse;
    prefetch?: PrefetchResponse;
    notifications?: Array<NotificationResponse>;
}
export declare function DeliveryResponseFromJSON(json: any): DeliveryResponse;
export declare function DeliveryResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeliveryResponse;
export declare function DeliveryResponseToJSON(value?: DeliveryResponse | null): any;
