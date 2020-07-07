import {
  getFetchApi,
  isDefined,
  isUndefined,
  isValidIpAddress,
  noop,
  UNKNOWN_IP_ADDRESS
} from "@adobe/target-tools";
import { GEO_LOCATION_UPDATED } from "./events";
import { getGeoLookupPath } from "./utils";

/**
 * @param { Response } fetchResponse;
 * @return { import("@adobe/target-tools/delivery-api-client/models/Geo").Geo }
 */
export function createGeoObject(fetchResponse) {
  const geoObject = {};

  const ipAddress = fetchResponse.headers.get("X-Forwarded-For");
  if (ipAddress != null && isDefined(ipAddress)) {
    geoObject.ipAddress = ipAddress;
  }
  const latitude = fetchResponse.headers.get("X-GEO-Latitude");
  if (latitude != null && isDefined(latitude)) {
    geoObject.latitude = parseFloat(latitude);
  }
  const longitude = fetchResponse.headers.get("X-GEO-Longitude");
  if (longitude != null && isDefined(longitude)) {
    geoObject.longitude = parseFloat(longitude);
  }
  const countryCode = fetchResponse.headers.get("X-GEO-Country-Code");
  if (countryCode != null && isDefined(countryCode)) {
    geoObject.countryCode = countryCode;
  }
  const stateCode = fetchResponse.headers.get("X-GEO-Region-Code");
  if (stateCode != null && isDefined(stateCode)) {
    geoObject.stateCode = stateCode;
  }
  const city = fetchResponse.headers.get("X-GEO-City");
  if (city != null && isDefined(city)) {
    geoObject.city = city;
  }
  return geoObject;
}

/**
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config
 * @param { import("../types/DecisioningArtifact").DecisioningArtifact } artifact
 */
export function GeoProvider(config, artifact) {
  const fetchApi = getFetchApi(config.fetchApi);
  const { geoTargetingEnabled = false } = artifact;
  const { eventEmitter = noop } = config;

  /**
   * @param {import("@adobe/target-tools/delivery-api-client/models/Geo").Geo} geoRequestContext
   * @return { import("@adobe/target-tools/delivery-api-client/models/Geo").Geo }
   */
  async function validGeoRequestContext(geoRequestContext = {}) {
    // When ipAddress is the only geo value passed in to getOffers(), do IP-to-Geo lookup.
    const geoLookupPath = getGeoLookupPath(config);

    if (
      geoTargetingEnabled &&
      (geoRequestContext.ipAddress === UNKNOWN_IP_ADDRESS ||
        isValidIpAddress(geoRequestContext.ipAddress)) &&
      isUndefined(geoRequestContext.latitude) &&
      isUndefined(geoRequestContext.longitude) &&
      isUndefined(geoRequestContext.countryCode) &&
      isUndefined(geoRequestContext.stateCode) &&
      isUndefined(geoRequestContext.city)
    ) {
      const ipToGeoLookupResponse = await fetchApi(geoLookupPath, {
        headers: {
          "X-Forwarded-For": geoRequestContext.ipAddress
        }
      });
      const geoResponseHeaders = createGeoObject(ipToGeoLookupResponse);
      Object.assign(geoRequestContext, geoResponseHeaders);

      eventEmitter(GEO_LOCATION_UPDATED, { geoContext: geoRequestContext });
    }

    return geoRequestContext;
  }
  return {
    validGeoRequestContext
  };
}
