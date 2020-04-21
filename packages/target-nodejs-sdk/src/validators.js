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

import { EXECUTION_MODE } from "@adobe/target-tools";
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

  const { client, organizationId, executionMode } = options;

  if (isEmptyString(client)) {
    return Messages.CLIENT_REQUIRED;
  }

  if (isEmptyString(organizationId)) {
    return Messages.ORG_ID_REQUIRED;
  }

  if (
    typeof executionMode !== "undefined" &&
    !Object.values(EXECUTION_MODE).includes(executionMode)
  ) {
    return Messages.EXECUTION_MODE_INVALID;
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
    typeof execute.pageLoad === "undefined" &&
    isEmptyArray(execute.mboxes)
  ) {
    return Messages.EXECUTE_FIELDS_REQUIRED;
  }

  if (
    isNonEmptyObject(prefetch) &&
    typeof prefetch.pageLoad === "undefined" &&
    isEmptyArray(prefetch.views) &&
    isEmptyArray(prefetch.mboxes)
  ) {
    return Messages.PREFETCH_FIELDS_REQUIRED;
  }

  return null;
}

export function validateSendNotificationsOptions(options) {
  if (isEmptyObject(options)) {
    return Messages.OPTIONS_REQUIRED;
  }

  const { request } = options;

  if (isEmptyObject(request)) {
    return Messages.REQUEST_REQUIRED;
  }

  const { notifications } = request;

  if (isEmptyArray(notifications)) {
    return Messages.NOTIFICATIONS_REQUIRED;
  }

  return null;
}
