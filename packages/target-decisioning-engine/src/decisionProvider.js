import {
  DEFAULT_GLOBAL_MBOX,
  getPropertyToken,
  isDefined,
  isUndefined,
  objectWithoutUndefinedValues
} from "@adobe/target-tools";
import { getRuleKey, hasRemoteDependency } from "./utils";
import NotificationProvider from "./notificationProvider";
import { RequestTracer } from "./traceProvider";
import { RequestType } from "./enums";
import {
  addTrace,
  cleanUp,
  prepareExecuteResponse,
  preparePrefetchResponse,
  removePageLoadAttributes
} from "./postProcessors";
import { ruleEvaluator } from "./ruleEvaluator";
import { LOG_PREFIX } from "./constants";
import { byPropertyToken } from "./filters";

const LOG_TAG = `${LOG_PREFIX}.DecisionProvider`;
const PARTIAL_CONTENT = 206;
const OK = 200;

/**
 *
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config
 * @param {import("../types/TargetOptions").TargetOptions} targetOptions
 * @param { Object } context
 * @param { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
 * @param { Object } logger
 * @param traceProvider
 */
function DecisionProvider(
  config,
  targetOptions,
  context,
  artifact,
  logger,
  traceProvider
) {
  const { rules } = artifact;
  const globalMboxName = artifact.globalMbox || DEFAULT_GLOBAL_MBOX;

  const clientId = config.client;
  const { request, visitor } = targetOptions;
  const propertyToken = getPropertyToken(request.property);

  const { sendNotificationFunc } = config;

  const visitorId = request.id;
  const processRule = ruleEvaluator(clientId, visitorId);
  const dependency = hasRemoteDependency(artifact, request);

  const notificationProvider = NotificationProvider(
    request,
    visitor,
    logger,
    sendNotificationFunc
  );

  /**
   *
   * @param { 'execute'|'prefetch' } mode
   * @param { Function[] } postProcessors Used to process an mbox if needed, optional
   */
  function getDecisions(mode, postProcessors) {
    if (isUndefined(request[mode])) return undefined;

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
      if (
        requestDetails.hasOwnProperty("name") &&
        isDefined(requestDetails.name)
      ) {
        viewRules = rules.views[requestDetails.name] || [];
      } else {
        viewRules = Object.keys(rules.views).reduce(
          (result, key) => [...result, ...rules.views[key]],
          []
        );
      }

      viewRules = viewRules.filter(byPropertyToken(propertyToken));

      const matchedRuleKeys = new Set();

      // eslint-disable-next-line no-restricted-syntax
      for (const rule of viewRules) {
        const ruleKey = getRuleKey(rule);
        let consequence;

        if (!matchedRuleKeys.has(ruleKey)) {
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
          matchedRuleKeys.add(ruleKey);

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

      const mboxRules = (rules.mboxes[mboxRequest.name] || []).filter(
        byPropertyToken(propertyToken)
      );

      const matchedRuleKeys = new Set();

      // eslint-disable-next-line no-restricted-syntax
      for (const rule of mboxRules) {
        const ruleKey = getRuleKey(rule);
        let consequence;

        if (!isGlobalMbox || (isGlobalMbox && !matchedRuleKeys.has(ruleKey))) {
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
          matchedRuleKeys.add(ruleKey);
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
        .map(requestDetails => processViewRequest(requestDetails))
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
      addTrace,
      cleanUp
    ]);

    notificationProvider.sendNotifications();

    return decisions;
  }

  function getPrefetchDecisions() {
    return getDecisions("prefetch", [
      preparePrefetchResponse,
      addTrace,
      cleanUp
    ]);
  }

  const response = objectWithoutUndefinedValues({
    status: dependency.remoteNeeded ? PARTIAL_CONTENT : OK,
    remoteMboxes: dependency.remoteMboxes,
    requestId: request.requestId,
    id: {
      ...request.id
    },
    client: clientId,
    edgeHost: undefined,
    execute: getExecuteDecisions(),
    prefetch: getPrefetchDecisions()
  });

  logger.debug(`${LOG_TAG}`, request, response);

  return Promise.resolve(response);
}

export default DecisionProvider;
