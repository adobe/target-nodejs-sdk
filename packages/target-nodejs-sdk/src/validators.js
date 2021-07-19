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
  DECISIONING_METHOD,
  isDefined,
  isUndefined,
  NOTIFICATIONS_REQUIRED
} from "@adobe/target-tools";
import { Messages } from "./messages";

import {
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isNonEmptyObject
} from "./utils";

export function validateClientOptions(options) {
  if (isEmptyObject(options)) {
    return Messages.OPTIONS_REQUIRED;
  }

  const { client, organizationId, decisioningMethod } = options;

  if (isEmptyString(client)) {
    return Messages.CLIENT_REQUIRED;
  }

  if (isEmptyString(organizationId)) {
    return Messages.ORG_ID_REQUIRED;
  }

  if (
    isDefined(decisioningMethod) &&
    !Object.values(DECISIONING_METHOD).includes(decisioningMethod)
  ) {
    return Messages.DECISIONING_METHOD_INVALID;
  }

  return null;
}

export function validateGetOffersOptions(options) {
  if (isEmptyObject(options)) {
    return Messages.OPTIONS_REQUIRED;
  }

  const { request } = options;

  if (isEmptyObject(request)) {
    return Messages.REQUEST_REQUIRED;
  }

  const { execute, prefetch } = request;

  if (
    isNonEmptyObject(execute) &&
    isUndefined(execute.pageLoad) &&
    isEmptyArray(execute.mboxes)
  ) {
    return Messages.EXECUTE_FIELDS_REQUIRED;
  }

  if (
    isNonEmptyObject(prefetch) &&
    isUndefined(prefetch.pageLoad) &&
    isEmptyArray(prefetch.views) &&
    isEmptyArray(prefetch.mboxes)
  ) {
    return Messages.PREFETCH_FIELDS_REQUIRED;
  }

  return null;
}

export function validateSendNotificationsOptions(options, hasTelemetries) {
  if (isEmptyObject(options)) {
    return Messages.OPTIONS_REQUIRED;
  }

  const { request } = options;

  if (isEmptyObject(request)) {
    return Messages.REQUEST_REQUIRED;
  }

  const { notifications } = request;

  if (isEmptyArray(notifications) && !hasTelemetries) {
    return NOTIFICATIONS_REQUIRED;
  }

  return null;
}
