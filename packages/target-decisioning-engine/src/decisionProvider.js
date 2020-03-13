import jsonLogic from "json-logic-js";
import { createUUID } from "@adobe/target-tools";
import { OK, PARTIAL_CONTENT } from "http-status-codes";
import { computeAllocation } from "./allocationProvider";
import { createMboxContext, createPageContext } from "./contextProvider";
import { hasRemoteDependency } from "./utils";
import NotificationProvider from "./notificationProvider";

const DEFAULT_GLOBAL_MBOX_NAME = "target-global-mbox";

/**
 *
 * @param { String } clientId
 * @param {import("@adobe/target-tools/delivery-api-client/models/DeliveryRequest").DeliveryRequest} deliveryRequest Target View Delivery API request
 * @param { Object } context
 * @param { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
 * @param {function} sendNotificationFunc function used to send the notification
 * @param {string} globalMboxName global mbox name
 */
function DecisionProvider(
  clientId,
  deliveryRequest,
  context,
  artifact,
  sendNotificationFunc,
  globalMboxName = DEFAULT_GLOBAL_MBOX_NAME
) {
  const { rules } = artifact;
  const request = {
    ...deliveryRequest,
    requestId: deliveryRequest.requestId || createUUID()
  };

  const visitorId = deliveryRequest.id;

  const notificationProvider = NotificationProvider(
    request,
    sendNotificationFunc
  );

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest} mboxRequest
   * @param { Function } postProcessFunc
   */
  function ruleEvaluator(mboxRequest, postProcessFunc) {
    return (result, rule) => {
      let { page, referring } = context;

      if (
        rule.meta.mboxes.indexOf(mboxRequest.name) > -1 &&
        typeof mboxRequest.address !== "undefined"
      ) {
        page = createPageContext(mboxRequest.address) || page;
        referring = createPageContext(mboxRequest.address) || referring;
      }

      const ruleContext = {
        ...context,
        page,
        referring,
        mbox: createMboxContext(mboxRequest),
        allocation: computeAllocation(clientId, rule.meta.activityId, visitorId)
      };

      if (jsonLogic.apply(rule.condition, ruleContext)) {
        Object.keys(rule.consequence).forEach(key => {
          if (typeof result[key] === "undefined") {
            // eslint-disable-next-line no-param-reassign
            result[key] = [];
          }

          Array.prototype.push.apply(
            result[key],
            rule.consequence[key]
              .filter(mboxResponse => mboxRequest.name === mboxResponse.name) // filter out items that do not pertain to this mbox
              .map(mboxResponse => {
                const value = {
                  ...mboxResponse,
                  index: mboxRequest.index
                };

                return postProcessFunc(value);
              })
          );
        });
      }
      return result;
    };
  }

  /**
   *
   * @param { 'execute'|'prefetch' } mode
   * @param { Function } postProcessFunc Used to process an mbox if needed, optional
   */
  function getDecisions(mode, postProcessFunc = value => value) {
    if (typeof request[mode] === "undefined") return undefined;

    /**
     * @param { Object } result
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest} mboxRequest
     */
    function processMboxRequest(result, mboxRequest) {
      const isGlobalMbox = mboxRequest.name === globalMboxName;
      const rulesResult = { mboxes: [] };
      const processRule = ruleEvaluator(mboxRequest, postProcessFunc);

      const mboxRules = rules.filter(
        rule => rule.meta.mboxes.indexOf(mboxRequest.name) > -1 // filter out rules that do not pertain to this mbox
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const rule of mboxRules) {
        processRule(rulesResult, rule);
        if (!isGlobalMbox && rulesResult.length > 0) {
          break;
        }
      }

      Object.keys(rulesResult).forEach(key => {
        if (!isGlobalMbox && rulesResult[key].length === 0) {
          rulesResult[key].push({
            name: mboxRequest.name,
            index: mboxRequest.index
          });
        }

        Array.prototype.push.apply(result[key], rulesResult[key]);
      });

      return result;
    }

    const mboxes = request[mode].mboxes || [];

    return mboxes.reduce(processMboxRequest, { mboxes: [] });
  }

  function getExecuteDecisions() {
    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} item
     */
    function postProcess(item) {
      notificationProvider.addNotification(item);

      const result = { ...item };
      delete result.metrics;
      return result;
    }

    const decisions = getDecisions("execute", postProcess);

    notificationProvider.sendNotifications();

    return decisions;
  }

  function getPrefetchDecisions() {
    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} item
     */
    function postProcess(item) {
      const eventToken =
        item.metrics.length > 0 ? item.metrics[0].eventToken : undefined;

      const result = {
        ...item,
        options: item.options.map(option => {
          return {
            ...option,
            eventToken
          };
        })
      };

      delete result.metrics;
      return result;
    }

    return getDecisions("prefetch", postProcess);
  }

  const response = {
    execute: getExecuteDecisions(),
    prefetch: getPrefetchDecisions()
  };

  return Promise.resolve({
    status: hasRemoteDependency(artifact, request).remoteNeeded
      ? PARTIAL_CONTENT
      : OK,
    requestId: deliveryRequest.requestId,
    id: {
      ...deliveryRequest.id
    },
    client: clientId,
    edgeHost: undefined,
    ...response
  });
}

export default DecisionProvider;
