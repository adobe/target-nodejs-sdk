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

const { executeSendBeacon, isBeaconSupported } = require("./utils");
const { parseCookies } = require("./cookies");
const {
  getDeviceId,
  getCluster,
  getSessionId,
  getTargetHost,
  createHeaders,
  createDeliveryRequest,
  createConfiguration,
  createDeliveryApi,
  processResponse
} = require("./helper");
const { REQUEST_SENT, RESPONSE_RECEIVED } = require("./messages");

function executeDelivery(options) {
  const {
    visitor,
    config,
    logger,
    targetLocationHintCookie,
    targetCookie,
    consumerId,
    request,
    useBeacon,
    createDeliveryApiMethod = createDeliveryApi
  } = options;

  const { serverDomain, client, timeout, secure } = config;

  const cookies = parseCookies(targetCookie);
  const deviceId = getDeviceId(cookies);
  const cluster = getCluster(deviceId, targetLocationHintCookie);
  const host = getTargetHost(serverDomain, cluster, client, secure);
  const sessionId = getSessionId(cookies, options.sessionId);
  const headers = createHeaders();

  const requestOptions = {
    logger,
    visitor,
    deviceId,
    consumerId
  };

  const deliveryRequest = createDeliveryRequest(request, requestOptions);

  logger.debug(REQUEST_SENT, JSON.stringify(deliveryRequest, null, 2));

  const configuration = createConfiguration(
    config.fetchApi,
    host,
    headers,
    timeout
  );

  if (useBeacon && isBeaconSupported()) {
    const query = {
      client,
      sessionId
    };

    if (typeof config.version !== "undefined") {
      query.version = config.version;
    }

    const queryString = configuration.queryParamsStringify(query);

    const success = executeSendBeacon(
      `${host}/rest/v1/delivery?${queryString}`,
      JSON.stringify(deliveryRequest)
    );
    return success ? Promise.resolve() : Promise.reject();
  }

  return createDeliveryApiMethod(configuration)
    .execute(client, sessionId, deliveryRequest, config.version)
    .then((response = {}) => {
      logger.debug(RESPONSE_RECEIVED, JSON.stringify(response, null, 2));
      return Object.assign(
        { visitorState: visitor.getState(), request: deliveryRequest },
        processResponse(sessionId, cluster, response)
      );
    });
}

module.exports = {
  executeDelivery
};
