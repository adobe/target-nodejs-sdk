/* eslint-disable no-template-curly-in-string */
import {
  DECISIONING_PAYLOAD_AB_MULTI_SIMPLE,
  DECISIONING_PAYLOAD_AB_SIMPLE,
  DECISIONING_PAYLOAD_ADDRESS,
  DECISIONING_PAYLOAD_BROWSER,
  DECISIONING_PAYLOAD_CAMPAIGN_MACROS,
  DECISIONING_PAYLOAD_GEO,
  DECISIONING_PAYLOAD_GLOBAL_MBOX,
  DECISIONING_PAYLOAD_PAGELOAD_VEC_AB,
  DECISIONING_PAYLOAD_PAGELOAD_VEC_XT,
  DECISIONING_PAYLOAD_PARAMS,
  DECISIONING_PAYLOAD_PRIORITIES,
  DECISIONING_PAYLOAD_PROPERTIES,
  DECISIONING_PAYLOAD_TIMEFRAME,
  DECISIONING_PAYLOAD_VIEWS
} from "./decisioning-payloads";

export const TEST_AB_SIMPLE = {
  artifact: DECISIONING_PAYLOAD_AB_SIMPLE,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    ab_execute: {
      input: {
        request: {
          requestId: "request123456",
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
          },
          execute: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 2
              }
            ]
          }
        }
      },
      output: {
        status: 200,
        requestId: "request123456",
        id: {
          tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
          marketingCloudVisitorId: "07327024324407615852294135870030620007"
        },
        client: "someClientId",
        execute: {
          mboxes: [
            {
              index: 2,
              name: "superfluous-mbox",
              options: [
                {
                  type: "json",
                  content: { doMagic: false, importantValue: 75 }
                }
              ]
            }
          ]
        }
      }
    },
    ab_prefetch: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
          },
          prefetch: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 4
              }
            ]
          }
        }
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 4,
              name: "superfluous-mbox",
              options: [
                {
                  type: "json",
                  content: { doMagic: false, importantValue: 75 },
                  eventToken:
                    "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    }
  }
};

export const TEST_MULTIPLE = {
  artifact: DECISIONING_PAYLOAD_AB_MULTI_SIMPLE,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    execute_single_mbox: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
          },
          execute: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 2
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        execute: {
          mboxes: [
            {
              index: 2,
              name: "superfluous-mbox",
              options: [
                {
                  type: "json",
                  content: {
                    doMagic: false,
                    importantValue: 75
                  }
                }
              ]
            }
          ]
        }
      }
    },
    execute_multiple_mbox: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          execute: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 1
              },
              {
                name: "expendable-mbox",
                index: 2
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        execute: {
          mboxes: [
            {
              index: 1,
              name: "superfluous-mbox",
              options: [
                {
                  type: "json",
                  content: {
                    doMagic: false,
                    importantValue: 75
                  }
                }
              ]
            },
            {
              index: 2,
              name: "expendable-mbox",
              options: [
                {
                  type: "html",
                  content: "<div>goodbye</div>"
                }
              ]
            }
          ]
        }
      }
    },
    prefetch_single_mbox: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 2
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 2,
              name: "superfluous-mbox",
              options: [
                {
                  type: "json",
                  content: {
                    doMagic: false,
                    importantValue: 75
                  },
                  eventToken:
                    "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    prefetch_multiple_mbox: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 1
              },
              {
                name: "expendable-mbox",
                index: 2
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "superfluous-mbox",
              options: [
                {
                  type: "json",
                  content: {
                    doMagic: false,
                    importantValue: 75
                  },
                  eventToken:
                    "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            },
            {
              index: 2,
              name: "expendable-mbox",
              options: [
                {
                  type: "html",
                  content: "<div>goodbye</div>",
                  eventToken:
                    "YPoPRnGmGGit+QxnpxYFjZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    }
  }
};

export const TEST_ADDRESS = {
  artifact: DECISIONING_PAYLOAD_ADDRESS,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    request_context: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          execute: {
            mboxes: [
              {
                name: "offer2",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        execute: {
          mboxes: [
            {
              index: 1,
              name: "offer2",
              options: [
                {
                  type: "json",
                  content: {
                    baz: 2
                  }
                }
              ]
            }
          ]
        }
      }
    },
    mbox_context: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://adobe.com"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          execute: {
            mboxes: [
              {
                name: "offer2",
                address: {
                  url: "http://local-target-test:8080/home?bar=true#hello"
                },
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        execute: {
          mboxes: [
            {
              index: 1,
              name: "offer2",
              options: [
                {
                  type: "json",
                  content: {
                    baz: 2
                  }
                }
              ]
            }
          ]
        }
      }
    },
    mbox_context_empty: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://adobe.com"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          execute: {
            mboxes: [
              {
                name: "offer2",
                address: {
                  url: "http://local-target-test"
                },
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        execute: {
          mboxes: [
            {
              index: 1,
              name: "offer2"
            }
          ]
        }
      }
    }
  }
};

export const TEST_BROWSER = {
  artifact: DECISIONING_PAYLOAD_BROWSER,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    chrome: {
      input: {
        request: {
          id: {
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            beacon: false,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
          },
          prefetch: {
            mboxes: [
              {
                name: "browser-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "browser-mbox",
              options: [
                {
                  type: "html",
                  content: "<h1>it's chrome</h1>",
                  eventToken:
                    "B8C2FP2IuBgmeJcDfXHjGpZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    firefox: {
      input: {
        request: {
          id: {
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            beacon: false,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
          },
          prefetch: {
            mboxes: [
              {
                name: "browser-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "browser-mbox",
              options: [
                {
                  type: "html",
                  content: "<h1>it's firefox</h1>",
                  eventToken:
                    "B8C2FP2IuBgmeJcDfXHjGpNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    safari: {
      input: {
        request: {
          id: {
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            beacon: false,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15"
          },
          prefetch: {
            mboxes: [
              {
                name: "browser-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "browser-mbox",
              options: [
                {
                  type: "html",
                  content: "<h1>it's safari</h1>",
                  eventToken:
                    "B8C2FP2IuBgmeJcDfXHjGgreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    explorer: {
      input: {
        request: {
          id: {
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            beacon: false,
            userAgent:
              "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko"
          },
          prefetch: {
            mboxes: [
              {
                name: "browser-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "browser-mbox",
              options: [
                {
                  type: "html",
                  content: "<h1>it's internet explorer</h1>",
                  eventToken:
                    "B8C2FP2IuBgmeJcDfXHjGhB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    }
  }
};

export const TEST_TIMEFRAME = {
  artifact: DECISIONING_PAYLOAD_TIMEFRAME,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    date_range_1: {
      mockDate: {
        year: 2020,
        month: 1,
        date: 27,
        hours: 19,
        human: "Thursday, February 27, 2020 11:00 AM (PST)"
      },
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "daterange-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>date range 1 (feb 27-29)</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7unJlneZxJu5VqGhXCosHhWCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    date_range_2: {
      mockDate: {
        year: 2020,
        month: 2,
        date: 4,
        hours: 19,
        human: "Wednesday, March 4, 2020 11:00 AM (PST)"
      },
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "daterange-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>date range 2 (mar 2 - 6)</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7pNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    friday_in_range: {
      mockDate: {
        year: 2020,
        month: 2,
        date: 6,
        hours: 19,
        human: "Friday, March 6, 2020 11:00 AM (PST)"
      },
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "daterange-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>it's friday</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    friday_out_of_range: {
      mockDate: {
        year: 2020,
        month: 2,
        date: 20,
        hours: 18,
        human: "Friday, March 20, 2020 11:00 AM (PST)"
      },
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "daterange-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>it's friday</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7hB3JWElmEno9qwHyGr0QvSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    criteria_unmet: {
      mockDate: {
        year: 2020,
        month: 4,
        date: 26,
        hours: 18,
        human: "Tuesday, May 26, 2020 11:00 AM (PST)"
      },
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?bar=true#hello"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "daterange-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "daterange-mbox",
              options: [
                {
                  type: "html",
                  content: "<strong>default result</strong>",
                  eventToken:
                    "wQY/V1IOYec8T4fAT5ww7mqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    }
  }
};

export const TEST_PARAMS = {
  artifact: DECISIONING_PAYLOAD_PARAMS,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    mbox_params: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            mobilePlatform: null,
            application: null,
            screen: null,
            window: null,
            browser: null,
            address: {
              url: "http://local-target-test:8080/home?fabulous=true#sosumi",
              referringUrl: null
            },
            geo: null,
            timeOffsetInMinutes: null,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "redundant-mbox",
                parameters: {
                  foo: "bar"
                },
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "redundant-mbox",
              options: [
                {
                  type: "json",
                  content: {
                    foo: "bar",
                    isFooBar: true,
                    experience: "A"
                  },
                  eventToken:
                    "Zhwxeqy1O2r9Ske1YDA9bGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    matching_params_only: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            mobilePlatform: null,
            application: null,
            screen: null,
            window: null,
            browser: null,
            address: {
              url: "http://local-target-test:8080/home?fabulous=true#sosumi",
              referringUrl: null
            },
            geo: null,
            timeOffsetInMinutes: null,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "redundant-mbox",
                parameters: {
                  foo: "cow"
                },
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 1,
              name: "redundant-mbox"
            }
          ]
        }
      }
    }
  }
};

export const TEST_PRIORITY = {
  artifact: DECISIONING_PAYLOAD_PRIORITIES,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    audience_targeting: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0"
          },
          prefetch: {
            mboxes: [
              {
                name: "kitty",
                index: 7
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 7,
              name: "kitty",
              options: [
                {
                  type: "html",
                  content: "<div>kitty high with targeting: Firefox</div>",
                  eventToken:
                    "/DhjxnVDh9heBZ0MrYFLF2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                }
              ]
            }
          ]
        }
      }
    },
    one_mbox: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)"
          },
          prefetch: {
            mboxes: [
              {
                name: "kitty",
                index: 7
              }
            ]
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              index: 7,
              name: "kitty",
              options: [
                {
                  type: "html",
                  content: "<div>kitty high A</div>",
                  eventToken:
                    "ruhwp7VESR7F74TJL2DV5WqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  responseTokens: expect.any(Object)
                }
              ]
            }
          ]
        }
      }
    }
  }
};

export const TEST_MACROS = {
  artifact: DECISIONING_PAYLOAD_CAMPAIGN_MACROS,
  conf: {
    client: "adobesummit2018",
    organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
    pollingInterval: 0
  },
  test: {
    mbox_template: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            mboxes: [
              {
                name: "macros",
                index: 0,
                parameters: {
                  user: "Mickey Mouse",
                  pgname: "blippi",
                  browserWidth: 1024
                }
              }
            ]
          }
        }
      },
      output: {
        prefetch: {
          mboxes: [
            {
              name: "macros",
              options: [
                {
                  type: "html",
                  eventToken:
                    "efH5bqgzESJWpSYmTxCCCGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content:
                    "<ul>\n  <li>667871</li>\n  <li>/campaign_macros/experiences/0/pages/0/zones/0/1599065324791</li>\n  <li>362147</li>\n  <li>campaign macros</li>\n  <li>0</li>\n  <li>Experience A</li>\n  <li>362147</li>\n  <li>campaign macros</li>\n  <li>0</li>\n  <li>Experience A</li>\n  <li>macros</li>\n  <li>Mickey Mouse</li>\n  <li>blippi</li>\n  <li>1024</li>\n</ul>"
                }
              ],
              index: 0
            }
          ]
        }
      }
    },
    no_value_for_template: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            mboxes: [
              {
                name: "macros",
                index: 0,
                parameters: {
                  user: "Donald"
                }
              }
            ]
          }
        }
      },
      output: {
        prefetch: {
          mboxes: [
            {
              name: "macros",
              options: [
                {
                  type: "html",
                  eventToken:
                    "efH5bqgzESJWpSYmTxCCCGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content:
                    "<ul>\n  <li>667871</li>\n  <li>/campaign_macros/experiences/0/pages/0/zones/0/1599065324791</li>\n  <li>362147</li>\n  <li>campaign macros</li>\n  <li>0</li>\n  <li>Experience A</li>\n  <li>362147</li>\n  <li>campaign macros</li>\n  <li>0</li>\n  <li>Experience A</li>\n  <li>macros</li>\n  <li>Donald</li>\n  <li>${mbox.pgname}</li>\n  <li>${mbox.browserWidth}</li>\n</ul>"
                }
              ],
              index: 0
            }
          ]
        }
      }
    },
    pageload_template: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            pageLoad: {
              parameters: {
                user: "Mickey Mouse",
                pgname: "blippi",
                browserWidth: 1024
              }
            }
          }
        }
      },
      output: {
        execute: {
          pageLoad: {
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    content: "362225"
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    content: "macros pageLoad"
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "target-global-mbox"
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello Mickey Mouse"
                  }
                ]
              }
            ]
          }
        }
      }
    },
    view_template: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [{}]
          }
        }
      },
      output: {
        prefetch: {
          views: [
            {
              name: "contact",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "tQFHWnWUwSTiTftbAGXrA2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertBefore",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<div id="action_insert_1599086396006761">campaign macros view</div>'
                    }
                  ]
                }
              ],
              metrics: []
            }
          ]
        }
      }
    }
  }
};

export const TEST_PROPERTIES = {
  artifact: DECISIONING_PAYLOAD_PROPERTIES,
  conf: {
    client: "adobesummit2018",
    organizationId: "65453EA95A70434F0A495D34@AdobeOrg",
    pollingInterval: 0
  },
  test: {
    property_x: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            pageLoad: {}
          },
          property: {
            token: "9a327144-63fe-a7fc-5fdb-515e0c0175a8"
          }
        }
      },
      output: {
        prefetch: {
          pageLoad: {
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Chrometastic</div>"
              },
              {
                type: "json",
                eventToken:
                  "0+xiYgJFaaB6s6ZUF9QhIGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  mbox: "target-global-mbox",
                  experience: "A",
                  fruit: "Apple",
                  property: "property X"
                }
              }
            ]
          }
        }
      }
    },
    property_y: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            pageLoad: {}
          },
          property: {
            token: "e63fc881-65c7-97b4-a16f-f63ce86c0434"
          }
        }
      },
      output: {
        prefetch: {
          pageLoad: {
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Chrometastic</div>"
              },
              {
                type: "json",
                eventToken:
                  "FP4I48cIaitld6Qi9EQI5pNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: {
                  mbox: "target-global-mbox",
                  experience: "B",
                  vegetable: "Brussel Sprouts",
                  property: "property Y"
                }
              }
            ]
          }
        }
      }
    },
    no_property_designation: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            pageLoad: {}
          }
        }
      },
      output: {
        prefetch: {
          pageLoad: {
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Chrometastic</div>"
              }
            ]
          }
        }
      }
    },
    filter_rules: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            pageLoad: {}
          },
          property: {
            token: "token_not_in_a_rule"
          }
        }
      },
      output: {
        prefetch: {
          pageLoad: {
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Chrometastic</div>"
              }
            ]
          }
        }
      }
    }
  }
};

export const TEST_RESPONSE_TOKENS = {
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    execute_mbox: {
      artifact: DECISIONING_PAYLOAD_GEO,
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            geo: {
              city: "SAN FRANCISCO",
              countryCode: "UNITED STATES",
              stateCode: "CALIFORNIA",
              latitude: 37.75,
              longitude: -122.4
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            mboxes: [
              {
                name: "geo",
                index: 1
              }
            ]
          },
          sessionId: "dummy_session"
        }
      },
      output: {
        execute: {
          mboxes: [
            {
              name: "geo",
              options: [
                {
                  type: "json",
                  content: {
                    geo: true,
                    exp: "geo.b"
                  },
                  responseTokens: {
                    "activity.id": 349133,
                    "activity.name": "Greg Geo Test A/B Jun 02 2020, 14:34",
                    "experience.id": 1,
                    "experience.name": "Experience B",
                    "offer.id": 650379,
                    "offer.name":
                      "/greg_geo_test_a_bjun0220201434/experiences/1/pages/0/zones/0/1591133667939",
                    "option.id": 3,
                    "option.name": "Offer3",
                    "activity.decisioningMethod": "on-device",
                    "geo.city": "SAN FRANCISCO",
                    "geo.country": "UNITED STATES",
                    "geo.state": "CALIFORNIA"
                  }
                }
              ],
              index: 1
            }
          ]
        }
      }
    },
    prefetch_mbox: {
      artifact: DECISIONING_PAYLOAD_GEO,
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            geo: {
              city: "SAN FRANCISCO",
              countryCode: "UNITED STATES",
              stateCode: "CALIFORNIA",
              latitude: 37.75,
              longitude: -122.4
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            mboxes: [
              {
                name: "geo",
                index: 1
              }
            ]
          },
          sessionId: "dummy_session"
        }
      },
      output: {
        prefetch: {
          mboxes: [
            {
              name: "geo",
              options: [
                {
                  type: "json",
                  eventToken:
                    "LYJSFrgKxsp5ZlEO5o4jpJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: {
                    geo: true,
                    exp: "geo.b"
                  },
                  responseTokens: {
                    "activity.id": 349133,
                    "activity.name": "Greg Geo Test A/B Jun 02 2020, 14:34",
                    "experience.id": 1,
                    "experience.name": "Experience B",
                    "offer.id": 650379,
                    "offer.name":
                      "/greg_geo_test_a_bjun0220201434/experiences/1/pages/0/zones/0/1591133667939",
                    "option.id": 3,
                    "option.name": "Offer3",
                    "activity.decisioningMethod": "on-device",
                    "geo.city": "SAN FRANCISCO",
                    "geo.country": "UNITED STATES",
                    "geo.state": "CALIFORNIA"
                  }
                }
              ],
              index: 1
            }
          ]
        }
      }
    },
    prefetch_view: {
      artifact: DECISIONING_PAYLOAD_VIEWS,
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [{}]
          }
        }
      },
      output: {
        prefetch: {
          views: [
            {
              name: "contact",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<span id="action_insert_15889715194712006">Please do not contact us.</span>'
                    }
                  ],
                  responseTokens: {
                    "activity.id": 345798,
                    "activity.name": "xt spa add text to contact page",
                    "experience.id": 2,
                    "experience.name": "Experience C",
                    "option.id": 6,
                    "option.name": "Offer6",
                    "activity.decisioningMethod": "on-device"
                  }
                },
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setStyle",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content: {
                        "background-color": "rgba(127,0,0,1)",
                        "priority": "important"
                      }
                    }
                  ],
                  responseTokens: {
                    "activity.id": 345798,
                    "activity.name": "xt spa add text to contact page",
                    "experience.id": 2,
                    "experience.name": "Experience C",
                    "option.id": 7,
                    "option.name": "Offer7",
                    "activity.decisioningMethod": "on-device"
                  }
                }
              ],
              metrics: []
            },
            {
              name: "home",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertBefore",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889690584632570">Experience B</p>'
                    }
                  ],
                  responseTokens: {
                    "activity.id": 345782,
                    "activity.name":
                      "ab spa view change add text with audiences",
                    "experience.id": 1,
                    "experience.name": "Experience B",
                    "option.id": 12,
                    "option.name": "Offer12",
                    "activity.decisioningMethod": "on-device"
                  }
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "NOBODY HOME - exp B"
                    }
                  ],
                  responseTokens: {
                    "activity.id": 345782,
                    "activity.name":
                      "ab spa view change add text with audiences",
                    "experience.id": 1,
                    "experience.name": "Experience B",
                    "option.id": 13,
                    "option.name": "Offer13",
                    "activity.decisioningMethod": "on-device"
                  }
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "Home - Experience A"
                    }
                  ],
                  responseTokens: {
                    "activity.id": 345779,
                    "activity.name":
                      "ab spa view change multiple text no audiences",
                    "experience.id": 0,
                    "experience.name": "Experience A",
                    "option.id": 2,
                    "option.name": "Offer2",
                    "activity.decisioningMethod": "on-device"
                  }
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj2qipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        "experience A! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                    }
                  ],
                  responseTokens: {
                    "activity.id": 345779,
                    "activity.name":
                      "ab spa view change multiple text no audiences",
                    "experience.id": 0,
                    "experience.name": "Experience A",
                    "option.id": 3,
                    "option.name": "Offer3",
                    "activity.decisioningMethod": "on-device"
                  }
                }
              ],
              metrics: [
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                }
              ]
            }
          ]
        }
      }
    }
  }
};

export const TEST_VIEWS = {
  artifact: DECISIONING_PAYLOAD_VIEWS,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    ab_without_audiences: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [{}]
          }
        }
      },
      output: {
        prefetch: {
          views: [
            {
              name: "contact",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<span id="action_insert_15889715194712006">Please do not contact us.</span>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setStyle",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content: {
                        "background-color": "rgba(127,0,0,1)",
                        "priority": "important"
                      }
                    }
                  ]
                }
              ],
              metrics: []
            },
            {
              name: "home",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889689998702412">experience A</p>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "nobody home - exp A"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "Home - Experience B"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        "experience B! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                    }
                  ]
                }
              ],
              metrics: [
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                }
              ]
            }
          ]
        }
      }
    },
    ab_with_audiences: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [
              {
                parameters: {
                  jason: "correct"
                }
              }
            ]
          }
        }
      },
      output: {
        prefetch: {
          views: [
            {
              name: "contact",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertBefore",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<div id="action_insert_15889714592501888">Please call Jason immediately</div>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setStyle",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content: {
                        "background-color": "rgba(255,255,170,1)",
                        "priority": "important"
                      }
                    }
                  ]
                }
              ],
              metrics: []
            },
            {
              name: "home",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889690271122446">jason = correct</p>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "jason home - exp A"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889689998702412">experience A</p>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "nobody home - exp A"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "Home - Experience B"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        "experience B! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                    }
                  ]
                }
              ],
              metrics: [
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                }
              ]
            }
          ]
        }
      }
    },
    xt_muli_param: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [
              {
                parameters: {
                  jason: "correct",
                  greg: "correct"
                }
              }
            ]
          }
        }
      },
      output: {
        prefetch: {
          views: [
            {
              name: "contact",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertBefore",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<div id="action_insert_15889714592501888">Please call Jason immediately</div>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setStyle",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content: {
                        "background-color": "rgba(255,255,170,1)",
                        "priority": "important"
                      }
                    }
                  ]
                }
              ],
              metrics: []
            },
            {
              name: "home",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889690271122446">jason = correct</p>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "jason home - exp A"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889690455422475">greg = correct</p>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "greg home - exp A"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889689998702412">experience A</p>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "nobody home - exp A"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "Home - Experience B"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        "experience B! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                    }
                  ]
                }
              ],
              metrics: [
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                }
              ]
            }
          ]
        }
      }
    },
    xt_single_param: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [
              {
                parameters: {
                  greg: "correct"
                }
              }
            ]
          }
        }
      },
      output: {
        prefetch: {
          views: [
            {
              name: "contact",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertBefore",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<span id="action_insert_15889714897491922">Please email Greg immediately</span>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/JNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setStyle",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content: {
                        "background-color": "rgba(170,255,255,1)",
                        "priority": "important"
                      }
                    }
                  ]
                }
              ],
              metrics: []
            },
            {
              name: "home",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889690455422475">greg = correct</p>'
                    }
                  ],
                  responseTokens: {
                    "activity.id": 345782,
                    "activity.name":
                      "ab spa view change add text with audiences",
                    "experience.id": 0,
                    "experience.name": "Experience A",
                    "option.id": 4,
                    "option.name": "Offer4",
                    "activity.decisioningMethod": "on-device"
                  }
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "greg home - exp A"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889689998702412">experience A</p>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "nobody home - exp A"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "Home - Experience B"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        "experience B! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                    }
                  ]
                }
              ],
              metrics: [
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                }
              ]
            }
          ]
        }
      }
    },
    xt_no_params: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [{}]
          }
        }
      },
      output: {
        prefetch: {
          views: [
            {
              name: "contact",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<span id="action_insert_15889715194712006">Please do not contact us.</span>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "DKyEy8B6J+arIj6GhXNW/AreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setStyle",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content: {
                        "background-color": "rgba(127,0,0,1)",
                        "priority": "important"
                      }
                    }
                  ]
                }
              ],
              metrics: []
            },
            {
              name: "home",
              options: [
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "insertAfter",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        '<p id="action_insert_15889689998702412">experience A</p>'
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "ob3/yMzSVllQx2v2P7122GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "nobody home - exp A"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > H3:nth-of-type(1)",
                      cssSelector: "#spa-content > H3:nth-of-type(1)",
                      content: "Home - Experience B"
                    }
                  ]
                },
                {
                  type: "actions",
                  eventToken:
                    "XQ6HqnRfrxl3ausAjtQJj5NWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: [
                    {
                      type: "setHtml",
                      selector: "#spa-content > P:nth-of-type(1)",
                      cssSelector: "#spa-content > P:nth-of-type(1)",
                      content:
                        "experience B! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus, magna et dignissim ullamcorper, magna ipsum pharetra velit, vel egestas magna leo interdum urna. Etiam purus massa, accumsan in elit sit amet, posuere maximus augue. Donec non velit sit amet ipsum feugiat aliquet id in metus. Integer a auctor nisl. Donec ac lacinia eros. Proin nisl magna, bibendum ut tellus vitae, mattis laoreet lacus. Pellentesque mauris lorem, scelerisque quis nisi ac, vulputate tincidunt est. Maecenas ex justo, ultrices non neque sed, fermentum maximus diam. Vestibulum at facilisis magna. Ut eu tristique lectus. Proin gravida leo eu fermentum ullamcorper. Suspendisse gravida nibh vitae ultricies ultricies. Donec fermentum, metus id tincidunt dapibus, tellus lacus tristique felis, non posuere nibh ligula sed est."
                    }
                  ]
                }
              ],
              metrics: [
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                },
                {
                  eventToken: "it3yBx7+8oZoV0RPEfPNgQ==",
                  selector: "#spa-content > P:nth-of-type(1)",
                  type: "click"
                }
              ]
            }
          ]
        }
      }
    }
  }
};

export const TEST_PAGELOAD_VEC_AB = {
  artifact: DECISIONING_PAYLOAD_PAGELOAD_VEC_AB,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    without_params: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            pageLoad: {}
          }
        }
      },
      output: {
        execute: {
          pageLoad: {
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector:
                      "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887183664846489">experience B</p>'
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "insertAfter",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15882853393943012">Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.</p>'
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setStyle",
                    selector: "#action_insert_15882853393943012",
                    cssSelector: "#action_insert_15882853393943012",
                    content: {
                      "background-color": "rgba(86,255,86,1)",
                      "priority": "important"
                    }
                  }
                ]
              }
            ],
            metrics: [
              {
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                type: "click"
              },
              {
                eventToken: "/GMYvcjhUsR6WVqQElppUw==",
                selector: "#action_insert_15882853393943012",
                type: "click"
              }
            ]
          }
        }
      }
    },
    single_param: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            pageLoad: {
              parameters: {
                jason: "correct"
              }
            }
          }
        }
      },
      output: {
        execute: {
          pageLoad: {
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector:
                      "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887183664846489">experience B</p>'
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "jason is correct"
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "HTML > BODY > UL:nth-of-type(1)",
                    cssSelector: "HTML > BODY > UL:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887181773115309"> jasonnnnnnnn</p>'
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "insertAfter",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15882853393943012">Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.</p>'
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setStyle",
                    selector: "#action_insert_15882853393943012",
                    cssSelector: "#action_insert_15882853393943012",
                    content: {
                      "background-color": "rgba(86,255,86,1)",
                      "priority": "important"
                    }
                  }
                ]
              }
            ],
            metrics: [
              {
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                type: "click"
              },
              {
                eventToken: "/GMYvcjhUsR6WVqQElppUw==",
                selector: "#action_insert_15882853393943012",
                type: "click"
              }
            ]
          }
        }
      }
    },
    multi_param: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            pageLoad: {
              parameters: {
                jason: "correct",
                greg: "correct"
              }
            }
          }
        }
      },
      output: {
        execute: {
          pageLoad: {
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector:
                      "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887183664846489">experience B</p>'
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "greg is correct"
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "HTML > BODY > UL:nth-of-type(1)",
                    cssSelector: "HTML > BODY > UL:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887181614905265"> gregggggg</p>'
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "jason is correct"
                  }
                ],
                responseTokens: {
                  "activity.id": 345139,
                  "activity.name": "ab non-spa local-target-test",
                  "experience.id": 1,
                  "experience.name": "Experience B",
                  "option.id": 9,
                  "option.name": "Offer9",
                  "activity.decisioningMethod": "on-device"
                }
              },
              {
                type: "actions",
                content: [
                  {
                    type: "insertBefore",
                    selector: "HTML > BODY > UL:nth-of-type(1)",
                    cssSelector: "HTML > BODY > UL:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15887181773115309"> jasonnnnnnnn</p>'
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "insertAfter",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content:
                      '<p id="action_insert_15882853393943012">Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.</p>'
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setStyle",
                    selector: "#action_insert_15882853393943012",
                    cssSelector: "#action_insert_15882853393943012",
                    content: {
                      "background-color": "rgba(86,255,86,1)",
                      "priority": "important"
                    }
                  }
                ]
              }
            ],
            metrics: [
              {
                eventToken: "Q9GlxKlDqT/fvIjxW5jUrg==",
                selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
                type: "click"
              },
              {
                eventToken: "/GMYvcjhUsR6WVqQElppUw==",
                selector: "#action_insert_15882853393943012",
                type: "click"
              }
            ]
          }
        }
      }
    }
  }
};

export const TEST_PAGELOAD_VEC_XT = {
  artifact: DECISIONING_PAYLOAD_PAGELOAD_VEC_XT,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    multi_param: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            pageLoad: {
              parameters: {
                jason: "correct",
                greg: "correct"
              }
            }
          }
        }
      },
      output: {
        execute: {
          pageLoad: {
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(1)",
                    content: "greg is correct"
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello greg"
                  }
                ]
              }
            ],
            metrics: [
              {
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                type: "click"
              }
            ]
          }
        }
      }
    },
    single_param: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            pageLoad: {
              parameters: {
                jason: "correct"
              }
            }
          }
        }
      },
      output: {
        execute: {
          pageLoad: {
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello jason"
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(2)",
                    content: "jason is correct"
                  }
                ]
              }
            ],
            metrics: [
              {
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                type: "click"
              }
            ]
          }
        }
      }
    },
    without_params_execute: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            pageLoad: {}
          }
        }
      },
      output: {
        execute: {
          pageLoad: {
            options: [
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello everyone"
                  }
                ]
              },
              {
                type: "actions",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "all visitors"
                  }
                ]
              }
            ],
            metrics: [
              {
                eventToken: "Esqg0GnzqW0Y/GMvVyT7lg==",
                selector: "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                type: "click"
              }
            ]
          }
        }
      }
    },
    without_params_prefetch: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            pageLoad: {}
          }
        }
      },
      output: {
        prefetch: {
          pageLoad: {
            options: [
              {
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              },
              {
                type: "actions",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    cssSelector:
                      "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
                    content: "Hello everyone"
                  }
                ]
              },
              {
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              },
              {
                type: "actions",
                eventToken:
                  "39UdigzDfmb97ogXP1PN6wreqXMfVUcUx0s/BHR5kCKCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: [
                  {
                    type: "setHtml",
                    selector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    cssSelector:
                      "HTML > BODY > UL:nth-of-type(1) > LI:nth-of-type(3)",
                    content: "all visitors"
                  }
                ]
              }
            ]
          }
        }
      }
    }
  }
};

export const TEST_GEO = {
  artifact: DECISIONING_PAYLOAD_GEO,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    geo_context: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            geo: {
              city: "SAN FRANCISCO",
              countryCode: "UNITED STATES",
              stateCode: "CALIFORNIA",
              latitude: 37.75,
              longitude: -122.4
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            mboxes: [
              {
                name: "geo",
                index: 1
              }
            ]
          },
          sessionId: "dummy_session"
        }
      },
      output: {
        execute: {
          mboxes: [
            {
              name: "geo",
              options: [
                {
                  type: "json",
                  content: {
                    geo: true,
                    exp: "geo.b"
                  }
                }
              ],
              index: 1
            }
          ]
        }
      }
    },
    ip_context: {
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            geo: {
              ipAddress: "127.0.0.1"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          execute: {
            mboxes: [
              {
                name: "geo",
                index: 1
              }
            ]
          },
          sessionId: "dummy_session"
        }
      },
      output: {
        execute: {
          mboxes: [
            {
              name: "geo",
              options: [
                {
                  type: "json",
                  content: {
                    geo: true,
                    exp: "geo.b"
                  }
                }
              ],
              index: 1
            }
          ]
        }
      },
      mockGeo: {
        "x-geo-longitude": -122.4,
        "x-geo-latitude": 37.75,
        "x-geo-city": "SAN FRANCISCO",
        "x-geo-region-code": "CA",
        "x-geo-country-code": "US"
      }
    }
  }
};

export const TEST_PAGELOAD = {
  artifact: DECISIONING_PAYLOAD_GLOBAL_MBOX,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    simple_prefetch: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            mobilePlatform: null,
            application: null,
            screen: null,
            window: null,
            browser: null,
            address: {
              url: "http://local-target-test:8080/home?fabulous=true#sosumi",
              referringUrl: null
            },
            geo: null,
            timeOffsetInMinutes: null,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            pageLoad: {}
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        prefetch: {
          pageLoad: {
            options: [
              {
                type: "html",
                eventToken:
                  "9FNM3ikASssS+sVoFXNulJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>Firetime</div>"
              },
              {
                type: "html",
                eventToken:
                  "5C2cbrGD+bQ5qOATNGy1AZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                content: "<div>mouse</div>"
              }
            ]
          }
        }
      }
    },
    simple_execute: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/home?fabulous=true#sosumi"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          execute: {
            pageLoad: {}
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        execute: {
          pageLoad: {
            options: [
              {
                type: "html",
                content: "<div>Firetime</div>"
              },
              {
                type: "html",
                content: "<div>mouse</div>"
              }
            ]
          }
        }
      }
    },
    params_execute: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            mobilePlatform: null,
            application: null,
            screen: null,
            window: null,
            browser: null,
            address: {
              url: "http://local-target-test:8080/home?fabulous=true#sosumi",
              referringUrl: null
            },
            geo: null,
            timeOffsetInMinutes: null,
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
            beacon: false
          },
          execute: {
            pageLoad: {
              parameters: {
                foo: "bar"
              }
            }
          }
        },
        sessionId: "dummy_session"
      },
      output: {
        execute: {
          pageLoad: {
            options: [
              {
                type: "html",
                content: "<div>Chrometastic</div>"
              },
              {
                type: "html",
                content: "<div>foo=bar experience B</div>"
              },
              {
                type: "html",
                content: "<div>mouse</div>"
              }
            ]
          }
        }
      }
    }
  }
};

export const TEST_NOTIFICATIONS = {
  artifact: DECISIONING_PAYLOAD_AB_MULTI_SIMPLE,
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    execute_mbox_single: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          execute: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 2
              }
            ]
          }
        }
      },
      notificationOutput: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          notifications: [
            {
              id: "expect.any(String)",
              impressionId: "expect.any(String)",
              timestamp: 1585098300000,
              type: "display",
              mbox: {
                name: "superfluous-mbox"
              },
              tokens: [
                "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              ]
            }
          ]
        }
      },
      mockDate: {
        year: 2020,
        month: 2,
        date: 25,
        hours: 1,
        minutes: 5
      }
    },
    execute_mbox_multiple: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          execute: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 1
              },
              {
                name: "expendable-mbox",
                index: 2
              }
            ]
          }
        }
      },
      notificationOutput: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          notifications: [
            {
              id: "expect.any(String)",
              impressionId: "expect.any(String)",
              timestamp: 1585098300000,
              type: "display",
              mbox: {
                name: "superfluous-mbox"
              },
              tokens: [
                "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              ]
            },
            {
              id: "expect.any(String)",
              impressionId: "expect.any(String)",
              timestamp: 1585098300000,
              type: "display",
              mbox: {
                name: "expendable-mbox"
              },
              tokens: [
                "YPoPRnGmGGit+QxnpxYFjZNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
              ]
            }
          ]
        }
      },
      mockDate: {
        year: 2020,
        month: 2,
        date: 25,
        hours: 1,
        minutes: 5
      }
    },
    execute_mbox_none_match: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          execute: {
            mboxes: [
              {
                name: "nonexistent-mbox",
                index: 1
              }
            ]
          }
        }
      },
      notificationOutput: null
    },
    prefetch_no_notifications: {
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 2
              }
            ]
          }
        }
      },
      notificationOutput: null
    }
  }
};

export const TEST_TELEMETRY = {
  artifact: DECISIONING_PAYLOAD_AB_MULTI_SIMPLE,
  test: {
    sends_telemetry: {
      conf: {
        client: "someClientId",
        organizationId: "someOrgId",
        pollingInterval: 0
      },
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 2
              }
            ]
          }
        }
      },
      notificationOutput: {
        request: {
          id: "expect.any(Object)",
          context: "expect.any(Object)",
          telemetry: {
            entries: [
              {
                requestId: "expect.any(String)",
                timestamp: "expect.any(Number)",
                execution: "expect.any(Number)",
                features: {
                  decisioningMethod: "on-device"
                }
              }
            ]
          }
        }
      }
    },
    doesnt_send: {
      conf: {
        client: "someClientId",
        organizationId: "someOrgId",
        pollingInterval: 0,
        telemetryEnabled: false
      },
      input: {
        request: {
          id: {
            tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0",
            marketingCloudVisitorId: "07327024324407615852294135870030620007"
          },
          context: {
            channel: "web",
            address: {
              url: "http://local-target-test:8080/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0",
            beacon: false
          },
          prefetch: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 2
              }
            ]
          }
        }
      },
      notificationOutput: null
    }
  }
};

export const TEST_TRACE = {
  conf: {
    client: "someClientId",
    organizationId: "someOrgId",
    pollingInterval: 0
  },
  test: {
    no_trace: {
      artifact: DECISIONING_PAYLOAD_AB_SIMPLE,
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 1
              }
            ]
          }
        }
      },
      output: {
        prefetch: {
          mboxes: [
            {
              name: "superfluous-mbox",
              options: [
                {
                  type: "json",
                  eventToken:
                    "abzfLHwlBDBNtz9ALey2fJNWHtnQtQrJfmRrQugEa2qCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q==",
                  content: {
                    doMagic: false,
                    importantValue: 75
                  },
                  responseTokens: "expect.any(Object)"
                }
              ],
              index: 1
            }
          ]
        }
      }
    },
    mbox_ab_prefetch: {
      artifact: DECISIONING_PAYLOAD_AB_SIMPLE,
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          trace: {},
          prefetch: {
            mboxes: [
              {
                name: "superfluous-mbox",
                index: 1,
                parameters: {
                  foo: "bar"
                }
              }
            ]
          }
        },
        sessionId: "dummy_session",
        locationHint: "28"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              trace: {
                clientCode: "someClientId",
                artifact: "expect.any(Object)",
                profile: {
                  visitorId: {
                    thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
                  }
                },
                request: {
                  sessionId: "dummy_session",
                  pageURL: "http://local-target-test/",
                  host: "local-target-test",
                  mbox: {
                    name: "superfluous-mbox",
                    index: 1,
                    parameters: {
                      foo: "bar"
                    },
                    type: "prefetch"
                  }
                },
                campaigns: [
                  {
                    id: 334411,
                    campaignType: "ab",
                    branchId: 1,
                    offers: [631991],
                    environment: "production"
                  }
                ],
                evaluatedCampaignTargets: [
                  {
                    context: {
                      current_timestamp: "expect.any(Number)",
                      current_time: "expect.any(String)",
                      current_day: "expect.any(Number)",
                      user: {
                        browserType: "chrome",
                        platform: "Mac OS",
                        locale: "en",
                        browserVersion: 80
                      },
                      page: {
                        url: "http://local-target-test/",
                        path: "/",
                        query: "",
                        fragment: "",
                        subdomain: "",
                        domain: "local-target-test",
                        topLevelDomain: "",
                        url_lc: "http://local-target-test/",
                        path_lc: "/",
                        query_lc: "",
                        fragment_lc: "",
                        subdomain_lc: "",
                        domain_lc: "local-target-test",
                        topLevelDomain_lc: ""
                      },
                      referring: {
                        url: "",
                        path: "",
                        query: "",
                        fragment: "",
                        subdomain: "",
                        domain: "",
                        topLevelDomain: "",
                        url_lc: "",
                        path_lc: "",
                        query_lc: "",
                        fragment_lc: "",
                        subdomain_lc: "",
                        domain_lc: "",
                        topLevelDomain_lc: ""
                      },
                      geo: {},
                      mbox: {
                        foo: "bar",
                        foo_lc: "bar"
                      },
                      allocation: 69.09
                    },
                    campaignId: 334411,
                    campaignType: "ab",
                    matchedSegmentIds: [],
                    unmatchedSegmentIds: [],
                    matchedRuleConditions: [
                      {
                        and: [
                          {
                            "<": [
                              50,
                              {
                                var: "allocation"
                              }
                            ]
                          },
                          {
                            ">=": [
                              100,
                              {
                                var: "allocation"
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    unmatchedRuleConditions: [
                      {
                        and: [
                          {
                            "<=": [
                              0,
                              {
                                var: "allocation"
                              }
                            ]
                          },
                          {
                            ">=": [
                              50,
                              {
                                var: "allocation"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    },
    mbox_xt_prefetch: {
      artifact: DECISIONING_PAYLOAD_BROWSER,
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          trace: {},
          prefetch: {
            mboxes: [
              {
                name: "browser-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session",
        locationHint: "28"
      },
      output: {
        prefetch: {
          mboxes: [
            {
              trace: {
                clientCode: "someClientId",
                artifact: "expect.any(Object)",
                profile: {
                  visitorId: {
                    thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
                  }
                },
                request: {
                  sessionId: "dummy_session",
                  pageURL: "http://local-target-test/",
                  host: "local-target-test",
                  mbox: {
                    name: "browser-mbox",
                    index: 1,
                    type: "prefetch"
                  }
                },
                campaigns: [
                  {
                    id: 334845,
                    campaignType: "landing",
                    branchId: 3,
                    offers: [632438],
                    environment: "production"
                  }
                ],
                evaluatedCampaignTargets: [
                  {
                    context: {
                      current_timestamp: "expect.any(Number)",
                      current_time: "expect.any(String)",
                      current_day: "expect.any(Number)",
                      user: {
                        browserType: "chrome",
                        platform: "Mac OS",
                        locale: "en",
                        browserVersion: 80
                      },
                      page: {
                        url: "http://local-target-test/",
                        path: "/",
                        query: "",
                        fragment: "",
                        subdomain: "",
                        domain: "local-target-test",
                        topLevelDomain: "",
                        url_lc: "http://local-target-test/",
                        path_lc: "/",
                        query_lc: "",
                        fragment_lc: "",
                        subdomain_lc: "",
                        domain_lc: "local-target-test",
                        topLevelDomain_lc: ""
                      },
                      referring: {
                        url: "",
                        path: "",
                        query: "",
                        fragment: "",
                        subdomain: "",
                        domain: "",
                        topLevelDomain: "",
                        url_lc: "",
                        path_lc: "",
                        query_lc: "",
                        fragment_lc: "",
                        subdomain_lc: "",
                        domain_lc: "",
                        topLevelDomain_lc: ""
                      },
                      geo: {},
                      mbox: {},
                      allocation: 83.81
                    },
                    campaignId: 334845,
                    campaignType: "landing",
                    matchedSegmentIds: [2170460],
                    unmatchedSegmentIds: [4873452, 4957566],
                    matchedRuleConditions: [
                      {
                        "==": [
                          {
                            var: "user.browserType"
                          },
                          "chrome"
                        ]
                      }
                    ],
                    unmatchedRuleConditions: [
                      {
                        "==": [
                          {
                            var: "user.browserType"
                          },
                          "firefox"
                        ]
                      },
                      {
                        "==": [
                          {
                            var: "user.browserType"
                          },
                          "safari"
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    },
    mbox_xt_execute: {
      artifact: DECISIONING_PAYLOAD_BROWSER,
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          trace: {},
          execute: {
            mboxes: [
              {
                name: "browser-mbox",
                index: 1
              }
            ]
          }
        },
        sessionId: "dummy_session",
        locationHint: "28"
      },
      output: {
        execute: {
          mboxes: [
            {
              trace: {
                clientCode: "someClientId",
                artifact: "expect.any(Object)",
                profile: {
                  visitorId: {
                    thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
                  }
                },
                request: {
                  sessionId: "dummy_session",
                  pageURL: "http://local-target-test/",
                  host: "local-target-test",
                  mbox: {
                    name: "browser-mbox",
                    index: 1,
                    type: "execute"
                  }
                },
                campaigns: [
                  {
                    id: 334845,
                    campaignType: "landing",
                    branchId: 3,
                    offers: [632438],
                    environment: "production",
                    notifications: [
                      {
                        id: "expect.any(String)",
                        impressionId: "expect.any(String)",
                        timestamp: "expect.any(Number)",
                        type: "display",
                        mbox: {
                          name: "browser-mbox"
                        },
                        tokens: [
                          "B8C2FP2IuBgmeJcDfXHjGpZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                        ]
                      }
                    ]
                  }
                ],
                evaluatedCampaignTargets: [
                  {
                    context: {
                      current_timestamp: "expect.any(Number)",
                      current_time: "expect.any(String)",
                      current_day: "expect.any(Number)",
                      user: {
                        browserType: "chrome",
                        platform: "Mac OS",
                        locale: "en",
                        browserVersion: 80
                      },
                      page: {
                        url: "http://local-target-test/",
                        path: "/",
                        query: "",
                        fragment: "",
                        subdomain: "",
                        domain: "local-target-test",
                        topLevelDomain: "",
                        url_lc: "http://local-target-test/",
                        path_lc: "/",
                        query_lc: "",
                        fragment_lc: "",
                        subdomain_lc: "",
                        domain_lc: "local-target-test",
                        topLevelDomain_lc: ""
                      },
                      referring: {
                        url: "",
                        path: "",
                        query: "",
                        fragment: "",
                        subdomain: "",
                        domain: "",
                        topLevelDomain: "",
                        url_lc: "",
                        path_lc: "",
                        query_lc: "",
                        fragment_lc: "",
                        subdomain_lc: "",
                        domain_lc: "",
                        topLevelDomain_lc: ""
                      },
                      geo: {},
                      mbox: {},
                      allocation: 83.81
                    },
                    campaignId: 334845,
                    campaignType: "landing",
                    matchedSegmentIds: [2170460],
                    unmatchedSegmentIds: [4873452, 4957566],
                    matchedRuleConditions: [
                      {
                        "==": [
                          {
                            var: "user.browserType"
                          },
                          "chrome"
                        ]
                      }
                    ],
                    unmatchedRuleConditions: [
                      {
                        "==": [
                          {
                            var: "user.browserType"
                          },
                          "firefox"
                        ]
                      },
                      {
                        "==": [
                          {
                            var: "user.browserType"
                          },
                          "safari"
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    },
    pageload_execute: {
      artifact: DECISIONING_PAYLOAD_GLOBAL_MBOX,
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          trace: {},
          execute: {
            pageLoad: {
              parameters: {
                foo: "bar"
              }
            }
          }
        },
        sessionId: "dummy_session",
        locationHint: "28"
      },
      output: {
        execute: {
          pageLoad: {
            trace: {
              clientCode: "someClientId",
              artifact: "expect.any(Object)",
              profile: {
                visitorId: {
                  thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
                }
              },
              request: {
                sessionId: "dummy_session",
                pageURL: "http://local-target-test/",
                host: "local-target-test",
                mbox: {
                  parameters: {
                    foo: "bar"
                  },
                  name: "target-global-mbox",
                  type: "execute"
                }
              },
              campaigns: [
                {
                  id: 337795,
                  campaignType: "landing",
                  branchId: 0,
                  offers: [635716],
                  environment: "production",
                  notifications: [
                    {
                      id: "expect.any(String)",
                      impressionId: "expect.any(String)",
                      timestamp: "expect.any(Number)",
                      type: "display",
                      mbox: {
                        name: "target-global-mbox"
                      },
                      tokens: [
                        "9FNM3ikASssS+sVoFXNulGqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                      ]
                    }
                  ]
                },
                {
                  id: 337797,
                  campaignType: "ab",
                  branchId: 0,
                  offers: [635719],
                  environment: "production",
                  notifications: [
                    {
                      id: "expect.any(String)",
                      impressionId: "expect.any(String)",
                      timestamp: "expect.any(Number)",
                      type: "display",
                      mbox: {
                        name: "target-global-mbox"
                      },
                      tokens: [
                        "0L1rCkDps3F+UEAm1B9A4GqipfsIHvVzTQxHolz2IpSCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                      ]
                    }
                  ]
                },
                {
                  id: 337888,
                  campaignType: "ab",
                  branchId: 3,
                  offers: [635777],
                  environment: "production",
                  notifications: [
                    {
                      id: "expect.any(String)",
                      impressionId: "expect.any(String)",
                      timestamp: "expect.any(Number)",
                      type: "display",
                      mbox: {
                        name: "target-global-mbox"
                      },
                      tokens: [
                        "5C2cbrGD+bQ5qOATNGy1AZZBXFCzaoRRABbzIA9EnZOCnQ9Y9OaLL2gsdrWQTvE54PwSz67rmXWmSnkXpSSS2Q=="
                      ]
                    }
                  ]
                }
              ],
              evaluatedCampaignTargets: [
                {
                  context: {
                    current_timestamp: "expect.any(Number)",
                    current_time: "expect.any(String)",
                    current_day: "expect.any(Number)",
                    user: {
                      browserType: "chrome",
                      platform: "Mac OS",
                      locale: "en",
                      browserVersion: 80
                    },
                    page: {
                      url: "http://local-target-test/",
                      path: "/",
                      query: "",
                      fragment: "",
                      subdomain: "",
                      domain: "local-target-test",
                      topLevelDomain: "",
                      url_lc: "http://local-target-test/",
                      path_lc: "/",
                      query_lc: "",
                      fragment_lc: "",
                      subdomain_lc: "",
                      domain_lc: "local-target-test",
                      topLevelDomain_lc: ""
                    },
                    referring: {
                      url: "",
                      path: "",
                      query: "",
                      fragment: "",
                      subdomain: "",
                      domain: "",
                      topLevelDomain: "",
                      url_lc: "",
                      path_lc: "",
                      query_lc: "",
                      fragment_lc: "",
                      subdomain_lc: "",
                      domain_lc: "",
                      topLevelDomain_lc: ""
                    },
                    geo: {},
                    mbox: {
                      foo: "bar",
                      foo_lc: "bar"
                    },
                    allocation: 96.13
                  },
                  campaignId: 337795,
                  campaignType: "landing",
                  matchedSegmentIds: [2170460],
                  unmatchedSegmentIds: [],
                  matchedRuleConditions: [
                    {
                      "==": [
                        {
                          var: "user.browserType"
                        },
                        "chrome"
                      ]
                    }
                  ],
                  unmatchedRuleConditions: []
                },
                {
                  context: {
                    current_timestamp: "expect.any(Number)",
                    current_time: "expect.any(String)",
                    current_day: "expect.any(Number)",
                    user: {
                      browserType: "chrome",
                      platform: "Mac OS",
                      locale: "en",
                      browserVersion: 80
                    },
                    page: {
                      url: "http://local-target-test/",
                      path: "/",
                      query: "",
                      fragment: "",
                      subdomain: "",
                      domain: "local-target-test",
                      topLevelDomain: "",
                      url_lc: "http://local-target-test/",
                      path_lc: "/",
                      query_lc: "",
                      fragment_lc: "",
                      subdomain_lc: "",
                      domain_lc: "local-target-test",
                      topLevelDomain_lc: ""
                    },
                    referring: {
                      url: "",
                      path: "",
                      query: "",
                      fragment: "",
                      subdomain: "",
                      domain: "",
                      topLevelDomain: "",
                      url_lc: "",
                      path_lc: "",
                      query_lc: "",
                      fragment_lc: "",
                      subdomain_lc: "",
                      domain_lc: "",
                      topLevelDomain_lc: ""
                    },
                    geo: {},
                    mbox: {
                      foo: "bar",
                      foo_lc: "bar"
                    },
                    allocation: 17.44
                  },
                  campaignId: 337797,
                  campaignType: "ab",
                  matchedSegmentIds: [5272024],
                  unmatchedSegmentIds: [],
                  matchedRuleConditions: [
                    {
                      and: [
                        {
                          and: [
                            {
                              "<=": [
                                0,
                                {
                                  var: "allocation"
                                }
                              ]
                            },
                            {
                              ">=": [
                                34,
                                {
                                  var: "allocation"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "==": [
                            "bar",
                            {
                              var: "mbox.foo"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  unmatchedRuleConditions: []
                },
                {
                  context: {
                    current_timestamp: "expect.any(Number)",
                    current_time: "expect.any(String)",
                    current_day: "expect.any(Number)",
                    user: {
                      browserType: "chrome",
                      platform: "Mac OS",
                      locale: "en",
                      browserVersion: 80
                    },
                    page: {
                      url: "http://local-target-test/",
                      path: "/",
                      query: "",
                      fragment: "",
                      subdomain: "",
                      domain: "local-target-test",
                      topLevelDomain: "",
                      url_lc: "http://local-target-test/",
                      path_lc: "/",
                      query_lc: "",
                      fragment_lc: "",
                      subdomain_lc: "",
                      domain_lc: "local-target-test",
                      topLevelDomain_lc: ""
                    },
                    referring: {
                      url: "",
                      path: "",
                      query: "",
                      fragment: "",
                      subdomain: "",
                      domain: "",
                      topLevelDomain: "",
                      url_lc: "",
                      path_lc: "",
                      query_lc: "",
                      fragment_lc: "",
                      subdomain_lc: "",
                      domain_lc: "",
                      topLevelDomain_lc: ""
                    },
                    geo: {},
                    mbox: {
                      foo: "bar",
                      foo_lc: "bar"
                    },
                    allocation: 90.69
                  },
                  campaignId: 337888,
                  campaignType: "ab",
                  matchedSegmentIds: [],
                  unmatchedSegmentIds: [],
                  matchedRuleConditions: [
                    {
                      and: [
                        {
                          "<": [
                            75,
                            {
                              var: "allocation"
                            }
                          ]
                        },
                        {
                          ">=": [
                            100,
                            {
                              var: "allocation"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  unmatchedRuleConditions: [
                    {
                      and: [
                        {
                          "<=": [
                            0,
                            {
                              var: "allocation"
                            }
                          ]
                        },
                        {
                          ">=": [
                            25,
                            {
                              var: "allocation"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      and: [
                        {
                          "<": [
                            25,
                            {
                              var: "allocation"
                            }
                          ]
                        },
                        {
                          ">=": [
                            50,
                            {
                              var: "allocation"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      and: [
                        {
                          "<": [
                            50,
                            {
                              var: "allocation"
                            }
                          ]
                        },
                        {
                          ">=": [
                            75,
                            {
                              var: "allocation"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    },
    views_prefetch_none: {
      artifact: DECISIONING_PAYLOAD_VIEWS,
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [
              {
                name: "contact"
              }
            ]
          }
        }
      },
      output: {
        prefetch: {
          views: [
            {
              name: "contact",
              options: ["expect.any(Object)", "expect.any(Object)"],
              metrics: []
            }
          ]
        }
      }
    },
    views_prefetch: {
      artifact: DECISIONING_PAYLOAD_VIEWS,
      input: {
        request: {
          id: {
            thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
          },
          context: {
            channel: "web",
            browser: {
              host: "local-target-test"
            },
            address: {
              url: "http://local-target-test/"
            },
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
          },
          prefetch: {
            views: [
              {
                name: "contact",
                parameters: {
                  jason: "correct"
                }
              }
            ]
          },
          trace: {}
        }
      },
      output: {
        prefetch: {
          views: [
            {
              trace: {
                clientCode: "someClientId",
                artifact: "expect.any(Object)",
                profile: {
                  visitorId: {
                    thirdPartyId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
                  }
                },
                request: {
                  pageURL: "http://local-target-test/",
                  host: "local-target-test",
                  view: {
                    name: "contact",
                    parameters: {
                      jason: "correct"
                    },
                    type: "prefetch"
                  }
                },
                campaigns: [
                  {
                    id: 345798,
                    campaignType: "landing",
                    branchId: 0,
                    offers: [],
                    environment: "production"
                  }
                ],
                evaluatedCampaignTargets: [
                  {
                    context: {
                      current_timestamp: "expect.any(Number)",
                      current_time: "expect.any(String)",
                      current_day: "expect.any(Number)",
                      user: {
                        browserType: "chrome",
                        platform: "Mac OS",
                        locale: "en",
                        browserVersion: 80
                      },
                      page: {
                        url: "http://local-target-test/",
                        path: "/",
                        query: "",
                        fragment: "",
                        subdomain: "",
                        domain: "local-target-test",
                        topLevelDomain: "",
                        url_lc: "http://local-target-test/",
                        path_lc: "/",
                        query_lc: "",
                        fragment_lc: "",
                        subdomain_lc: "",
                        domain_lc: "local-target-test",
                        topLevelDomain_lc: ""
                      },
                      referring: {
                        url: "",
                        path: "",
                        query: "",
                        fragment: "",
                        subdomain: "",
                        domain: "",
                        topLevelDomain: "",
                        url_lc: "",
                        path_lc: "",
                        query_lc: "",
                        fragment_lc: "",
                        subdomain_lc: "",
                        domain_lc: "",
                        topLevelDomain_lc: ""
                      },
                      geo: {},
                      mbox: {
                        jason: "correct",
                        jason_lc: "correct"
                      },
                      allocation: 71.87
                    },
                    campaignId: 345798,
                    campaignType: "landing",
                    matchedSegmentIds: [5634562, 5653736],
                    unmatchedSegmentIds: [],
                    matchedRuleConditions: [
                      {
                        and: [
                          {
                            "==": [
                              "correct",
                              {
                                var: "mbox.jason"
                              }
                            ]
                          },
                          {
                            and: [
                              {
                                "==": [
                                  "local-target-test",
                                  {
                                    var: "page.domain"
                                  }
                                ]
                              },
                              {
                                "==": [
                                  "/",
                                  {
                                    var: "page.path"
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    unmatchedRuleConditions: []
                  }
                ]
              }
            }
          ]
        }
      }
    }
  }
};
