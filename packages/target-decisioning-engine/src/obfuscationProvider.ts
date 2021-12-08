/* eslint-disable no-bitwise */
const { TextDecoder, TextEncoder } = require("util");
import { SUPPORTED_ARTIFACT_OBFUSCATION_VERSION } from "./constants";
import Messages from "./messages";

const HEADER_BOUNDARY = 40;

/**
 * The ObfuscationProvider initialize method
 * @param {import("../types/DecisioningConfig").DecisioningConfig} config Options map, required
 */
function ObfuscationProvider(config) {
  const { organizationId } = config;
  const decoder = new TextDecoder("utf-8");

  function getHeader(buffer) {
    const dataView = new DataView(buffer);
    const text = decoder.decode(dataView);

    const [prefix, version] = text.slice(0, 8).split(":");
    const key = text.slice(8, 41);

    return {
      prefix,
      version: parseInt(version, 10),
      key
    };
  }

  function getArtifact(key, obfuscatedArtifactBuffer) {
    let deobfuscatedArtifactJSON = {};

    const keyBuffer = new TextEncoder().encode([organizationId, key].join(""));

    const keyView = new DataView(keyBuffer.buffer);
    const keyLength = keyView.byteLength;

    const obfuscatedArtifactView = new DataView(obfuscatedArtifactBuffer);
    const artifactLength = obfuscatedArtifactView.byteLength;

    const deobfuscatedArtifactView = new DataView(
      new ArrayBuffer(artifactLength)
    );

    for (let i = 0; i < artifactLength; i += 1) {
      deobfuscatedArtifactView.setInt8(
        i,
        obfuscatedArtifactView.getInt8(i) ^ keyView.getInt8(i % keyLength)
      );
    }

    const deobfuscatedArtifactString = decoder.decode(deobfuscatedArtifactView);

    try {
      deobfuscatedArtifactJSON = JSON.parse(deobfuscatedArtifactString);
    } catch (err) {
      throw new Error(Messages.ARTIFACT_OBFUSCATION_ERROR);
    }

    return deobfuscatedArtifactJSON;
  }

  function deobfuscate(buffer) {
    const header = getHeader(buffer.slice(0, HEADER_BOUNDARY));

    if (header.version !== SUPPORTED_ARTIFACT_OBFUSCATION_VERSION) {
      throw new Error(Messages.ARTIFACT_INVALID);
    }

    return getArtifact(header.key, buffer.slice(HEADER_BOUNDARY));
  }

  return {
    deobfuscate
  };
}

export default ObfuscationProvider;
