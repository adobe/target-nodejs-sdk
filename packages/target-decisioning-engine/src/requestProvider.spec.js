import { validVisitorId } from "./requestProvider";

describe("validVisitorId", () => {
  it("does not generate tntId if one exists", () => {
    const vid = {
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
    };

    expect(validVisitorId(vid)).toEqual(vid);
  });

  it("does not generate tnt id if there is another valid option - thirdPartyId", () => {
    const vid = {
      thirdPartyId: "thirdParty123"
    };

    expect(validVisitorId(vid)).toEqual(vid);
  });

  it("does not generate tnt id if there is another valid option - customerId", () => {
    const vid = {
      customerIds: [
        {
          id: "custId123",
          integrationCode: "A",
          authenticatedState: "authenticated"
        }
      ]
    };

    expect(validVisitorId(vid)).toEqual(vid);
  });

  it("does not generate tnt id if there is another valid option - ecid", () => {
    const vid = {
      marketingCloudVisitorId: "mcid123"
    };

    expect(validVisitorId(vid)).toEqual(vid);
  });

  it("generates tnt id if there is no other valid option", () => {
    const vid = {};

    expect(validVisitorId(vid)).toEqual({
      tntId: expect.any(String)
    });
  });

  it("generate tnt id if there is no other valid option - customerId", () => {
    const vid = {
      customerIds: [
        {
          id: "custId123unknown",
          integrationCode: "A",
          authenticatedState: "unknown"
        },
        {
          id: "custId123loggedOut",
          integrationCode: "A",
          authenticatedState: "logged_out"
        }
      ]
    };

    expect(validVisitorId(vid)).toEqual({
      ...vid,
      tntId: expect.any(String)
    });
  });
});
