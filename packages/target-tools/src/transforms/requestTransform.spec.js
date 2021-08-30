const { targetDeliveryToAepEdgeRequest } = require("./requestTransform");

describe("targetDeliveryToAepEdgeRequest", () => {
  it("has top level Ids and request headers", () => {
    expect(
      targetDeliveryToAepEdgeRequest(
        "123",
        "abc",
        {
          requestId: "requestId123"
        },
        "1",
        "edgeConfigId123"
      )
    ).toMatchObject({
      requestId: "requestId123",
      configId: "edgeConfigId123"
    });
  });

  it("has trace", () => {
    expect(
      targetDeliveryToAepEdgeRequest(
        "123",
        "abc",
        {
          trace: {
            authorizationToken: "trace-token-ftw"
          }
        },
        "1",
        "edgeConfigId123"
      )
    ).toMatchObject({
      xAdobeTargetTraceToken: "trace-token-ftw"
    });
  });

  it("translates Identities", () => {
    expect(
      targetDeliveryToAepEdgeRequest(
        "123",
        "abc",
        {
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
        },
        "1",
        "edgeConfigId123"
      )
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
      targetDeliveryToAepEdgeRequest(
        "123",
        "abc",
        {
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
              url: "https://apple.com",
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
        },
        "1",
        "edgeConfigId123"
      )
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
              url: "https://apple.com"
            },
            webReferrer: {
              url: "https://microsoft.com"
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
        targetDeliveryToAepEdgeRequest(
          "123",
          "abc",
          {
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
          },
          "1",
          "edgeConfigId123"
        )
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
        targetDeliveryToAepEdgeRequest(
          "123",
          "abc",
          {
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
          },
          "1",
          "edgeConfigId123"
        )
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
        targetDeliveryToAepEdgeRequest(
          "123",
          "abc",
          {
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
          },
          "1",
          "edgeConfigId123"
        )
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
  });

  // prefetch

  // translates cookies to edgeRequest.meta.state
});
