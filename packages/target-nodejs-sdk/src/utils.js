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

const Visitor = require("@adobe-mcid/visitor-js-server");

const NAVIGATOR = "navigator";
const SEND_BEACON = "sendBeacon";

const isObject = value => value instanceof Object;
const isString = value => typeof value === "string" || value instanceof String;
const isNumber = value => typeof value === "number" || value instanceof Number;
const isPrimitiveObject = value =>
  value instanceof String ||
  value instanceof Number ||
  value instanceof Boolean ||
  value instanceof Symbol;

const noUndefinedValues = value =>
  !!Object.values(value).filter(obj => typeof obj !== "undefined").length;
const isNonEmptyObject = value =>
  isObject(value) &&
  !Array.isArray(value) &&
  !isPrimitiveObject(value) &&
  noUndefinedValues(value);
const isEmptyObject = value => !isNonEmptyObject(value);

const isNonEmptyString = value => isString(value) && !!value.length;
const isEmptyString = value => !isNonEmptyString(value);

const isNonEmptyArray = value =>
  Array.isArray(value) && !!value.length && noUndefinedValues(value);
const isEmptyArray = value => !isNonEmptyArray(value);

const removeEmptyKeys = object =>
  // eslint-disable-next-line no-param-reassign
  Object.keys(object).forEach(key => !object[key] && delete object[key]);

const flatten = (array = []) => [].concat(...array);

const getTimezoneOffset = () => -new Date().getTimezoneOffset();

function createVisitor(options, config) {
  const { organizationId } = config;
  const { visitor, visitorCookie, customerIds } = options;
  const createdVisitor = visitor || new Visitor(organizationId, visitorCookie);

  if (customerIds) {
    createdVisitor.setCustomerIDs(customerIds);
  }

  return createdVisitor;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function isBeaconSupported() {
  return (
    isBrowser() &&
    // eslint-disable-next-line no-undef
    NAVIGATOR in window &&
    // eslint-disable-next-line no-undef
    SEND_BEACON in window[NAVIGATOR]
  );
}

function executeSendBeacon(url, data) {
  // eslint-disable-next-line no-undef
  return window[NAVIGATOR][SEND_BEACON](url, data);
}

module.exports = {
  isNonEmptyObject,
  isEmptyObject,
  isNonEmptyString,
  isEmptyString,
  isNonEmptyArray,
  isEmptyArray,
  isObject,
  isNumber,
  removeEmptyKeys,
  flatten,
  getTimezoneOffset,
  createVisitor,
  isBrowser,
  isBeaconSupported,
  executeSendBeacon
};
