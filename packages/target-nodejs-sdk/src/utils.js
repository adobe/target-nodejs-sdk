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

import { isBrowser, isDefined, isString } from "@adobe/target-tools";

import Visitor from "@adobe-mcid/visitor-js-server";

const NAVIGATOR = "navigator";
const SEND_BEACON = "sendBeacon";

export const isObject = value => value instanceof Object;
export const isPrimitiveObject = value =>
  value instanceof String ||
  value instanceof Number ||
  value instanceof Boolean ||
  value instanceof Symbol;

export const noUndefinedValues = value =>
  !!Object.values(value).filter(obj => isDefined(obj)).length;
export const isNonEmptyObject = value =>
  isObject(value) &&
  !Array.isArray(value) &&
  !isPrimitiveObject(value) &&
  noUndefinedValues(value);
export const isEmptyObject = value => !isNonEmptyObject(value);

export const isNonEmptyString = value => isString(value) && !!value.length;
export const isEmptyString = value => !isNonEmptyString(value);

export const isNonEmptyArray = value =>
  Array.isArray(value) && !!value.length && noUndefinedValues(value);
export const isEmptyArray = value => !isNonEmptyArray(value);

export const removeEmptyKeys = object =>
  // eslint-disable-next-line no-param-reassign
  Object.keys(object).forEach(key => !object[key] && delete object[key]);

export const flatten = (array = []) => [].concat(...array);

export const getTimezoneOffset = () => -new Date().getTimezoneOffset();

export function createVisitor(options, config) {
  const { organizationId } = config;
  const { visitor, visitorCookie, customerIds } = options;
  const createdVisitor = visitor || new Visitor(organizationId, visitorCookie);

  if (customerIds) {
    createdVisitor.setCustomerIDs(customerIds);
  }

  return createdVisitor;
}

export function isBeaconSupported() {
  return (
    isBrowser() &&
    // eslint-disable-next-line no-undef
    NAVIGATOR in window &&
    // eslint-disable-next-line no-undef
    SEND_BEACON in window[NAVIGATOR]
  );
}

export function executeSendBeacon(url, data) {
  // eslint-disable-next-line no-undef
  return window[NAVIGATOR][SEND_BEACON](url, data);
}
