import {
  uuid,
  isDefined,
  noop,
  now,
  MetricType,
  isFunction
} from "@adobe/target-tools";
import { DECISIONING_METHOD } from "@adobe/target-tools/src";
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
  sendNotificationFunc = noop,
  telemetryProvider
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

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/TelemetryEntry").TelemetryEntry} entry
   */
  function addTelemetryEntry(entry) {
    if (telemetryProvider) {
      telemetryProvider.addEntry(request, entry, DECISIONING_METHOD.ON_DEVICE);
    }
  }

  function sendNotifications() {
    logger.debug(
      `${LOG_TAG}.sendNotifications`,
      notifications,
      telemetryProvider ? telemetryProvider.getEntries() : ""
    );

    if (
      notifications.length > 0 ||
      (telemetryProvider && telemetryProvider.getEntries().length > 0)
    ) {
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

      if (telemetryProvider) {
        notification.request = telemetryProvider.executeTelemetries(
          notification.request
        );
      }

      setTimeout(() => sendNotificationFunc.call(null, notification), 0);
      notifications = [];
    }
  }

  return {
    addNotification,
    addTelemetryEntry,
    sendNotifications
  };
}

export default NotificationProvider;
