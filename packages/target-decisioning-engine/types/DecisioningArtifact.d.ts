import { MboxResponse } from "@adobe/target-tools/delivery-api-client";

export interface Consequence extends MboxResponse {}

export interface Rule {
  condition: Object;
  consequence: Consequence;
  meta: {
    activityId: number;
    offerIds: number[];
    audienceIds: number[];
    experienceId: number;
    activityType: string;
    locationName: string;
    locationType: string;
  };
}

export interface DecisioningArtifact {
  version: string;
  globalMbox: string;
  remoteMboxes: Array<string>;
  remoteViews: Array<string>;
  responseTokens: Array<string>;
  meta: {
    generatedAt: string;
    clientCode: string;
    organizationId: string;
    workspace: number;
    environment: string;
  };
  rules: {
    mboxes: { [key: string]: Array<Rule> };
    views: { [key: string]: Array<Rule> };
  };
}
