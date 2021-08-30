import { aepEdgeToTargetDeliveryResponse } from "./responseTransform";

describe("aepEdgeToTargetDeliveryResponse", () => {
  it("does", () => {
    expect(aepEdgeToTargetDeliveryResponse({})).toMatchObject({});
  });
});
