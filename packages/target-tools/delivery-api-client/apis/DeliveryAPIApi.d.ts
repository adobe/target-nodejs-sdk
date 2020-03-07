import * as runtime from '../runtime';
import { DeliveryRequest, DeliveryResponse } from '../models';
export interface ExecuteDeliveryRequest {
    client: string;
    sessionId: string;
    deliveryRequest: DeliveryRequest;
    version?: string;
}
export declare class DeliveryAPIApi extends runtime.BaseAPI {
    executeRaw(requestParameters: ExecuteDeliveryRequest): Promise<runtime.ApiResponse<DeliveryResponse>>;
    execute(client: string, sessionId: string, deliveryRequest: DeliveryRequest, version?: string): Promise<DeliveryResponse>;
}
