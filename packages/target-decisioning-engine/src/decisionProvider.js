import jsonLogic from "json-logic-js";
import { createUUID } from "@adobe/target-tools";
import { OK, PARTIAL_CONTENT } from "http-status-codes";
import { computeAllocation } from "./allocationProvider";
import { createMboxContext, createPageContext } from "./contextProvider";
import { hasRemoteDependency } from "./utils";
import NotificationProvider from "./notificationProvider";

const DEFAULT_GLOBAL_MBOX_NAME = "target-global-mbox";

const REQUEST_TYPE_PLURAL = {
  mbox: "mboxes",
  view: "views"
};

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
  sendNotificationFunc
) {
  const { rules } = artifact;
  const globalMboxName = artifact.meta.globalMbox || DEFAULT_GLOBAL_MBOX_NAME;

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
   * @param { 'mbox'|'view' } requestType
   * @param { Function } postProcessFunc
   */
  function ruleEvaluator(mboxRequest, requestType, postProcessFunc) {
    return (result, rule) => {
      let { page, referring } = context;

      if (
        rule.meta.mbox === mboxRequest.name &&
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
        const key = REQUEST_TYPE_PLURAL[requestType];

        if (typeof result[key] === "undefined") {
          // eslint-disable-next-line no-param-reassign
          result[key] = [];
        }
        result[key].push(
          postProcessFunc({
            ...rule.consequence,
            index: mboxRequest.index
          })
        );
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
      const processRule = ruleEvaluator(mboxRequest, "mbox", postProcessFunc);

      const mboxRules = rules.mboxes[mboxRequest.name] || [];

      // eslint-disable-next-line no-restricted-syntax
      for (const rule of mboxRules) {
        processRule(rulesResult, rule);
        if (!isGlobalMbox && rulesResult.mboxes.length > 0) {
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
