import {
  BAD_GATEWAY,
  BAD_REQUEST,
  FORBIDDEN,
  GONE,
  INTERNAL_SERVER_ERROR,
  NOT_ACCEPTABLE,
  NOT_FOUND,
  NOT_IMPLEMENTED,
  OK,
  SERVICE_UNAVAILABLE,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED
} from "http-status-codes";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { getFetchApi, getFetchWithRetry } from "./networking";
import { noop } from "./utils";

enableFetchMocks();

describe("networking", () => {
  beforeEach(async () => {
    fetchMock.resetMocks();
  });

  it("has getFetchApi", () => {
    expect(getFetchApi(noop)).toEqual(noop);

    const preFetch = global.fetch; // it's jest-fetch-mock right now

    global.fetch = noop;
    expect(getFetchApi()).toEqual(noop);
    global.fetch = preFetch; // restore jest-fetch-mock
  });

  describe("fetchWithRetry", () => {
    const PAYLOAD = { message: "oh hi" };

    const fetchApi = getFetchApi();

    it("makes a standard request", async () => {
      const fetchWithRetry = getFetchWithRetry(fetchApi);

      fetchMock.once(JSON.stringify(PAYLOAD));

      const result = await fetchWithRetry("http://localhost").then(res =>
        res.json()
      );

      expect(result).toEqual(PAYLOAD);
    });

    it("resolves if one of the retries succeeds", async () => {
      const fetchWithRetry = getFetchWithRetry(fetchApi);

      fetchMock.mockResponses(
        ["", { status: UNAUTHORIZED }],
        ["", { status: NOT_FOUND }],
        ["", { status: NOT_ACCEPTABLE }],
        ["", { status: NOT_IMPLEMENTED }],
        ["", { status: FORBIDDEN }],
        ["", { status: SERVICE_UNAVAILABLE }],
        ["", { status: BAD_REQUEST }],
        ["", { status: BAD_GATEWAY }],
        ["", { status: TOO_MANY_REQUESTS }],
        ["", { status: GONE }],
        [JSON.stringify(PAYLOAD), { status: OK }]
      );

      const result = await fetchWithRetry("http://localhost").then(res =>
        res.json()
      );

      expect(result).toEqual(PAYLOAD);
    });

    it("errors after 10 retries if unable to resolve", async () => {
      const fetchWithRetry = getFetchWithRetry(fetchApi);

      fetchMock.mockResponses(
        ["", { status: UNAUTHORIZED }],
        ["", { status: NOT_FOUND }],
        ["", { status: NOT_ACCEPTABLE }],
        ["", { status: NOT_IMPLEMENTED }],
        ["", { status: FORBIDDEN }],
        ["", { status: SERVICE_UNAVAILABLE }],
        ["", { status: BAD_REQUEST }],
        ["", { status: BAD_GATEWAY }],
        ["", { status: TOO_MANY_REQUESTS }],
        ["", { status: GONE }],
        ["", { status: INTERNAL_SERVER_ERROR }]
      );

      await expect(fetchWithRetry("http://localhost")).rejects.toEqual(
        new Error("Internal Server Error")
      );
    });

    it("errors after 10 retries if unable to resolve - fetch error", async () => {
      const fetchWithRetry = getFetchWithRetry(fetchApi);

      fetchMock.mockReject(() => Promise.reject(new Error("failed to fetch")));

      await expect(fetchWithRetry("http://localhost")).rejects.toEqual(
        new Error("failed to fetch")
      );
    });

    it("errors after 10 retries with custom error", async () => {
      const fetchWithRetry = getFetchWithRetry(
        fetchApi,
        10,
        errorMessage =>
          `Yo dawg, we tried 10 times but it still failed with this error message: ${errorMessage}`
      );

      fetchMock.mockResponses(
        ["", { status: UNAUTHORIZED }],
        ["", { status: NOT_FOUND }],
        ["", { status: NOT_ACCEPTABLE }],
        ["", { status: NOT_IMPLEMENTED }],
        ["", { status: FORBIDDEN }],
        ["", { status: BAD_REQUEST }],
        ["", { status: BAD_GATEWAY }],
        ["", { status: TOO_MANY_REQUESTS }],
        () => Promise.reject(new Error("failed to fetch")),
        ["", { status: INTERNAL_SERVER_ERROR }],
        ["", { status: SERVICE_UNAVAILABLE }]
      );

      await expect(fetchWithRetry("http://localhost")).rejects.toEqual(
        new Error(
          "Yo dawg, we tried 10 times but it still failed with this error message: Service Unavailable"
        )
      );
    });
  });
});
