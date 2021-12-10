import {
  uuid,
  isDefined,
  noop,
  noopSingleArg,
  now,
  isFunction,
  NOTIFICATIONS_REQUIRED,
  Logger
} from "@adobe/target-tools";
import {
  DeliveryRequest,
  MboxResponse,
  VisitorId,
  Notification,
  MetricType
} from "@adobe/target-tools/delivery-api-client";
import { TraceNotification } from "../types/Tracer";
import { LOG_PREFIX } from "./constants";
import { NotificationInstance } from "../types/NotificationInstance";

const LOG_TAG = `${LOG_PREFIX}.NotificationProvider`;

/**
 * The get NotificationProvider initialize method
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} request Target View Delivery API request, required
 * @param visitor VisitorId instance, required
 * @param { Object } logger
 * @param {function} sendNotificationFunc function used to send the notification, required
 */

function NotificationProvider(
  request: DeliveryRequest,
  visitor: VisitorId,
  logger: Logger,
  sendNotificationFunc: Function = noop,
  telemetryEnabled: boolean = true
): NotificationInstance {
  const timestamp = now();
  const prevEventKeys = new Set();
  let notifications = [];

  /**
   * The get NotificationProvider initialize method
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mbox
   * @param { Function } traceFn
   */
  function addNotification(
    mbox: MboxResponse,
    traceFn: TraceNotification = noopSingleArg
  ): void {
    const displayTokens = [];

    mbox.options.forEach(option => {
      const { eventToken } = option;
      const eventKey = `${mbox.name}-${eventToken}`;

      if (isDefined(eventToken) && !prevEventKeys.has(eventKey)) {
        displayTokens.push(eventToken);
        prevEventKeys.add(eventKey);
      }
    });

    if (displayTokens.length === 0) {
      return;
    }

    const notification: Notification = {
      id: uuid(),
      impressionId: uuid(),
      timestamp,
      type: MetricType.Display,
      mbox: {
        name: mbox.name
      },
      tokens: displayTokens
    };

    if (isFunction(traceFn)) {
      traceFn(notification);
    }

    notifications.push(notification);
  }

  function sendNotifications(): void {
    logger.debug(`${LOG_TAG}.sendNotifications`, notifications);

    if (notifications.length > 0 || telemetryEnabled) {
      const { id, context, experienceCloud } = request;

      const notification: any = {
        request: {
          id,
          context,
          experienceCloud
        },
        visitor
      };

      if (notifications.length > 0) {
        notification.request.notifications = notifications;
      }

      setTimeout(() => {
        try {
          sendNotificationFunc.call(null, notification);
        } catch (error) {
          if (error.message !== NOTIFICATIONS_REQUIRED) {
            throw error;
          }
        }
      }, 0);
      notifications = [];
    }
  }

  // For testing purposes
  function clearNotifications() {
    notifications = [];
  }

  return {
    addNotification,
    sendNotifications,
    clearNotifications
  };
}

export default NotificationProvider;
