import fetchImpl from "./fetchWithTelemetry";

describe("fetchWithTelemetry", () => {
  const URL = "https://api.github.com/organizations?per_page=1";
  const REQUEST_OPTS = {
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"
    }
  };

  it("returns request timings on response", async () => {
    const response = await fetchImpl(URL, REQUEST_OPTS);

    expect(Object.keys(response.timings).length).toBe(5);
    expect(response.timings).toEqual(
      expect.objectContaining({
        dns: expect.any(Number),
        tls: expect.any(Number),
        timeToFirstByte: expect.any(Number),
        download: expect.any(Number),
        responseSize: expect.any(Number)
      })
    );
  });

  it("formats response to match fetch response to maintain cross-compatibility", async () => {
    const response = await fetchImpl(URL, REQUEST_OPTS);

    expect(response.data).toEqual(JSON.parse(response.response));
    expect(response.status).toEqual(200);
    expect(response.ok).toEqual(true);
    expect(await response.json()).toEqual(response.data);
    expect(response.headers).toBeDefined();
    expect(response.headers.get("Content-Type")).toEqual(
      expect.stringContaining("application/json")
    );
  });

  it("handles http error properly", async () => {
    const expectedErr = {
      status: "error",
      statusCode: 403,
      message: expect.stringContaining("Request forbidden")
    };

    await expect(fetchImpl(URL, {})).rejects.toEqual(
      expect.objectContaining(expectedErr)
    );
  });

  it("handles socket-level error properly", async () => {
    const expectedErr = {
      status: "error",
      message: expect.stringContaining("ENOTFOUND"),
      statusCode: undefined
    };

    await expect(fetchImpl("http://sx125vz.com/")).rejects.toEqual(
      expect.objectContaining(expectedErr)
    );
  });
});
