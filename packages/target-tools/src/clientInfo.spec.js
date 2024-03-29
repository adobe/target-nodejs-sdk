import {
  browserFromClientHintsUA,
  browserFromUserAgent,
  browserFromUserAgentOrClientHintUA,
  deviceTypeFromUserAgent,
  operatingSystemFromUserAgent,
  operatingSystemFromUserAgentOrClientHints
} from "./clientInfo";

describe("clientInfo", () => {
  const IE11_WIN =
    "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko";

  const IE11_COMPAT_WIN =
    "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/8.0; .NET4.0C; .NET4.0E)";

  const FIREFOX_MAC =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0";

  const SAFARI_MAC =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15";

  const SAFARI_MOBILE =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1";

  const CHROME_MAC =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

  const EDGE_WIN =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 Edg/83.0.478.61";

  const ANDROID =
    "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

  const IPOD =
    "Mozilla/5.0 (iPod touch; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B554a Safari/9537.53";

  const IPAD =
    "Mozilla/5.0 (iPad; U; CPU OS 11_2 like Mac OS X; zh-CN; iPad5,3) AppleWebKit/534.46 (KHTML, like Gecko) UCBrowser/3.0.1.776 U3/ Mobile/10A403 Safari/7543.48.3";

  // These reduced user agent strings were taken from the examples on the chromium documentation about client hints here:
  // https://www.chromium.org/updates/ua-reduction/#sample-ua-strings-final-reduced-state
  const REDUCED_DESKTOP_WINDOWS =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36";

  const REDUCED_MOBILE_ANDROID =
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36";

  const REDUCED_TABLET_ANDROID =
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36";

  describe("browserFromUserAgent", () => {
    it("unknown", () => {
      expect(browserFromUserAgent()).toEqual({
        name: "unknown",
        version: -1
      });

      expect(browserFromUserAgent("oh hai")).toEqual({
        name: "unknown",
        version: -1
      });
    });

    it("ie", () => {
      expect(browserFromUserAgent(IE11_WIN)).toEqual({
        name: "IE",
        version: 11
      });
      expect(browserFromUserAgent(IE11_COMPAT_WIN)).toEqual({
        name: "IE",
        version: 7
      });
    });

    it("Firefox", () => {
      expect(browserFromUserAgent(FIREFOX_MAC)).toEqual({
        name: "Firefox",
        version: 78
      });
    });

    it("Safari", () => {
      expect(browserFromUserAgent(SAFARI_MAC)).toEqual({
        name: "Safari",
        version: 13
      });
    });

    it("Safari Mobile", () => {
      expect(browserFromUserAgent(SAFARI_MOBILE)).toEqual({
        name: "Mobile Safari",
        version: 13
      });
    });

    it("Chrome", () => {
      expect(browserFromUserAgent(CHROME_MAC)).toEqual({
        name: "Chrome",
        version: 83
      });
    });

    it("EDGE", () => {
      expect(browserFromUserAgent(EDGE_WIN)).toEqual({
        name: "Edge",
        version: 83
      });
    });

    it("handles reduced user agent strings", () => {
      expect(browserFromUserAgent(REDUCED_DESKTOP_WINDOWS)).toEqual({
        name: "Chrome",
        version: 93
      });
      expect(browserFromUserAgent(REDUCED_MOBILE_ANDROID)).toEqual({
        name: "Chrome",
        version: 93
      });
      expect(browserFromUserAgent(REDUCED_TABLET_ANDROID)).toEqual({
        name: "Chrome",
        version: 93
      });
    });
  });

  describe("browserFromClientHintsUA", () => {
    it("unknown", () => {
      expect(browserFromClientHintsUA()).toEqual({
        name: "unknown",
        version: -1
      });

      expect(browserFromClientHintsUA("oh hai")).toEqual({
        name: "unknown",
        version: -1
      });
    });

    it("Chrome major version", () => {
      expect(
        browserFromClientHintsUA(
          '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"'
        )
      ).toEqual({
        name: "Chrome",
        version: 99
      });
    });
    it("Edge major version", () => {
      expect(
        browserFromClientHintsUA(
          '" Not A;Brand";v="99.0.0.0", "Chromium";v="99.0.1150.46", "Microsoft Edge";v="102.0.1150.46"'
        )
      ).toEqual({
        name: "Edge",
        version: 102
      });
    });

    it("Chrome full version", () => {
      expect(
        browserFromClientHintsUA(
          '" Not A;Brand";v="99.0.0.0", "Chromium";v="99.0.4844.83", "Google Chrome";v="99.0.4844.83"'
        )
      ).toEqual({
        name: "Chrome",
        version: 99
      });
    });
  });

  describe("browserFromUserAgentOrClientHintUA", () => {
    it("uses client hints in absense of userAgent", () => {
      expect(
        browserFromUserAgentOrClientHintUA("", {
          browserUAWithFullVersion:
            '" Not A;Brand";v="99.0.0.0", "Chromium";v="99.0.4844.83", "Google Chrome";v="99.0.4844.83"'
        })
      ).toEqual({
        name: "Chrome",
        version: 99
      });
    });

    it("uses userAgent in absense of client hints", () => {
      expect(browserFromUserAgentOrClientHintUA(CHROME_MAC)).toEqual({
        name: "Chrome",
        version: 83
      });
    });

    it("client hints take precedent over userAgent", () => {
      expect(
        browserFromUserAgentOrClientHintUA(FIREFOX_MAC, {
          browserUAWithMajorVersion:
            '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"'
        })
      ).toEqual({
        name: "Chrome",
        version: 99
      });
    });
  });

  describe("operatingSystemFromUserAgent", () => {
    it("macOS", () => {
      expect(operatingSystemFromUserAgent(CHROME_MAC)).toEqual("Mac OS");
    });

    it("windows", () => {
      expect(operatingSystemFromUserAgent(IE11_WIN)).toEqual("Windows");
      expect(operatingSystemFromUserAgent(IE11_COMPAT_WIN)).toEqual("Windows");
    });

    it("iOS", () => {
      expect(operatingSystemFromUserAgent(SAFARI_MOBILE)).toEqual("iOS");
    });

    it("Android", () => {
      expect(operatingSystemFromUserAgent(ANDROID)).toEqual("Android");
    });

    it("iPod", () => {
      expect(operatingSystemFromUserAgent(IPOD)).toEqual("iOS");
    });

    it("iPad", () => {
      expect(operatingSystemFromUserAgent(IPAD)).toEqual("iOS");
    });

    it("handles reduced user agent strings", () => {
      expect(operatingSystemFromUserAgent(REDUCED_DESKTOP_WINDOWS)).toEqual(
        "Windows"
      );
      expect(operatingSystemFromUserAgent(REDUCED_MOBILE_ANDROID)).toEqual(
        "Android"
      );
      expect(operatingSystemFromUserAgent(REDUCED_TABLET_ANDROID)).toEqual(
        "Android"
      );
    });
  });

  describe("operatingSystemFromUserAgentOrClientHints", () => {
    it("reads from user agent", () => {
      expect(operatingSystemFromUserAgentOrClientHints(EDGE_WIN)).toEqual(
        "Windows"
      );
    });
    it("reads from client hints", () => {
      expect(
        operatingSystemFromUserAgentOrClientHints("", { platform: "macOS" })
      ).toEqual("macOS");
    });
    it("prefers client hints over user agent", () => {
      expect(
        operatingSystemFromUserAgentOrClientHints(EDGE_WIN, {
          platform: "macOS"
        })
      ).toEqual("macOS");
    });
  });

  describe("deviceTypeFromUserAgent", () => {
    it("iPhone", () => {
      expect(deviceTypeFromUserAgent(SAFARI_MOBILE)).toEqual("iPhone");
    });

    it("Desktop", () => {
      expect(deviceTypeFromUserAgent(IE11_WIN)).toEqual("Desktop");
      expect(deviceTypeFromUserAgent(CHROME_MAC)).toEqual("Desktop");
      expect(deviceTypeFromUserAgent(FIREFOX_MAC)).toEqual("Desktop");
      expect(deviceTypeFromUserAgent(SAFARI_MAC)).toEqual("Desktop");
      expect(deviceTypeFromUserAgent(EDGE_WIN)).toEqual("Desktop");
      expect(deviceTypeFromUserAgent(REDUCED_DESKTOP_WINDOWS)).toEqual(
        "Desktop"
      );
    });

    it("iPod", () => {
      expect(deviceTypeFromUserAgent(IPOD)).toEqual("iPod");
    });

    it("iPad", () => {
      expect(deviceTypeFromUserAgent(IPAD)).toEqual("iPad");
    });

    it("Android", () => {
      expect(deviceTypeFromUserAgent(REDUCED_MOBILE_ANDROID)).toEqual(
        "Android"
      );
      expect(deviceTypeFromUserAgent(REDUCED_TABLET_ANDROID)).toEqual(
        "Android"
      );
    });
  });
});
