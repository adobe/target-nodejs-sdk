/* eslint-disable import/prefer-default-export */
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
  DECISIONING_ENGINE_NOT_READY,
  decisioningEngineReady,
  DECISIONING_METHOD,
  getFetchWithRetry,
  getProperty,
  isDefined,
  requiresDecisioningEngine,
  createPerfToolInstance
} from "@adobe/target-tools";
import { Messages } from "./messages";
import {
  createConfiguration,
  createDeliveryRequest,
  getCluster,
  getDeviceId,
  getSessionId
} from "./helper";
import { parseCookies } from "./cookies";

const timingTool = createPerfToolInstance();

function createKonductorApi() {
  // TODO: Implement in aep-edge-tools
  throw new Error(Messages.NOT_IMPLEMENTED);
}

function getAepEdgeHost() {
  // TODO: Implement in aep-edge-tools
  throw new Error(Messages.NOT_IMPLEMENTED);
}

function createAepHeaders() {
  // TODO: Implement in aep-edge-tools
  throw new Error(Messages.NOT_IMPLEMENTED);
}

function mapDeliveryRequest() {
  // TODO: Implement in DeliveryRequestMapper.map()
  throw new Error(Messages.NOT_IMPLEMENTED);
}

function processResponse() {
  // TODO: Implement
  // TODO: KonductorResponseMapper.map() should be called inside this method
  throw new Error(Messages.NOT_IMPLEMENTED);
}

export function executeAepDelivery(
  options,
  telemetryProvider,
  decisioningEngine
) {
  const {
    visitor,
    config,
    logger,
    targetCookie,
    consumerId,
    request,
    useBeacon,
    createDeliveryApiMethod = createKonductorApi
  } = options;

  try {
    const property = getProperty(config, request, logger);
    if (isDefined(property)) {
      request.property = property;
    }

    const {
      edgeConfigId,
      serverDomain,
      client,
      organizationId,
      timeout,
      secure,
      environmentId
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
    const host = getAepEdgeHost(serverDomain, cluster, client, secure);
    const sessionId = getSessionId(cookies, options.sessionId);
    const headers = createAepHeaders();

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
      fetchWithRetry,
      host,
      headers,
      timeout
    );

    const deliveryMethod = createDeliveryApiMethod(
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

    const konductorRequest = mapDeliveryRequest(deliveryRequest);

    logger.debug(
      Messages.REQUEST_SENT,
      deliveryMethod.decisioningMethod,
      host,
      JSON.stringify(deliveryRequest, null, 2),
      JSON.stringify(konductorRequest, null, 2)
    );
    timingTool.timeStart(deliveryRequest.requestId);

    return deliveryMethod
      .execute(
        organizationId,
        edgeConfigId,
        sessionId,
        konductorRequest,
        config.version
      )
      .then((response = {}) => {
        const endTime = timingTool.timeEnd(deliveryRequest.requestId);

        logger.debug(
          Messages.RESPONSE_RECEIVED,
          JSON.stringify(response, null, 2)
        );

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
  } catch (e) {
    return Promise.reject(e);
  }
}
