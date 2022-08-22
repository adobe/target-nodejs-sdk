import {
  isDefined,
  isFunction,
  MetricType,
  noop,
  noopPromise,
  now,
  uuid
} from "@adobe/target-tools";
import { LOG_PREFIX } from "./constants";
import { SEND_NOTIFICATION_ERROR } from "./events";

const LOG_TAG = `${LOG_PREFIX}.NotificationProvider`;

/**
 * The get NotificationProvider initialize method
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} request Target View Delivery API request, required
 * @param visitor VisitorId instance, required
 * @param { Object } logger
 * @param {function} sendNotificationFunc function used to send the notification, required
 * @param telemetryEnabled
 * @param eventEmitter
 */

function NotificationProvider(
  request,
  visitor,
  logger,
  sendNotificationFunc = noopPromise,
  telemetryEnabled = true,
  eventEmitter = noop
) {
  const timestamp = now();
  const prevEventKeys = new Set();
  let notifications = [];

  /**
   * The get NotificationProvider initialize method
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mbox
   * @param { Function } traceFn
   */
  function addNotification(mbox, traceFn = noop) {
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

    const notification = {
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

  function sendNotifications() {
    logger.debug(`${LOG_TAG}.sendNotifications`, notifications);

    if (notifications.length > 0 || telemetryEnabled) {
      const { id, context, experienceCloud } = request;

      const notification = {
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
        sendNotificationFunc.call(null, notification).catch(error => {
          eventEmitter(SEND_NOTIFICATION_ERROR, {
            notification,
            error
          });
        });
      }, 0);
      notifications = [];
    }
  }

  return {
    addNotification,
    sendNotifications
  };
}

export default NotificationProvider;
