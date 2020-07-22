import { UNKNOWN_IP_ADDRESS } from "@adobe/target-tools";
import { createGeoObject, GeoProvider } from "./geoProvider";
import { DUMMY_ARTIFACT_PAYLOAD } from "../test/decisioning-payloads";
import { HTTP_HEADER_FORWARDED_FOR } from "./constants";

require("jest-fetch-mock").enableMocks();

describe("geoProvider", () => {
  it("creates geo context from response", () => {
    const headers = {
      "x-geo-latitude": 37.773972,
      "x-geo-longitude": -122.431297,
      "x-geo-country-code": "US",
      "x-geo-region-code": "CA",
      "x-geo-city": "SANFRANCISCO"
    };
    expect(
      createGeoObject({
        headers: {
          get: key => headers[key]
        }
      })
    ).toEqual({
      latitude: 37.773972,
      longitude: -122.431297,
      city: "SANFRANCISCO",
      countryCode: "US",
      stateCode: "CA"
    });
  });

  describe("validGeoRequestContext", () => {
    beforeEach(() => {
      fetch.resetMocks();

      fetch.mockResponse(JSON.stringify({ status: "OK" }), {
        headers: {
          "X-GEO-Longitude": -122.4,
          "X-GEO-Latitude": 37.75,
          "X-GEO-City": "SAN FRANCISCO",
          "X-GEO-Region-Code": "CA",
          "X-GEO-Country-Code": "US"
        }
      });
    });

    it("does not make a request for geo details if geoTargetingEnabled is false", async () => {
      const { validGeoRequestContext } = GeoProvider(
        {},
        {
          ...DUMMY_ARTIFACT_PAYLOAD,
          geoTargetingEnabled: false
        }
      );

      const geo = await validGeoRequestContext({ ipAddress: "12.21.1.40" });

      expect(fetch.mock.calls.length).toEqual(0);

      expect(geo).toEqual({
        ipAddress: "12.21.1.40"
      });
    });

    it("makes a request for geo details if a valid ip address is provided", async () => {
      const { validGeoRequestContext } = GeoProvider(
        {},
        {
          ...DUMMY_ARTIFACT_PAYLOAD,
          geoTargetingEnabled: true
        }
      );

      const geo = await validGeoRequestContext({ ipAddress: "12.21.1.40" });

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        "https://assets.adobetarget.com/v1/geo"
      );
      expect(fetch.mock.calls[0][1].headers[HTTP_HEADER_FORWARDED_FOR]).toEqual(
        "12.21.1.40"
      );

      expect(geo).toEqual({
        city: "SAN FRANCISCO",
        countryCode: "US",
        ipAddress: "12.21.1.40",
        latitude: 37.75,
        longitude: -122.4,
        stateCode: "CA"
      });
    });

    it('makes a request for geo details if "unknownIpAddress" is provided', async () => {
      const { validGeoRequestContext } = GeoProvider(
        {},
        {
          ...DUMMY_ARTIFACT_PAYLOAD,
          geoTargetingEnabled: true
        }
      );

      const geo = await validGeoRequestContext({
        ipAddress: UNKNOWN_IP_ADDRESS
      });

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        "https://assets.adobetarget.com/v1/geo"
      );
      expect(
        fetch.mock.calls[0][1].headers[HTTP_HEADER_FORWARDED_FOR]
      ).toBeUndefined();

      expect(geo).toEqual({
        city: "SAN FRANCISCO",
        countryCode: "US",
        ipAddress: UNKNOWN_IP_ADDRESS,
        latitude: 37.75,
        longitude: -122.4,
        stateCode: "CA"
      });
    });

    it("will not make a request for geo details geo details besides ipAddress are specified", async () => {
      const { validGeoRequestContext } = GeoProvider(
        {},
        {
          ...DUMMY_ARTIFACT_PAYLOAD,
          geoTargetingEnabled: true
        }
      );

      const geo = await validGeoRequestContext({
        ipAddress: UNKNOWN_IP_ADDRESS,
        city: "Reno"
      });

      expect(fetch.mock.calls.length).toEqual(0);

      expect(geo).toEqual({
        ipAddress: UNKNOWN_IP_ADDRESS,
        city: "Reno"
      });
    });
  });
});
