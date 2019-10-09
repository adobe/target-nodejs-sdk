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

const MockDate = require("mockdate");
const { version } = require("../package");
const {
  ObjectSerializer,
  TargetDeliveryApi
} = require("../generated-delivery-api-client/api");
const {
  createVisitorId,
  getDeviceId,
  getCluster,
  extractClusterFromDeviceId,
  createHeaders,
  getSessionId,
  getTargetHost,
  createDeliveryApi,
  createDeliveryRequest,
  processResponse
} = require("../src/helper");

const uuidMock = () => {
  return "12345678-abcd-1234-efgh-000000000000";
};

const REQUEST_CUSTOMER_IDS = [
  {
    id: "1234",
    integrationCode: "foo",
    authenticatedState: "unknown"
  }
];

const VISITOR_CUSTOMER_IDS = {
  userid: {
    id: "67312378756723456",
    authState: 1
  },
  puuid: "550e8400-e29b-41d4-a716-446655440000"
};

const MERGED_CUSTOMER_IDS = [
  {
    id: "67312378756723456",
    integrationCode: "userid",
    authenticatedState: "authenticated"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    integrationCode: "puuid",
    authenticatedState: "unknown"
  }
].concat(REQUEST_CUSTOMER_IDS);

const VISITOR = {
  getVisitorValues: () => ({
    MCMID: "mid",
    MCAAMB: "aamb",
    MCAAMLH: "22"
  }),
  getSupplementalDataID: () => "sdid",
  getState: () => ({
    "B8A054D958807F770A495DD6@AdobeOrg": {
      customerIDs: VISITOR_CUSTOMER_IDS
    }
  })
};

const EMPTY_VISITOR = {
  getVisitorValues: () => ({}),
  getSupplementalDataID: () => null,
  getState: () => ({
    "B8A054D958807F770A495DD6@AdobeOrg": {}
  })
};

describe("Target Helper", () => {
  beforeAll(() => {
    MockDate.set("2019-10-06");
  });

  afterAll(() => {
    MockDate.reset();
  });

  it("createVisitorId should set id fields", () => {
    let result = createVisitorId(undefined, {
      deviceId: "deviceId",
      visitor: VISITOR
    });

    expect(result.tntId).toEqual("deviceId");
    expect(result.marketingCloudVisitorId).toEqual("mid");

    const REQUEST_ID = {
      tntId: "tntId",
      thirdPartyId: "thirdPartyId",
      marketingCloudVisitorId: "mid"
    };
    result = createVisitorId(REQUEST_ID, { visitor: EMPTY_VISITOR });

    expect(ObjectSerializer.serialize(result, "VisitorId")).toEqual(
      Object.assign({ customerIds: undefined }, REQUEST_ID)
    );

    result = createVisitorId(undefined, { visitor: EMPTY_VISITOR });
    expect(result).toBeUndefined();
  });

  it("createVisitorId should set request customerIds when no visitor customerIds", () => {
    const result = createVisitorId(
      { customerIds: REQUEST_CUSTOMER_IDS },
      { visitor: EMPTY_VISITOR }
    );

    expect(result.customerIds.length).toEqual(1);
    expect(result.customerIds[0]).toEqual(REQUEST_CUSTOMER_IDS[0]);
  });

  it("createVisitorId should merge request customerIds with visitor customerIds", () => {
    const result = createVisitorId(
      { customerIds: REQUEST_CUSTOMER_IDS },
      { visitor: VISITOR }
    );

    expect(result.customerIds.length).toEqual(3);
    result.customerIds.every((customerId, index) =>
      expect(ObjectSerializer.serialize(customerId, "CustomerId")).toEqual(
        MERGED_CUSTOMER_IDS[index]
      )
    );
  });

  it("extractClusterFromDeviceId should extract cluster", () => {
    let result = extractClusterFromDeviceId(
      "08210e2d751a44779b8313e2d2692b96.21_27"
    );
    expect(result).toBe("21");

    result = extractClusterFromDeviceId(null);
    expect(result).toBeNull();

    result = extractClusterFromDeviceId(
      "08210e2d751a44779b8313e2d2692b9621_27"
    );
    expect(result).toBeNull();
  });

  it("getCluster should get cluster", () => {
    let result = getCluster("08210e2d751a44779b8313e2d2692b96.21_27");
    expect(result).toBe("21");

    result = getCluster("08210e2d751a44779b8313e2d2692b96.21_27", "22");
    expect(result).toBe("21");

    result = getCluster(null, "22");
    expect(result).toBe("22");
  });

  it("getDeviceId should get device Id", () => {
    let cookies = {
      PC: {
        value: "08210e2d751a44779b8313e2d2692b96.21_27"
      }
    };
    let result = getDeviceId(cookies);
    expect(result).toBe("08210e2d751a44779b8313e2d2692b96.21_27");

    cookies = {};
    result = getDeviceId(cookies);
    expect(result).toBeUndefined();

    cookies = {
      PC: {
        value: ""
      }
    };
    result = getDeviceId(cookies);
    expect(result).toBeUndefined();
  });

  it("getSessionId should get session Id", () => {
    let cookies = {
      session: {
        value: "1111111111111111111111111111"
      }
    };
    let result = getSessionId(cookies);
    expect(result).toBe("1111111111111111111111111111");

    result = getSessionId(cookies, "2222222222222222222222222222");
    expect(result).toBe("1111111111111111111111111111");

    cookies = {};
    result = getSessionId(cookies, "2222222222222222222222222222");
    expect(result).toBe("2222222222222222222222222222");

    cookies = {};
    result = getSessionId(cookies, null, uuidMock);
    expect(result).toBe("12345678-abcd-1234-efgh-000000000000");
  });

  it("getTargetHost should get Target host", () => {
    let result = getTargetHost("test.com");
    expect(result).toBe("https://test.com");

    result = getTargetHost("test.com", "21");
    expect(result).toBe("https://test.com");

    result = getTargetHost("", "21");
    expect(result).toBe("https://mboxedge21.tt.omtrdc.net");

    result = getTargetHost(null, null, "testclient");
    expect(result).toBe("https://testclient.tt.omtrdc.net");

    result = getTargetHost(null, null, "testclient", false);
    expect(result).toBe("http://testclient.tt.omtrdc.net");
  });

  it("createHeaders should create headers", () => {
    const headers = {
      "Content-Type": "application/json",
      "X-EXC-SDK": "AdobeTargetNode",
      "X-EXC-SDK-Version": version,
      "X-Request-Id": "12345678-abcd-1234-efgh-000000000000"
    };

    const result = createHeaders(uuidMock);
    expect(result).toEqual(headers);
  });

  it("createDeliveryRequest should create Delivery request", () => {
    let request = {
      execute: {
        pageLoad: {
          address: {
            url: "http://test.com"
          },
          parameters: {
            a: 1
          },
          profileParameters: {
            b: 2
          },
          order: {
            id: "1234"
          },
          product: {
            id: "5678"
          }
        },
        mboxes: [
          {
            index: 1,
            name: "mbox1"
          }
        ]
      }
    };
    let result = createDeliveryRequest(request, {
      visitor: VISITOR,
      uuidMethod: uuidMock
    });
    let serializedResult = JSON.stringify(
      ObjectSerializer.serialize(result, "DeliveryRequest")
    );
    expect(serializedResult).toEqual(
      '{"requestId":"12345678-abcd-1234-efgh-000000000000","id":{"marketingCloudVisitorId":"mid","customerIds":[{"id":"67312378756723456","integrationCode":"userid","authenticatedState":"authenticated"},{"id":"550e8400-e29b-41d4-a716-446655440000","integrationCode":"puuid","authenticatedState":"unknown"}]},"context":{"channel":"web","timeOffsetInMinutes":180},"experienceCloud":{"audienceManager":{"locationHint":22,"blob":"aamb"},"analytics":{"supplementalDataId":"sdid","logging":"server_side"}},"execute":{"pageLoad":{"address":{"url":"http://test.com"},"parameters":{"a":1},"profileParameters":{"b":2},"order":{"id":"1234"},"product":{"id":"5678"}},"mboxes":[{"index":1,"name":"mbox1"}]}}'
    );

    request = {
      property: {
        token: "at_property1"
      },
      trace: {
        authorizationToken: "authorizationToken"
      },
      experienceCloud: {
        analytics: {
          trackingServer: "trackingServer",
          trackingServerSecure: "trackingServerSecure"
        }
      },
      prefetch: {
        pageLoad: {},
        mboxes: [
          {
            index: 1,
            name: "mbox1"
          }
        ],
        views: [
          {
            name: "view1",
            key: "viewkey1"
          }
        ]
      }
    };
    result = createDeliveryRequest(request, {
      visitor: EMPTY_VISITOR,
      uuidMethod: uuidMock
    });
    serializedResult = JSON.stringify(
      ObjectSerializer.serialize(result, "DeliveryRequest")
    );
    expect(serializedResult).toEqual(
      '{"requestId":"12345678-abcd-1234-efgh-000000000000","property":{"token":"at_property1"},"trace":{"authorizationToken":"authorizationToken"},"context":{"channel":"web","timeOffsetInMinutes":180},"experienceCloud":{"analytics":{"supplementalDataId":null,"logging":"server_side","trackingServer":"trackingServer","trackingServerSecure":"trackingServerSecure"}},"prefetch":{"views":[{"name":"view1","key":"viewkey1"}],"pageLoad":{},"mboxes":[{"index":1,"name":"mbox1"}]}}'
    );

    request = {
      execute: {
        mboxes: []
      },
      prefetch: {
        mboxes: [],
        views: []
      }
    };
    result = createDeliveryRequest(request, {
      visitor: EMPTY_VISITOR,
      uuidMethod: uuidMock
    });
    serializedResult = JSON.stringify(
      ObjectSerializer.serialize(result, "DeliveryRequest")
    );
    expect(serializedResult).toEqual(
      '{"requestId":"12345678-abcd-1234-efgh-000000000000","context":{"channel":"web","timeOffsetInMinutes":180},"experienceCloud":{"analytics":{"supplementalDataId":null,"logging":"server_side"}}}'
    );

    request = {
      notifications: [
        {
          id: "id",
          timestamp: 1570092933750,
          type: "display",
          impressionId: "impressionId",
          tokens: ["token1"],
          mbox: {
            name: "mbox1",
            state: "mboxstate1"
          }
        },
        {
          id: "id",
          timestamp: 1570092933755,
          type: "click",
          tokens: ["token1", "token2"],
          view: {
            name: "view1",
            key: "viewkey1",
            state: "viewstate1"
          }
        }
      ]
    };
    result = createDeliveryRequest(request, {
      visitor: EMPTY_VISITOR,
      uuidMethod: uuidMock
    });
    serializedResult = JSON.stringify(
      ObjectSerializer.serialize(result, "DeliveryRequest")
    );
    expect(serializedResult).toEqual(
      '{"requestId":"12345678-abcd-1234-efgh-000000000000","context":{"channel":"web","timeOffsetInMinutes":180},"experienceCloud":{"analytics":{"supplementalDataId":null,"logging":"server_side"}},"notifications":[{"id":"id","impressionId":"impressionId","type":"display","timestamp":1570092933750,"tokens":["token1"],"mbox":{"name":"mbox1","state":"mboxstate1"}},{"id":"id","type":"click","timestamp":1570092933755,"tokens":["token1","token2"],"view":{"name":"view1","key":"viewkey1","state":"viewstate1"}}]}'
    );

    request = {
      notifications: [
        {
          id: "id",
          timestamp: 1570092933750
        }
      ]
    };
    const loggerSpy = {
      error: () => {}
    };
    spyOn(loggerSpy, "error");
    result = createDeliveryRequest(request, {
      logger: loggerSpy,
      visitor: EMPTY_VISITOR,
      uuidMethod: uuidMock
    });
    expect(loggerSpy.error).toHaveBeenCalledWith(
      "Notification validation failed for: ",
      jasmine.any(Object)
    );
    serializedResult = JSON.stringify(
      ObjectSerializer.serialize(result, "DeliveryRequest")
    );
    expect(serializedResult).toEqual(
      '{"requestId":"12345678-abcd-1234-efgh-000000000000","context":{"channel":"web","timeOffsetInMinutes":180},"experienceCloud":{"analytics":{"supplementalDataId":null,"logging":"server_side"}}}'
    );
  });

  it("processResponse should process response", () => {
    let response = {};
    let result = processResponse("sessionId", undefined, response);
    let serializedResult = JSON.stringify(result);
    expect(serializedResult).toEqual(
      '{"targetCookie":{"name":"mbox","value":"session#sessionId#1570321860","maxAge":1860},"response":{}}'
    );

    response = {
      timing: {
        firstByte: 123456
      },
      body: {
        id: {
          tntId: "tntId"
        },
        client: "testclient",
        edgeHost: "mboxedge21.tt.omtrdc.net",
        prefetch: {
          views: [
            {
              name: "view1",
              key: "viewkey1",
              options: [
                {
                  type: "actions",
                  content: "content1",
                  eventToken: "token1",
                  responseTokens: {
                    "profile.token1": "token1",
                    token2: "token2"
                  }
                }
              ],
              state: "viewstate1",
              analytics: {
                payload: {
                  pe: "pe1",
                  tnta: "tnta1"
                }
              },
              trace: {
                tracekey1: "traceval1"
              }
            },
            {
              name: "view2",
              key: "viewkey2",
              options: [
                {
                  type: "actions",
                  content: "content2",
                  eventToken: "token2",
                  responseTokens: {
                    "profile.token21": "token21",
                    token22: "token22"
                  }
                }
              ],
              state: "viewstate2",
              analytics: {
                payload: {
                  pe: "pe2",
                  tnta: "tnta2"
                }
              },
              trace: {
                tracekey2: "traceval2"
              }
            }
          ],
          mboxes: [
            {
              name: "mbox1",
              index: "mboxidx1",
              options: [
                {
                  type: "actions",
                  content: "content3",
                  eventToken: "token3",
                  responseTokens: {
                    "profile.token31": "token31",
                    token32: "token32"
                  }
                }
              ],
              state: "mboxstate2",
              analytics: {
                payload: {
                  pe: "pe3",
                  tnta: "tnta3"
                }
              },
              trace: {
                tracekey3: "traceval3"
              }
            }
          ]
        }
      }
    };
    result = processResponse("sessionId", "21", response);
    serializedResult = JSON.stringify(result);
    expect(serializedResult).toEqual(
      '{"targetCookie":{"name":"mbox","value":"session#sessionId#1570321860|PC#tntId#1633564800","maxAge":63244800},"targetLocationHintCookie":{"name":"mboxEdgeCluster","value":"21","maxAge":1860},"analyticsDetails":[{"payload":{"pe":"pe1","tnta":"tnta1"}},{"payload":{"pe":"pe2","tnta":"tnta2"}},{"payload":{"pe":"pe3","tnta":"tnta3"}}],"trace":[{"tracekey1":"traceval1"},{"tracekey2":"traceval2"},{"tracekey3":"traceval3"}],"responseTokens":[{"profile.token1":"token1","token2":"token2"},{"profile.token21":"token21","token22":"token22"},{"profile.token31":"token31","token32":"token32"}],"response":{"id":{"tntId":"tntId"},"client":"testclient","edgeHost":"mboxedge21.tt.omtrdc.net","prefetch":{"views":[{"name":"view1","key":"viewkey1","options":[{"type":"actions","content":"content1","eventToken":"token1","responseTokens":{"profile.token1":"token1","token2":"token2"}}],"state":"viewstate1","analytics":{"payload":{"pe":"pe1","tnta":"tnta1"}},"trace":{"tracekey1":"traceval1"}},{"name":"view2","key":"viewkey2","options":[{"type":"actions","content":"content2","eventToken":"token2","responseTokens":{"profile.token21":"token21","token22":"token22"}}],"state":"viewstate2","analytics":{"payload":{"pe":"pe2","tnta":"tnta2"}},"trace":{"tracekey2":"traceval2"}}],"mboxes":[{"name":"mbox1","index":"mboxidx1","options":[{"type":"actions","content":"content3","eventToken":"token3","responseTokens":{"profile.token31":"token31","token32":"token32"}}],"state":"mboxstate2","analytics":{"payload":{"pe":"pe3","tnta":"tnta3"}},"trace":{"tracekey3":"traceval3"}}]}},"timing":{"firstByte":123456}}'
    );

    response = {
      body: {
        id: {
          tntId: "tntId"
        },
        client: "testclient",
        edgeHost: "mboxedge21.tt.omtrdc.net",
        execute: {
          pageLoad: {
            options: [
              {
                type: "actions",
                content: "content1",
                eventToken: "token1",
                responseTokens: {
                  "profile.token1": "token1",
                  token2: "token2"
                }
              }
            ],
            state: "pageloadstate1",
            analytics: {
              payload: {
                pe: "pe1",
                tnta: "tnta1"
              }
            },
            trace: {
              tracekey1: "traceval1"
            }
          }
        }
      }
    };
    result = processResponse("sessionId", undefined, response);
    serializedResult = JSON.stringify(result);
    expect(serializedResult).toEqual(
      '{"targetCookie":{"name":"mbox","value":"session#sessionId#1570321860|PC#tntId#1633564800","maxAge":63244800},"targetLocationHintCookie":{"name":"mboxEdgeCluster","value":"21","maxAge":1860},"analyticsDetails":[{"payload":{"pe":"pe1","tnta":"tnta1"}}],"trace":[{"tracekey1":"traceval1"}],"responseTokens":[{"profile.token1":"token1","token2":"token2"}],"response":{"id":{"tntId":"tntId"},"client":"testclient","edgeHost":"mboxedge21.tt.omtrdc.net","execute":{"pageLoad":{"options":[{"type":"actions","content":"content1","eventToken":"token1","responseTokens":{"profile.token1":"token1","token2":"token2"}}],"state":"pageloadstate1","analytics":{"payload":{"pe":"pe1","tnta":"tnta1"}},"trace":{"tracekey1":"traceval1"}}}}}'
    );
  });

  it("createDeliveryApi should create TargetDeliveryApi", () => {
    const URL = "http://target.host.com";
    const TIMEOUT = 2000;
    const result = createDeliveryApi(URL, TIMEOUT);
    expect(result).toEqual(jasmine.any(TargetDeliveryApi));
    expect(result.basePath).toEqual(URL);
    expect(result.timeout).toEqual(TIMEOUT);
  });
});
