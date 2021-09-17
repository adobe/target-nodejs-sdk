import { isDefined, isFunction } from "@adobe/target-tools";
import { Messages } from "../messages";

export function logApiResponse(
  logger,
  response,
  decisioningMethod,
  requestURL = undefined
) {
  if (isDefined(logger) && isFunction(logger.debug)) {
    logger.debug(
      ...[
        Messages.RESPONSE_RECEIVED,
        decisioningMethod,
        requestURL,
        JSON.stringify(response, null, 2)
      ].filter(isDefined)
    );
  }
  return response;
}

export function logApiRequest(
  logger,
  request,
  decisioningMethod,
  requestURL = undefined
) {
  if (isDefined(logger) && isFunction(logger.debug)) {
    logger.debug(
      ...[
        Messages.REQUEST_SENT,
        decisioningMethod,
        requestURL,
        JSON.stringify(request, null, 2)
      ].filter(isDefined)
    );
  }

  return request;
}
