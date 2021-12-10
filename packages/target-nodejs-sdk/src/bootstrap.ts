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
  addMboxesToRequest,
  AttributesProvider,
  DECISIONING_METHOD,
  EMPTY_REQUEST,
  EventProvider,
  getFetchApi,
  getLogger,
  requiresDecisioningEngine,
  TelemetryProvider
} from "@adobe/target-tools";

import Visitor from "@adobe-mcid/visitor-js-server";
import TargetDecisioningEngine from "@adobe/target-decisioning-engine";
import type { DecisioningArtifact } from "@adobe/target-decisioning-engine/types/DecisioningArtifact";
import { createVisitor } from "./utils";
import { Messages } from "./messages";
import { LOCATION_HINT_COOKIE, TARGET_COOKIE } from "./cookies";
import { executeDelivery } from "./target";

import { preserveLocationHint, requestLocationHintCookie } from "./helper";

import {
  validateClientOptions,
  validateGetOffersOptions,
  validateSendNotificationsOptions
} from "./validators";
import { CLIENT_READY } from "./events";
import { TargetDeliveryResponse } from "../types/SDKResponse";
import {
  CustomerId,
  DeliveryRequest
} from "@adobe/target-tools/delivery-api-client";

const AMCV_PREFIX = "AMCV_";
const DEFAULT_TIMEOUT = 3000;

export interface TargetClientFactory {
  create(options: TargetClientOptions): TargetClient;
  getVisitorCookieName(orgId: string): string;
  TargetCookieName: string;
  TargetLocationHintCookieName: string;
  AuthState: string;
}

export interface TargetClient {
  getOffers(offerOptions: TargetDeliveryRequestOptions): TargetDeliveryResponse;
  getAttributes(mboxNames, options: TargetDeliveryRequestOptions);
  sendNotifications(offerOptions: TargetDeliveryRequestOptions);
  decisioningEngine?: any;
}

export interface TargetClientOptions {
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchApi?: Function; // Fetch Implementation
  client: string; // Target Client Id
  organizationId: string; // Target Organization Id
  timeout?: number; // Target request timeout in ms, default: 3000
  serverDomain?: string; // Server domain
  targetLocationHint?: string; // Target Location Hint
  secure?: boolean; // Unset to enforce HTTP scheme, default: true
  logger?: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    debug: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    error: Function;
    built?: boolean;
  }; // Replaces the default noop logger

  decisioningMethod?: "on-device" | "server-side" | "hybrid"; // The decisioning method, defaults to remote
  pollingInterval?: number; // (On-device Decisioning) Polling interval in ms, default: 30000
  maximumWaitReady?: number; // (On-device Decisioning) The maximum amount of time (in ms) to wait for clientReady.  Default is to wait indefinitely.
  artifactLocation?: string; // (On-device Decisioning) Fully qualified url to the location of the artifact
  artifactFormat?: "json" | "bin"; // (On-device Decisioning) artifact format, defaults to json
  artifactPayload?: DecisioningArtifact; // (On-device Decisioning) A pre-fetched artifact
  environmentId?: number; // The Target environment ID, defaults to production
  environment?: string; // The Target environment name, defaults to production
  cdnEnvironment?: string; // The CDN environment name, defaults to production
  cdnBasePath?: string; // A CDN base URL to override the default based on cdnEnvironment.
  telemetryEnabled?: boolean; // If set to false, telemetry data will not be sent to Adobe
  version?: string; // The version number of the SDK
  propertyToken?: string; // A property token used to limit the scope of evaluated target activities
  // eslint-disable-next-line @typescript-eslint/ban-types
  events?: { [key: string]: Function }; // An object with event name keys and callback function values
}

export interface TargetDeliveryRequestOptions {
  request: DeliveryRequest; // Target View Delivery API request
  visitorCookie?: string; // VisitorId cookie
  targetCookie?: string; // Target cookie
  targetLocationHint?: string; // Target Location Hint
  consumerId?: string; // When stitching multiple calls, different consumerIds should be provided
  customerIds?: Array<CustomerId>; // An array of Customer Ids in VisitorId-compatible format
  sessionId?: string; // Session Id, used for linking multiple requests
  visitor?: any; // Supply an external VisitorId instance
  decisioningMethod?: "on-device" | "server-side" | "hybrid"; // The execution mode, defaults to remote
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function bootstrap(fetchApi: Function): TargetClientFactory {
  const fetchImpl = getFetchApi(fetchApi);

  if (!fetchImpl) {
    throw new Error(Messages.FETCH_UNDEFINED);
  }

  return {
    AuthState: Visitor.AuthState,
    TargetCookieName: TARGET_COOKIE,
    TargetLocationHintCookieName: LOCATION_HINT_COOKIE,
    create(options: TargetClientOptions): TargetClient {
      let error;

      error = validateClientOptions(options);

      if (error) {
        throw new Error(error);
      }

      const config = {
        internal: true,
        decisioningMethod: DECISIONING_METHOD.SERVER_SIDE,
        fetchApi: fetchImpl,
        ...options
      };

      config.timeout = options.timeout || DEFAULT_TIMEOUT;
      const logger = getLogger(options.logger);
      const telemetryProvider = TelemetryProvider(
        options.telemetryEnabled,
        options.decisioningMethod
      );

      const eventEmitter = EventProvider(config.events).emit;
      const client: TargetClient = {
        getAttributes(mboxNames, offerOptions: any = {}) {
          // eslint-disable-next-line no-param-reassign
          offerOptions.request = offerOptions.request || EMPTY_REQUEST;

          return this.getOffers({
            ...offerOptions,
            request: addMboxesToRequest(
              mboxNames,
              offerOptions.request,
              "execute"
            )
          }).then(res => AttributesProvider(res));
        },
        getOffers(offerOptions: any): any {
          error = validateGetOffersOptions(offerOptions);

          if (error) {
            return Promise.reject(new Error(error));
          }

          const visitor = createVisitor(offerOptions, config);

          const targetOptions = {
            visitor,
            config: {
              ...config,
              decisioningMethod:
                offerOptions.decisioningMethod || config.decisioningMethod
            },
            logger,
            ...offerOptions
          };

          return executeDelivery(
            targetOptions,
            telemetryProvider,
            client.decisioningEngine
          ).then(preserveLocationHint.bind(config));
        },
        sendNotifications(offerOptions: any) {
          error = validateSendNotificationsOptions(
            offerOptions,
            telemetryProvider.hasEntries()
          );

          if (error) {
            return Promise.reject(new Error(error));
          }

          const visitor = createVisitor(offerOptions, config);

          const targetOptions = {
            visitor,
            config: {
              ...config,
              decisioningMethod: DECISIONING_METHOD.SERVER_SIDE // execution mode for sending notifications must always be remote
            },
            logger,
            useBeacon: true,
            ...offerOptions
          };

          return executeDelivery(targetOptions, telemetryProvider).then(
            preserveLocationHint.bind(config)
          );
        }
      };

      if (requiresDecisioningEngine(options.decisioningMethod)) {
        Promise.all([
          requestLocationHintCookie(client, config.targetLocationHint),
          TargetDecisioningEngine(
            {
              client: options.client,
              organizationId: options.organizationId,
              pollingInterval: options.pollingInterval,
              maximumWaitReady: options.maximumWaitReady,
              artifactFormat: options.artifactFormat,
              artifactLocation: options.artifactLocation,
              artifactPayload: options.artifactPayload,
              propertyToken: options.propertyToken,
              environment: options.environment,
              cdnEnvironment: options.cdnEnvironment,
              cdnBasePath: options.cdnBasePath,
              logger,
              telemetryEnabled: options.telemetryEnabled,
              // fetchApi: fetchImpl,
              eventEmitter,
              sendNotificationFunc: notificationOptions =>
                client.sendNotifications(notificationOptions)
            },
            telemetryProvider
          )
        ])
          // eslint-disable-next-line no-unused-vars
          .then(([locationHintResponse, decisioningEngineInstance]) => {
            client.decisioningEngine = decisioningEngineInstance;
            eventEmitter(CLIENT_READY);
          })
          .catch(err => {
            logger.error(err.message);
          });
      } else {
        setTimeout(() => eventEmitter(CLIENT_READY), 100);
      }

      return client;
    },

    getVisitorCookieName(orgId: string): string {
      return AMCV_PREFIX + orgId;
    }
  };
}
