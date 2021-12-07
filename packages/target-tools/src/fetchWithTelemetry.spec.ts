import getFetchWithTelemetry from "./fetchWithTelemetry";

const realFetchImpl = getFetchWithTelemetry(undefined);

describe("fetchWithTelemetry", () => {
  const URL = "https://api.github.com/organizations?per_page=1";
  const REQUEST_OPTS = {
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"
    }
  };

  let mockRequestImpl;
  const getMockFetchImpl = (writeFn = jest.fn()) => {
    mockRequestImpl = jest.fn().mockReturnValue({
      socket: jest.fn(),
      once: jest.fn(),
      setTimeout: jest.fn(),
      write: writeFn,
      end: jest.fn()
    });
    return getFetchWithTelemetry(mockRequestImpl);
  };

  it("returns request timings on response", async () => {
    const response = await realFetchImpl(URL, REQUEST_OPTS);

    expect(Object.keys(response.timings).length).toBe(6);
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
    const response = await realFetchImpl(URL, REQUEST_OPTS);

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

    await expect(realFetchImpl(URL, {})).rejects.toEqual(
      expect.objectContaining(expectedErr)
    );
  });

  it("does not throw 'Protocol http: not supported' error", async () => {
    const expectedErr = {
      status: "error",
      message: expect.stringContaining("ENOTFOUND"),
      statusCode: undefined
    };

    await expect(realFetchImpl("http://sx125vz.com/")).rejects.toEqual(
      expect.objectContaining(expectedErr)
    );
  });

  it("handles socket-level error properly for https", async () => {
    const expectedErr = {
      status: "error",
      message: expect.stringContaining("ENOTFOUND"),
      statusCode: undefined
    };

    await expect(realFetchImpl("https://sx125vz.com/")).rejects.toEqual(
      expect.objectContaining(expectedErr)
    );
  });

  it("fails to send a request using an invalid protocol", async () => {
    const url = "wss://myspace.com/friends/top8";
    const expectedErr = {
      message:
        "Request URL is invalid.  Must use either http or https protocol."
    };

    await expect(realFetchImpl(url)).rejects.toEqual(
      expect.objectContaining(expectedErr)
    );
  });

  it("sends a valid GET request for .json file", async () => {
    const writeFn = jest.fn();
    const mockFetchImpl = getMockFetchImpl(writeFn);
    const url = "http://myspace.com/friends/export.json";

    mockFetchImpl(url);

    expect(mockRequestImpl).toBeCalledWith(
      expect.objectContaining({
        method: "GET",
        protocol: "http:",
        host: "myspace.com",
        path: "/friends/export.json",
        headers: undefined,
        agent: expect.any(Object)
      }),
      expect.any(Function)
    );

    expect(writeFn).not.toHaveBeenCalled();
  });

  it("sends a valid GET request using http", async () => {
    const writeFn = jest.fn();
    const mockFetchImpl = getMockFetchImpl(writeFn);
    const url = "http://myspace.com/friends/top8";

    mockFetchImpl(url);

    expect(mockRequestImpl).toBeCalledWith(
      expect.objectContaining({
        method: "GET",
        protocol: "http:",
        host: "myspace.com",
        path: "/friends/top8",
        headers: undefined,
        agent: expect.any(Object)
      }),
      expect.any(Function)
    );

    expect(writeFn).not.toHaveBeenCalled();
  });

  it("sends a valid GET request using https", async () => {
    const writeFn = jest.fn();
    const mockFetchImpl = getMockFetchImpl(writeFn);
    const url = "https://myspace.com/friends/top8?sort=name&limit=4";
    const customHeaders = {
      "Content-Type": "application/json"
    };
    const requestOpts = {
      headers: customHeaders
    };

    mockFetchImpl(url, requestOpts);

    expect(mockRequestImpl).toBeCalledWith(
      expect.objectContaining({
        method: "GET",
        protocol: "https:",
        host: "myspace.com",
        path: "/friends/top8?sort=name&limit=4",
        headers: customHeaders,
        agent: expect.any(Object)
      }),
      expect.any(Function)
    );

    expect(writeFn).not.toHaveBeenCalled();
  });

  it("sends a valid POST request using https", async () => {
    const writeFn = jest.fn();
    const mockFetchImpl = getMockFetchImpl(writeFn);
    const url = "https://myspace.com/friends/top8";
    const body = {
      name: "myfriend"
    };
    const requestOpts = {
      body
    };

    mockFetchImpl(url, requestOpts);

    expect(mockRequestImpl).toBeCalledWith(
      expect.objectContaining({
        method: "POST",
        protocol: "https:",
        host: "myspace.com",
        path: "/friends/top8",
        headers: undefined,
        agent: expect.any(Object)
      }),
      expect.any(Function)
    );

    expect(writeFn).toBeCalledWith(body);
  });
});
