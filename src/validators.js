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

const Messages = require("./messages");
const {
  isNonEmptyObject,
  isEmptyObject,
  isEmptyArray,
  isEmptyString
} = require("./utils");

function validateClientOptions(options) {
  if (isEmptyObject(options)) {
    return Messages.OPTIONS_REQUIRED;
  }

  const { client, organizationId } = options;

  if (isEmptyString(client)) {
    return Messages.CLIENT_REQUIRED;
  }

  if (isEmptyString(organizationId)) {
    return Messages.ORG_ID_REQUIRED;
  }

  return null;
}

function validateGetOffersOptions(options) {
  if (isEmptyObject(options)) {
    return Messages.OPTIONS_REQUIRED;
  }

  const { request } = options;

  if (isEmptyObject(request)) {
    return Messages.REQUEST_REQUIRED;
  }

  const { execute, prefetch } = request;

  if (isEmptyObject(execute) && isEmptyObject(prefetch)) {
    return Messages.EXECUTE_OR_PREFETCH_REQUIRED;
  }

  if (
    isNonEmptyObject(execute) &&
    isEmptyObject(execute.pageLoad) &&
    isEmptyArray(execute.mboxes)
  ) {
    return Messages.EXECUTE_FIELDS_REQUIRED;
  }

  if (
    isNonEmptyObject(prefetch) &&
    isEmptyObject(prefetch.pageLoad) &&
    isEmptyArray(prefetch.views) &&
    isEmptyArray(prefetch.mboxes)
  ) {
    return Messages.PREFETCH_FIELDS_REQUIRED;
  }

  return null;
}

function validateSendNotificationsOptions(options) {
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

module.exports = {
  validateClientOptions,
  validateGetOffersOptions,
  validateSendNotificationsOptions
};
