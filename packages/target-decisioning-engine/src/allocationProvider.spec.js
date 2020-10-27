import { computeAllocation, getOrCreateVisitorId } from "./allocationProvider";

describe("allocationProvider", () => {
  it("computes allocation for ecid", () => {
    expect(
      computeAllocation(
        "someClientId",
        "123456",
        { marketingCloudVisitorId: "ecid123" },
        "salty"
      )
    ).toEqual(52.28);
  });

  it("computes allocation for tntId", () => {
    expect(
      computeAllocation(
        "someClientId",
        "123456",
        { tntId: "tntId123" },
        "salty"
      )
    ).toEqual(8.48);
  });

  it("computes allocation for thirdPartyId", () => {
    expect(
      computeAllocation(
        "someClientId",
        "123456",
        { thirdPartyId: "thirtPartyId123" },
        "salty"
      )
    ).toEqual(95.79);
  });

  it("computes allocation with generated uuid", () => {
    [{}, undefined].forEach(visitorId => {
      const allocation = computeAllocation(
        "someClientId",
        "123456",
        visitorId,
        "salty"
      );
      expect(allocation).toEqual(expect.any(Number));
      expect(allocation).toBeGreaterThanOrEqual(0);
      expect(allocation).toBeLessThanOrEqual(100);
    });
  });
});

describe("getOrCreateVisitorId", () => {
  it("prefers thirdPartyId", () => {
    expect(
      getOrCreateVisitorId({
        tntId: "tnt123",
        thirdPartyId: "thirdParty123",
        marketingCloudVisitorId: "mcid123",
        customerIds: [
          {
            id: "custId123",
            integrationCode: "A",
            authenticatedState: "authenticated"
          }
        ]
      })
    ).toEqual("thirdParty123");
  });

  it("prefers authenticated customerId", () => {
    expect(
      getOrCreateVisitorId({
        tntId: "tnt123",
        marketingCloudVisitorId: "mcid123",
        customerIds: [
          {
            id: "custId123",
            integrationCode: "A",
            authenticatedState: "authenticated"
          }
        ]
      })
    ).toEqual("custId123");
  });

  it("only accepts authenticated customerIds", () => {
    expect(
      getOrCreateVisitorId({
        tntId: "tnt123",
        marketingCloudVisitorId: "mcid123",
        customerIds: [
          {
            id: "custId123",
            integrationCode: "A",
            authenticatedState: "unknown"
          }
        ]
      })
    ).toEqual("mcid123");
  });

  it("accepts the first authenticated customerId", () => {
    expect(
      getOrCreateVisitorId({
        tntId: "tnt123",
        marketingCloudVisitorId: "mcid123",
        customerIds: [
          {
            id: "custId123unknown",
            integrationCode: "A",
            authenticatedState: "unknown"
          },
          {
            id: "custId123loggedout",
            integrationCode: "A",
            authenticatedState: "logged_out"
          },
          {
            id: "custId123authenticated",
            integrationCode: "A",
            authenticatedState: "authenticated"
          }
        ]
      })
    ).toEqual("custId123authenticated");
  });

  it("prefers ecid", () => {
    expect(
      getOrCreateVisitorId({
        tntId: "tnt123",
        marketingCloudVisitorId: "mcid123"
      })
    ).toEqual("mcid123");
  });

  it("prefers tntId last", () => {
    expect(
      getOrCreateVisitorId({
        tntId: "tnt123"
      })
    ).toEqual("tnt123");
  });

  it("generates a valid id if none provided", () => {
    expect(getOrCreateVisitorId({})).toEqual(expect.any(String));
  });
});
