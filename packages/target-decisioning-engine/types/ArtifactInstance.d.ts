import { DecisioningArtifact } from "../types/DecisioningArtifact";

export interface ArtifactInstance {
  getArtifact(): DecisioningArtifact;
  subscribe(callback: Function): number;
  unsubscribe(id: string): void;
  stopPolling(): void;
  resumePolling(): void;
  getTrace(): object;
}
