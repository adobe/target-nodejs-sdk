# Introduction
Welcome to the documentation for the Adobe Target Delivery API!

The Adobe Target Delivery API is based on REST. This documentation describes the resources that make up the Adobe Target Delivery API. HTTP methods are utilized to execute operations on those resources.

Through Adobe Target's Delivery API, you can: 

* Deliver experiences across web, including SPAs, and mobile channels as well as non-browser based IoT devices such as a connected TV, kiosk, or in-store digital screen.
* Deliver experiences from any server side platform or application that can make HTTP/s calls.
* Deliver consistent and personalized experiences to a user no matter which channel or devices the user has engaged with your business.
* Cache experiences for a user within a session in your server so that multiple API calls can be avoided and as a result achieve better performance.
* Seamlessly integrate with Adobe Experience Cloud products such as Adobe Analytics, Adobe Audience Manager, and the Experience Cloud ID Service from the server side.

Note: You can still access the legacy [/v1/mbox and /v2/batchmbox API documentation](https://developers.adobetarget.com/api/legacy-api/index.html). However, new features will be developed in the new Delivery API and will not be backported to the legacy APIs.

# Changelog

Read the [changelog](https://docs.adobe.com/content/help/en/target/using/implement-target/server-side/releases-server-side.html) for the Delivery API.

# SDKs
Adobe Target offers SDKs to interact with the Target Delivery API and help ease the Adobe Target integration with other Experience Cloud solutions such as Adobe Analytics and Adobe Audience Manager by helping you follow best practices in managing sessions and cookies.
Therefore, it is highly recommended to leverage a SDK to mask away these complexities and prevent incorrect utilization of the API.

## Node.js SDK  
The [Node.js SDK](https://github.com/adobe/target-nodejs-sdk) is open sourced and maintained within Github, where you can find the documentation and usage instructions.

Read the [changelog](https://github.com/adobe/target-nodejs-sdk/blob/master/CHANGELOG.md) for the Node.js SDK

## Java SDK
The [Java SDK](https://github.com/adobe/target-java-sdk) is open sourced and maintained within Github, where you can find the documentation and usage instructions.

Read the [changelog](https://github.com/adobe/target-java-sdk/blob/master/CHANGELOG.md) for the Java SDK

# Getting Started
A Target Delivery API call looks like this:
```
curl -X POST \
  'https://`clientCode`.tt.omtrdc.net/rest/v1/delivery?client=`clientCode`&sessionId=d359234570e04f14e1faeeba02d6ab9914e' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
      "context": {
        "channel": "web",
        "browser" : {
          "host" : "demo"
        },
        "address" : {
          "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
        },
        "screen" : {
          "width" : 1200,
          "height": 1400
        }
      },
        "execute": {
        "mboxes" : [
          {
            "name" : "homepage",
            "index" : 1
          }
        ]
      }
    }'
```
The `clientCode` can be retrieved from the Target UI by navigating to Setup > Implementation > Edit Settings > Advanced Settings > Client Code.

Before making a Target Delivery API call, there are a few steps to follow in order for a response to contain the relevant experience to show to an end-user:

1. Create a Target Activity (A/B, XT, AP or Recommendations) using the [Form-Based Composer](https://docs.adobe.com/help/en/target/using/experiences/form-experience-composer.html) or the Visual Experience Composer.
2. Use the Delivery API to get a response for the mboxes used in the Target Activity created in step 2.
3. Present the experience to the visitor!

It's simple as 1, 2, 3!

## Postman Collection
Postman is an application that makes it easy to fire API calls. This Postman collection contains sample delivery API calls.
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/449876888132fa49eaad)

# User Permissions (Premium)
We allow customers to manage permissions for their users when using Adobe Target. In order to make a successful Adobe Target Delivery API call, a token with the right permissions must be passed within the API call. In order to learn more about user permissioning and how to retrieve the token visit this [documentation](https://docs.adobe.com/help/en/target/using/administer/manage-users/enterprise/properties-overview.html).

```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=d359234570e04f14e1faeeba02d6ab9914e' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
      "context": {
        "channel": "web",
        "browser" : {
          "host" : "demo"
        },
        "address" : {
          "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
        },
        "screen" : {
          "width" : 1200,
          "height": 1400
        }
      },
      "property" : {
        "token": "08b62abd-c3e7-dfb2-da93-96b3aa724d81"
      },
        "execute": {
        "mboxes" : [
          {
            "name" : "homepage",
            "index" : 1
          }
        ]
      }
    }'
```

Once you have the corresponding token, pass the token into `property` -> `token` for every API call that is made. If the `property` -> `token` is not passed within every API call, you will not get any `content` back from Adobe Target.

```
{
    "status": 200,
    "requestId": "07ce783d-58b9-461c-9f4c-6873aeb00c01",
    "client": "demo",
    "id": {
        "tntId": "d359234570e04f14e1faeeba02d6ab9914e.28_7"
    },
    "edgeHost": "mboxedge28.tt.omtrdc.net",
    "execute": {
        "mboxes": [
            {
                "index": 1,
                "name": "homepage"
            }
        ]
    }
}
```
As you can see above, without passing the `property` -> `token`, you will not get any `content` back. If you expect `content` from your API call and are not retrieving any from the response, it is most likely because either the `property` -> `token` is not provided or it is being passed in without the correct permissions.


# Identifying Visitors 
There are multiple ways in which a visitor can be identified within Target. Target uses three identifiers:

Field Name  | Description
------------|-------------
`tntId` | The `tntId` is the primary identifier in Target for a user. You can supply this ID or Target will auto-generate it if the request doesn’t contain one.
`thirdPartyId` | The `thirdPartyId` is your company’s identifier for the user that you can send with every call. When a user logs in to a company's site, the company typically creates an ID that is tied to the visitor's account, loyalty card, membership number, or other applicable identifiers for that company.
`marketingCloudVisitorId` | The `marketingCloudVisitorId` is used to merge and share data between different Adobe solutions. The `marketingCloudVisitorId` is required for integrations with Adobe Analaytics and Adobe Audience Manager.
`customerIds` | Along with the Experience Cloud Visitor ID, additional [customer IDs](https://marketing.adobe.com/resources/help/en_US/mcvid/mcvid-authenticated-state.html) and an authenticated status for each visitor can be utilized

## Target ID
The Target ID or `tntId` can be seen as a device ID. This `tntId` is generated automatically by Adobe Target if it isn't provided in the request. Thereafter, subsequent requests need to include this `tntId` in order for the right content to be delivered to a device used by the user.

```
curl -X POST \
'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=10abf6304b2714215b1fd39a870f01afc#1555632114' \
-H 'Content-Type: application/json' \
-H 'cache-control: no-cache' \
-d '{
  "context": {
    "channel": "web",
    "browser" : {
      "host" : "demo"
    },
    "address" : {
      "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
    },
    "screen" : {
      "width" : 1200,
      "height": 1400
    }
  },
    "execute": {
    "mboxes" : [
      {
        "name" : "SummerOffer",
        "index" : 1
      }
    ]
  }
}'
```
The above example call demonstrates how a `tntId` does not need to be passed in. In this scenario, Adobe Target will generate a `tntId` and provide it in the response as seen below:

```
{
  "status": 200,
  "requestId": "5b586f83-890c-46ae-93a2-610b1caa43ef",
  "client": "demo",
  "id": {
      "tntId": "10abf6304b2714215b1fd39a870f01afc.28_20"
  },
  "edgeHost": "mboxedge28.tt.omtrdc.net",
  ...
}
```

The generated `tntId` is `10abf6304b2714215b1fd39a870f01afc.28_20`. Please note that this `tntId` needs to be used when calling Adobe Target Delivery API for the same user across sessions. 

## Marketing Cloud Visitor ID
The `marketingCloudVisitorId` is a universal and persistent ID that identifies your visitors across all solutions in the Experience Cloud. When your organization implements the ID service, this ID lets you identify the same site visitor and their data in different Experience Cloud solutions like Adobe Target, Adobe Analytics or Adobe Audience Manager. Please note that the `marketingCloudVisitorId` is required when leveraging and integrating with Analytics and Audience Manager.

```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=10abf6304b2714215b1fd39a870f01afc#1555632114' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "id": {
    "marketingCloudVisitorId": "10527837386392355901041112038610706884"
  },
  "context": {
    "channel": "web",
    "browser" : {
      "host" : "demo"
    },
    "address" : {
      "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
    },
    "screen" : {
      "width" : 1200,
      "height": 1400
    }
  },
    "execute": {
    "mboxes" : [
      {
        "name" : "SummerOffer",
        "index" : 1
      }
    ]
  }
}'
```
The above example call demonstrates how a `marketingCloudVisitorId` that was retrieved from the Experience Cloud ID Service is passed to Adobe Target. In this scenario, Adobe Target will generate a `tntId` since it was not passed into the original call which will be mapped to the provided `marketingCloudVisitorId` as seen below in the response.
```
{
    "status": 200,
    "requestId": "80173866-9026-4ac7-b467-a0ba178a591b",
    "client": "demo",
    "id": {
        "tntId": "10abf6304b2714215b1fd39a870f01afc.28_20",
        "marketingCloudVisitorId": "10527837386392355901041112038610706884"
    },
    "edgeHost": "mboxedge28.tt.omtrdc.net",
    ...
}
```

## Third Party ID
If your organization uses an ID to identify your visitor, you can use `thirdPartyID` to deliver content. However, you must provide the `thirdPartyID` for every Adobe Target Delivery API call you make.
```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=10abf6304b2714215b1fd39a870f01afc#1555632114' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "id": {
    "thirdPartyId": "B234A029348"
  },
  "context": {
    "channel": "web",
    "browser" : {
      "host" : "demo"
    },
    "address" : {
      "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
    },
    "screen" : {
      "width" : 1200,
      "height": 1400
    }
  },
    "execute": {
    "mboxes" : [
      {
        "name" : "SummerOffer",
        "index" : 1
      }
    ]
  }
}'
```
The above example call demonstrates how a `thirdPartyId`, which is a persistent ID that your business utilizes to identify an end-user regardless of whether they are interacting with your business from web, mobile, or IoT channels. In other words, the `thirdPartyId` will reference user profile data that can be utilized across channels. In this scenario, Adobe Target will generate a `tntId` since it was not passed into the original call which will be mapped to the provided `thirdPartyId` as seen below in the response.
```
{
    "status": 200,
    "requestId": "55de9886-bd14-4dee-819c-7d1633b79b90",
    "client": "demo",
    "id": {
        "tntId": "10abf6304b2714215b1fd39a870f01afc.28_20",
        "thirdPartyId": "B234A029348"
    },
    "edgeHost": "mboxedge28.tt.omtrdc.net",
    ...
}
```

## Customer ID

[Customer IDs](https://marketing.adobe.com/resources/help/en_US/mcvid/mcvid-authenticated-state.html) can be added and associated with an Experience Cloud Visitor ID. Whenever sending `customerIds` the `marketingCloudVisitorId` must also be provided. Furthermore, an authentication status can be provided along with each `customerId` for each visitor. The following authentication status can be taken into consideration:


Authentication Status  | User Status
------------|------------------------
`unknown` | Unknown or never authenticated. This state can be used for scenarios like a visitor that has landed on your site by clicking on a display advert.
`authenticated` | The user is currently authenticated with an active session on your website or app.
`logged_out` | The user was authenticated but actively logged out. The user intended and meant to disconnect from the authenticated state. The user no longer wants to be treated as authenticated.

Please note that only when the customer id is in `authenticated` state will Target reference the user profile data that is stored and linked to the customer id. If the customer id is in `unknown` or `logged_out` state, then the customer id will be ignored and any user profile data that may be associated with it will not be leveraged for audience targeting.
```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=d359234570e044f14e1faeeba02d6ab23439914e' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
      "context": {
        "channel": "web",
        "browser" : {
          "host" : "demo"
        },
        "address" : {
          "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
        },
        "screen" : {
          "width" : 1200,
          "height": 1400
        }
      },
      "id": {
        "marketingCloudVisitorId" : "2304820394812039",
        "customerIds": [{
          "id": "134325423",
          "integrationCode" : "crm_data",
          "authenticatedState" : "authenticated"
        }]
      },
      "property" : {
        "token": "08b62abd-c3e7-dfb2-da93-96b3aa724d81"
      },
        "execute": {
        "mboxes" : [
          {
            "name" : "homepage",
            "index" : 1
          }
        ]
      }
    }'
```

The above example call demonstrates how to send a `customerId` with an `authenticatedState`. When sending a `customerId`, the `integrationCode`, `id`, and `authenticatedState` as well as the `marketingCloudVisitorId` are required. The `integrationCode` is the alias of the [customer attributes file](https://docs.adobe.com/help/en/target/using/audiences/visitor-profiles/working-with-customer-attributes.html) you provided through CRS.


## Merged Profile
You can combine `tntId`, `thirdPartyID`, and `marketingCloudVisitorId` in the same request. In this scenario, Adobe Target will maintain the mapping of all these IDs and pin it to a visitor. Learn how profiles are [merged and synced in real time](https://docs.adobe.com/content/help/en/target/using/audiences/visitor-profiles/3rd-party-id.html) using the different identifiers.
```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=d359234570e044f14e1faeeba02d6ab23439914e' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
      "context": {
        "channel": "web",
        "browser" : {
          "host" : "demo"
        },
        "address" : {
          "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
        },
        "screen" : {
          "width" : 1200,
          "height": 1400
        }
      },
      "id": {
        "marketingCloudVisitorId" : "2304820394812039",
        "tntId": "d359234570e044f14e1faeeba02d6ab23439914e.28_78",
        "thirdPartyId":"23423432"
      },
      "property" : {
        "token": "08b62abd-c3e7-dfb2-da93-96b3aa724d81"
      },
      "experienceCloud": {
        "analytics": {
          "supplementalDataId" : "23423498732598234",
          "trackingServer": "ags041.sc.omtrdc.net",
          "logging": "server_side"
        }
      },
        "execute": {
        "mboxes" : [
          {
            "name" : "homepage",
            "index" : 1
          }
        ]
      }
    }'
```
The above example call demonstrates how you can combine `tntId`, `thirdPartyID`, and `marketingCloudVisitorId` in the same request. All 3 IDs are also returned in the response as well.
```
{
    "status": 200,
    "requestId": "8e352d0d-103e-44ba-bdf4-bb7319dc3747",
    "client": "demo",
    "id": {
        "tntId": "d359234570e044f14e1faeeba02d6ab23439914e.28_78",
        "thirdPartyId": "23423432",
        "marketingCloudVisitorId": "2304820394812039"
    ...
}
```

# Single or Batch Delivery
The Adobe Target Delivery API supports a single or batch delivery call. One can make a server request for content for single or multiple mboxes. Please make sure to outweigh the performance costs when making a single call vs a batched call. If you know all of the content that needs to be shown for a user, it is best practice to retrieve content for all mboxes with a single batch delivery call so that you avoid making multiple single delivery calls.

## Single Delivery Call
You can retrieve an experience to display to the user for one mbox via the Adobe Target Delivery API. Note that if you are making a single delivery call, you would need to initiate another server call to retrieve additional content for an mbox for a user. This can become very costly over time, so please make sure to evaluate your approach when using the single delivery API call.

```
curl -X POST \
'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=7abf6304b2714215b1fd39a870f01afc#1555632114' \
-H 'Content-Type: application/json' \
-H 'cache-control: no-cache' \
-d '
{
  "id": {
    "tntId": "abcdefghijkl00023.1_1"
  },
  "context": {
    "channel": "web",
    "browser" : {
      "host" : "demo"
    },
    "address" : {
      "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
    },
    "screen" : {
      "width" : 1200,
      "height": 1400
    }
  },
    "execute": {
    "mboxes" : [
      {
        "name" : "SummerOffer",
        "index" : 1
      }
    ]
  }
}'
```
In the single delivery call example above, we are retrieving the experience to display for the user with `tntId`: `abcdefghijkl00023.1_1` for an `mbox`:`SummerOffer` on the web channel. This single delivery call will generate the following response:

```
{
  "status": 200,
  "requestId": "25e0cc42-3d7b-456a-8b49-af60c1fb23d9",
  "client": "demo",
  "id": {
      "tntId": "abcdefghijkl00023.1_1"
  },
  "edgeHost": "mboxedge28.tt.omtrdc.net",
  "execute": {
      "mboxes": [
          {
              "index": 1,
              "name": "SummerOffer",
              "options": [
                  {
                      "content": "<p><b>Enjoy this 15% discount on your next purchase</b></p>",
                      "type": "html",
                  }
              ]
          }
      ]
    }
}
```
In the response, you can see that the `content` field contains the HTML that describes the experience to be shown to the user for the web that corresponds to the SummerOffer mbox.

### Execute Page Load
If there are experiences that should be shown when a page load happens in the web channel such as AB testing the fonts located in the footer or header, you can specify `pageLoad` in the `execute` field to retrieve all modifications that should be applied.

```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=d359570e04f14e1faeeba02d6ab9914e' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "id": {
    "tntId": "84e8d0e211054f18af365d65f45e902b.28_131"
  },
  "context": {
    "channel": "web",
    "window": {
      "width": 1819,
      "height": 842
    },
    "browser": {
      "host": "target.enablementadobe.com"
    },
    "address": {
      "url": "https://target.enablementadobe.com/react/demo/#/"
    }
  },
  "execute": {
    "pageLoad": {}
  }
}'
```
The above sample call is to retrieve any experiences to show to a user when the page `https://target.enablementadobe.com/react/demo/#/` loads. 

```
{
      "status": 200,
      "requestId": "355ebc47-edb6-481f-aeae-ae55d71afaca",
      "client": "demo",
      "id": {
          "tntId": "84e8d0e211054f18af365d65f45e902b.28_131"
      },
      "edgeHost": "mboxedge28.tt.omtrdc.net",
      "execute": {
          "pageLoad": {
              "options": [
                  {
                      "content": [
                          {
                              "type": "setHtml",
                              "selector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(1) > NAV.nav:eq(0) > DIV.container:eq(0) > DIV.nav-right:eq(0) > A.nav-item:eq(0)",
                              "cssSelector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(1) > NAV:nth-of-type(1) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > A:nth-of-type(1)",
                              "content": "Modified Home"
                          }
                      ],
                      "type": "actions"
                  }
              ],
              "metrics": [
                  {
                      "type": "click",
                      "selector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SECTION.section:eq(0) > DIV.container:eq(0) > FORM.col-md-4:eq(0) > DIV.form-group:eq(0) > BUTTON.btn:eq(0)",
                      "eventToken": "QPaLjCeI9qKCBUylkRQKBg=="
                  }
              ]
          }
      }
  }
  ```
In the `content` field the modification that needs to be applied on a page load can be retrieved. In the example above, you can see that a link on the header needs to be named to _Modified Home_.


## Batched Delivery Call
Instead of making multiple delivery calls with a single mbox in each call, making one delivery call with a batch of mboxes can reduce unnecessary server calls. Invoking a server call should be minimized as much as possible in order to be highly performant.

```
curl -X POST \
'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=7abf6304b2714215b1fd39a870f01afc#1555632114' \
-H 'Content-Type: application/json' \
-H 'cache-control: no-cache' \
-d '
{
  "id": {
    "tntId": "abcdefghijkl00023.1_1"
  },
  "context": {
    "channel": "web",
    "browser" : {
      "host" : "demo"
    },
    "address" : {
      "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
    },
    "screen" : {
      "width" : 1200,
      "height": 1400
    }
  },
    "execute": {
    "mboxes" : [
      {
        "name" : "SummerOffer",
        "index" : 1
      },
      {
        "name" : "SummerShoesOffer",
        "index" : 2
      },
      {
        "name" : "SummerDressOffer",
        "index" : 3
      }      
    ]
  }
}'
```
In the batched delivery call example above, we are retrieving the experiences to display for the user with `tntId`: `abcdefghijkl00023.1_1` for multiple `mbox`:`SummerOffer`, `SummerShoesOffer`, and `SummerDressOffer`. Since we know that we need to show an experience for multiple mboxes for this user, we can batch these requests and make 1 server call instead of 3 individual delivery calls.

```
{
  "status": 200,
  "requestId": "fe15286f-effb-434f-85d8-c3db804075ce",
  "client": "demo",
  "id": {
      "tntId": "abcdefghijkl00023.28_120"
  },
  "edgeHost": "mboxedge28.tt.omtrdc.net",
  "execute": {
      "mboxes": [
          {
              "index": 1,
              "name": "SummerOffer",
              "options": [
                  {
                      "content": "<p><b>Enjoy this 15% discount on your next purchase</b></p>",
                      "type": "html",

                  }
              ]
          },
          {
              "index": 2,
              "name": "SummerShoesOffer",
              "options": [
                  {
                      "content": "<p><b>Enjoy this 15% discount on your next shoe purchase</b></p>",
                      "type": "html",
                  }
              ]
          },
          {
              "index": 3,
              "name": "SummerDressOffer",
              "options": [
                  {
                      "content": "<p><b>Enjoy this 15% discount on your next dress purchase</b></p>",
                      "type": "html",
                  }
              ]
          }
      ]
  }
}
```

In the response above, you can see that within the `content` field of each mbox, the HTML representation of the experience to show to the user for each mbox is retrievable. 


# Prefetch
Prefetching allows clients like mobile apps and servers to fetch content for multiple mboxes or views in one request, cache it locally, and later notify Target when the user visits those mboxes or views. When utilizing prefetch, it's important to be familiar with the following terms:

Field Name  | Description
------------|-------------
`prefetch` | List of mboxes and views that should be fetched but shouldn’t be marked as visited. The Target Edge returns an `eventToken` for each mbox or view that exist in the prefetch array
`notifications` | List of mboxes and views that were previously prefetched and should be marked as visited.
`eventToken` | A hashed encrypted token that is returned when content is prefetched. This token should be sent back to Target in the `notifications` array.

## Prefetch Mboxes
Clients like mobile apps and servers can prefetch multiple mboxes for a given user within a session and cache it in order to avoid multiple calls to Adobe Target Delivery API. 

```
curl -X POST \
'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=7abf6304b2714215b1fd39a870f01afc#1555632114' \
-H 'Content-Type: application/json' \
-H 'cache-control: no-cache' \
-d '
{
  "id": {
    "tntId": "abcdefghijkl00023.1_1"
  },
  "context": {
    "channel": "web",
    "browser" : {
      "host" : "demo"
    },
    "address" : {
      "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
    },
    "screen" : {
      "width" : 1200,
      "height": 1400
    }
  },
    "prefetch": {
    "mboxes" : [
      {
        "name" : "SummerOffer",
        "index" : 1
      },
      {
        "name" : "SummerShoesOffer",
        "index" : 2
      },
      {
        "name" : "SummerDressOffer",
        "index" : 3
      }      
    ]
  }
}'
```
Within the `prefetch` field, add one or more `mboxes` you want to prefetch for at once for a user within a session. Once you prefetch for those `mboxes` you will receive the following response:

```
{
    "status": 200,
    "requestId": "5efee0d8-3779-4b12-a74e-e04848faf191",
    "client": "demo",
    "id": {
        "tntId": "abcdefghijkl00023.1_1"
    },
    "edgeHost": "mboxedge28.tt.omtrdc.net",
    "prefetch": {
        "mboxes": [
            {
                "index": 1,
                "name": "SummerOffer",
                "options": [
                    {
                        "content": "<p><b>Enjoy this 15% discount on your next purchase</b></p>",
                        "type": "html",
                        "eventToken": "GcvBXDhdJFNR9E9r1tgjfmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                    }
                ]
            },
            {
                "index": 2,
                "name": "SummerShoesOffer",
                "options": [
                    {
                        "content": "<p><b>Enjoy this 15% discount on your next shoe purchase</b></p>"
                        "type": "html",
                        "eventToken": "GcvBXDhdJFNR9E9r1tgjfmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                    }
                ]
            },
            {
                "index": 3,
                "name": "SummerDressOffer",
                "options": [
                    {
                        "content": "<p><b>Enjoy this 15% discount on your next dress purchase</b></p>"
                        "type": "html",
                        "eventToken": "GcvBXDhdJFNR9E9r1tgjfmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                    }
                ]
            }
        ]
    }
}
```

Within the response, you will see the `content` field containing the experience to show to the user for a particular `mbox`. This is very useful when cached on your server so that when a user interacts with your web or mobile application within a session and visits an `mbox` on any particular page of your application, the experience can be delivered from the cache instead of making another Adobe Target Delivery API call. 
However, when an experience is delivered to the user from the `mbox`, a `notification` will be sent via a Delivery API call in order for impression logging to occur. This is because the response of `prefetch` calls are cached, which means that the user has not seen the experiences at the time the `prefetch` call happens. In order to learn more about the `notification` process, please jump to [Notifications](#section/Notifications).


## Prefetch Views

Adobe Target introduced a new concept called Views in order to support Single Page Applications (SPA) and Mobile Applications more seamlessly. Views can be seen as a logical group of visual elements that together make up a SPA or Mobile experience. Now, through the Delivery API, VEC created AB & XT activities with modifications on [Views for SPA](https://docs.adobe.com/content/help/en/target/using/implement-target/client-side/deploy-at-js/target-atjs-single-page-application.html) can now be prefetched.

```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=a3e7368c62d944c0855d424cd7a03ab0' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "id": {
    "tntId": "84e8d0e211054f18af365d65f45e902b.28_131"
  },
  "context": {
    "channel": "web",
    "window": {
      "width": 1819,
      "height": 842
    },
    "browser": {
      "host": "target.enablementadobe.com"
    },
    "address": {
      "url": "https://target.enablementadobe.com/react/demo/#/"
    }
  },
  "prefetch": {
    "views": [{}]
  }
}'
```

The example call above will prefetch all the Views created thru the SPA VEC for AB and XT activities to display for the web `channel`. Notice in the call that we want to prefetch all the Views from the AB or XT activities that a visitor with `tntId`:`84e8d0e211054f18af365d65f45e902b.28_131` who is visiting the `url`:`https://target.enablementadobe.com/react/demo/#/` qualifies for.

```
{
    "status": 200,
    "requestId": "14ce028e-d2d2-4504-b3da-32740fa8dd61",
    "client": "demo",
    "id": {
        "tntId": "84e8d0e211054f18af365d65f45e902b.28_131"
    },
    "edgeHost": "mboxedge28.tt.omtrdc.net",
    "prefetch": {
        "views": [
            {
                "id": 228,
                "name": "checkout-express",
                "key": "checkout-express",
                "state": "Vqfb6kYGAmzWOLf9W6E+Q/0LyS+SYe2h5tuTXzRNnkjKkZaZZr2ijp41/6AwK6fdFgADhFNC7l5efUCs9shgTw==",
                "options": [
                    {
                        "content": [
                            {
                                "type": "setHtml",
                                "selector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SECTION.section:eq(0) > DIV.container:eq(0) > FORM.col-md-4:eq(0) > DIV:nth-of-type(1) > DIV.mb-3:eq(2)",
                                "cssSelector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SECTION:nth-of-type(1) > DIV:nth-of-type(1) > FORM:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(3)",
                                "content": "<span style=\"color:#000080;\"><strong>*We charge an additional fee of $12.34 for faster delivery. If you choose express delivery get 15% off on your next order.</strong></span>"
                            }
                        ],
                        "type": "actions",
                        "eventToken": "N3C13I0M2PH8iaKtONJlFJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                    }
                ]
            },
            {
                "id": 5,
                "name": "home",
                "key": "home",
                "state": "Vqfb6kYGAmzWOLf9W6E+Q/0LyS+SYe2h5tuTXzRNnkjKkZaZZr2ijp41/6AwK6fdFgADhFNC7l5efUCs9shgTw==",
                "options": [
                    {
                        "content": [
                            {
                                "type": "setHtml",
                                "selector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SECTION.section:eq(0) > DIV.container:eq(1) > DIV.heading:eq(0) > H1.title:eq(0)",
                                "cssSelector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SECTION:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                                "content": "<span style=\"color:#800000;\"><strong>Trending Items</strong></span>"
                            }
                        ],
                        "type": "actions",
                        "eventToken": "N3C13I0M2PH8iaKtONJlFJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                    }
                ]
            },
            {
                "id": 6,
                "name": "products",
                "key": "products",
                "state": "Vqfb6kYGAmzWOLf9W6E+Q/0LyS+SYe2h5tuTXzRNnkjKkZaZZr2ijp41/6AwK6fdFgADhFNC7l5efUCs9shgTw==",
                "options": [
                    {
                        "content": [
                            {
                                "type": "setStyle",
                                "selector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SECTION.section:eq(0) > DIV.container:eq(0) > DIV.heading:eq(0) > BUTTON.btn:eq(0)",
                                "cssSelector": "#app > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SECTION:nth-of-type(1) > DIV:nth-of-type(1) > DIV:nth-of-type(1) > BUTTON:nth-of-type(1)",
                                "content": {
                                    "background-color": "rgba(191,0,0,1)",
                                    "priority": "important"
                                }
                            }
                        ],
                        "type": "actions",
                        "eventToken": "N3C13I0M2PH8iaKtONJlFJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                    }
                ]
            }
        ]
    }
}
```
You can see that in the `content` fields of the response, you will see the metadata such as the `type`, `selector`, `cssSelector`, and `content`, to render the experience to your end user when a user visits your page. Note that the `prefetched` content can be cached and rendered to the user when necessary.


# Notifications
Notifications should be fired when a prefetched mbox or view has been visited or rendered to the end user. In order for notifications to be fired off for the right mbox or view, please be sure to keep track of the corresponding `eventToken` for each mbox or view. Notifications with the right `eventToken` for the corresponding mboxes or views are required to be fired in order for reporting to be reflected correctly.  

## Notifications for Prefetched Mboxes
One or multiple notifications can be sent via a single delivery call. Determine whether the metric that needs to be tracked is either a `click` or `display` for each mbox so that the `type` of the notification can be reflected correctly. Also, pass in an `id` for each notification so that one can determine whether a notification was sent correctly thru the Adobe Target Delivery API. The `timestamp` is also important to be forwarded to Adobe Target to indicate when the `click` or `display` occurred for a given mbox for reporting purposes.


```
curl -X POST \
'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=10abf6304b2714215b1fd39a870f01afc#1555632114' \
-H 'Content-Type: application/json' \
-H 'cache-control: no-cache' \
-d '{
    "id": {
      "tntId": "abcdefghijkl00023.1_1"
    },
    "context": {
      "channel": "web",
      "browser" : {
        "host" : "demo"
      },
      "address" : {
        "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
      },
      "screen" : {
        "width" : 1200,
        "height": 1400
      }
    },
      "notifications": [
      {
      "id" : "SummerOfferNotification",
        "timestamp" : 1555705311051,
        "type" : "display",
        "mbox" : {
          "name" :"SummerOffer"   
        },
        "tokens" : [
          "GcvBXDhdJFNR9E9r1tgjfmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q"
        ]
      },
    {
      "id" : "SummerShoesOfferNotification",
        "timestamp" : 1555705311051,
        "type" : "display",
        "mbox" : {
          "name" :"SummerShoesOffer"   
        },
        "tokens" : [
          "GcvBXDhdJFNR9E9r1tgjfmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q"
        ]
      },
    {
      "id" : "SummerDressOfferNotification",
        "timestamp" : 1555705311051,
        "type" : "display",
        "mbox" : {
          "name" :"SummerDressOffer"   
        },
        "tokens" : [
          "GcvBXDhdJFNR9E9r1tgjfmqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q"
        ]
    } 
    ]
  }'
```

The above example call will result in a response that indicates the `notifications` request was successfully processed.

```
{
  "status": 200,
  "requestId": "36014eed-4772-4c48-a9e2-e532762b6a85",
  "client": "demo",
  "id": {
      "tntId": "abcdefghijkl00023.28_20"
  },
  "edgeHost": "mboxedge28.tt.omtrdc.net",
  "notifications": [
      {
          "id": "SummerOfferNotification"
      },
      {
          "id": "SummerDressOfferNotification"
      },
      {
          "id": "SummerShoesOfferNotification"
      }
  ]
}
```
If all the `notifications` sent to Adobe Target are correctly processed, they will appear in the `notifications` array in the response. However, if a `notifications` `id` is missing, that particular `notification` did not go through. In this scenario, a retry logic could be put into place until a successful `notification` response is retrieved. Ensure the retry logic has a timeout specified so the API call does not block and cause performance delays.


## Notifications for Prefetched Views
One or multiple notifications can be sent via a single delivery call. Determine whether the metric that needs to be tracked is either a `click` or `display` for each mbox so that the type of the notification can be reflected correctly. Also, pass in an `id` for each notification so that one can determine whether a notification was sent correctly thru the Adobe Target Delivery API. The timestamp is also important to be forwarded to Adobe Target to indicate when the `click` or `display` occurred for a given view for reporting purposes.

```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=d359570e04f14e1faeeba02d6ab9914e' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
  "id": {
    "tntId": "84e8d0e211054f18af365d65f45e902b.28_131"
  },
  "context": {
    "channel": "web",
    "browser": {
      "host": "target.enablementadobe.com"
    },
    "address": {
      "url": "https://target.enablementadobe.com/react/demo/#/"
    }
  },
  "notifications": [{
      "id": "228",
      "type": "display",
      "timestamp": 1556226121884,
      "tokens": ["N3C13I0M2PH8iaKtONJlFJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="],
      "view": {
        "name": "checkout-express",
      }
    },
    {
      "id": "5",
      "type": "display",
      "timestamp": 1556226121884,
      "tokens": ["N3C13I0M2PH8iaKtONJlFJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="],
      "view": {
        "name": "home",
      }
    },
    {
      "id": "6",
      "type": "display",
      "timestamp": 1556226121884,
      "tokens": ["N3C13I0M2PH8iaKtONJlFJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="],
      "view": {
        "name": "products",
      }
    }
  ]
}'
```
The above example call will result in a response that indicates the `notifications` request was successfully processed.
```
{
    "status": 200,
    "requestId": "85cc7394-c19a-4398-9b8b-bbee1e4c4579",
    "client": "demo",
    "id": {
        "tntId": "84e8d0e211054f18af365d65f45e902b.28_131"
    },
    "edgeHost": "mboxedge28.tt.omtrdc.net",
    "notifications": [
        {
            "id": "5"
        },
        {
            "id": "6"
        },
        {
            "id": "228"
        }
    ]
}
```
If all the `notifications` sent to Adobe Target are correctly processed, they will appear in the `notifications` array in the response. However, if a `notifications` `id` is missing, that particular notification did not go through. In this scenario, a retry logic could be put into place until a successful notification response is retrieved. Ensure the retry logic has a timeout specified so the API call does not block and cause performance delays.

# Integration with Experience Cloud

## Adobe Analytics for Target (A4T)
When a Adobe Target Delivery API call is fired from the server, Adobe Target returns the experience for that user and in addition to that, Adobe Target either returns the Adobe Analytics payload back to the caller or automatically forwards it to Adobe Analytics. In order to send Target activity information to Adobe Analytics on the server side, there are a few pre-requisites that need to be satisfied:
1. The activity is set up in the Adobe Target UI with Adobe Analytics as the reporting source and the accounts are enabled for A4T
2. Adobe Marketing Cloud Visitor ID is generated by the API user, and is available when the Target Delivery API call is fired

### Adobe Target Automatically Forwards the Analytics Payload
Adobe Target can automatically forward the analytics payload to Adobe Analytics via the server side if the following identifiers are provided:
1. `supplementalDataId` - The ID that is utilized to stitch between Adobe Analytics and Adobe Target
2. `trackingServer` - The Adobe Analaytics Server
In order for Adobe Target and Adobe Analytics to correctly stitch the data together, the same `supplementalDataId` need to be passed to both Adobe Target and Adobe Analytics.

```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=d359234570e04f14e1faeeba02d6ab9914e' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
      "context": {
        "channel": "web",
        "browser" : {
          "host" : "demo"
        },
        "address" : {
          "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
        },
        "screen" : {
          "width" : 1200,
          "height": 1400
        }
      },
      "id": {
        "marketingCloudVisitorId": "2304820394812039"
      },
      "property" : {
        "token": "08b62abd-c3e7-dfb2-da93-96b3aa724d81"
      },
      "experienceCloud": {
        "analytics": {
          "supplementalDataId" : "23423498732598234",
          "trackingServer": "ags041.sc.omtrdc.net",
          "logging": "server_side"
        }
      },
        "execute": {
        "mboxes" : [
          {
            "name" : "homepage",
            "index" : 1
          }
        ]
      }
    }'
```

### Retrieve Analytics Payload from Adobe Target
Consumers of the Adobe Target Delivery API, can retrieve the Adobe Analytics payload for a corresponding mbox so that the consumer can send the payload to Adobe Analytics via the [Data Insertion API](https://helpx.adobe.com/analytics/kb/data-insertion-api-post-method-adobe-analytics.html).
When a server side Adobe Target call is fired, pass `client_side` to the `logging` field in the request. This will in turn return a payload if the mbox is present in an activity that is using Analytics as the reporting source.

```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=d359234570e04f14e1faeeba02d6ab9914e' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
      "context": {
        "channel": "web",
        "browser" : {
          "host" : "demo"
        },
        "address" : {
          "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
        },
        "screen" : {
          "width" : 1200,
          "height": 1400
        }
      },
      "property" : {
        "token": "08b62abd-c3e7-dfb2-da93-96b3aa724d81"
      },
      "experienceCloud": {
        "analytics": {
          "logging": "client_side"
        }
      },
        "execute": {
        "mboxes" : [
          {
            "name" : "homepage",
            "index" : 1
          },
          {
            "name" : "SummerShoesOffer",
            "index" : 2       
          },
          {
            "name" : "SummerDressOffer",
            "index" : 3       
          }      
        ]
      }
    }'
```

Once you have specified `logging` = `client_side` you will receive the payload in the `mbox` field as seen below.

```
{
    "status": 200,
    "requestId": "4b8855a5-8354-4ac4-8ae7-c551f7c0bb8a",
    "client": "demo",
    "id": {
        "tntId": "d359234570e04f14e1faeeba02d6ab9914e.28_7"
    },
    "edgeHost": "mboxedge28.tt.omtrdc.net",
    "execute": {
        "mboxes": [
            {
                "index": 1,
                "name": "homepage",
                "options": [
                    {
                        "content": "<p><b>Enjoy this 15% discount on your next purchase</b></p>",
                        "type": "html",

                    }
                ],
                "analytics": {
                    "payload": {
                        "pe": "tnt",
                        "tnta": "285408:0:0|2"
                    }
                }
            },
            {
                "index": 2,
                "name": "SummerShoesOffer",
                "options": [
                    {
                        "content": "<p><b>Enjoy this 15% discount on your next shoe purchase</b></p>",
                        "type": "html",
                    }
                ]
            },
            {
                "index": 3,
                "name": "SummerDressOffer",
                "options": [
                    {
                        "content": "<p><b>Enjoy this 15% discount on your next dress purchase</b></p>",
                        "type": "html",
                    }
                ]
            }
        ]
    }
}
```    

If the response from Target contains anything in the `analytics -> payload` property, forward it as it is to Adobe Analytics. Analytics knows how to process this payload. This can be done in a GET request using the following format:

```
https://{datacollectionhost.sc.omtrdc.net}/b/ss/{rsid}/0/CODEVERSION?pe=tnt&tnta={payload}&mcid={mcid}&vid={vid}&aid={aid}
```

#### Query String Parameters and Variables
Field Name  | Required | Description
----------------|-------------|---------
`rsid` | Yes | The report suite ID
`pe` | Yes | Page event. Always set to `tnt`
`tnta` | Yes | Analytics payload returned by Target server in `analytics -> payload -> tnta`
`marketingCloudVisitorId` | Yes | Marketing Cloud Visitor ID

#### Required Header Values
Header Name  | Header Value
----------------|-------------
Host | Analytics data collection server (eg: adobeags421.sc.omtrdc.net)

#### Sample A4T Data Insertion HTTP Get Call

```
https://demo.sc.omtrdc.net/b/ss/myCustomRsid/0/MOBILE-1.0?pe=tnt&tnta=285408:0:0|2&mcid=2304820394812039
```

## Adobe Audience Manager
Adobe Audience Manager segments can also be leveraged via Adobe Target Delivery APIs. In order to leverage AAM segments, the following fields need to be provided:

Field Name  | Required | Description
----------------|-------------|---------
`locationHint` | Yes | DCS Location Hint is used to determine which AAM DCS Endpoint to hit in order to retrieve the profile. Must be >= 1.
`marketingCloudVisitorId` | Yes | Marketing Cloud Visitor ID
`blob` | Yes | AAM Blob is used to send additional data to AAM. Must not be blank and the size <= 1024.


```
curl -X POST \
  'https://demo.tt.omtrdc.net/rest/v1/delivery?client=demo&sessionId=d359234570e04f14e1faeeba02d6ab9914e' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
      "context": {
        "channel": "web",
        "browser" : {
          "host" : "demo"
        },
        "address" : {
          "url" : "http://demo.dev.tt-demo.com/demo/store/index.html"
        },
        "screen" : {
          "width" : 1200,
          "height": 1400
        }
      },
      "id": {
        "marketingCloudVisitorId": "2304820394812039"
      },
      "property" : {
        "token": "08b62abd-c3e7-dfb2-da93-96b3aa724d81"
      },
      "experienceCloud": {
        "audienceManager": {
          "locationHint": 9,
          "blob": "32fdghkjh34kj5h43"
        }
      },
        "execute": {
        "mboxes" : [
          {
            "name" : "homepage",
            "index" : 1
          },
          {
            "name" : "SummerShoesOffer",
            "index" : 2       
          },
          {
            "name" : "SummerDressOffer",
            "index" : 3       
          }      
        ]
      }
    }'
```

# Known Limitations
1. There is no authentication for Target Delivery APIs.
2. This API does not process cookies or redirect calls.
3. Support for AP and Recs Activities: This API has two modes for fetching content - execute and prefetch mode. The prefetch mode can only be used for AB and XT activities. Don’t use the prefetch mode for Automated Personalization, Auto-Allocate, Auto-Target and Recommendations activty types. 

