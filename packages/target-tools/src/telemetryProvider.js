/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: ['error', { 'props': false }] */
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

import { now } from "./lodash";
import { DECISIONING_METHOD, EXECUTION_MODE } from "./enums";
import {
  isExecutePageLoad,
  executeMboxCount,
  isPrefetchPageLoad,
  prefetchMboxCount,
  prefetchViewCount
} from "./utils";
import InMemoryTelemetryDao from "./inMemoryTelemetryDao";

const STATUS_OK = 200;

/**
 * The get TelemetryProvider initialization method
 * @param {function} sendTelemetriesFunc function used to send the telemetries, required
 */
export default function TelemetryProvider(
  addTelemetryToDeliveryRequest,
  telemetryEnabled = true,
  method = DECISIONING_METHOD.SERVER_SIDE,
  telemetryDao = InMemoryTelemetryDao()
) {
  function getMode(status, decisioningMethod) {
    if (
      status === STATUS_OK &&
      (decisioningMethod === DECISIONING_METHOD.ON_DEVICE ||
        decisioningMethod === DECISIONING_METHOD.HYBRID)
    ) {
      return EXECUTION_MODE.LOCAL;
    }
    return EXECUTION_MODE.EDGE;
  }

  function addRenderEntry(renderId, execution) {
    if (!telemetryEnabled) {
      return;
    }

    telemetryDao.addEntry({
      requestId: renderId,
      timestamp: now(),
      execution
    });
  }

  function addRequestEntry(requestId, entry) {
    telemetryDao.addEntry({
      requestId,
      timestamp: now(),
      ...entry
    });
  }

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/TelemetryEntry").TelemetryEntry} entry
   */
  function addArtifactRequestEntry(requestId, entry) {
    if (!telemetryEnabled || !entry) {
      return;
    }
    addRequestEntry(requestId, entry);
  }

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/TelemetryEntry").TelemetryEntry} entry
   */
  function addDeliveryRequestEntry(
    request,
    entry,
    status,
    decisioningMethod = method
  ) {
    if (!telemetryEnabled || !entry) {
      return;
    }

    entry.mode = getMode(status, decisioningMethod);
    entry.features = {
      decisioningMethod,
      executePageLoad: isExecutePageLoad(request),
      executeMboxCount: executeMboxCount(request),
      prefetchPageLoad: isPrefetchPageLoad(request),
      prefetchMboxCount: prefetchMboxCount(request),
      prefetchViewCount: prefetchViewCount(request)
    };

    const { requestId } = request;

    addRequestEntry(requestId, entry);
  }

  function getAndClearEntries() {
    return telemetryDao.getAndClearEntries();
  }

  function hasEntries() {
    return telemetryDao.hasEntries();
  }

  function executeTelemetries(deliveryRequest) {
    if (hasEntries()) {
      const entries = getAndClearEntries();
      const result = addTelemetryToDeliveryRequest(deliveryRequest, entries);
      return result;
    }
    return deliveryRequest;
  }

  return {
    addDeliveryRequestEntry,
    addArtifactRequestEntry,
    addRenderEntry,
    getAndClearEntries,
    hasEntries,
    executeTelemetries
  };
}
