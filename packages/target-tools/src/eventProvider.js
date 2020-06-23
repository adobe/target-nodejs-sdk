/* eslint-disable import/prefer-default-export */
import { isDefined, isUndefined } from "./utils";

function TargetEvent(type, payload = {}) {
  this.type = type;
  Object.keys(payload).forEach(key => (this[key] = payload[key]));
}

/**
 *
 * @param {Object.<String, Function>} events
 */
export function EventProvider(events = {}) {
  const subscriptions = {};
  let subscriptionCount = 0;

  /**
   *
   * @param {String} eventName
   * @param {Function} callbackFunc
   * @return {string}
   */
  function subscribe(eventName, callbackFunc) {
    subscriptionCount += 1;

    if (isUndefined(subscriptions[eventName])) {
      subscriptions[eventName] = {};
    }

    subscriptions[eventName][subscriptionCount] = callbackFunc;
    return `${eventName}:${subscriptionCount}`;
  }

  /**
   *
   * @param {String} id
   */
  function unsubscribe(id) {
    const [eventName, eventId] = id.split(":");
    if (isDefined(subscriptions[eventName])) {
      delete subscriptions[eventName][eventId];
    }
  }

  /**
   *
   * @param {String} eventName
   * @param {Object} payload
   */
  function emit(eventName, payload = {}) {
    const subscribed = subscriptions[eventName] || [];
    Object.values(subscribed).forEach(subscriber =>
      subscriber.call(undefined, new TargetEvent(eventName, payload))
    );
  }

  Object.keys(events).forEach(eventName =>
    subscribe(eventName, events[eventName])
  );

  return {
    subscribe,
    unsubscribe,
    emit
  };
}
