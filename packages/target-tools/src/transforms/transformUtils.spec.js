import {
  AuthenticatedStateAEP,
  ChannelTypeAEP,
  DeviceTypeAEP
} from "@adobe/aep-edge-tools";
import {
  byIndex,
  createIdentityItem,
  isGlobalMbox,
  targetChannelToXdm,
  targetDeviceTypeToXdm,
  targetOrderToAEP,
  targetProductToAEP,
  targetToAepAuthenticatedState,
  toHours
} from "./transformUtils";
import { AuthenticatedState, ChannelType, DeviceType } from "../constants";

describe("transformUtils", () => {
  it("targetToAepAuthenticatedState", () => {
    expect(targetToAepAuthenticatedState(AuthenticatedState.Unknown)).toEqual(
      AuthenticatedStateAEP.Ambiguous
    );

    expect(
      targetToAepAuthenticatedState(AuthenticatedState.Authenticated)
    ).toEqual(AuthenticatedStateAEP.Authenticated);

    expect(targetToAepAuthenticatedState(AuthenticatedState.LoggedOut)).toEqual(
      AuthenticatedStateAEP.LoggedOut
    );

    expect(targetToAepAuthenticatedState()).toEqual(
      AuthenticatedStateAEP.Ambiguous
    );
  });

  it("targetDeviceTypeToXdm", () => {
    expect(targetDeviceTypeToXdm(DeviceType.Tablet)).toEqual(
      DeviceTypeAEP.Tablet
    );

    expect(targetDeviceTypeToXdm(DeviceType.Phone)).toEqual(
      DeviceTypeAEP.Mobile
    );
  });

  it("targetChannelToXdm", () => {
    expect(targetChannelToXdm(ChannelType.Mobile)).toEqual(
      ChannelTypeAEP.Browser
    );

    expect(targetChannelToXdm(ChannelType.Web)).toEqual(ChannelTypeAEP.Browser);
  });

  it("createIdentityItem", () => {
    expect(
      createIdentityItem("123", AuthenticatedStateAEP.Authenticated, false)
    ).toEqual({
      id: "123",
      authenticatedState: AuthenticatedStateAEP.Authenticated,
      primary: false
    });
  });

  it("toHours", () => {
    expect(toHours(900)).toEqual(15);
    expect(toHours(-330)).toEqual(-5.5);
  });

  it("targetProductToAEP", () => {
    expect(targetProductToAEP(undefined)).toBeUndefined();
    expect(targetProductToAEP({ id: "123", categoryId: "cat5" })).toEqual({
      SKU: "123",
      category: "cat5"
    });
  });

  it("targetOrderToAEP", () => {
    expect(targetOrderToAEP()).toBeUndefined();

    expect(
      targetOrderToAEP({ id: "123", total: 550, purchasedProductIds: ["xyz"] })
    ).toEqual({
      order: {
        purchaseId: "123",
        priceTotal: 550
      },
      purchases: {
        id: "xyz"
      }
    });

    expect(targetOrderToAEP({ id: "123", total: 550 })).toEqual({
      order: {
        purchaseId: "123",
        priceTotal: 550
      },
      purchases: {
        id: undefined
      }
    });
  });

  it("isGlobalMbox", () => {
    expect(isGlobalMbox("target-global-mbox")).toEqual(true);
    expect(isGlobalMbox("bisonmbox")).toEqual(false);
  });

  it("sorts byIndex", () => {
    const arr = [
      { index: 5 },
      { index: -6 },
      { index: 3 },
      { index: 1 },
      { index: 100 },
      { index: 0 }
    ];

    arr.sort(byIndex);

    expect(arr).toEqual([
      { index: -6 },
      { index: 0 },
      { index: 1 },
      { index: 3 },
      { index: 5 },
      { index: 100 }
    ]);
  });
});
