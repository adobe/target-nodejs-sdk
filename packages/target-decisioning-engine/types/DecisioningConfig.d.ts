import { DecisioningArtifact } from "./DecisioningArtifact";

export interface DecisioningConfig {
  /**
   * Target Client Id
   */
  client: String;

  /**
   * Target Organization Id
   */
  organizationId: String;

  /**
   * Polling interval in ms, default: 30000
   */
  pollingInterval?: Number;

  /**
   * Fully qualified url to the location of the artifact
   */
  artifactLocation?: String;

  /**
   * A pre-fetched artifact
   */
  artifactPayload?: DecisioningArtifact;

  /**
   * Replaces the default noop logger
   */
  logger?: Object;

  /**
   * Fetch Implementation
   */
  fetchApi?: Function;

  /**
   * Function used to send notifications
   */
  sendNotificationFunc?: Function;
}
