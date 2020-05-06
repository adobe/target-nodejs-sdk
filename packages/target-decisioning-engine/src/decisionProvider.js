import { DEFAULT_GLOBAL_MBOX } from "@adobe/target-tools";
import { hasRemoteDependency } from "./utils";
import NotificationProvider from "./notificationProvider";
import { RequestTracer } from "./traceProvider";
import { RequestType } from "./enums";
import {
  prepareExecuteResponse,
  preparePrefetchResponse,
  addTrace,
  removePageLoadAttributes
} from "./postProcessors";
import { ruleEvaluator } from "./ruleEvaluator";

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
  const processRule = ruleEvaluator(clientId, visitorId);
  const dependency = hasRemoteDependency(artifact, request);

  const notificationProvider = NotificationProvider(
    request,
    visitor,
    sendNotificationFunc
  );

  /**
   *
   * @param { 'execute'|'prefetch' } mode
   * @param { Function[] } postProcessors Used to process an mbox if needed, optional
   */
  function getDecisions(mode, postProcessors) {
    if (typeof request[mode] === "undefined") return undefined;

    const requestTracer = RequestTracer(traceProvider, artifact);

    /**
     *
     * @param { import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails } requestDetails
     * @param {Array<Function>} additionalPostProcessors
     */
    function processViewRequest(requestDetails, additionalPostProcessors = []) {
      requestTracer.traceRequest(
        mode,
        RequestType.VIEW,
        requestDetails,
        context
      );

      const consequences = {};

      let viewRules = [];
      let isGlobal = true;
      if (requestDetails.hasOwnProperty("name")) {
        viewRules = rules.views[requestDetails.name];
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
          consequence = processRule(
            rule,
            context,
            RequestType.VIEW,
            requestDetails,
            [...postProcessors, ...additionalPostProcessors],
            requestTracer
          );
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

      requestTracer.traceRequest(mode, RequestType.MBOX, mboxRequest, context);

      const consequences = [];

      const mboxRules = rules.mboxes[mboxRequest.name] || [];

      let prevActivityId;
      // eslint-disable-next-line no-restricted-syntax
      for (const rule of mboxRules) {
        let consequence;

        if (
          !isGlobalMbox ||
          (isGlobalMbox &&
            (rule.meta.activityId !== prevActivityId ||
              rule.meta.locationType === RequestType.VIEW))
        ) {
          consequence = processRule(
            rule,
            context,
            RequestType.MBOX,
            mboxRequest,
            [...postProcessors, ...additionalPostProcessors],
            requestTracer
          );
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
          trace: requestTracer.getTraceResult()
        });
      }

      return consequences;
    }

    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails} requestDetails
     */
    function processPageLoadRequest(requestDetails) {
      let trace;

      const consequences = processMboxRequest(
        {
          ...requestDetails,
          name: globalMboxName
        },
        [
          function preserveTrace(rule, mboxResponse, requestType, tracer) {
            // eslint-disable-next-line prefer-destructuring
            trace = mboxResponse.trace;
            return mboxResponse;
          },
          removePageLoadAttributes
        ]
      );

      const options = consequences
        .map(consequence => consequence.options)
        .flat();

      const result = {
        options,
        trace
      };

      const indexedMetrics = consequences.reduce((indexed, consequence) => {
        if (consequence.metrics instanceof Array) {
          consequence.metrics.forEach(metric => {
            // eslint-disable-next-line no-param-reassign
            indexed[metric.eventToken] = metric;
          });
        }
        return indexed;
      }, {});

      const metrics = Object.values(indexedMetrics);
      if (metrics.length > 0) {
        result.metrics = metrics;
      }

      return result;
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

  function getExecuteDecisions() {
    const decisions = getDecisions("execute", [
      function prepareNotification(rule, mboxResponse, requestType, tracer) {
        notificationProvider.addNotification(
          mboxResponse,
          tracer.traceNotification(rule)
        );

        return mboxResponse;
      },
      prepareExecuteResponse,
      addTrace
    ]);

    notificationProvider.sendNotifications();

    return decisions;
  }

  function getPrefetchDecisions() {
    return getDecisions("prefetch", [preparePrefetchResponse, addTrace]);
  }

  const response = {
    execute: getExecuteDecisions(),
    prefetch: getPrefetchDecisions()
  };

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
