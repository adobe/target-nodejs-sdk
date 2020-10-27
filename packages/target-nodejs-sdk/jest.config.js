const baseConfig = require("@adobe/target-tools/jest.config.js");

module.exports = {
  ...baseConfig,
  setupFiles: ["core-js", "./jest.polyfills.js"]
};
