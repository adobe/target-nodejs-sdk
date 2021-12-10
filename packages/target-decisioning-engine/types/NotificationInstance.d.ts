import {
  MboxResponse,
  Notification
} from "../../target-tools/delivery-api-client";
import { TraceNotification } from "../types/Tracer";

export interface NotificationInstance {
  addNotification(mbox: MboxResponse, traceFn?: TraceNotification): void;
  sendNotifications(): void;
  clearNotifications(): void;
}
