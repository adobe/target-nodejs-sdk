import { FetchHeaders } from "./FetchHeaders";

export interface FetchResponse {
  /**
   * Response content in json format
   */
  data: Object;

  /**
   * Response content in string format
   */
  response: String;

  /**
   * Object containing HTTP request timings for telemetry purposes
   */
  timings: Object;

  /**
   * HTTP status code
   */
  status: Number;

  /**
   * HTTP response headers
   */
  headers: FetchHeaders;

  /**
   * Is the request successful
   */
  ok: Boolean;

  /**
   * Function that returns the response content in json format
   */
  json: Function;

  /**
   * Function that clones the response object
   */
  clone: Function;
}
