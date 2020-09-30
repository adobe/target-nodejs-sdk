import {
  createUUID,
  isDefined,
  noop,
  now,
  MetricType,
  DECISIONING_METHOD
} from "@adobe/target-tools";
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
  telemetryEnabled = true
) {
  const { requestId } = request;
  const timestamp = now();
  const prevEventKeys = new Set();
  let notifications = [];
  let telemetryEntries = [];

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

  /**
   * @param {import("../types/TelemetryEntry.d.ts").TelemetryEntry} entry
   */
  function addTelemetryEntry(entry) {
    if (!telemetryEnabled) return;

    telemetryEntries.push({
      requestId,
      timestamp,
      features: {
        decisioningMethod: DECISIONING_METHOD.ON_DEVICE
      },
      ...entry
    });
  }

  function sendNotifications() {
    logger.debug(
      `${LOG_TAG}.sendNotifications`,
      notifications,
      telemetryEntries
    );

    if (notifications.length > 0 || telemetryEntries.length > 0) {
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

      if (telemetryEntries.length > 0) {
        notification.request.telemetry = {
          entries: telemetryEntries
        };
      }

      sendNotificationFunc(notification);
      notifications = [];
      telemetryEntries = [];
    }
  }

  return {
    addNotification,
    addTelemetryEntry,
    sendNotifications
  };
}

export default NotificationProvider;
