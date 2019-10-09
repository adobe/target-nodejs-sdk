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
const { getLogger, createVisitor } = require("./utils");
const {
  validateClientOptions,
  validateGetOffersOptions,
  validateSendNotificationsOptions
} = require("./validators");
const { executeDelivery } = require("./target");
const Messages = require("./messages");
const { TARGET_COOKIE, LOCATION_HINT_COOKIE } = require("./cookies");

const AMCV_PREFIX = "AMCV_";
const DEFAULT_TIMEOUT = 3000;

class TargetClient {
  constructor(options) {
    if (!options || !options.internal) {
      throw new Error(Messages.PRIVATE_CONSTRUCTOR);
    }
    this.config = options;
    this.config.timeout = options.timeout || DEFAULT_TIMEOUT;
    this.logger = getLogger(options);
  }

  /**
   * The TargetClient creation factory method
   * @param {Object} options Options map, required
   * @param {String} options.client Target Client Id, required
   * @param {String} options.organizationId Target Organization Id, required
   * @param {Number} options.timeout Target request timeout in ms, default: 3000
   * @param {String} options.serverDomain Server domain, optional
   * @param {boolean} options.secure Unset to enforce HTTP scheme, default: true
   * @param {Object} options.logger Replaces the default noop logger, optional
   */
  static create(options) {
    const error = validateClientOptions(options);

    if (error) {
      throw new Error(error);
    }

    return new TargetClient(Object.assign({ internal: true }, options));
  }

  /**
   * The TargetClient get offers method
   * @param {Object} options
   * @param {Object} options.request Target View Delivery API request, required
   * @param {String} options.visitorCookie VisitorId cookie, optional
   * @param {String} options.targetCookie Target cookie, optional
   * @param {String} options.targetLocationHintCookie Target Location Hint cookie, optional
   * @param {String} options.consumerId When stitching multiple calls, different consumerIds should be provided, optional
   * @param {Array} options.customerIds An array of Customer Ids in VisitorId-compatible format, optional
   * @param {String} options.sessionId Session Id, used for linking multiple requests, optional
   * @param {Object} options.visitor Supply an external VisitorId instance, optional
   */

  getOffers(options) {
    const error = validateGetOffersOptions(options);

    if (error) {
      return Promise.reject(new Error(error));
    }

    const visitor = createVisitor(options, this.config);

    const targetOptions = Object.assign(
      { visitor, config: this.config, logger: this.logger },
      options
    );

    return executeDelivery(targetOptions);
  }

  /**
   * The TargetClient send notifications method
   * @param {Object} options
   * @param {Object} options.request Target View Delivery API request, required
   * @param {String} options.visitorCookie VisitorId cookie, optional
   * @param {String} options.targetCookie Target cookie, optional
   * @param {String} options.targetLocationHintCookie Target Location Hint cookie, optional
   * @param {String} options.consumerId When stitching multiple calls, different consumerIds should be provided, optional
   * @param {Array} options.customerIds An array of Customer Ids in VisitorId-compatible format, optional
   * @param {String} options.sessionId Session Id, used for linking multiple requests, optional
   * @param {Object} options.visitor Supply an external VisitorId instance, optional
   */

  sendNotifications(options) {
    const error = validateSendNotificationsOptions(options);

    if (error) {
      return Promise.reject(new Error(error));
    }

    const visitor = createVisitor(options, this.config);

    const targetOptions = Object.assign(
      { visitor, config: this.config, logger: this.logger },
      options
    );

    return executeDelivery(targetOptions);
  }

  static getVisitorCookieName(orgId) {
    return AMCV_PREFIX + orgId;
  }

  static get TargetCookieName() {
    return TARGET_COOKIE;
  }

  static get TargetLocationHintCookieName() {
    return LOCATION_HINT_COOKIE;
  }

  static get AuthState() {
    return Visitor.AuthState;
  }
}

module.exports = TargetClient;
