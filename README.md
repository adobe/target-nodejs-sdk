# Adobe Target Node.js SDK
![npm](https://img.shields.io/npm/v/@adobe/target-nodejs-sdk)
![npm](https://img.shields.io/npm/dm/@adobe/target-nodejs-sdk)
![build](https://github.com/adobe/target-nodejs-sdk/workflows/build/badge.svg)
![coveralls](https://img.shields.io/coveralls/github/adobe/target-nodejs-sdk)
![license](https://img.shields.io/npm/l/@adobe/target-nodejs-sdk)

The Adobe Target Node.js SDK uses the [Target View Delivery API] to retrieve and deliver personalized experiences.
Furthermore, the Node,js SDK helps manage integrations with Experience Cloud solutions using the Experience Cloud
Identity library (ECID).

## Getting started

### Prerequisites

All currently maintained versions of Node.js are supported (including LTS versions), see 
[Node.js Releases](https://en.wikipedia.org/wiki/Node.js#Releases).  
Older Node.js releases may likely work too, but are not officially supported.

### Installation  

To get started with Target Node.js SDK, just add it as a dependency by installing from NPM:
```js
npm i @adobe/target-nodejs-sdk -P
```

## Super Simple to Use

The Target Node.js SDK has been designed to facilitate interaction with Adobe [Target View Delivery API] 
in server-side Node.js environments.

```js
const TargetClient = require("@adobe/target-nodejs-sdk");

const targetClient = TargetClient.create({
  client: "acmeclient",
  organizationId: "1234567890@AdobeOrg"
});

const request = {
  execute: {
    mboxes: [{ name: "a1-serverside-ab" }]
  }
};

try {
  const response = await targetClient.getOffers({ request });
  console.log('Response', response);
} catch (error) {
  console.error('Error', error);
}
```

## Table of Contents

  * [Getting started](#getting-started)
    + [Prerequisites](#prerequisites)
    + [Installation](#installation)
  * [Super Simple to Use](#super-simple-to-use)
  * [Table of Contents](#table-of-contents)
  * [Target Only](#target-only)
  * [ECID Integration](#ecid-integration)
  * [ECID with Customer IDs Integration](#ecid-with-customer-ids-integration)
  * [ECID and Analytics Integration](#ecid-and-analytics-integration)
  * [ECID, Analytics and at.js Integration](#ecid--analytics-and-atjs-integration)
  * [Advanced at.js integration via serverState](#advanced-atjs-integration-via-serverstate)
  * [Shared ECID and Analytics Integration](#shared-ecid-and-analytics-integration)
  * [Custom rendering of Target offers](#custom-rendering-of-target-offers)
  * [Troubleshooting](#troubleshooting)
  * [Target Traces](#target-traces)
  * [Target Node.js SDK API](#target-nodejs-sdk-api)
      - [TargetClient.create](#targetclientcreate)
      - [TargetClient.getOffers](#targetclientgetoffers)
      - [TargetClient.sendNotifications](#targetclientsendnotifications)
      - [TargetClient utility accessors](#targetclient-utility-accessors)
  * [Multiple API requests](#multiple-api-requests)
  * [Development](#development)
  * [Additional code](#additional-code)

---

## Target Only

The Target Node.js SDK can be used to retrieve personalized content from Target without forcing the use of ECID. 

```js
const TargetClient = require("@adobe/target-nodejs-sdk");

const targetClient = TargetClient.create({
  client: "acmeclient",
  organizationId: "1234567890@AdobeOrg"
});

const request = {
  execute: {
    mboxes: [{
      name: "a1-serverside-ab"
    }]
  }
};

try {
  const response = await targetClient.getOffers({ request });
  console.log('Response', response);
} catch (error) {
  console.error('Error', error);
}
```

By default, the Target Node.js SDK generates a new session ID for every Target call, 
 which might not always be the desired behavior. To ensure that Target properly tracks the user session,
you should ensure that the Target cookie is sent to the browser after Target content is retrieved
 and the Target cookie value is passed to `getOffers()`/`sendNotifications()` as an incoming request is processed.  
The original request URL should also be passed in the `address` field of the Delivery request. 

In a sample `Express` application, this could look like this:

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const TargetClient = require("@adobe/target-nodejs-sdk");
const CONFIG = {
  client: "acmeclient",
  organizationId: "1234567890@AdobeOrg"
};

const app = express();
const targetClient = TargetClient.create(CONFIG);

app.use(cookieParser());

function saveCookie(res, cookie) {
  if (!cookie) {
    return;
  }

  res.cookie(cookie.name, cookie.value, {maxAge: cookie.maxAge * 1000});
}

const getResponseHeaders = () => ({
  "Content-Type": "text/html",
  "Expires": new Date().toUTCString()
});

function sendSuccessResponse(res, response) {
  res.set(getResponseHeaders());
  saveCookie(res, response.targetCookie);
  res.status(200).send(response);
}

function sendErrorResponse(res, error) {
  res.set(getResponseHeaders());
  res.status(500).send(error);
}

app.get("/abtest", async (req, res) => {
  const targetCookie = req.cookies[TargetClient.TargetCookieName];
  const request = {
    execute: {
      mboxes: [{
        address: { url: req.headers.host + req.originalUrl },
        name: "a1-serverside-ab"
      }]
    }};

  try {
    const response = await targetClient.getOffers({ request, targetCookie });
    sendSuccessResponse(res, response);
  } catch (error) {
    console.error("Target:", error);
    sendErrorResponse(res, error);    
  }
});

app.listen(3000, function () {
  console.log("Listening on port 3000 and watching!");
});
```

Full sample: https://github.com/Adobe-Marketing-Cloud/target-node-client-samples/tree/master/target-only

---

## ECID Integration

Although using the Target Node.js SDK for fetching content from Target can be powerful, the added value of using ECID
for user tracking outweighs using Target only. ECID allows leveraging all the cool features of the Adobe Experience Cloud,
such as audience sharing, analytics integration, etc.  
Using Target and ECID in an `Express` application is pretty straightforward. ECID has a client-side part, so we'll have 
to use a simple template that references the ECID client-side JavaScript library. 

Here is the sample `Express` application:

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const TargetClient = require("@adobe/target-nodejs-sdk");
const CONFIG = {
  client: "acmeclient",
  organizationId: "1234567890@AdobeOrg"
};
const TEMPLATE = `
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ECID (Visitor API) Integration Sample</title>
  <script src="VisitorAPI.js"></script>
  <script>
    Visitor.getInstance("${organizationId}", {serverState: ${visitorState}});
  </script>
</head>
<body>
  <pre>${content}</pre>
</body>
</html>
`;

const app = express();
const targetClient = TargetClient.create(CONFIG);

app.use(cookieParser());
// We assume that VisitorAPI.js is stored in "public" folder
app.use(express.static(__dirname + "/public"));

function saveCookie(res, cookie) {
  if (!cookie) {
    return;
  }

  res.cookie(cookie.name, cookie.value, {maxAge: cookie.maxAge * 1000});
}

const getResponseHeaders = () => ({
  "Content-Type": "text/html",
  "Expires": new Date().toUTCString()
});

function sendSuccessResponse(res, response) {
  res.set(getResponseHeaders());

  const result = TEMPLATE
  .replace("${organizationId}", CONFIG.organizationId)
  .replace("${visitorState}", JSON.stringify(response.visitorState))
  .replace("${content}", response);

  saveCookie(res, response.targetCookie);

  res.status(200).send(result);
}

function sendErrorResponse(res, error) {
  res.set(getResponseHeaders());
  res.status(500).send(error);
}

app.get("/abtest", async (req, res) => {
  const visitorCookie = req.cookies[TargetClient.getVisitorCookieName(CONFIG.organizationId)];
  const targetCookie = req.cookies[TargetClient.TargetCookieName];
  const request = {
      execute: {
        mboxes: [{
          address: { url: req.headers.host + req.originalUrl },
          name: "a1-serverside-ab"
        }]
      }};

  console.log("Request", request);

  try {
      const response = await targetClient.getOffers({ request, visitorCookie, targetCookie });
      sendSuccessResponse(res, response);
    } catch (error) {
      sendErrorResponse(res, error);
    }
});

app.listen(3000, function () {
  console.log("Listening on port 3000 and watching!");
});
```

The biggest benefit of using ECID integration is that it allows you to share Audience Manager segments with Target.
Note that as this is a server-side integration for first-time visitors, you might not have any Audience Manager 
related data.

Full sample: https://github.com/Adobe-Marketing-Cloud/target-node-client-samples/tree/master/ecid-integration

---

## ECID with Customer IDs Integration

In order to track visitor user accounts and logon status details, `customerIds` may be passed to Target.   
The `customerIds` object is similar to the ECID functionality described here: https://marketing.adobe.com/resources/help/en_US/mcvid/mcvid-authenticated-state.htmlocs.adobe.com/content/help/en/id-service/using/reference/authenticated-state.html

Here is the `Express` application that showcases `customerIds` integration:

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const TargetClient = require("@adobe/target-nodejs-sdk");
const CONFIG = {
  client: "acmeclient",
  organizationId: "1234567890@AdobeOrg"
};
const TEMPLATE = `
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ECID (Visitor API) with Customer IDs Integration Sample</title>
  <script src="VisitorAPI.js"></script>
  <script>
    Visitor.getInstance("${organizationId}", {serverState: ${visitorState}});
  </script>
</head>
<body>
  <pre>${content}</pre>
</body>
</html>
`;

const app = express();
const targetClient = TargetClient.create(CONFIG);

app.use(cookieParser());
// We assume that VisitorAPI.js is stored in "public" folder
app.use(express.static(__dirname + "/public"));

function saveCookie(res, cookie) {
  if (!cookie) {
    return;
  }

  res.cookie(cookie.name, cookie.value, {maxAge: cookie.maxAge * 1000});
}

const getResponseHeaders = () => ({
  "Content-Type": "text/html",
  "Expires": new Date().toUTCString()
});

function sendSuccessResponse(res, response) {
  res.set(getResponseHeaders());

  const result = TEMPLATE
  .replace("${organizationId}", CONFIG.organizationId)
  .replace("${visitorState}", JSON.stringify(response.visitorState))
  .replace("${content}", response);

  saveCookie(res, response.targetCookie);

  res.status(200).send(result);
}

function sendErrorResponse(res, error) {
  res.set(getResponseHeaders());
  res.status(500).send(error);
}

app.get("/abtest", async (req, res) => {
  const visitorCookie = req.cookies[TargetClient.getVisitorCookieName(CONFIG.organizationId)];
  const targetCookie = req.cookies[TargetClient.TargetCookieName];
  const customerIds = {
      "userid": {
        "id": "67312378756723456",
        "authState": TargetClient.AuthState.AUTHENTICATED
      }
    };
  const request = {
    execute: {
      mboxes: [{
        address: { url: req.headers.host + req.originalUrl },
        name: "a1-serverside-ab"
      }]
    }};
    
  try {
    const response = await targetClient.getOffers({ request, visitorCookie, targetCookie, customerIds });
    sendSuccessResponse(res, response);
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

app.listen(3000, function () {
  console.log("Listening on port 3000 and watching!");
});
```

Full sample: https://github.com/Adobe-Marketing-Cloud/target-node-client-samples/tree/master/ecid-customer-ids-integration

---


## ECID and Analytics Integration

To get the most out of the Target Node.js SDK and to use the powerful analytics capabilities provided by Adobe Analytics,
 you can use the Target, ECID and Analytics combo. 

Using MCID, Analytics, and Target lets you:
- Use segments from Adobe Audience Manager
- Customize the user experience based on the content retrieved from Target
- Ensure that all events and success metrics are collected in Analytics
- Use Analytics' powerful queries and benefit from awesome report visualizations

Here is a simple `Express` application that demonstrates how you can use all three solutions in a single application: 

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const TargetClient = require("@adobe/target-nodejs-sdk");
const CONFIG = {
  client: "acmeclient",
  organizationId: "1234567890@AdobeOrg"
};
const TEMPLATE = `
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ECID and Analytics integration Sample</title>
  <script src="VisitorAPI.js"></script>
  <script>
    Visitor.getInstance("${organizationId}", {serverState: ${visitorState}});
  </script>
</head>
<body>
  <p>${content}</p>
  <script src="AppMeasurement.js"></script>
  <script>var s_code=s.t();if(s_code)document.write(s_code);</script>
</body>
</html>
`;

const app = express();
const targetClient = TargetClient.create(CONFIG);

app.use(cookieParser());
// We assume that VisitorAPI.js and AppMeasurement.js are stored in "public" directory
app.use(express.static(__dirname + "/public"));

function saveCookie(res, cookie) {
  if (!cookie) {
    return;
  }

  res.cookie(cookie.name, cookie.value, {maxAge: cookie.maxAge * 1000});
}

const getResponseHeaders = () => ({
  "Content-Type": "text/html",
  "Expires": new Date().toUTCString()
});

function sendSuccessResponse(res, response) {
  res.set(getResponseHeaders());

  const result = TEMPLATE
  .replace("${organizationId}", CONFIG.organizationId)
  .replace("${visitorState}", JSON.stringify(response.visitorState))
  .replace("${content}", response);

  saveCookie(res, response.targetCookie);

  res.status(200).send(result);
}

function sendErrorResponse(res, error) {
  res.set(getResponseHeaders());

  res.status(500).send(error);
}

app.get("/abtest", async (req, res) => {
  const visitorCookie = req.cookies[TargetClient.getVisitorCookieName(CONFIG.organizationId)];
  const targetCookie = req.cookies[TargetClient.TargetCookieName];
  const request = {
      execute: {
        mboxes: [{
          address: { url: req.headers.host + req.originalUrl },
          name: "a1-serverside-ab"
        }]
      }};

    try {
      const response = await targetClient.getOffers({ request, visitorCookie, targetCookie });
      sendSuccessResponse(res, response);
    } catch (error) {
      sendErrorResponse(res, error);
    }
});

app.listen(3000, function () {
  console.log("Listening on port 3000 and watching!");
});
```

Full sample: https://github.com/Adobe-Marketing-Cloud/target-node-client-samples/tree/master/ecid-analytics-integration

---

## ECID, Analytics and at.js Integration

Most of the time Target Node.js SDK will be used in a NodeJS application, such as `Express`, `Hapi`, `Koa`, etc.
However, with the recent proliferation of SPA frameworks that allow server-side rendering (such as Facebook React, 
Next.js or Angular), there are use cases where server-side code should work in tandem with client-side libraries.
In Target's case the client-side library is `at.js`.  
The integration between server-side and client-side is also known as "hybrid" testing mode. 
The biggest challenge in this case is ensuring that both server-side and client-side Target calls are hitting the same 
Target edge cluster. Otherwise, one may end up with different user profiles being created by server-side and client-side
calls for the same visitor.

To solve this, Target leverages the so-called "location hint" cookie. To be able to use the location hint cookie, the 
following JavaScript snippet must be added to the rendered page before `at.js` (or before the Target Adobe Launch extension
 is initialized when Adobe Launch tag manager is used):

```js
window.targetGlobalSettings = {
  overrideMboxEdgeServer: true
};
```

To see the Target location hint cookie and `at.js` integration in action, here is a simple `Express` application:

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const TargetClient = require("@adobe/target-nodejs-sdk");
const CONFIG = {
  client: "acmeclient",
  organizationId: "1234567890@AdobeOrg"
};
const TEMPLATE = `
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ECID with Analytics and at.js Integration Sample</title>
  <script src="VisitorAPI.js"></script>
  <script>
    Visitor.getInstance("${organizationId}", {serverState: ${visitorState}});
  </script>
  <script>
    window.targetGlobalSettings = {
      overrideMboxEdgeServer: true
    };
  </script>
  <script src="at.js"></script>
</head>
<body>
  <p>${content}</p>
  <script src="AppMeasurement.js"></script>
  <script>var s_code=s.t();if(s_code)document.write(s_code);</script>
</body>
</html>
`;

const app = express();
const targetClient = TargetClient.create(CONFIG);

app.use(cookieParser());
// We assume that VisitorAPI.js, at.js and AppMeasurement.js are stored in "public" directory
app.use(express.static(__dirname + "/public"));

function saveCookie(res, cookie) {
  if (!cookie) {
    return;
  }

  res.cookie(cookie.name, cookie.value, {maxAge: cookie.maxAge * 1000});
}

const getResponseHeaders = () => ({
  "Content-Type": "text/html",
  "Expires": new Date().toUTCString()
});

function sendSuccessResponse(res, response) {
  res.set(getResponseHeaders());

  const result = TEMPLATE
  .replace("${organizationId}", CONFIG.organizationId)
  .replace("${visitorState}", JSON.stringify(response.visitorState))
  .replace("${content}", response);

  saveCookie(res, response.targetCookie);
  saveCookie(res, response.targetLocationHintCookie);

  res.status(200).send(result);
}

function sendErrorResponse(res, error) {
  res.set(getResponseHeaders());

  res.status(500).send(error);
}

app.get("/abtest", async (req, res) => {
  const visitorCookie = req.cookies[TargetClient.getVisitorCookieName(CONFIG.organizationId)];
  const targetCookie = req.cookies[TargetClient.TargetCookieName];
  const targetLocationHintCookie = req.cookies[TargetClient.TargetLocationHintCookieName];
  const request = {
    execute: {
      mboxes: [{
        address: { url: req.headers.host + req.originalUrl },
        name: "a1-serverside-ab"
      }]
    }};

  try {
    const response = await targetClient.getOffers({ request, visitorCookie, targetCookie, targetLocationHintCookie });
    sendSuccessResponse(res, response);
  } catch (error) {
    console.error("Target:", error);
    sendErrorResponse(res, error);
  }
});

app.listen(3000, function () {
  console.log("Listening on port 3000 and watching!");
});
```

Using the `at.js` integration allows use cases where a Target experience is started on the server-side and is continued 
on the client-side by `at.js`, also known as "hybrid" testing. The downside of this approach is that some amount of 
performance degradation may be observed when a NodeJS application that uses the Target Node.js SDK is not geo-distributed
(as are Target edge clusters).

Full sample: https://github.com/Adobe-Marketing-Cloud/target-node-client-samples/tree/master/ecid-analytics-atjs-integration

---

## Advanced at.js integration via serverState

In the previous section, we've showcased "hybrid" Target integration, where both the server-side and the client-side Target
libraries are hitting the same Target edge cluster, sharing the same Target session and visitor state. However, at.js still
needs to go over the wire for fetching Target content in the browser, prehiding the whole page BODY until Target offers 
are fetched and applied.

But what if we could prefetch the Target content on the server-side, include it in the page returned to the client, and 
then just have at.js apply the Target offers immediately, without making another expensive network call?
Also, in this case at.js will be able to prehide only the specific DOM elements for which Target offers have been fetched
on the server-side, thus no longer requiring the prehiding of the whole page BODY.

Target `serverState` is a new feature available in at.js v2.2+, that allows at.js to apply Target offers directly from
content fetched on the server side and returned to the client as part of the page being served.

In order to use this feature with Target Node.js SDK we just have to set `window.targetGlobalSettings.serverState` object
in the returned page, from Target Delivery API request and response objects available after a successfull `getOffers()`
API call, as follows:

```js
// First, we fetch the offers via Target Node.js SDK API, as usual
const targetResponse = await targetClient.getOffers(options);
// A successfull response will contain Target Delivery API request and response objects, which we need to set as serverState
const serverState = {
  request: targetResponse.request,
  response: targetResponse.response
};
// Finally, we should set window.targetGlobalSettings.serverState in the returned page, by replacing it in a page template, for example
const PAGE_TEMPLATE = `
<!doctype html>
<html>
<head>
  ...
  <script>
    window.targetGlobalSettings = {
      overrideMboxEdgeServer: true,
      serverState: ${JSON.stringify(serverState, null, " ")}
    };
  </script>
  <script src="at.js"></script>
</head>
...
</html>
`;
// Return PAGE_TEMPLATE to the client ...
```

A sample `serverState` object JSON for view prefetch looks as follows:
```json
{
 "request": {
  "requestId": "076ace1cd3624048bae1ced1f9e0c536",
  "id": {
   "tntId": "08210e2d751a44779b8313e2d2692b96.21_27"
  },
  "context": {
   "channel": "web",
   "timeOffsetInMinutes": 0
  },
  "experienceCloud": {
   "analytics": {
    "logging": "server_side",
    "supplementalDataId": "7D3AA246CC99FD7F-1B3DD2E75595498E"
   }
  },
  "prefetch": {
   "views": [
    {
     "address": {
      "url": "my.testsite.com/"
     }
    }
   ]
  }
 },
 "response": {
  "status": 200,
  "requestId": "076ace1cd3624048bae1ced1f9e0c536",
  "id": {
   "tntId": "08210e2d751a44779b8313e2d2692b96.21_27"
  },
  "client": "testclient",
  "edgeHost": "mboxedge21.tt.omtrdc.net",
  "prefetch": {
   "views": [
    {
     "name": "home",
     "key": "home",
     "options": [
      {
       "type": "actions",
       "content": [
        {
         "type": "setHtml",
         "selector": "#app > DIV.app-container:eq(0) > DIV.page-container:eq(0) > DIV:nth-of-type(2) > SECTION.section:eq(0) > DIV.container:eq(1) > DIV.heading:eq(0) > H1.title:eq(0)",
         "cssSelector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SECTION:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > H1:nth-of-type(1)",
         "content": "<span style=\"color:#FF0000;\">Latest</span> Products for 2020"
        }
       ],
       "eventToken": "t0FRvoWosOqHmYL5G18QCZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
       "responseTokens": {
        "profile.memberlevel": "0",
        "geo.city": "dublin",
        "activity.id": "302740",
        "experience.name": "Experience B",
        "geo.country": "ireland"
       }
      }
     ],
     "state": "J+W1Fq18hxliDDJonTPfV0S+mzxapAO3d14M43EsM9f12A6QaqL+E3XKkRFlmq9U"
    }
   ]
  }
 }
}
```

Once the page is loaded in the browser, at.js will apply all the Target offers from `serverState` immediately,
without firing any network calls against the Target edge. Additionally, at.js will only prehide the DOM elements
for which Target offers are available in the content fetched server-side, thus positively impacting page load performance
and end-user experience.

### Important notes 
- At the moment, at.js v2.2 supports only Page Load and View Prefetch for `serverState` scenarios. Support for mboxes may 
be provided in a future at.js release
- In case of SPAs using [Target Views and triggerView() at.js API](https://docs.adobe.com/content/help/en/target/using/implement-target/client-side/functions-overview/adobe-target-triggerview-atjs-2.html)
, at.js will cache the content for all Views prefetched on the server-side and will apply these as soon as each View is 
triggered via `triggerView()`, again without firing any additional content-fetching calls to Target.
- When applying `serverState` offers, at.js takes into consideration `pageLoadEnabled` and `viewsEnabled` settings, e.g.
Page Load offers will not be applied if `pageLoadEnabled` setting is `false`

Check out the full sample here: https://github.com/Adobe-Marketing-Cloud/target-node-client-samples/tree/master/advanced-atjs-integration-serverstate
See also a SPA demo using `serverState` here: https://github.com/Adobe-Marketing-Cloud/target-node-client-samples/tree/master/react-shopping-cart-demo

---

## Shared ECID and Analytics Integration

By default, the Target Node.js SDK creates a new Visitor instance on each `getOffers` or `sendNotifications` call.  
In cases when the same Visitor instance needs to be shared across several Target Node.js SDK API calls, this can be 
achieved by explicitly initializing the Visitor instance and passing it in SDK API calls as a `visitor` parameter.  

See important notes on sharing `sessionId`, `visitor` and generating the proper `consumerIds` across multiple 
Target Node.js SDK calls when processing a single client request in [Multiple API requests](#multiple-api-requests) section.

Here's an `Express` app snippet, exemplifying two concurrent Target Node.js SDK calls:

```js
app.get("/", async (req, res) => {
  const targetCookie = req.cookies[TargetClient.TargetCookieName];
  const visitorCookie = req.cookies[TargetClient.getVisitorCookieName(CONFIG.organizationId)];
  const visitor = new Visitor(CONFIG.organizationId, visitorCookie);
  const sessionId = uuidv4();
  const firstRequest = {
    execute: {
      pageLoad: {
        address: getAddress(req)
      }
    }};
  const secondRequest = {
    execute: {
      mboxes: [{
        address: getAddress(req),
        name: "a1-serverside-ab",
      }, {
        address: getAddress(req),
        name: "a1-serverside-xt",
      }]
    }
  };

  try {
    const firstTargetRequest = targetClient.getOffers({
      request: firstRequest,
      targetCookie,
      sessionId,
      visitor,
      consumerId: "first"
    });
    const secondTargetRequest = targetClient.getOffers({
      request: secondRequest,
      targetCookie,
      sessionId,
      visitor,
      consumerId: "second"
    });
    const firstResponse = await firstTargetRequest;
    const secondResponse = await secondTargetRequest;
    const response = {
      firstOffer: firstResponse,
      secondOffer: secondResponse,
      targetCookie: secondResponse.targetCookie,
      visitorState: secondResponse.visitorState
    };
    sendSuccessResponse(res, response);
  } catch (error) {
    sendErrorResponse(res, error);
  }
});
```

Check out the full sample here: https://github.com/Adobe-Marketing-Cloud/target-node-client-samples/tree/master/shared-ecid-analytics-integration

---

## Custom rendering of Target offers

Customers may opt to process Target offers fetched via `getOffers()` API in a custom way, without using the rendering
capabilities of at.js for example, or when Target content is to be displayed on a runtime environment or device, for which
no Target rendering libraries are available.  
In cases when mbox or view content is prefetched, customers should make sure to call `sendNotifications()` API for proper
reporting once any prefetched content has been displayed (or clicked, in case of click metrics).  
Note that in this case, it is the responsibility of the customer to provide the appropriate notification event tokens, as
 well as view and mbox `states` in the `sendNotifications` request.  
Consider the following example:

```js
// First, let's build the Target Delivery API request for prefetching content for a couple of mboxes
const prefetchMboxesRequest = {
  prefetch: {
    mboxes: [
      { name: "home" },
      { name: "product1" }
    ]
  }
};
// Next, we fetch the offers via Target Node.js SDK getOffers() API
const targetResponse = await targetClient.getOffers({ request: prefetchMboxesRequest });
```

A successful response will contain a Target Delivery API response object, which contains prefetched content for the 
requested mboxes.   
A sample `targetResponse.response` object may look as follows:
```json
{
  "status": 200,
  "requestId": "e8ac2dbf5f7d4a9f9280f6071f24a01e",
  "id": {
    "tntId": "08210e2d751a44779b8313e2d2692b96.21_27"
  },
  "client": "adobetargetmobile",
  "edgeHost": "mboxedge21.tt.omtrdc.net",
  "prefetch": {
    "mboxes": [
      {
        "index": 0,
        "name": "home",
        "options": [
          {
            "type": "html",
            "content": "HOME OFFER",
            "eventToken": "t0FRvoWosOqHmYL5G18QCZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "responseTokens": {
              "profile.memberlevel": "0",
              "geo.city": "dublin",
              "activity.id": "302740",
              "experience.name": "Experience B",
              "geo.country": "ireland"
            }
          }
        ],
        "state": "J+W1Fq18hxliDDJonTPfV0S+mzxapAO3d14M43EsM9f12A6QaqL+E3XKkRFlmq9U"
      },
      {
        "index": 1,
        "name": "product1",
        "options": [
          {
            "type": "html",
            "content": "TEST OFFER 1",
            "eventToken": "t0FRvoWosOqHmYL5G18QCZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
            "responseTokens": {
              "profile.memberlevel": "0",
              "geo.city": "dublin",
              "activity.id": "302740",
              "experience.name": "Experience B",
              "geo.country": "ireland"
            }
          }
        ],
        "state": "J+W1Fq18hxliDDJonTPfV0S+mzxapAO3d14M43EsM9f12A6QaqL+E3XKkRFlmq9U"
      }
    ]
  }
}
```

Note the mbox `name` and `state` fields, as well as the `eventToken` field, in each of the Target content options. These
should be provided in the `sendNotifications()` request, as soon as each content option is displayed.  
Let's consider that the Product1 mbox has been displayed on a non-browser device. The notifications request will look 
like this:
```js
const mboxNotificationRequest = {
  notifications: [{
    id: "1",
    timestamp: Date.now(),
    type: "display",
    mbox: {
      name: "product1",
      state: "J+W1Fq18hxliDDJonTPfV0S+mzxapAO3d14M43EsM9f12A6QaqL+E3XKkRFlmq9U"
    },
    tokens: [ "t0FRvoWosOqHmYL5G18QCZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==" ]
  }]
};
```

Notice that we've included both the mbox state and the event token corresponding to the Target offer delivered in the
prefetch response.
Having built the notifications request, we can send it to Target via `sendNotifications()` API method:
```js
const notificationResponse = await targetClient.sendNotifications({ request: mboxNotificationRequest });
```

---

## Troubleshooting

In order to understand what is happening on the wire, a `logger` object should be provided when instantiating the Node.js SDK.  
The `logger` object is expected to have a `debug()` and an `error()` method. When an appropriate logger is provided, such as
`console`, Target Delivery API requests and responses will be logged.

Here is an example that shows the `console` logger being used:

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const TargetClient = require("@adobe/target-nodejs-sdk");
const CONFIG = {
  client: "acmeclient",
  organizationId: "1234567890@AdobeOrg",
  logger: console
};

const app = express();
const targetClient = TargetClient.create(CONFIG);

app.use(cookieParser());

function saveCookie(res, cookie) {
  if (!cookie) {
    return;
  }

  res.cookie(cookie.name, cookie.value, {maxAge: cookie.maxAge * 1000});
}

const getResponseHeaders = () => ({
  "Content-Type": "text/html",
  "Expires": new Date().toUTCString()
});

function sendSuccessResponse(res, response) {
  res.set(getResponseHeaders());
  saveCookie(res, response.targetCookie);
  res.status(200).send(response);
}

function sendErrorResponse(res, error) {
  res.set(getResponseHeaders());
  res.status(500).send(error);
}

app.get("/abtest", async (req, res) => {
  const targetCookie = req.cookies[TargetClient.TargetCookieName];
  const request = {
    execute: {
      mboxes: [{
        address: { url: req.headers.host + req.originalUrl },
        name: "a1-serverside-ab"
      }]
    }};

  try {
    const response = await targetClient.getOffers({ request, targetCookie });
    sendSuccessResponse(res, response);
  } catch (error) {
    console.error("Target:", error);
    sendErrorResponse(res, error);    
  }
});

app.listen(3000, function () {
  console.log("Listening on port 3000 and watching!");
});
```

---

## Target Traces

For enhanced debugging via Target Trace functionality, the `authorizationToken` should be passed in the `trace` section
of the Delivery API request. The auth token can be provided from the client-side as a query param:

```js
app.get("/", async (req, res) => {
  const targetCookie = req.cookies[TargetClient.TargetCookieName];
  const request = {
    trace: {
      authorizationToken: req.query.authorization
    },
    execute: {
      mboxes: [{
        address: { url: req.headers.host + req.originalUrl },
        name: "a1-serverside-ab"
      }]
    }};

  try {
    const response = await targetClient.getOffers({ request, targetCookie });
    sendSuccessResponse(res, response);
  } catch (error) {
    console.error("Target:", error);
    sendErrorResponse(res, error);
  }
});
```

Check out the full sample here: https://github.com/Adobe-Marketing-Cloud/target-node-client-samples/tree/master/target-traces

---

## Target Node.js SDK API

#### TargetClient.create

`TargetClient.create(options: Object): TargetClient` creates an instance of the Target Node.js client. 
 
The `options` object has the following structure:

| Name            | Type     |Required | Default                | Description                            |
|-----------------|----------|---------|------------------------|----------------------------------------|
| client          |  String  | Yes     | None                   | Target Client Id                       |
| organizationId  |  String  | Yes     | None                   | Experience Cloud Organization ID       |
| timeout         |  Number  | No      | 3000                   | Target request timeout in milliseconds |
| serverDomain    |  String  | No      | `client`.tt.omtrdc.net | Overrides default hostname             |
| secure          |  Boolean | No      | true                   | Unset to enforce HTTP scheme           |
| logger          |  Object  | No      | NOOP logger            | Replaces the default NOOP logger       |

#### TargetClient.getOffers

`TargetClient.getOffers(options: Object): Promise` is used to fetch offers from Target.

The `options` object has the following structure:

| Name                     | Type     | Required  | Default | Description                                      |
|--------------------------|----------|-----------|---------|--------------------------------------------------|
| request                  | Object   |  Yes      | None    | [Target View Delivery API] request               |
| sessionId                | String   |  No       | None    | Used for linking multiple Target requests        |
| visitorCookie            | String   |  No       | None    | ECID (VisitorId) cookie                          |
| targetCookie             | String   |  No       | None    | Target cookie                                    |
| targetLocationHintCookie | String   |  No       | None    | Target location hint cookie                      |
| consumerId               | String   |  No       | None    | Provide different consumerIds for A4T stitching  |
| customerIds              | Array    |  No       | None    | Customer Ids in VisitorId-compatible format      |
| visitor                  | Object   |  No       | new VisitorId | Supply an external VisitorId instance      |

The `request` object should conform to [Target View Delivery API] request specification. 
To learn more about the [Target View Delivery API], see http://developers.adobetarget.com/api/#view-delivery-overview

The Promise returned by `TargetClient.getOffers()` has the following structure:

| Name                     | Type              | Description                                                 |
|--------------------------|-------------------|-------------------------------------------------------------|
| request                  | Object            | [Target View Delivery API] request                          |
| response                 | Object            | [Target View Delivery API] response                         |
| visitorState             | Object            | Object that should be passed to Visitor API `getInstance()` |
| targetCookie             | Object            | Target cookie                                               |
| targetLocationHintCookie | Object            | Target location hint cookie                                 |
| analyticsDetails         | Array             | Analytics payload, in case of client side Analytics usage   |
| responseTokens           | Array             | A list of Response Tokens (see https://docs.adobe.com/help/en/target/using/administer/response-tokens.html) |
| trace                    | Array             | Aggregated trace data for all request mboxes/views          |
| timing                   | Object            | An object containing the durations of each request phase    |

The `targetCookie` and `targetLocationHintCookie` objects used for passing data back to the browser have the following structure:

| Name   | Type   | Description                                                                                               |
|--------|--------|-----------------------------------------------------------------------------------------------------------|
| name   | String | Cookie name                                                                                               |
| value  | Any    | Cookie value, the value will be converted to string                                                       |
| maxAge | Number | The `maxAge` option is a convenience for setting `expires` relative to the current time in seconds        |

#### TargetClient.sendNotifications

`TargetClient.sendNotifications(options: Object): Promise` is used to send display/click notifications to Target,
for previously prefetched mboxes/views.  
**Note:** this API should only be used when the prefetched Target content is displayed in non-browser environments/devices, where at.js cannot be deployed. For content displayed in supported browsers, at.js will handle sending of notifications for content prefetched on the server-side and delivered via serverState.  
The arguments and return value are the same as for [TargetClient.getOffers](#targetclientgetoffers). 
Note that `notifications` array must be present in the provided [Target View Delivery API] request (`request` option).  

#### TargetClient utility accessors

`TargetClient.getVisitorCookieName(organizationId: string): string` is used to retrieve the ECID cookie name.
 
`TargetClient.TargetCookieName: string` returns the Target cookie name.

`TargetClient.TargetLocationHintCookieName: string` returns the Target location hint cookie name.

`TargetClient.AuthState: Object` is an alias for Visitor.AuthState (visitor authentication state).

---

## Multiple API requests

When using the Target Node.js SDK to service an incoming client request, a single `getOffers()` call with multiple 
mboxes/views should generally be preferred over multiple `getOffers()` calls with a shared Visitor instance.
However, in cases when there's a need to call Target Node.js SDK API methods more than once when servicing a client request,
the following considerations should be taken into account:

* **Session Id** - `sessionId` option is not required for a single Target Node.js SDK API call. However, when several API
calls are made, the same `sessionId` value should be supplied (provided there's no Target cookie present in the client-side 
request). The supplied `sessionId` should be a randomly generated UUID string.

* **Visitor** - By default, the Target Node.js SDK instantiates a new ECID Visitor instance internally on each API call.
When multiple API calls should share the same Visitor instance, it should be instantiated externally and provided in the
`visitor` option in each of the Target Node.js SDK API calls.

* **consumerId** - For proper visitor stitching in A4T reports, distinct `consumerId` values should be provided when
making multiple Target Node.js SDK API calls. `ConsumerIds` are random strings, the only requirement is for these to have
different values when call stitching should take place, and the same value otherwise.  

Example:  
a)
```js
targetClient.getOffers({ request: firstRequest, targetCookie, sessionId, visitor, consumerId: "firstConsumer" });
targetClient.getOffers({ request: secondRequest, targetCookie, sessionId, visitor, consumerId: "secondConsumer" });
```
In this case, the two calls will be stitched by the Visitor API, using the same `supplementalDataId` (SDID) value.  
b)
```js
targetClient.getOffers({ request: firstRequest, targetCookie, sessionId, visitor, consumerId: "consumer" });
targetClient.getOffers({ request: secondRequest, targetCookie, sessionId, visitor, consumerId: "consumer" });
```
In this case, the two calls will not be stitched together, and a different SDID value will be generated for the second call.

Check out [Shared ECID and Analytics Integration](#shared-ecid-and-analytics-integration) for an example of making 
multiple Target Node.js SDK API calls. 

---

## Development

Check out our [Contribution guidelines](.github/CONTRIBUTING.md) as well as [Code of Conduct](CODE_OF_CONDUCT.md) prior
to contributing to Target Node.js SDK development.  
To build the project: `npm run build`  
To run the unit tests: `npm test`  
To generate code coverage after running the tests: `npm run coverage`  

## Additional code

Production dependencies include:

```json
{
  "@adobe-mcid/visitor-js-server": {
    "version": "2.0.0",
    "license": "Adobe Proprietary license"
  },
  "request": {
    "version": "2.88.0",
    "license": "Apache-2.0",
    "repository": "https://github.com/request/request"
  }
}
```

---

[back to top](#table-of-contents)

[Target View Delivery API]: https://developers.adobetarget.com/api/delivery-api/
