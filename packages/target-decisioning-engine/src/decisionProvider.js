import jsonLogic from "json-logic-js";
import { DEFAULT_GLOBAL_MBOX } from "@adobe/target-tools";
import { computeAllocation } from "./allocationProvider";
import { createMboxContext, createPageContext } from "./contextProvider";
import { hasRemoteDependency } from "./utils";
import NotificationProvider from "./notificationProvider";
import { RequestTracer } from "./traceProvider";

const PARTIAL_CONTENT = 206;
const OK = 200;

/**
 *
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config
 * @param {import("../types/TargetOptions").TargetOptions} targetOptions
 * @param { Object } context
 * @param { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
 * @param traceProvider
 */
function DecisionProvider(
  config,
  targetOptions,
  context,
  artifact,
  traceProvider
) {
  const { rules } = artifact;
  const globalMboxName = artifact.globalMbox || DEFAULT_GLOBAL_MBOX;

  const clientId = config.client;
  const { request, visitor } = targetOptions;
  const { sendNotificationFunc } = config;

  const visitorId = request.id;

  const notificationProvider = NotificationProvider(
    request,
    visitor,
    sendNotificationFunc
  );

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} mboxRequest
   * @param { 'mbox'|'view'|'pageLoad' } requestType
   * @param { Array<Function> } postProcessors
   * @param tracer
   */
  function ruleEvaluator(mboxRequest, requestType, postProcessors, tracer) {
    return (
      /**
       * @param {import("../types/DecisioningArtifact").Rule} rule
       */
      rule => {
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
          allocation: computeAllocation(
            clientId,
            rule.meta.activityId,
            visitorId
          )
        };

        const ruleSatisfied = jsonLogic.apply(rule.condition, ruleContext);
        tracer.traceRuleEvaluated(
          rule,
          mboxRequest,
          requestType,
          ruleContext,
          ruleSatisfied
        );

        if (ruleSatisfied) {
          consequence = {
            ...rule.consequence,
            index: mboxRequest.index
          };

          postProcessors.forEach(postProcessFunc => {
            consequence = postProcessFunc(rule, consequence, tracer);
          });
        }
        return consequence;
      }
    );
  }

  /**
   *
   * @param { 'execute'|'prefetch' } mode
   * @param { Function[] } postProcessors Used to process an mbox if needed, optional
   */
  function getDecisions(mode, postProcessors) {
    if (typeof request[mode] === "undefined") return undefined;

    const requestTracer = RequestTracer(artifact);

    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest} mboxRequest
     * @param { Array<Function> } additionalPostProcessors
     */
    function processMboxRequest(mboxRequest, additionalPostProcessors = []) {
      const isGlobalMbox = mboxRequest.name === globalMboxName;

      requestTracer.traceMboxRequest(mode, mboxRequest, context);

      const processRule = ruleEvaluator(
        mboxRequest,
        "mbox",
        [...postProcessors, ...additionalPostProcessors],
        requestTracer
      );
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
          index: mboxRequest.index,
          trace: traceProvider.getTraceResult(requestTracer)
        });
      }

      return consequences;
    }

    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetails
     */
    function processPageLoadRequest(requestDetails) {
      let trace;

      /**
       * @param {import("../types/DecisioningArtifact").Rule} rule
       * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
       * @param tracer
       */
      function removePageLoadAttributes(rule, mboxResponse, tracer) {
        const processed = {
          ...mboxResponse
        };
        trace = processed.trace;

        delete processed.index;
        delete processed.name;
        delete processed.trace;

        return processed;
      }

      const consequences = processMboxRequest(
        {
          ...requestDetails,
          name: globalMboxName
        },
        [removePageLoadAttributes]
      );

      return consequences.reduce(
        (pageLoadResponse, consequence) => {
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
        },
        { trace }
      );
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

  /**
   * @param {import("../types/DecisioningArtifact").Rule} rule
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
   * @param tracer
   */
  function prepareTraceResponse(rule, mboxResponse, tracer) {
    return {
      ...mboxResponse,
      trace: traceProvider.getTraceResult(tracer)
    };
  }

  function getExecuteDecisions() {
    /**
     * @param {import("../types/DecisioningArtifact").Rule} rule
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
     * @param tracer
     */
    function prepareExecuteResponse(rule, mboxResponse, tracer) {
      notificationProvider.addNotification(
        mboxResponse,
        tracer.traceNotification(rule)
      );

      const result = {
        ...mboxResponse
      };
      delete result.metrics;
      return result;
    }

    const decisions = getDecisions("execute", [
      prepareExecuteResponse,
      prepareTraceResponse
    ]);

    notificationProvider.sendNotifications();

    return decisions;
  }

  function getPrefetchDecisions() {
    /**
     * @param {import("../types/DecisioningArtifact").Rule} rule
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
     * @param tracer
     */
    function preparePrefetchResponse(rule, mboxResponse, tracer) {
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

    return getDecisions("prefetch", [
      preparePrefetchResponse,
      prepareTraceResponse
    ]);
  }

  const response = {
    execute: getExecuteDecisions(),
    prefetch: getPrefetchDecisions()
  };

  const dependency = hasRemoteDependency(artifact, request);

  return Promise.resolve({
    status: dependency.remoteNeeded ? PARTIAL_CONTENT : OK,
    remoteMboxes: dependency.remoteMboxes,
    requestId: request.requestId,
    id: {
      ...request.id
    },
    client: clientId,
    edgeHost: undefined,
    ...response
  });
}

export default DecisionProvider;
