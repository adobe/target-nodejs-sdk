/* eslint-disable import/prefer-default-export */

export const ATTRIBUTE_NOT_EXIST = (keyName, mboxName) =>
  `Attribute '${keyName}' does not exist for mbox '${mboxName}'`;

export const DECISIONING_ENGINE_NOT_READY =
  "Unable to fulfill request; decisioning engine not ready.";

export const PROPERTY_TOKEN_MISMATCH = (requestProperty, configProperty) =>
  `The property token specified in the request "${requestProperty}" does not match the one specified in the config "${configProperty}".`;
