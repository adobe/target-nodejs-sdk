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

import { DECISIONING_METHOD } from "@adobe/target-tools";

export const Messages = {
  PRIVATE_CONSTRUCTOR: "Please use TargetClient.create static method instead",
  ORG_ID_REQUIRED: "Organization Id is required",
  DECISIONING_METHOD_INVALID: `Invalid Decisioning Method.  Must be set to one of: ${Object.values(
    DECISIONING_METHOD
  ).join(",")}`,
  FETCH_API_REQUIRED: "Fetch API is required",
  REQUEST_REQUIRED: "Request object is required",
  EXECUTE_FIELDS_REQUIRED: "Either pageLoad or mboxes is required in execute",
  PREFETCH_FIELDS_REQUIRED:
    "Either views, pageLoad or mboxes is required in prefetch",
  MBOX_INVALID: "Mbox validation failed for: ",
  NOTIFICATION_INVALID: "Notification validation failed for: ",
  CLIENT_REQUIRED: "Client is required",
  OPTIONS_REQUIRED: "Options map is required",
  REQUEST_SENT: "Request sent",
  RESPONSE_RECEIVED: "Response received",
  FETCH_UNDEFINED: "Fetch is not defined!",
  DECISIONING_ENGINE_UNDEFINED: "Decisioning Engine is undefined",
  LOCATION_HINT_REQUEST_FAILED: "Unable to retrieve location hint cookie."
};
