const Messages = {
  ERROR_MAX_RETRY: (numRetries, errString) =>
    `Unable to retrieve artifact after ${numRetries} retries: ${errString}`,
  ARTIFACT_NOT_AVAILABLE: "The decisioning artifact is not available",
  ARTIFACT_VERSION_UNSUPPORTED: (artifactVersion, supportedMajorVersion) =>
    `The decisioning artifact version (${artifactVersion}) is not supported. This library is compatible with this major version: ${supportedMajorVersion}`,
  ARTIFACT_FETCH_ERROR: reason => `Failed to retrieve artifact: ${reason}`,
  INVALID_ENVIRONMENT: (expectedEnvironment, defaultEnvironment) =>
    `'${expectedEnvironment}' is not a valid target environment, defaulting to '${defaultEnvironment}'.`,
  NOT_APPLICABLE: "Not Applicable",
  UNKNOWN: "unknown"
};

export default Messages;
