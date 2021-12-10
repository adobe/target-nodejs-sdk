import { Geo } from "@adobe/target-tools/delivery-api-client";

export interface RequestGeo {
  (geo: Geo): Promise<Geo>;
}
