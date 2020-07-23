const baseConfig = require("@adobe/target-tools/.eslintrc.js");

const config = {
  ...baseConfig
};

config.overrides.push({
  files: ["*.js"],
  rules: {
    "@lwc/lwc/no-async-await": "off"
  }
});

module.exports = config;
