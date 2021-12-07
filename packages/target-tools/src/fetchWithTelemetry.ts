/* eslint-disable @typescript-eslint/ban-types */
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
import http from "http";
import now from "performance-now";
import { URL } from "url";
import { FetchResponse } from "../types/FetchResponse";

const PROTOCOL_MAP = {
  "http:": http.request,
  "https:": https.request
};

const HTTPS_AGENT = new https.Agent({
  keepAlive: true
});
const HTTP_AGENT = new http.Agent({
  keepAlive: true
});
const AGENT_MAP = {
  "http:": HTTP_AGENT,
  "https:": HTTPS_AGENT
};

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

const OK = 200;
const NOT_MODIFIED = 304;

const INVALID_URL =
  "Request URL is invalid.  Must use either http or https protocol.";

function creatError(status, err, timings, statusCode = undefined) {
  let message;
  try {
    message = typeof err === "object" ? JSON.stringify(err) : err;
  } catch (stringifyErr) {
    // Catches error converting circular structure to json
    message = err.message;
  }
  return { status, message, timings, statusCode };
}

function makeHeadersFetchCompatible(headers = {}) {
  return {
    get: headerName => headers[headerName.toLowerCase()]
  };
}

function createResponse(
  data,
  response,
  timings,
  status,
  headers
): FetchResponse {
  return {
    data,
    response,
    timings,
    status,
    headers: makeHeadersFetchCompatible(headers),
    ok: status === OK,
    json: () => Promise.resolve(data),
    clone: () => undefined
  };
}

/**
 * We need to maintain cross-compatibility with browser fetch impl,
 * so this returns a response object with the same interface.
 */
function createSuccess(
  data,
  response,
  timings,
  status,
  headers
): FetchResponse {
  const fetchResponse: FetchResponse = createResponse(
    data,
    response,
    timings,
    status,
    headers
  );
  fetchResponse.clone = (...args) => createResponse.apply(undefined, args);
  return fetchResponse;
}

function getTimings(timings, responseContent = undefined) {
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

  const requestTimings: any = {
    dns: timings.lookup - timings.socket,
    tls: timings.secureConnect - timings.connect,
    timeToFirstByte: timings.response - timings.secureConnect,
    download: timings.end - timings.response,
    parsingTime: timings.parsingTime
  };

  if (responseContent) {
    requestTimings.responseSize = Buffer.byteLength(responseContent, "utf8");
  }

  return requestTimings;
}

function createRequestOptions(host, path, queryParams, requestOpts) {
  const { body, headers, agent, protocol = SECURE_PROTOCOL } = requestOpts;
  return {
    method: body ? POST : GET,
    protocol,
    host,
    path: queryParams ? `${path}${queryParams}` : path,
    headers,
    agent: agent || AGENT_MAP[protocol]
  };
}

function executeRequest(options, body, timeout, callback, requestImpl) {
  const timings: any = {};
  const chunks = [];
  const startTimeNow = now();

  const request = requestImpl(options, res => {
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
        const parsingStartTime = now();
        const data = JSON.parse(content);
        timings.parsingTime = now() - parsingStartTime;
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

function determineRequestImpl(protocol, requestImpl) {
  if (requestImpl) {
    return requestImpl;
  }

  const reqImpl = PROTOCOL_MAP[protocol];
  if (!reqImpl) {
    throw new Error(INVALID_URL);
  }
  return reqImpl;
}

/**
 * Invokes the REST service using the supplied settings and parameters.
 * @param {String} host The server host.
 * @param {String} path The base URL to invoke.
 * @param {string} queryParams A map of query parameters and their values.
 * @param {Object} requestOpts Various request options:  body, headers, timeout, agent
 * @param {Function} requestImpl ???
 * @returns {Promise} A {@link https://www.promisejs.org/|Promise} object.
 */
function handleRequest(
  host: string,
  path: string,
  queryParams: string,
  requestOpts: any,
  requestImpl: Function
): Promise<FetchResponse> {
  const { body, protocol, timeout = 10000 } = requestOpts;
  const options = createRequestOptions(host, path, queryParams, requestOpts);
  return new Promise((resolve, reject) => {
    const callback = (err, response) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(response);
    };
    executeRequest(
      options,
      body,
      timeout,
      callback,
      determineRequestImpl(protocol, requestImpl)
    );
  });
}

/**
 * Fetch implementation that uses builtin https module and listens to socket events to capture telemetry data for requests.
 * The request/response interface align with the browser fetch implementation to preserve cross-compatibility.
 * @param {String} url The request url
 * @param {Object} requestOpts Options that can be used to configure the request (optional)
 * @param {Function} requestImpl Low-level request function that can be used to override the default http/s module (optional)
 */
function fetchWithTelemetry(
  url: string,
  requestOpts: any,
  requestImpl: Function
): Promise<FetchResponse> {
  const urlObject = new URL(url);
  const host = urlObject.hostname;
  const path = urlObject.pathname;
  const queryParams = urlObject.search;
  requestOpts.protocol = urlObject.protocol;
  return handleRequest(host, path, queryParams, requestOpts, requestImpl);
}

function getFetchWithTelemetry(requestImpl) {
  return function fetch(url, options = {}) {
    return fetchWithTelemetry(url, options, requestImpl);
  };
}

export default getFetchWithTelemetry;
