import {
  decodeKonductorIdentity,
  konductorCookieNameIdentity,
  konductorCookieNameSessionId
} from "./transformUtils";

describe("transformUtils", () => {
  it("konductorCookieNameSessionId", () => {
    expect(konductorCookieNameSessionId(undefined)).toEqual(undefined);
    expect(konductorCookieNameSessionId("bubba@AdobeOrg")).toEqual(
      "kndctr_bubba_AdobeOrg_personalization_sessionId"
    );
  });

  it("konductorCookieNameIdentity", () => {
    expect(konductorCookieNameIdentity(undefined)).toEqual(undefined);
    expect(konductorCookieNameIdentity("bubba@AdobeOrg")).toEqual(
      "kndctr_bubba_AdobeOrg_personalization_sessionId"
    );
  });

  it("decodes konductor identity", async () => {
    expect.assertions(3);
    const identity = await decodeKonductorIdentity(
      "CiY1Mjc3NzEwODUxMDk3ODY4ODI1MDUwMTYyMDEwMjA3MzQ3Nzk5MFIQCOfst5i6LxABGAEqA09SMvAB5-y3mLov"
    );
    expect(identity).toBeDefined();

    const { ecid, meta } = identity;

    expect(ecid).toEqual("52777108510978688250501620102073477990");
    expect(meta).toBeDefined();
  });
});
