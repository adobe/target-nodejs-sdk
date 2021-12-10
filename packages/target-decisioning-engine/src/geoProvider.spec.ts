import { enableFetchMocks, MockResponseInit } from "jest-fetch-mock";
enableFetchMocks();
import fetchMock from "jest-fetch-mock";
import { UNKNOWN_IP_ADDRESS } from "@adobe/target-tools";
import {
  createGeoObjectFromHeaders,
  createGeoObjectFromPayload,
  GeoProvider
} from "./geoProvider";
import { HTTP_HEADER_FORWARDED_FOR } from "./constants";

const ARTIFACT_BLANK = require("../test/schema/artifacts/TEST_ARTIFACT_BLANK.json");

describe("geoProvider", () => {
  const headers = {
    "x-geo-latitude": 37.773972,
    "x-geo-longitude": -122.431297,
    "x-geo-country-code": "US",
    "x-geo-region-code": "CA",
    "x-geo-city": "SANFRANCISCO"
  };

  it("creates geo context from response headers", () => {
    expect(
      createGeoObjectFromHeaders({
        get: key => headers[key]
      })
    ).toEqual({
      latitude: 37.773972,
      longitude: -122.431297,
      city: "SANFRANCISCO",
      countryCode: "US",
      stateCode: "CA"
    });
  });

  it("creates geo context from response payload", () => {
    expect(createGeoObjectFromPayload(headers)).toEqual({
      latitude: 37.773972,
      longitude: -122.431297,
      city: "SANFRANCISCO",
      countryCode: "US",
      stateCode: "CA"
    });
  });

  describe("validGeoRequestContext", () => {
    const geoValues: HeadersInit = {
      "x-geo-longitude": "-122.4",
      "x-geo-latitude": "37.75",
      "x-geo-city": "SAN FRANCISCO",
      "x-geo-region-code": "CA",
      "x-geo-country-code": "US"
    };

    beforeEach(() => {
      fetchMock.resetMocks();

      fetchMock.mockResponse(JSON.stringify(geoValues), {
        headers: geoValues
      });
    });

    it("does not make a request for geo details if geoTargetingEnabled is false", async () => {
      const validGeoRequestContext = GeoProvider(
        {},
        {
          ...ARTIFACT_BLANK,
          geoTargetingEnabled: false
        }
      );

      const geo = await validGeoRequestContext({ ipAddress: "12.21.1.40" });

      expect(fetchMock.mock.calls.length).toEqual(0);

      expect(geo).toEqual({
        ipAddress: "12.21.1.40"
      });
    });

    it("makes a request for geo details if a valid ip address is provided", async () => {
      const validGeoRequestContext = GeoProvider(
        {},
        {
          ...ARTIFACT_BLANK,
          geoTargetingEnabled: true
        }
      );

      const geo = await validGeoRequestContext({ ipAddress: "12.21.1.40" });

      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        "https://assets.adobetarget.com/v1/geo"
      );
      expect(
        fetchMock.mock.calls[0][1].headers[HTTP_HEADER_FORWARDED_FOR]
      ).toEqual("12.21.1.40");

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
      const validGeoRequestContext = GeoProvider(
        {},
        {
          ...ARTIFACT_BLANK,
          geoTargetingEnabled: true
        }
      );

      const geo = await validGeoRequestContext({
        ipAddress: UNKNOWN_IP_ADDRESS
      });

      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        "https://assets.adobetarget.com/v1/geo"
      );
      expect(
        fetchMock.mock.calls[0][1].headers[HTTP_HEADER_FORWARDED_FOR]
      ).toBeUndefined();

      expect(geo).toEqual({
        city: "SAN FRANCISCO",
        countryCode: "US",
        latitude: 37.75,
        longitude: -122.4,
        stateCode: "CA"
      });
    });

    it("will not make a request for geo details geo details besides ipAddress are specified", async () => {
      const validGeoRequestContext = GeoProvider(
        {},
        {
          ...ARTIFACT_BLANK,
          geoTargetingEnabled: true
        }
      );

      const geo = await validGeoRequestContext({
        ipAddress: UNKNOWN_IP_ADDRESS,
        city: "Reno"
      });

      expect(fetchMock.mock.calls.length).toEqual(0);

      expect(geo).toEqual({
        city: "Reno"
      });
    });

    it("gets geo details from payload if necessary (ie11 support)", async () => {
      fetchMock.resetMocks();

      // response with missing headers to simulate ie11 being unable to read them
      fetchMock.mockResponse(JSON.stringify(geoValues), {
        headers: {}
      });

      const validGeoRequestContext = GeoProvider(
        {},
        {
          ...ARTIFACT_BLANK,
          geoTargetingEnabled: true
        }
      );

      const geo = await validGeoRequestContext({ ipAddress: "12.21.1.40" });

      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        "https://assets.adobetarget.com/v1/geo"
      );
      expect(
        fetchMock.mock.calls[0][1].headers[HTTP_HEADER_FORWARDED_FOR]
      ).toEqual("12.21.1.40");

      expect(geo).toEqual({
        city: "SAN FRANCISCO",
        countryCode: "US",
        ipAddress: "12.21.1.40",
        latitude: 37.75,
        longitude: -122.4,
        stateCode: "CA"
      });
    });
  });
});
