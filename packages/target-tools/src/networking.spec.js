import * as HttpStatus from "http-status-codes";
import { getFetchApi, getFetchWithRetry } from "./networking";

require("jest-fetch-mock").enableMocks();

describe("fetchWithRetry", () => {
  const PAYLOAD = { message: "oh hi" };

  const fetchApi = getFetchApi();

  beforeEach(async () => {
    fetch.resetMocks();
  });

  it("makes a standard request", async () => {
    const fetchWithRetry = getFetchWithRetry(fetchApi);

    fetch.once(JSON.stringify(PAYLOAD));

    const result = await fetchWithRetry("http://localhost").then(res =>
      res.json()
    );

    expect(result).toEqual(PAYLOAD);
  });

  it("resolves if one of the retries succeeds", async () => {
    const fetchWithRetry = getFetchWithRetry(fetchApi);

    fetch.mockResponses(
      ["", { status: HttpStatus.UNAUTHORIZED }],
      ["", { status: HttpStatus.NOT_FOUND }],
      ["", { status: HttpStatus.NOT_ACCEPTABLE }],
      ["", { status: HttpStatus.NOT_IMPLEMENTED }],
      ["", { status: HttpStatus.FORBIDDEN }],
      ["", { status: HttpStatus.SERVICE_UNAVAILABLE }],
      ["", { status: HttpStatus.BAD_REQUEST }],
      ["", { status: HttpStatus.BAD_GATEWAY }],
      ["", { status: HttpStatus.TOO_MANY_REQUESTS }],
      ["", { status: HttpStatus.GONE }],
      [JSON.stringify(PAYLOAD), { status: HttpStatus.OK }]
    );

    const result = await fetchWithRetry("http://localhost").then(res =>
      res.json()
    );

    expect(result).toEqual(PAYLOAD);
  });

  it("errors after 10 retries if unable to resolve", async () => {
    const fetchWithRetry = getFetchWithRetry(fetchApi);

    fetch.mockResponses(
      ["", { status: HttpStatus.UNAUTHORIZED }],
      ["", { status: HttpStatus.NOT_FOUND }],
      ["", { status: HttpStatus.NOT_ACCEPTABLE }],
      ["", { status: HttpStatus.NOT_IMPLEMENTED }],
      ["", { status: HttpStatus.FORBIDDEN }],
      ["", { status: HttpStatus.SERVICE_UNAVAILABLE }],
      ["", { status: HttpStatus.BAD_REQUEST }],
      ["", { status: HttpStatus.BAD_GATEWAY }],
      ["", { status: HttpStatus.TOO_MANY_REQUESTS }],
      ["", { status: HttpStatus.GONE }],
      ["", { status: HttpStatus.INTERNAL_SERVER_ERROR }]
    );

    await expect(fetchWithRetry("http://localhost")).rejects.toEqual(
      new Error("Internal Server Error")
    );
  });

  it("errors after 10 retries if unable to resolve - fetch error", async () => {
    const fetchWithRetry = getFetchWithRetry(fetchApi);

    fetch.mockReject(() => Promise.reject(new Error("failed to fetch")));

    await expect(fetchWithRetry("http://localhost")).rejects.toEqual(
      new Error("failed to fetch")
    );
  });

  it("errors after 10 retries with custom error", async () => {
    const fetchWithRetry = getFetchWithRetry(fetchApi, 10, errorMessage => {
      return `Yo dawg, we tried 10 times but it still failed with this error message: ${errorMessage}`;
    });

    fetch.mockResponses(
      ["", { status: HttpStatus.UNAUTHORIZED }],
      ["", { status: HttpStatus.NOT_FOUND }],
      ["", { status: HttpStatus.NOT_ACCEPTABLE }],
      ["", { status: HttpStatus.NOT_IMPLEMENTED }],
      ["", { status: HttpStatus.FORBIDDEN }],
      ["", { status: HttpStatus.BAD_REQUEST }],
      ["", { status: HttpStatus.BAD_GATEWAY }],
      ["", { status: HttpStatus.TOO_MANY_REQUESTS }],
      () => Promise.reject(new Error("failed to fetch")),
      ["", { status: HttpStatus.INTERNAL_SERVER_ERROR }],
      ["", { status: HttpStatus.SERVICE_UNAVAILABLE }]
    );

    await expect(fetchWithRetry("http://localhost")).rejects.toEqual(
      new Error(
        "Yo dawg, we tried 10 times but it still failed with this error message: Service Unavailable"
      )
    );
  });
});
