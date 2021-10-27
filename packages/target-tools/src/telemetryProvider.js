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

import { assign, now } from "./lodash";
import { DECISIONING_METHOD, EXECUTION_MODE } from "./enums";
import {
  isExecutePageLoad,
  executeMboxCount,
  isPrefetchPageLoad,
  prefetchMboxCount,
  prefetchViewCount
} from "./utils";
import InMemoryTelemetryStore from "./InMemoryTelemetryStore";

const STATUS_OK = 200;

/**
 * The get TelemetryProvider initialization method
 * @param {Boolean} telemetryEnabled whether or not the SDK will collect telemetry data - default: true, optional
 * @param {String} method offer decisioning method that was configured during TargetClient.create() - default: server-side, optional
 * @param {Function} telemetryStore data store for collected telemetry - default: InMemoryTelemetryStore, optional
 */
export default function TelemetryProvider(
  telemetryEnabled = true,
  method = DECISIONING_METHOD.SERVER_SIDE,
  telemetryStore = InMemoryTelemetryStore()
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

  function getFeatures(request) {
    const features = {};
    const executePageLoad = isExecutePageLoad(request);
    const executeMbox = executeMboxCount(request);
    const prefetchPageLoad = isPrefetchPageLoad(request);
    const prefetchMbox = prefetchMboxCount(request);
    const prefetchView = prefetchViewCount(request);

    if (executePageLoad) {
      features.executePageLoad = executePageLoad;
    }

    if (executeMbox) {
      features.executeMboxCount = executeMbox;
    }

    if (prefetchPageLoad) {
      features.prefetchPageLoad = prefetchPageLoad;
    }

    if (prefetchMbox) {
      features.prefetchMboxCount = prefetchMbox;
    }

    if (prefetchView) {
      features.prefetchViewCount = prefetchView;
    }

    return features;
  }

  function addRenderEntry(renderId, execution) {
    if (!telemetryEnabled) {
      return;
    }

    telemetryStore.addEntry({
      requestId: renderId,
      timestamp: now(),
      execution
    });
  }

  function addRequestEntry(requestId, entry) {
    const requestEntry = assign(
      {
        requestId,
        timestamp: now()
      },
      entry
    );
    telemetryStore.addEntry(requestEntry);
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

    const { requestId } = request;

    const features = assign(getFeatures(request), { decisioningMethod });
    const baseEntry = {
      mode: getMode(status, decisioningMethod),
      features
    };
    const deliveryRequestEntry = assign(entry, baseEntry);
    addRequestEntry(requestId, deliveryRequestEntry);
  }

  function getAndClearEntries() {
    return telemetryStore.getAndClearEntries();
  }

  function hasEntries() {
    return telemetryStore.hasEntries();
  }

  function addTelemetryToDeliveryRequest(deliveryRequest) {
    if (hasEntries()) {
      return assign(deliveryRequest, {
        telemetry: {
          entries: getAndClearEntries()
        }
      });
    }
    return deliveryRequest;
  }

  return {
    addDeliveryRequestEntry,
    addArtifactRequestEntry,
    addRenderEntry,
    getAndClearEntries,
    hasEntries,
    addTelemetryToDeliveryRequest
  };
}
