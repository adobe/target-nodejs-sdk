import { createUUID, isDefined, noop, MetricType } from "@adobe/target-tools";
import { LOG_PREFIX } from "./constants";

const LOG_TAG = `${LOG_PREFIX}.NotificationProvider`;

/**
 * The get NotificationProvider initialize method
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} request Target View Delivery API request, required
 * @param visitor VisitorId instance, required
 * @param { Object } logger
 * @param {function} sendNotificationFunc function used to send the notification, required
 */

function NotificationProvider(
  request,
  visitor,
  logger,
  sendNotificationFunc = noop
) {
  const now = new Date();
  const timestamp = now.getTime();
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

    if (displayTokens.length === 0) return;

    const notification = {
      id: createUUID(),
      impressionId: createUUID(),
      timestamp,
      type: MetricType.Display,
      mbox: {
        name: mbox.name
      },
      tokens: displayTokens
    };

    if (typeof traceFn === "function") {
      traceFn(notification);
    }

    notifications.push(notification);
  }

  function sendNotifications() {
    logger.debug(`${LOG_TAG}.sendNotifications`, notifications);

    if (notifications.length > 0) {
      const { id, context, experienceCloud } = request;

      sendNotificationFunc({
        request: {
          id,
          context,
          experienceCloud,
          notifications
        },
        visitor
      });
      notifications = [];
    }
  }

  return {
    addNotification,
    sendNotifications
  };
}

export default NotificationProvider;
