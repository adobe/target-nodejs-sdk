import {
  RequestDetails,
  Notification
} from "@adobe/target-tools/delivery-api-client";
import { Rule } from "./DecisioningArtifact";
import { DecisioningContext } from "./DecisioningContext";
import { RequestMode } from "./RequestMode";
import { RequestType } from "./RequestType";

export interface TraceNotification {
  (notification: Notification): void;
}

export interface Tracer {
  toJSON(): object;
  traceRuleEvaluated(
    rule: Rule,
    mboxRequest: AbstractRequest,
    requestType: RequestType,
    ruleContext: DecisioningContext,
    ruleSatisfied: boolean
  ): void;
  traceRequest(
    mode: RequestMode,
    requestType: RequestType,
    mboxRequest: AbstractRequest,
    context: DecisioningContext
  ): void;
  traceNotification(rule: Rule): TraceNotification;
  getTraceResult(): object;
}
