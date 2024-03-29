import {
  getFetchApi,
  isDefined,
  isUndefined,
  isValidIpAddress,
  noop,
  assign,
  UNKNOWN_IP_ADDRESS
} from "@adobe/target-tools";
import { GEO_LOCATION_UPDATED } from "./events";
import {
  CDN_BASE_PATH,
  HTTP_HEADER_FORWARDED_FOR,
  HTTP_HEADER_GEO_CITY,
  HTTP_HEADER_GEO_COUNTRY,
  HTTP_HEADER_GEO_LATITUDE,
  HTTP_HEADER_GEO_LONGITUDE,
  HTTP_HEADER_GEO_REGION,
  SUPPORTED_ARTIFACT_MAJOR_VERSION
} from "./constants";

// When ipAddress is the only geo value passed in to getOffers(), do IP-to-Geo lookup.
const GEO_LOOKUP_URL = `https://${CDN_BASE_PATH}/v${SUPPORTED_ARTIFACT_MAJOR_VERSION}/geo`;

const GEO_MAPPINGS = [
  {
    headerName: HTTP_HEADER_FORWARDED_FOR,
    parseValue: value => value,
    valueKey: "ipAddress"
  },
  {
    headerName: HTTP_HEADER_GEO_LATITUDE,
    parseValue: value => parseFloat(value),
    valueKey: "latitude"
  },
  {
    headerName: HTTP_HEADER_GEO_LONGITUDE,
    parseValue: value => parseFloat(value),
    valueKey: "longitude"
  },
  {
    headerName: HTTP_HEADER_GEO_COUNTRY,
    parseValue: value => value,
    valueKey: "countryCode"
  },
  {
    headerName: HTTP_HEADER_GEO_REGION,
    parseValue: value => value,
    valueKey: "stateCode"
  },
  {
    headerName: HTTP_HEADER_GEO_CITY,
    parseValue: value => value,
    valueKey: "city"
  }
];

/**
 *
 * @param {Function} valueFn, function to lookup value by key
 * @param initial
 * @return {import("@adobe/target-tools/delivery-api-client/models/Geo").Geo}
 */
function mapGeoValues(valueFn, initial = {}) {
  return GEO_MAPPINGS.reduce((result, mapping) => {
    const value = valueFn.call(null, mapping.headerName);
    if (value != null && isDefined(value)) {
      // eslint-disable-next-line no-param-reassign
      result[mapping.valueKey] = mapping.parseValue(value);
    }
    return result;
  }, initial);
}

/**
 * @param { import("node-fetch").Headers  } geoHeaders;
 * @return { import("@adobe/target-tools/delivery-api-client/models/Geo").Geo }
 */
export function createGeoObjectFromHeaders(geoHeaders) {
  return mapGeoValues(key => geoHeaders.get(key));
}

/**
 * @param {Object.<string, any>} geoPayload
 * @return { import("@adobe/target-tools/delivery-api-client/models/Geo").Geo }
 */
export function createGeoObjectFromPayload(geoPayload = {}) {
  return mapGeoValues(key => geoPayload[key]);
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
   * @return { Promise<import("@adobe/target-tools/delivery-api-client/models/Geo").Geo> }
   */
  function validGeoRequestContext(geoRequestContext = {}) {
    const validatedGeoRequestContext = { ...geoRequestContext };

    if (
      geoRequestContext.ipAddress === UNKNOWN_IP_ADDRESS ||
      !isValidIpAddress(geoRequestContext.ipAddress)
    ) {
      delete validatedGeoRequestContext.ipAddress;
    }
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
      const headers = {};

      if (geoRequestContext.ipAddress !== UNKNOWN_IP_ADDRESS) {
        headers[HTTP_HEADER_FORWARDED_FOR] = geoRequestContext.ipAddress;
      }

      return fetchApi(GEO_LOOKUP_URL, {
        headers
      })
        .then(geoResponse =>
          geoResponse
            .json()
            .then(geoPayload => createGeoObjectFromPayload(geoPayload))
        )
        .then(fetchedGeoValues => {
          assign(validatedGeoRequestContext, fetchedGeoValues);
          eventEmitter(GEO_LOCATION_UPDATED, {
            geoContext: validatedGeoRequestContext
          });
          return validatedGeoRequestContext;
        });
    }

    return Promise.resolve(validatedGeoRequestContext);
  }
  return validGeoRequestContext;
}
