import jsonLogic from "json-logic-js";
import { createUUID, DEFAULT_GLOBAL_MBOX } from "@adobe/target-tools";
import { OK, PARTIAL_CONTENT } from "http-status-codes";
import { computeAllocation } from "./allocationProvider";
import { createMboxContext, createPageContext } from "./contextProvider";
import { hasRemoteDependency } from "./utils";
import NotificationProvider from "./notificationProvider";

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
  const globalMboxName = artifact.meta.globalMbox || DEFAULT_GLOBAL_MBOX;

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
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} mboxRequest
   * @param { 'mbox'|'view'|'pageLoad' } requestType
   * @param { Array<Function> } postProcessors
   */
  function ruleEvaluator(mboxRequest, requestType, postProcessors) {
    return rule => {
      let consequence;
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
        consequence = {
          ...rule.consequence,
          index: mboxRequest.index
        };

        postProcessors.forEach(postProcessFunc => {
          consequence = postProcessFunc(consequence);
        });
      }
      return consequence;
    };
  }

  /**
   *
   * @param { 'execute'|'prefetch' } mode
   * @param { Function } postProcessorFunc Used to process an mbox if needed, optional
   */
  function getDecisions(mode, postProcessorFunc = value => value) {
    if (typeof request[mode] === "undefined") return undefined;

    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest} mboxRequest
     * @param { Array<Function> } postProcessors
     */
    function processMboxRequest(
      mboxRequest,
      postProcessors = [postProcessorFunc]
    ) {
      const isGlobalMbox = mboxRequest.name === globalMboxName;

      const processRule = ruleEvaluator(mboxRequest, "mbox", postProcessors);
      const consequences = [];

      const mboxRules = rules.mboxes[mboxRequest.name] || [];

      let prevActivityId;
      // eslint-disable-next-line no-restricted-syntax
      for (const rule of mboxRules) {
        let consequence;

        if (
          !isGlobalMbox ||
          (isGlobalMbox && rule.meta.activityId !== prevActivityId)
        ) {
          consequence = processRule(rule);
        }

        if (consequence) {
          consequences.push(consequence);
          prevActivityId = rule.meta.activityId;
          if (!isGlobalMbox) break;
        }
      }

      // add a blank if no consequences
      if (!isGlobalMbox && consequences.length === 0) {
        consequences.push({
          name: mboxRequest.name,
          index: mboxRequest.index
        });
      }

      return consequences;
    }

    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetails
     */
    function processPageLoadRequest(requestDetails) {
      /**
       * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
       */
      function removePageLoadAttributes(mboxResponse) {
        const processed = {
          ...mboxResponse
        };
        delete processed.index;
        delete processed.name;

        return processed;
      }

      const consequences = processMboxRequest(
        {
          ...requestDetails,
          name: globalMboxName
        },
        [postProcessorFunc, removePageLoadAttributes]
      );

      return consequences.reduce((pageLoadResponse, consequence) => {
        Object.keys(consequence)
          .filter(key => consequence[key] instanceof Array)
          .forEach(key => {
            if (typeof pageLoadResponse[key] === "undefined") {
              // eslint-disable-next-line no-param-reassign
              pageLoadResponse[key] = [];
            }
            pageLoadResponse[key].push(...consequence[key]);
          });
        return pageLoadResponse;
      }, {});
    }

    const response = {};

    if (request[mode].mboxes) {
      response.mboxes = request[mode].mboxes
        .map(mboxRequest => processMboxRequest(mboxRequest))
        .flat();
    }

    if (request[mode].pageLoad) {
      response.pageLoad = processPageLoadRequest(request[mode].pageLoad);
    }
    return response;
  }

  function getExecuteDecisions() {
    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
     */
    function prepareExecuteResponse(mboxResponse) {
      notificationProvider.addNotification(mboxResponse);

      const result = { ...mboxResponse };
      delete result.metrics;
      return result;
    }

    const decisions = getDecisions("execute", prepareExecuteResponse);

    notificationProvider.sendNotifications();

    return decisions;
  }

  function getPrefetchDecisions() {
    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
     */
    function preparePrefetchResponse(mboxResponse) {
      const eventToken =
        mboxResponse.metrics.length > 0
          ? mboxResponse.metrics[0].eventToken
          : undefined;

      const result = {
        ...mboxResponse,
        options: mboxResponse.options.map(option => {
          return {
            ...option,
            eventToken
          };
        })
      };

      delete result.metrics;
      return result;
    }

    return getDecisions("prefetch", preparePrefetchResponse);
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
