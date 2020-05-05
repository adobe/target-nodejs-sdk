import jsonLogic from "json-logic-js";
import { DEFAULT_GLOBAL_MBOX } from "@adobe/target-tools";
import { MetricType } from "@adobe/target-tools/delivery-api-client";
import { computeAllocation } from "./allocationProvider";
import { createMboxContext, createPageContext } from "./contextProvider";
import { hasRemoteDependency } from "./utils";
import NotificationProvider from "./notificationProvider";
import { RequestTracer } from "./traceProvider";
import { RequestType } from "./enums";

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
   * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest|import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetail
   * @param { 'mbox'|'view'|'pageLoad' } requestType
   * @param { Array<Function> } postProcessors
   * @param tracer
   */
  function ruleEvaluator(requestDetail, requestType, postProcessors, tracer) {
    return (
      /**
       * @param {import("../types/DecisioningArtifact").Rule} rule
       */
      rule => {
        let consequence;
        let { page, referring } = context;

        if (
          rule.meta.locationName === requestDetail.name &&
          typeof requestDetail.address !== "undefined"
        ) {
          page = createPageContext(requestDetail.address) || page;
          referring = createPageContext(requestDetail.address) || referring;
        }

        const ruleContext = {
          ...context,
          page,
          referring,
          mbox: createMboxContext(requestDetail),
          allocation: computeAllocation(
            clientId,
            rule.meta.activityId,
            visitorId
          )
        };

        const ruleSatisfied = jsonLogic.apply(rule.condition, ruleContext);
        tracer.traceRuleEvaluated(
          rule,
          requestDetail,
          requestType,
          ruleContext,
          ruleSatisfied
        );

        if (ruleSatisfied) {
          consequence = {
            ...rule.consequence,
            index: requestDetail.index
          };

          postProcessors.forEach(postProcessFunc => {
            consequence = postProcessFunc(
              rule,
              consequence,
              requestType,
              tracer
            );
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
     *
     * @param { import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails } mboxRequest
     * @param {Array<Function>} additionalPostProcessors
     */
    function processViewRequest(mboxRequest, additionalPostProcessors = []) {
      requestTracer.traceMboxRequest(mode, mboxRequest, context);

      const processRule = ruleEvaluator(
        mboxRequest,
        RequestType.VIEW,
        [...postProcessors, ...additionalPostProcessors],
        requestTracer
      );

      const consequences = {};

      let viewRules = [];
      let isGlobal = true;
      if (mboxRequest.hasOwnProperty("name")) {
        viewRules = rules.views[mboxRequest.name];
        isGlobal = false;
      } else {
        viewRules = Object.keys(rules.views).reduce(
          (result, key) => [...result, ...rules.views[key]],
          []
        );
      }

      let prevActivityId;
      // eslint-disable-next-line no-restricted-syntax
      for (const rule of viewRules) {
        let consequence;

        if (
          !isGlobal ||
          (isGlobal && rule.meta.activityId !== prevActivityId)
        ) {
          consequence = processRule(rule);
        }

        if (consequence) {
          if (!consequences[consequence.name]) {
            consequences[consequence.name] = consequence;
          } else {
            consequences[consequence.name] = {
              ...consequences[consequence.name],
              options: [
                ...consequences[consequence.name].options,
                ...consequence.options
              ],
              metrics: [
                ...consequences[consequence.name].metrics,
                ...consequence.metrics
              ]
            };
          }

          prevActivityId = rule.meta.activityId;
          if (!isGlobal) break;
        }
      }

      return Object.values(consequences);
    }

    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest} mboxRequest
     * @param { Array<Function> } additionalPostProcessors
     */
    function processMboxRequest(mboxRequest, additionalPostProcessors = []) {
      const isGlobalMbox = mboxRequest.name === globalMboxName;

      requestTracer.traceMboxRequest(mode, mboxRequest, context);

      const processRule = ruleEvaluator(
        mboxRequest,
        RequestType.MBOX,
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
       * @param { 'mbox'|'view'|'pageLoad' } requestType
       * @param tracer
       */
      function removePageLoadAttributes(
        rule,
        mboxResponse,
        requestType,
        tracer
      ) {
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

    if (request[mode].views) {
      response.views = request[mode].views
        .map(mboxRequest => processViewRequest(mboxRequest))
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
   * @param { 'mbox'|'view'|'pageLoad' } requestType
   * @param tracer
   */
  function prepareTraceResponse(rule, mboxResponse, requestType, tracer) {
    return {
      ...mboxResponse,
      trace: traceProvider.getTraceResult(tracer)
    };
  }

  function getExecuteDecisions() {
    /**
     * @param {import("../types/DecisioningArtifact").Rule} rule
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxResponse").MboxResponse} mboxResponse
     * @param { 'mbox'|'view'|'pageLoad' } requestType
     * @param tracer
     */
    function prepareExecuteResponse(rule, mboxResponse, requestType, tracer) {
      notificationProvider.addNotification(
        mboxResponse,
        tracer.traceNotification(rule)
      );

      const result = {
        ...mboxResponse,
        metrics: mboxResponse.metrics.filter(
          metric => metric.type === MetricType.Click
        )
      };

      if (result.metrics.length === 0) {
        delete result.metrics;
      }

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
     * @param { 'mbox'|'view'|'pageLoad' } requestType
     * @param tracer
     */
    function preparePrefetchResponse(rule, mboxResponse, requestType, tracer) {
      const result = {
        ...mboxResponse,
        options: mboxResponse.options.map((option, idx) => {
          let { eventToken } = option;
          if (
            typeof eventToken === "undefined" &&
            mboxResponse.metrics.length > idx &&
            mboxResponse.metrics[idx].type === MetricType.Display
          ) {
            // eslint-disable-next-line prefer-destructuring
            eventToken = mboxResponse.metrics[idx].eventToken;
          }
          return {
            ...option,
            eventToken
          };
        })
      };

      if (requestType !== RequestType.VIEW) {
        delete result.metrics;
      }

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
