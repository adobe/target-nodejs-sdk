import TargetTools from "@adobe/target-tools/src";

/**
 * The get NotificationProvider initialize method
 * @param {import("../../target-nodejs-sdk/generated-delivery-api-client/models/DeliveryRequest").DeliveryRequest} request Target View Delivery API request, required
 * @param {function} sendNotificationFunc function used to send the notification, required
 */

function NotificationProvider(
  request,
  sendNotificationFunc = TargetTools.noop
) {
  const now = new Date();
  const timestamp = now.getTime();
  let notifications = [];

  /**
   * The get NotificationProvider initialize method
   * @param {import("../../target-nodejs-sdk/generated-delivery-api-client/models/MboxResponse").MboxResponse} mbox
   */
  function addNotification(mbox) {
    const notification = {
      id: `${mbox.name}_notification`,
      timestamp,
      type: "display",
      mbox: {
        name: mbox.name
      },
      tokens: []
    };

    mbox.metrics.forEach(metric => {
      notification.tokens.push(metric.eventToken);
    });

    notifications.push(notification);
  }

  function sendNotifications() {
    if (notifications.length > 0) {
      const { id, context } = request;

      sendNotificationFunc({
        request: {
          id,
          context,
          notifications
        }
      });
      notifications = [];
    }
  }

  return {
    addNotification: mbox => addNotification(mbox),
    sendNotifications: () => sendNotifications()
  };
}

export default NotificationProvider;
