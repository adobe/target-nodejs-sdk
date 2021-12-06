import { FetchHeaders } from "./FetchHeaders";

export interface FetchResponse {
  /**
   * Response content in json format
   */
  data: object;

  /**
   * Response content in string format
   */
  response: string;

  /**
   * object containing HTTP request timings for telemetry purposes
   */
  timings: object;

  /**
   * HTTP status code
   */
  status: number;

  /**
   * HTTP response headers
   */
  headers: FetchHeaders;

  /**
   * Is the request successful
   */
  ok: boolean;

  /**
   * Function that returns the response content in json format
   */
  json: Function;

  /**
   * Function that clones the response object
   */
  clone: Function;
}
