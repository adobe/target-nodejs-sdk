import { createGeoObject } from "./geoProvider";

describe("geoProvider", () => {
  it("creates geo context from response", () => {
    const headers = {
      "X-GEO-Latitude": 37.773972,
      "X-GEO-Longitude": -122.431297,
      "X-GEO-Country-Code": "US",
      "X-GEO-Region-Code": "CA",
      "X-GEO-City": "SANFRANCISCO"
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
});
