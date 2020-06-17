import { getLogger, isDefined, isUndefined } from "@adobe/target-tools";
import { createDecisioningContext } from "./contextProvider";
import DecisionProvider from "./decisionProvider";
import ArtifactProvider from "./artifactProvider";
import Messages from "./messages";
import { hasRemoteDependency, matchMajorVersion } from "./utils";
import { SUPPORTED_ARTIFACT_MAJOR_VERSION } from "./constants";
import { validDeliveryRequest } from "./requestProvider";
import { TraceProvider } from "./traceProvider";

/**
 * The TargetDecisioningEngine initialize method
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 */
export default async function TargetDecisioningEngine(config) {
  const logger = getLogger(config.logger);

  const artifactProvider = await ArtifactProvider({
    ...config,
    logger
  });

  let artifact = artifactProvider.getArtifact();

  // subscribe to new artifacts that are downloaded on the polling interval
  artifactProvider.subscribe(data => {
    artifact = data;
  });

  /**
   * The get offers method
   * @param {import("../types/TargetOptions").TargetOptions} targetOptions
   */
  function getOffers(targetOptions) {
    const { request } = targetOptions;

    if (isUndefined(artifact)) {
      return Promise.reject(new Error(Messages.ARTIFACT_NOT_AVAILABLE));
    }

    if (
      !matchMajorVersion(artifact.version, SUPPORTED_ARTIFACT_MAJOR_VERSION)
    ) {
      return Promise.reject(
        new Error(
          Messages.ARTIFACT_VERSION_UNSUPPORTED(
            artifact.version,
            SUPPORTED_ARTIFACT_MAJOR_VERSION
          )
        )
      );
    }

    const options = {
      ...targetOptions,
      request: validDeliveryRequest(request, targetOptions.targetLocationHint)
    };

    const traceProvider = TraceProvider(
      config,
      options,
      artifactProvider.getTrace()
    );

    return DecisionProvider(
      config,
      options,
      createDecisioningContext(request),
      artifact,
      logger,
      traceProvider
    );
  }

  return Promise.resolve({
    getRawArtifact: () => artifact,
    stopPolling: () => artifactProvider.stopPolling(),
    getOffers: targetOptions => getOffers(targetOptions),
    hasRemoteDependency: request => hasRemoteDependency(artifact, request),
    isReady: () => isDefined(artifact)
  });
}
