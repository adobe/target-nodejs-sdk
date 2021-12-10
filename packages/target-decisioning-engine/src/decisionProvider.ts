import {
  DEFAULT_GLOBAL_MBOX,
  flatten,
  getPropertyToken,
  isDefined,
  isUndefined,
  objectWithoutUndefinedValues,
  values,
  Logger
} from "@adobe/target-tools";
import { getRuleKey, hasRemoteDependency } from "./utils";
import NotificationProvider from "./notificationProvider";
import { RequestTracer } from "./traceProvider";
import {
  addTrace,
  cleanUp,
  createResponseTokensPostProcessor,
  prepareExecuteResponse,
  preparePrefetchResponse,
  removePageLoadAttributes,
  replaceCampaignMacros
} from "./postProcessors";
import { ruleEvaluator } from "./ruleEvaluator";
import { LOG_PREFIX } from "./constants";
import { byPropertyToken } from "./filters";
import {
  PageLoadResponse,
  PrefetchResponse,
  RequestDetails,
  MboxRequest,
  ExecuteResponse,
  MboxResponse,
  ViewRequest
} from "@adobe/target-tools/delivery-api-client";
import { ExecuteOrPrefetchResponse } from "../types/ExecuteOrPrefetchResponse";
import { DecisioningConfig } from "../types/DecisioningConfig";
import { TargetDeliveryRequest } from "../types/TargetDeliveryRequest";
import { DecisioningArtifact } from "../types/DecisioningArtifact";
import { DecisioningContext } from "../types/DecisioningContext";
import { RequestMode } from "../types/RequestMode";
import { OnDeviceDeliveryResponse } from "../types/OnDeviceDeliveryResponse";
import { TraceInstance } from "../types/TraceInstance";
import { RequestType } from "../types/RequestType";

const LOG_TAG = `${LOG_PREFIX}.DecisionProvider`;
const PARTIAL_CONTENT = 206;
const OK = 200;

const isViewRequest = (requestDetails: any): requestDetails is ViewRequest =>
  !!(requestDetails as ViewRequest).name;

/**
 *
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config
 * @param {import("../types/TargetDeliveryRequest").TargetDeliveryRequest} targetOptions
 * @param {import("../types/DecisioningContext").DecisioningContext} context
 * @param { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
 * @param { Object } logger
 * @param traceProvider
 */
function DecisionProvider(
  config: DecisioningConfig,
  targetOptions: TargetDeliveryRequest,
  context: DecisioningContext,
  artifact: DecisioningArtifact,
  logger: Logger,
  traceProvider: TraceInstance
): Promise<OnDeviceDeliveryResponse> {
  const { responseTokens, rules } = artifact;
  const globalMboxName = artifact.globalMbox || DEFAULT_GLOBAL_MBOX;

  const clientId = config.client;
  const { request, visitor } = targetOptions;
  const propertyToken = getPropertyToken(request.property);

  const { sendNotificationFunc, telemetryEnabled = true } = config;

  const visitorId = request.id;
  const processRule = ruleEvaluator(clientId, visitorId);
  const dependency = hasRemoteDependency(artifact, request);

  const notificationProvider = NotificationProvider(
    request,
    visitor,
    logger,
    sendNotificationFunc,
    telemetryEnabled
  );

  /**
   *
   * @param { 'execute'|'prefetch' } mode
   * @param { Function[] } postProcessors Used to process an mbox if needed, optional
   */
  function getDecisions(
    mode: RequestMode,
    postProcessors: Array<Function>
  ): ExecuteOrPrefetchResponse {
    if (isUndefined(request[mode])) {
      return undefined;
    }

    const requestTracer = RequestTracer(traceProvider, artifact);

    /**
     *
     * @param { import("@adobe/target-tools/delivery-api-client/models/RequestDetails").RequestDetails | import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest } requestDetails
     * @param {Array<Function>} additionalPostProcessors
     */
    function processViewRequest(
      requestDetails: RequestDetails | MboxRequest | ViewRequest,
      additionalPostProcessors: Array<Function> = []
    ): Array<PrefetchResponse> {
      requestTracer.traceRequest(
        mode,
        RequestType.VIEW,
        requestDetails,
        context
      );

      const consequences = {};

      let viewRules = [];
      if (isViewRequest(requestDetails)) {
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

      return values(consequences);
    }

    /**
     * @param {import("@adobe/target-tools/delivery-api-client/models/MboxRequest").MboxRequest} mboxRequest
     * @param { Array<Function> } additionalPostProcessors
     */
    function processMboxRequest(
      mboxRequest: MboxRequest,
      additionalPostProcessors: Array<Function> = []
    ): Array<MboxResponse> {
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
          if (!isGlobalMbox) {
            break;
          }
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
    function processPageLoadRequest(
      requestDetails: RequestDetails
    ): PageLoadResponse {
      let trace;

      const consequences = processMboxRequest(
        {
          ...requestDetails,
          name: globalMboxName
        },
        [
          function preserveTrace(rule, mboxResponse) {
            // eslint-disable-next-line prefer-destructuring
            trace = mboxResponse.trace;
            return mboxResponse;
          },
          removePageLoadAttributes
        ]
      );

      const options = flatten(
        consequences.map(consequence => consequence.options)
      );

      const result: PageLoadResponse = {
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

      const metrics = values(indexedMetrics);
      if (metrics.length > 0) {
        result.metrics = metrics;
      }

      return result;
    }

    const response: ExecuteOrPrefetchResponse = {};

    if (request[mode].mboxes) {
      response.mboxes = flatten(
        request[mode].mboxes.map(mboxRequest => processMboxRequest(mboxRequest))
      );
    }

    if (mode === RequestMode.PREFETCH && request[mode].views) {
      (response as PrefetchResponse).views = flatten(
        request[mode].views.map(requestDetails =>
          processViewRequest(requestDetails)
        )
      );
    }

    if (request[mode].pageLoad) {
      response.pageLoad = processPageLoadRequest(request[mode].pageLoad);
    }
    return response;
  }

  function getExecuteDecisions(
    postProcessors: Array<Function>
  ): ExecuteResponse {
    return getDecisions(RequestMode.EXECUTE, [
      function prepareNotification(
        rule,
        mboxResponse,
        requestType,
        requestDetail,
        tracer
      ) {
        notificationProvider.addNotification(
          mboxResponse,
          tracer.traceNotification(rule)
        );

        return mboxResponse;
      },
      prepareExecuteResponse,
      ...postProcessors
    ]);
  }

  function getPrefetchDecisions(
    postProcessors: Array<Function>
  ): PrefetchResponse {
    return getDecisions(RequestMode.PREFETCH, [
      preparePrefetchResponse,
      ...postProcessors
    ]);
  }

  const addResponseTokens = createResponseTokensPostProcessor(
    context,
    responseTokens
  );

  const commonPostProcessor = [
    addResponseTokens,
    replaceCampaignMacros,
    addTrace,
    cleanUp
  ];

  const response: OnDeviceDeliveryResponse = objectWithoutUndefinedValues({
    status: dependency.remoteNeeded ? PARTIAL_CONTENT : OK,
    remoteMboxes: dependency.remoteMboxes,
    remoteViews: dependency.remoteViews,
    requestId: request.requestId,
    id: {
      ...request.id
    },
    client: clientId,
    edgeHost: undefined,
    execute: getExecuteDecisions(commonPostProcessor),
    prefetch: getPrefetchDecisions(commonPostProcessor)
  });

  notificationProvider.sendNotifications();

  logger.debug(`${LOG_TAG}`, request, response);

  return Promise.resolve(response);
}

export default DecisionProvider;
