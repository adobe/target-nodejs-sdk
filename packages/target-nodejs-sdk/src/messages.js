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

import { EXECUTION_MODE } from "./enums";

export const Messages = {
  PRIVATE_CONSTRUCTOR: "Please use TargetClient.create static method instead",
  ORG_ID_REQUIRED: "Organization Id is required",
  EXECUTION_MODE_INVALID: `Invalid Execution Mode.  Must be set to one of: ${Object.values(
    EXECUTION_MODE
  ).join(",")}`,
  FETCH_API_REQUIRED: "Fetch API is required",
  REQUEST_REQUIRED: "Request object is required",
  EXECUTE_FIELDS_REQUIRED: "Either pageLoad or mboxes is required in execute",
  PREFETCH_FIELDS_REQUIRED:
    "Either views, pageLoad or mboxes is required in prefetch",
  NOTIFICATIONS_REQUIRED: "Notifications array is required in request",
  MBOX_INVALID: "Mbox validation failed for: ",
  NOTIFICATION_INVALID: "Notification validation failed for: ",
  CLIENT_REQUIRED: "Client is required",
  OPTIONS_REQUIRED: "Options map is required",
  REQUEST_SENT: "Request sent",
  RESPONSE_RECEIVED: "Response received",
  PENDING_ARTIFACT_RETRIEVAL:
    "Unable to fulfill request; PENDING artifact retrieval.",
  ATTRIBUTE_NOT_EXIST: (keyName, mboxName) =>
    `Attribute '${keyName}' does not exist for mbox '${mboxName}'`,
  FETCH_UNDEFINED: "Fetch is not defined!",
  PARTIAL_RESULT:
    "Partial result.  Some decisions were made locally, but a remote request may be needed.",
  LOCAL_RESULT: "Decisions made locally.",
  REMOTE_RESULT: "Decisions made remotely",
  DECISIONING_ENGINE_UNDEFINED: "Decisioning Engine is undefined",
  LOCATION_HINT_REQUEST_FAILED: "Unable to retrieve location hint cookie."
};
