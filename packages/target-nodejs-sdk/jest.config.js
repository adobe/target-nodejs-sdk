const baseConfig = require("@adobe/target-tools/jest.config.js");

module.exports = {
  ...baseConfig,
  collectCoverageFrom: ["src/**/{!(*_pb|constants),}.js"],
  preset: "ts-jest",
  setupFiles: ["core-js", "./jest.polyfills.js"],
  transform: {
    "^.+\\.(ts|js)$": "ts-jest"
  }
};
