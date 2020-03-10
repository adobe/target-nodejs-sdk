export interface Consequence {
  mboxes: Array<any>;
  views: Array<any>;
}

export interface Rule {
  condition: Object;
  consequence: Consequence;
  meta: {
    activityId: number;
    experienceId: number;
    type: string;
    mboxes: Array<string>;
    views: Array<any>;
  }
}

export interface DecisioningArtifact {
    version: string;
    meta: {
      generatedAt: string;
      organizationId: string;
      workspace: number;
      environment: string;
      remoteMboxes: Array<string>
    };
    rules: Array<Rule>;
}
