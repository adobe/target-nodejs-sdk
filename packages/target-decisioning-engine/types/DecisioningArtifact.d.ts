import { MboxResponse } from "@adobe/target-tools/delivery-api-client";

export interface Consequence extends MboxResponse {}

export interface Rule {
  ruleKey: String;
  propertyTokens: String[];
  seed: String;
  condition: Object;
  consequence: Consequence;
  meta: {
    activityId: number;
    experienceId: number;
    activityType: string;
    locationName: string;
    locationType: string;
    offerIds: number[];
    audienceIds: number[];
    displayResponseType: string;
  };
}

export interface DecisioningArtifact {
  version: string;
  globalMbox: string;
  geoTargetingEnabled: boolean;
  responseTokens: Array<string>;
  remoteMboxes: Array<string>;
  localMboxes: Array<string>;
  remoteViews: Array<string>;
  localViews: Array<string>;
  meta: {
    generatedAt: string;
    organizationId: string;
    clientCode: string;
    workspace: number;
    environment: string;
  };
  rules: {
    mboxes: { [key: string]: Array<Rule> };
    views: { [key: string]: Array<Rule> };
  };
}
