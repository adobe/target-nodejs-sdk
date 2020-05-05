import { createUUID, noop } from "@adobe/target-tools";
import { MetricType } from "@adobe/target-tools/delivery-api-client";

/**
 * The get NotificationProvider initialize method
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} request Target View Delivery API request, required
 * @param visitor VisitorId instance, required
 * @param {function} sendNotificationFunc function used to send the notification, required
 */

function NotificationProvider(request, visitor, sendNotificationFunc = noop) {
  const now = new Date();
  const timestamp = now.getTime();
  let notifications = [];

  /**
   * The get NotificationProvider initialize method
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mbox
   * @param { Function } traceFn
   */
  function addNotification(mbox, traceFn = noop) {
    const displayTokens = mbox.metrics
      .filter(metric => metric.type === MetricType.Display)
      .map(metric => metric.eventToken);

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
