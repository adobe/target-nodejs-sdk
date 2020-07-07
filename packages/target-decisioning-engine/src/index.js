import {
  getLogger,
  isDefined,
  isUndefined,
  timeLimitExceeded
} from "@adobe/target-tools";
import { createDecisioningContext } from "./contextProvider";
import DecisionProvider from "./decisionProvider";
import ArtifactProvider from "./artifactProvider";
import Messages from "./messages";
import { hasRemoteDependency, matchMajorVersion } from "./utils";
import {
  DEFAULT_MAXIMUM_WAIT_READY,
  SUPPORTED_ARTIFACT_MAJOR_VERSION
} from "./constants";
import { validDeliveryRequest } from "./requestProvider";
import { TraceProvider } from "./traceProvider";
import { GeoProvider } from "./geoProvider";

/**
 * The TargetDecisioningEngine initialize method
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 */
export default async function TargetDecisioningEngine(config) {
  const { maximumWaitReady = DEFAULT_MAXIMUM_WAIT_READY } = config;
  const initTime = new Date().getTime();
  const logger = getLogger(config.logger);

  const artifactProvider = await ArtifactProvider({
    ...config,
    logger
  });

  let artifact = artifactProvider.getArtifact();
  let geoContext = artifactProvider.getGeoContext();

  // subscribe to new artifacts that are downloaded on the polling interval
  artifactProvider.subscribe(data => {
    artifact = data;
  });

  /**
   * The get offers method
   * @param {import("../types/TargetOptions").TargetOptions} targetOptions
   */
  async function getOffers(targetOptions) {
    let { request } = targetOptions;

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

    request = await validDeliveryRequest(
      request,
      targetOptions.targetLocationHint,
      GeoProvider(config, artifact).validGeoRequestContext
    );

    const options = {
      ...targetOptions,
      request
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

  function isReady() {
    return isDefined(artifact);
  }

  function whenReady(maximumWaitTime = DEFAULT_MAXIMUM_WAIT_READY) {
    return new Promise((resolve, reject) => {
      (function wait(count) {
        if (timeLimitExceeded(initTime, maximumWaitTime)) {
          reject(new Error(Messages.ARTIFACT_NOT_AVAILABLE));
          return;
        }
        if (isReady()) {
          resolve();
          return;
        }
        setTimeout(() => wait(count + 1), 100);
      })(0);
    });
  }

  return whenReady(maximumWaitReady).then(() => {
    return {
      getRawArtifact: () => artifact,
      stopPolling: () => artifactProvider.stopPolling(),
      getOffers: targetOptions => getOffers(targetOptions),
      hasRemoteDependency: request => hasRemoteDependency(artifact, request),
      isReady
    };
  });
}
