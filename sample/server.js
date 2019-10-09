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

const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const TargetClient = require("../lib/index");
const TEMPLATE = fs.readFileSync(__dirname + "/templates/index.tpl").toString();
const CONFIG = require("./config.json");

const app = express();
const targetOptions = Object.assign({ logger: console }, CONFIG);
const targetClient = TargetClient.create(targetOptions);

app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

function saveCookie(res, cookie) {
  if (!cookie) {
    return;
  }

  res.cookie(cookie.name, cookie.value, {maxAge: cookie.maxAge * 1000});
}

function sendHtml(res, response) {
  const serverState = {
    request: response.request,
    response: response.response
  };

  let result = TEMPLATE
  .replace(/\$\{organizationId\}/g, CONFIG.organizationId)
  .replace("${clientCode}", CONFIG.client)
  .replace("${visitorState}", JSON.stringify(response.visitorState))
  .replace("${content}", JSON.stringify(response.response, null, ' '))
  .replace("${serverState}", JSON.stringify(serverState, null, ' '));

  if (CONFIG.serverDomain) {
    result = result.replace("${serverDomain}", CONFIG.serverDomain);
  } else {
    result = result.replace(`serverDomain: "\${serverDomain}"`, "");
  }

  res.status(200).send(result);
}

const getResponseHeaders = () => ({
  "Content-Type": "text/html",
  "Expires": new Date().toUTCString()
});

function sendResponse(res, response) {
  res.set(getResponseHeaders());

  saveCookie(res, response.targetCookie);
  saveCookie(res, response.targetLocationHintCookie);
  sendHtml(res, response);
}

function sendErrorResponse(res, error) {
  res.set(getResponseHeaders());

  res.status(200).send(error);
}

function getCommonTargetOptions(req) {
  return {
    targetCookie: req.cookies[TargetClient.TargetCookieName],
    targetLocationHintCookie: req.cookies[TargetClient.TargetLocationHintCookieName]
  }
}

function setTraceToken(trace = {}, req) {
  const { authorizationToken = req.query.authorization } = trace;

  if (!authorizationToken || typeof authorizationToken !== "string") {
    return trace;
  }

  return Object.assign({}, trace, { authorizationToken });
}

async function processTargetRequest(request, req, res) {
  request.trace = setTraceToken(request.trace, req);
  const options = Object.assign({ request }, getCommonTargetOptions(req));

  try {
    const resp = await targetClient.getOffers(options);
    sendResponse(res, resp);
  } catch (error) {
    console.error("Target:", error);
    sendErrorResponse(res, error);
  }
}

app.get('/executembox', function (req, res) {
  const executeMboxRequest = {
    execute: {
      mboxes: [{ name: "a1-serverside-ab" }]
    }};

  processTargetRequest(executeMboxRequest, req, res);
});

app.get('/executemboxes', function (req, res) {
  const executeMboxesRequest = {
    execute: {
      mboxes: [
        { name: "first-multi-mbox" },
        { name: "second-multi-mbox" },
        { name: "single-mbox" }]
    }};

  processTargetRequest(executeMboxesRequest, req, res);
});

app.get('/prefetchmbox', function (req, res) {
  const prefetchMboxRequest = {
    prefetch: {
      mboxes: [{ name: "a1-serverside-ab" }]
    }};

  processTargetRequest(prefetchMboxRequest, req, res);
});

app.get('/prefetchmboxes', function (req, res) {
  const prefetchMboxesRequest = {
    prefetch: {
      mboxes: [
        { name: "first-multi-mbox" },
        { name: "second-multi-mbox" },
        { name: "single-mbox" }]
    }};

  processTargetRequest(prefetchMboxesRequest, req, res);
});

app.get('/executepageload', function (req, res) {
  const executePageLoadRequest = {
    execute: {
      pageLoad: { address: { url: req.headers.host + req.originalUrl }}
    }};

  processTargetRequest(executePageLoadRequest, req, res);
});

app.get('/prefetchpageload', function (req, res) {
  const prefetchPageLoadRequest = {
    prefetch: {
      pageLoad: { address: { url: req.headers.host + req.originalUrl }}
    }};

  processTargetRequest(prefetchPageLoadRequest, req, res);
});

app.listen(3000, () => console.log("Listening on port 3000 and watching!"));

process.on("warning", e => {
  console.log("Node application warning", e);
  process.exit(-1);
});
