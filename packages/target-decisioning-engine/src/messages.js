const Messages = {
  ERROR_MAX_RETRY: (numRetries, errString) =>
    `Error fetching artifact after ${numRetries} retries. ${errString}`,
  ARTIFACT_NOT_AVAILABLE: "The decisioning artifact is not available",
  CONTEXT_UNDEFINED: "Undefined context."
};

export default Messages;