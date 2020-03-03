const baseConfig = require("@adobe/target-tools/jest.config.js");

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/generated-delivery-api-client/"
  ]
};
