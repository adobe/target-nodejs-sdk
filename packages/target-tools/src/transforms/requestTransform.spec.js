import {
  Configuration,
  InteractApi
} from "@adobe/aep-edge-tools/aep-edge-api-client";
import * as nodeFetch from "node-fetch";
import { targetDeliveryToAepEdgeRequest } from "./requestTransform";

describe("targetDeliveryToAepEdgeRequest", () => {
  const edgeConfigId = "34610d20-3c46-4636-b22f-eb87110dfb25:dev";
  const imsOrgId = "6FC947105BB267B70A495EE9@AdobeOrg";
  const sessionId = "554a539c-7b8b-4513-a11f-5f3ee1a41cc2";
  const version = "3.0";
  const konductorIdentity =
    "CiY1OTU1NTQzNjE2MzI0OTQyOTI1NDI2MzQxNzA4NDc2ODA1MDY4OFIOCMzNw5a6LxgBKgNPUjLwAczNw5a6Lw==";

  const basicRequest = {
    imsOrgId,
    sessionId,
    deliveryRequest: {},
    version,
    edgeConfigId,
    konductorIdentity
  };

  it("has top level Ids and request headers", () => {
    expect(
      targetDeliveryToAepEdgeRequest({
        ...basicRequest,
        deliveryRequest: {
          requestId: "requestId123"
        }
      })
    ).toMatchObject({
      requestId: "requestId123",
      configId: edgeConfigId
    });
  });

  it("has identity query", () => {
    expect(
      targetDeliveryToAepEdgeRequest({
        ...basicRequest,
        deliveryRequest: {
          requestId: "requestId123"
        }
      })
    ).toMatchObject({
      edgeRequest: {
        query: {
          identity: {
            fetch: ["ECID", "TNTID"]
          }
        }
      }
    });
  });

  it("has trace", () => {
    expect(
      targetDeliveryToAepEdgeRequest({
        ...basicRequest,
        deliveryRequest: {
          trace: {
            authorizationToken: "trace-token-ftw"
          }
        }
      })
    ).toMatchObject({
      xAdobeTargetTraceToken: "trace-token-ftw"
    });
  });

  it("translates Identities", () => {
    expect(
      targetDeliveryToAepEdgeRequest({
        ...basicRequest,
        deliveryRequest: {
          id: {
            tntId: "tnt123",
            thirdPartyId: "thirdPartyId123",
            marketingCloudVisitorId: "ecid123",
            customerIds: [
              {
                id: "custId123",
                integrationCode: "LAW",
                authenticatedState: "authenticated"
              },
              {
                id: "custIdAbc",
                integrationCode: "CHE",
                authenticatedState: "logged_out"
              }
            ]
          }
        }
      })
    ).toMatchObject({
      edgeRequest: {
        xdm: {
          identityMap: {
            ECID: [
              {
                id: "ecid123",
                authenticatedState: "ambiguous",
                primary: true
              }
            ],
            LAW: [
              {
                id: "custId123",
                authenticatedState: "authenticated",
                primary: false
              }
            ],
            CHE: [
              {
                id: "custIdAbc",
                authenticatedState: "loggedOut",
                primary: false
              }
            ]
          }
        }
      }
    });
  });

  it("translates target context", () => {
    expect(
      targetDeliveryToAepEdgeRequest({
        ...basicRequest,
        deliveryRequest: {
          context: {
            channel: "web",
            mobilePlatform: {
              deviceName: "iPhone 6",
              deviceType: "phone",
              platformType: "ios",
              version: "A1586"
            },
            application: {
              id: "abc",
              name: "Monkey Time",
              version: "99:5"
            },
            screen: {
              width: 1600,
              height: 1200,
              colorDepth: 32,
              orientation: "portrait"
            },
            window: {
              width: 1024,
              height: 768
            },
            browser: {
              host: "https://apple.com"
            },
            address: {
              URL: "https://apple.com",
              referringUrl: "https://microsoft.com"
            },
            geo: {
              ipAddress: "127.0.0.1",
              latitude: 37.773972,
              longitude: -122.431297,
              city: "SANFRANCISCO",
              countryCode: "US",
              stateCode: "CA",
              zip: "94102"
            },
            timeOffsetInMinutes: -420,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0"
          }
        }
      })
    ).toMatchObject({
      edgeRequest: {
        xdm: {
          environment: {
            type: "browser",
            browserDetails: {
              viewportWidth: 1024,
              viewportHeight: 768,
              userAgent:
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0"
            }
          },
          device: {
            screenWidth: 1600,
            screenHeight: 1200,
            colorDepth: 32,
            screenOrientation: "portrait",
            model: "iPhone 6",
            type: "mobile",
            modelNumber: "A1586"
          },
          application: {
            id: "abc",
            name: "Monkey Time",
            version: "99:5"
          },
          web: {
            webPageDetails: {
              URL: "https://apple.com"
            },
            webReferrer: {
              URL: "https://microsoft.com"
            }
          },
          placeContext: {
            geo: {
              latitude: 37.773972,
              longitude: -122.431297
            },
            localTimezoneOffset: -7
          }
        }
      }
    });
  });

  describe("execute", () => {
    it("pageLoad", () => {
      expect(
        targetDeliveryToAepEdgeRequest({
          ...basicRequest,
          deliveryRequest: {
            execute: {
              pageLoad: {
                address: "https://adobe.com",
                parameters: {
                  foo: "bar",
                  baz: true
                },
                profileParameters: {
                  cat: "meow"
                },
                order: {
                  id: "order1",
                  total: 100,
                  purchasedProductIds: ["product1"],
                  time: new Date(),
                  experienceLocalId: 0,
                  duplicate: false,
                  outlier: false
                },
                product: {
                  id: "product1",
                  categoryId: "cat7"
                }
              }
            }
          }
        })
      ).toMatchObject({
        edgeRequest: {
          events: [
            {
              query: {
                personalization: {
                  schemas: [
                    "https://ns.adobe.com/personalization/html-content-item",
                    "https://ns.adobe.com/personalization/json-content-item",
                    "https://ns.adobe.com/personalization/redirect-item",
                    "https://ns.adobe.com/personalization/dom-action"
                  ],
                  decisionScopes: ["__view__"]
                }
              },
              xdm: {
                timestamp: expect.any(Date),
                implementationDetails: {
                  name: "https://ns.adobe.com/experience/aep-edge-nodejs-sdk",
                  version: expect.any(String),
                  environment: expect.any(String)
                },
                productListItems: [
                  {
                    SKU: "product1",
                    category: "cat7"
                  }
                ],
                commerce: {
                  order: {
                    purchaseId: "order1",
                    priceTotal: 100
                  },
                  purchases: {
                    id: "product1"
                  }
                }
              },
              data: {
                __adobe: {
                  target: {
                    foo: "bar",
                    baz: true,
                    profile: {
                      cat: "meow"
                    }
                  }
                }
              }
            }
          ]
        }
      });
    });

    it("mbox", () => {
      expect(
        targetDeliveryToAepEdgeRequest({
          ...basicRequest,
          deliveryRequest: {
            execute: {
              mboxes: [
                {
                  name: "metroidbox",
                  index: 0,
                  address: "https://adobe.com",
                  parameters: {
                    foo: "bar",
                    baz: true
                  },
                  profileParameters: {
                    cat: "meow"
                  },
                  order: {
                    id: "order1",
                    total: 100,
                    purchasedProductIds: ["product1"],
                    time: new Date(),
                    experienceLocalId: 0,
                    duplicate: false,
                    outlier: false
                  },
                  product: {
                    id: "product1",
                    categoryId: "cat7"
                  }
                }
              ]
            }
          }
        })
      ).toMatchObject({
        edgeRequest: {
          events: [
            {
              query: {
                personalization: {
                  schemas: [
                    "https://ns.adobe.com/personalization/html-content-item",
                    "https://ns.adobe.com/personalization/json-content-item",
                    "https://ns.adobe.com/personalization/redirect-item",
                    "https://ns.adobe.com/personalization/dom-action"
                  ],
                  decisionScopes: ["metroidbox"]
                }
              },
              xdm: {
                timestamp: expect.any(Date),
                implementationDetails: {
                  name: "https://ns.adobe.com/experience/aep-edge-nodejs-sdk",
                  version: expect.any(String),
                  environment: expect.any(String)
                },
                productListItems: [
                  {
                    SKU: "product1",
                    category: "cat7"
                  }
                ],
                commerce: {
                  order: {
                    purchaseId: "order1",
                    priceTotal: 100
                  },
                  purchases: {
                    id: "product1"
                  }
                }
              },
              data: {
                __adobe: {
                  target: {
                    foo: "bar",
                    baz: true
                  }
                }
              }
            }
          ]
        }
      });
    });

    it("pageLoad with mboxes", () => {
      expect(
        targetDeliveryToAepEdgeRequest({
          ...basicRequest,
          deliveryRequest: {
            execute: {
              pageLoad: {
                address: "https://adobe.com",
                parameters: {
                  foo: "bar",
                  baz: true
                },
                profileParameters: {
                  cat: "meow"
                }
              },
              mboxes: [
                {
                  name: "metroidbox",
                  index: 0,
                  address: "https://adobe.com",
                  parameters: {
                    foo: "metroidbar",
                    baz: true
                  },
                  profileParameters: {
                    cat: "metroidmeow"
                  }
                },
                {
                  name: "mariobox",
                  index: 1,
                  address: "https://adobe.com",
                  parameters: {
                    foo: "mariobar",
                    baz: true
                  },
                  profileParameters: {
                    cat: "mariomeow"
                  }
                }
              ]
            }
          }
        })
      ).toMatchObject({
        edgeRequest: {
          events: [
            {
              query: {
                personalization: {
                  schemas: expect.any(Array),
                  decisionScopes: ["__view__"]
                }
              },
              xdm: {
                timestamp: expect.any(Date),
                implementationDetails: {
                  name: "https://ns.adobe.com/experience/aep-edge-nodejs-sdk",
                  version: expect.any(String),
                  environment: expect.any(String)
                }
              },
              data: {
                __adobe: {
                  target: {
                    foo: "bar",
                    baz: true,
                    profile: {
                      cat: "meow"
                    }
                  }
                }
              }
            },
            {
              query: {
                personalization: {
                  schemas: expect.any(Array),
                  decisionScopes: ["metroidbox"]
                }
              },
              xdm: {
                timestamp: expect.any(Date),
                implementationDetails: {
                  name: "https://ns.adobe.com/experience/aep-edge-nodejs-sdk",
                  version: expect.any(String),
                  environment: expect.any(String)
                }
              },
              data: {
                __adobe: {
                  target: {
                    foo: "metroidbar",
                    baz: true,
                    profile: {
                      cat: "metroidmeow"
                    }
                  }
                }
              }
            },
            {
              query: {
                personalization: {
                  schemas: expect.any(Array),
                  decisionScopes: ["mariobox"]
                }
              },
              xdm: {
                timestamp: expect.any(Date),
                implementationDetails: {
                  name: "https://ns.adobe.com/experience/aep-edge-nodejs-sdk",
                  version: expect.any(String),
                  environment: expect.any(String)
                }
              },
              data: {
                __adobe: {
                  target: {
                    foo: "mariobar",
                    baz: true,
                    profile: {
                      cat: "mariomeow"
                    }
                  }
                }
              }
            }
          ]
        }
      });
    });

    it("pageLoad with mboxes combined", () => {
      expect(
        targetDeliveryToAepEdgeRequest({
          ...basicRequest,
          deliveryRequest: {
            execute: {
              pageLoad: {
                address: "https://adobe.com",
                parameters: {
                  foo: "bar",
                  baz: true
                },
                profileParameters: {
                  cat: "meow"
                }
              },
              mboxes: [
                {
                  name: "metroidbox",
                  index: 0,
                  address: "https://adobe.com",
                  parameters: {
                    foo: "bar",
                    baz: true
                  },
                  profileParameters: {
                    cat: "meow"
                  }
                },
                {
                  name: "mariobox",
                  index: 1,
                  address: "https://adobe.com",
                  parameters: {
                    foo: "bar",
                    baz: true
                  },
                  profileParameters: {
                    cat: "meow"
                  }
                },
                {
                  name: "zeldabox",
                  index: 2,
                  address: "https://adobe.com",
                  parameters: {
                    foo: "zeldabar",
                    baz: true
                  },
                  profileParameters: {
                    cat: "meow"
                  }
                }
              ]
            }
          }
        })
      ).toMatchObject({
        edgeRequest: {
          events: [
            {
              query: {
                personalization: {
                  schemas: expect.any(Array),
                  decisionScopes: ["__view__", "metroidbox", "mariobox"]
                }
              },
              xdm: {
                timestamp: expect.any(Date),
                implementationDetails: {
                  name: "https://ns.adobe.com/experience/aep-edge-nodejs-sdk",
                  version: expect.any(String),
                  environment: expect.any(String)
                }
              },
              data: {
                __adobe: {
                  target: {
                    foo: "bar",
                    baz: true,
                    profile: {
                      cat: "meow"
                    }
                  }
                }
              }
            },
            {
              query: {
                personalization: {
                  schemas: expect.any(Array),
                  decisionScopes: ["zeldabox"]
                }
              },
              xdm: {
                timestamp: expect.any(Date),
                implementationDetails: {
                  name: "https://ns.adobe.com/experience/aep-edge-nodejs-sdk",
                  version: expect.any(String),
                  environment: expect.any(String)
                }
              },
              data: {
                __adobe: {
                  target: {
                    foo: "zeldabar",
                    baz: true,
                    profile: {
                      cat: "meow"
                    }
                  }
                }
              }
            }
          ]
        }
      });
    });
  });

  it("prefetch not supported", () => {
    expect(
      targetDeliveryToAepEdgeRequest({
        ...basicRequest,
        deliveryRequest: {
          prefetch: {
            pageLoad: {
              address: "https://adobe.com",
              parameters: {
                foo: "bar",
                baz: true
              },
              profileParameters: {
                cat: "meow"
              },
              order: {
                id: "order1",
                total: 100,
                purchasedProductIds: ["product1"],
                time: new Date(),
                experienceLocalId: 0,
                duplicate: false,
                outlier: false
              },
              product: {
                id: "product1",
                categoryId: "cat7"
              }
            },
            mboxes: [
              {
                name: "metroidbox",
                index: 0
              }
            ]
          }
        }
      })
    ).toMatchObject({
      edgeRequest: {
        events: []
      }
    });
  });

  it("cookies", () => {
    const result = targetDeliveryToAepEdgeRequest({
      ...basicRequest,
      deliveryRequest: {
        requestId: "requestId123",
        context: {
          browser: {
            host: "https://facebook.com"
          }
        }
      }
    });

    expect(result).toMatchObject({
      requestId: "requestId123",
      configId: edgeConfigId,
      edgeRequest: {
        meta: {
          state: {
            domain: "facebook.com",
            cookiesEnabled: true,
            entries: expect.any(Array)
          }
        }
      }
    });

    const { entries } = result.edgeRequest.meta.state;

    expect(entries.length).toEqual(2);

    expect(
      entries.find(
        entry =>
          entry.key === "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_identity"
      )
    ).toMatchObject({
      key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_identity",
      value:
        "CiY1OTU1NTQzNjE2MzI0OTQyOTI1NDI2MzQxNzA4NDc2ODA1MDY4OFIOCMzNw5a6LxgBKgNPUjLwAczNw5a6Lw=="
    });

    expect(
      entries.find(
        entry =>
          entry.key ===
          "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_personalization_sessionId"
      )
    ).toMatchObject({
      key: "kndctr_6FC947105BB267B70A495EE9_AdobeOrg_personalization_sessionId",
      value: sessionId
    });
  });

  it("requests", async () => {
    expect.assertions(4);
    const configuration = new Configuration({
      fetchApi: nodeFetch.default
    });

    const interactPostRequest = targetDeliveryToAepEdgeRequest({
      ...basicRequest,
      deliveryRequest: {
        execute: {
          id: {
            marketingCloudVisitorId: "52777108510978688250501620102073477990"
          },
          mboxes: [
            {
              name: "vegas",
              index: 0
            }
          ]
        }
      },
      konductorIdentity: undefined
    });

    const result = await new InteractApi(configuration).interactPost(
      interactPostRequest
    );

    expect(result.handle.length).toBeGreaterThan(0);
    const decisions = result.handle.find(
      obj => obj.type === "personalization:decisions"
    );

    expect(decisions.payload.length).toEqual(1);
    const payload = decisions.payload[0];

    expect(payload).toMatchObject({
      id: "AT:eyJhY3Rpdml0eUlkIjoiNTQzOTM3IiwiZXhwZXJpZW5jZUlkIjoiMCJ9",
      scope: "vegas",
      scopeDetails: {
        decisionProvider: "TGT",
        activity: {
          id: "543937"
        },
        experience: {
          id: "0"
        },
        strategies: [
          {
            algorithmID: "0",
            trafficType: "0"
          }
        ]
      },
      items: [
        {
          id: expect.any(String),
          schema: "https://ns.adobe.com/personalization/json-content-item",
          meta: expect.any(Object),
          data: {
            id: expect.any(String),
            format: "application/json",
            content: {
              hotel: expect.any(String)
            }
          }
        }
      ]
    });
    const { content } = payload.items[0].data;

    expect(
      ["Circus Circus", "Wynn", "Bellagio"].includes(content.hotel)
    ).toEqual(true);
  });

  // translates cookies to edgeRequest.meta.state
});
