import { computeAllocation } from "./allocationProvider";

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
