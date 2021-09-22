/* eslint-disable import/prefer-default-export */
/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
  createPerfToolInstance,
  DECISIONING_ENGINE_NOT_READY,
  DECISIONING_METHOD,
  decisioningEngineReady,
  getFetchWithRetry,
  getProperty,
  isDefined,
  requiresDecisioningEngine
} from "@adobe/target-tools";
import {
  createDeliveryRequest,
  createHeaders,
  getCluster,
  getDeviceId,
  getSessionId,
  getTargetHost,
  processResponse
} from "./helper";
import { parseCookies } from "./cookies";
import { createApi, createConfiguration } from "./api";

const timingTool = createPerfToolInstance();

export function executeDelivery(options, telemetryProvider, decisioningEngine) {
  const {
    visitor,
    config,
    logger,
    targetCookie,
    consumerId,
    request,
    useBeacon,
    createApiMethod = createApi
  } = options;

  const property = getProperty(config, request, logger);
  if (isDefined(property)) {
    request.property = property;
  }

  const {
    serverDomain,
    client,
    organizationId,
    timeout,
    secure,
    environmentId,
    edgeConfigId
  } = config;

  let { decisioningMethod } = config;

  const fetchWithRetry = getFetchWithRetry(config.fetchApi);

  const targetLocationHint =
    options.targetLocationHint || config.targetLocationHint;

  if (
    requiresDecisioningEngine(decisioningMethod) &&
    !decisioningEngineReady(decisioningEngine)
  ) {
    // fulfill the request remotely if hybrid execution mode and decisioning engine is unavailable
    if (decisioningMethod === DECISIONING_METHOD.HYBRID) {
      decisioningMethod = DECISIONING_METHOD.SERVER_SIDE;
    } else {
      return Promise.reject(new Error(DECISIONING_ENGINE_NOT_READY));
    }
  }

  const cookies = parseCookies(targetCookie);
  const deviceId = getDeviceId(cookies);
  const cluster = getCluster(deviceId, targetLocationHint);
  const host = getTargetHost(serverDomain, cluster, client, secure);
  const sessionId = getSessionId(cookies, options.sessionId);
  const headers = createHeaders();

  const requestOptions = {
    logger,
    visitor,
    deviceId,
    consumerId,
    environmentId,
    organizationId
  };

  let deliveryRequest = createDeliveryRequest(request, requestOptions);

  const configuration = createConfiguration(
    edgeConfigId,
    fetchWithRetry,
    host,
    headers,
    timeout
  );

  const deliveryMethod = createApiMethod(
    config,
    logger,
    configuration,
    visitor,
    useBeacon,
    decisioningMethod,
    targetLocationHint,
    deliveryRequest,
    decisioningEngine
  );

  if (deliveryMethod.decisioningMethod === DECISIONING_METHOD.SERVER_SIDE) {
    deliveryRequest = telemetryProvider.executeTelemetries(deliveryRequest);
  }

  timingTool.timeStart(deliveryRequest.requestId);

  return deliveryMethod
    .execute(
      organizationId,
      sessionId,
      deliveryRequest,
      config.version,
      edgeConfigId
    )
    .then((response = {}) => {
      const endTime = timingTool.timeEnd(deliveryRequest.requestId);

      telemetryProvider.addEntry(
        deliveryRequest,
        { execution: endTime },
        response.status,
        deliveryMethod.decisioningMethod
      );

      return Object.assign(
        { visitorState: visitor.getState(), request: deliveryRequest },
        processResponse(
          sessionId,
          cluster,
          deliveryRequest,
          response,
          deliveryMethod.decisioningMethod,
          decisioningEngine
        )
      );
    });
}
