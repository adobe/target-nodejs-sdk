/* eslint no-param-reassign: ['error', { 'props': false }] */
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import https from "https";

const DEFAULT_AGENT = new https.Agent({
  keepAlive: true
});
const GET = "GET";
const POST = "POST";
const SECURE_PROTOCOL = "https:";
const UTF8_ENCODING = "utf8";
const ERROR = "error";
const PARSE_ERROR = "parse_error";
const ABORT = "abort";
const TIMEOUT = "timeout";
const ABORTED = "Request aborted";
const TIMED_OUT = "Request timed out";

const RESPONSE_EVENT = "response";
const DATA_EVENT = "data";
const END_EVENT = "end";
const ABORT_EVENT = "abort";
const TIMEOUT_EVENT = "timeout";
const ERROR_EVENT = "error";
const SOCKET_EVENT = "socket";
const LOOKUP_EVENT = "lookup";
const CONNECT_EVENT = "connect";
const SECURE_CONNECT_EVENT = "secureConnect";

const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;

const OK = 200;
const NOT_MODIFIED = 304;

function getNanoSeconds() {
  const hr = process.hrtime();

  return hr[0] * NS_PER_SEC + hr[1];
}

const UP_TIME = process.uptime() * NS_PER_SEC;
const MODULE_LOAD_TIME = getNanoSeconds();
const NODE_LOAD_TIME = MODULE_LOAD_TIME - UP_TIME;

function now() {
  return (getNanoSeconds() - NODE_LOAD_TIME) / MS_PER_NS;
}

function creatError(status, err, timings, statusCode) {
  const message = typeof err === "object" ? JSON.stringify(err) : err;
  return { status, message, timings, statusCode };
}

function makeHeadersFetchCompatible(headers = {}) {
  return {
    get: headerName => headers[headerName.toLowerCase()]
  };
}

function createResponse(data, response, timings, status, headers) {
  return {
    data,
    response,
    timings,
    status,
    headers: makeHeadersFetchCompatible(headers),
    ok: status === OK,
    json: () => Promise.resolve(data)
  };
}

/**
 * We need to maintain cross-compatibility with browser fetch impl,
 * so this returns a response object with the same interface.
 * @return {import("../types/FetchResponse").FetchResponse}
 */
function createSuccess(data, response, timings, status, headers) {
  const fetchResponse = createResponse(
    data,
    response,
    timings,
    status,
    headers
  );
  // eslint-disable-next-line prefer-rest-params
  fetchResponse.clone = () => createResponse(...arguments);
  return fetchResponse;
}

function getTimings(timings, responseContent) {
  if (!timings.socket) {
    timings.socket = 0;
  }

  if (!timings.lookup) {
    timings.lookup = timings.socket;
  }

  if (!timings.connect) {
    timings.connect = timings.lookup;
  }

  if (!timings.secureConnect) {
    timings.secureConnect = timings.connect;
  }

  if (!timings.response) {
    timings.response = timings.secureConnect;
  }

  const requestTimings = {
    dns: timings.lookup - timings.socket,
    tls: timings.secureConnect - timings.connect,
    timeToFirstByte: timings.response - timings.secureConnect,
    download: timings.end - timings.response
  };

  if (responseContent) {
    requestTimings.responseSize = Buffer.byteLength(responseContent, ["utf8"]);
  }

  return requestTimings;
}

function createRequestOptions(host, path, queryParams, requestOpts) {
  const { body, headers, agent } = requestOpts;
  return {
    method: body ? POST : GET,
    protocol: SECURE_PROTOCOL,
    host,
    path: queryParams ? `${path}${queryParams}` : path,
    headers,
    agent: agent || DEFAULT_AGENT
  };
}

function executeRequest(options, body, timeout, callback) {
  const timings = {};
  const chunks = [];
  const startTimeNow = now();
  const request = https.request(options, res => {
    res.setEncoding(UTF8_ENCODING);
  });
  const onLookup = () => {
    timings.lookup = now() - startTimeNow;
  };
  const onConnect = () => {
    timings.connect = now() - startTimeNow;
  };
  const onSecureConnect = () => {
    timings.secureConnect = now() - startTimeNow;
  };
  const onError = err => {
    callback(creatError(ERROR, err, getTimings(timings)));

    if (request.socket) {
      request.socket.removeListener(LOOKUP_EVENT, onLookup);
      request.socket.removeListener(CONNECT_EVENT, onConnect);
      request.socket.removeListener(SECURE_CONNECT_EVENT, onSecureConnect);
    }
  };
  const onSocket = socket => {
    timings.socket = now() - startTimeNow;

    if (socket._connecting || socket.connecting) {
      socket.once(LOOKUP_EVENT, onLookup);
      socket.once(CONNECT_EVENT, onConnect);
      socket.once(SECURE_CONNECT_EVENT, onSecureConnect);
      socket.once(ERROR_EVENT, onError);
    }
  };
  const onResponse = response => {
    timings.response = now() - startTimeNow;

    response.on(DATA_EVENT, chunk => {
      chunks.push(chunk);
    });

    response.once(END_EVENT, () => {
      const content = chunks.join("");
      timings.end = now() - startTimeNow;

      if (response.statusCode !== OK && response.statusCode !== NOT_MODIFIED) {
        callback(
          creatError(ERROR, content, getTimings(timings), response.statusCode)
        );
        return;
      }

      try {
        const data = JSON.parse(content);
        callback(
          null,
          createSuccess(
            data,
            content,
            getTimings(timings, content),
            response.statusCode,
            response.headers
          )
        );
      } catch (error) {
        callback(
          creatError(
            PARSE_ERROR,
            error,
            getTimings(timings),
            response.statusCode
          )
        );
      }
    });
  };

  request.once(RESPONSE_EVENT, onResponse);
  request.once(SOCKET_EVENT, onSocket);
  request.once(ABORT_EVENT, () =>
    callback(creatError(ABORT, ABORTED, getTimings(timings)))
  );
  request.once(TIMEOUT_EVENT, () =>
    callback(creatError(TIMEOUT, TIMED_OUT, getTimings(timings)))
  );
  request.once(ERROR_EVENT, onError);

  request.setTimeout(timeout);
  if (options.method === POST) {
    request.write(body);
  }
  request.end();
}

/**
 * Invokes the REST service using the supplied settings and parameters.
 * @param {String} host The server host.
 * @param {String} path The base URL to invoke.
 * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
 * @param {Object} requestOpts Various request options:  body, headers, timeout, agent
 * @returns {Promise} A {@link https://www.promisejs.org/|Promise} object.
 */
function handleRequest(host, path, queryParams, requestOpts) {
  const { body, timeout = 10000 } = requestOpts;
  const options = createRequestOptions(host, path, queryParams, requestOpts);
  return new Promise((resolve, reject) => {
    executeRequest(options, body, timeout, (err, response) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

/**
 * Fetch implementation that uses builtin https module and listens to socket events to capture telemetry data for requests.
 * The request/response interface align with the browser fetch implementation to preserve cross-compatibility.
 * @param {String} url The request url
 * @param {Object} requestOpts Options that can be used to configure the request (optional)
 * @return {Promise<import("../types/FetchResponse").FetchResponse>}
 */
function fetch(url, requestOpts = {}) {
  const urlObject = new URL(url);
  const host = urlObject.hostname;
  const path = urlObject.pathname;
  const queryParams = urlObject.search;
  return handleRequest(host, path, queryParams, requestOpts);
}

export default fetch;
