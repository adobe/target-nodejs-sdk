import {
  computeAllocation,
  getOrCreateVisitorId,
  validTntId
} from "./allocationProvider";

describe("allocationProvider", () => {
  describe("computeAllocation", () => {
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

    it("computed allocation for tntId does not include location hint", () => {
      expect(
        computeAllocation(
          "someClientId",
          "123456",
          { tntId: "tntId123.28_0" },
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
    it("prefers ecid", () => {
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
          ],
          thirdPartyId: "thirtPartyId123"
        })
      ).toEqual("mcid123");
    });

    it("prefers tntId when no ecid", () => {
      expect(
        getOrCreateVisitorId({
          tntId: "tnt123",
          customerIds: [
            {
              id: "custId123",
              integrationCode: "A",
              authenticatedState: "unknown"
            }
          ],
          thirdPartyId: "thirtPartyId123"
        })
      ).toEqual("tnt123");
    });

    it("prefers thirdPartyId when ecid and tntid not present", () => {
      expect(
        getOrCreateVisitorId({
          thirdPartyId: "thirdParty123",
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

    it("does not use customerId for bucketing", () => {
      const vid = getOrCreateVisitorId({
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
      });

      expect(typeof vid).toEqual("string");
      expect(vid.length).toBeGreaterThan(0);

      expect(vid).not.toEqual("custId123unknown");
      expect(vid).not.toEqual("custId123loggedout");
      expect(vid).not.toEqual("custId123authenticated");
    });

    it("generates a valid id if none provided", () => {
      expect(getOrCreateVisitorId({})).toEqual(expect.any(String));
    });
  });
  describe("validTntId", () => {
    it("strips off cluster from tntId", () => {
      expect(validTntId("338e3c1e51f7416a8e1ccba4f81acea0.28_0")).toEqual(
        "338e3c1e51f7416a8e1ccba4f81acea0"
      );
    });
    it("only removes cluster from tntId", () => {
      expect(validTntId("338e3c1e51f7416a8e1ccba4f81acea0")).toEqual(
        "338e3c1e51f7416a8e1ccba4f81acea0"
      );
    });
    it("returns undefined when invalid", () => {
      expect(validTntId()).toBeUndefined();
      expect(validTntId(undefined)).toBeUndefined();
      expect(validTntId(null)).toBeUndefined();
    });
  });
});
