const baseConfig = require("@adobe/target-tools/babel.config.js");

const config = {
  ...baseConfig
};

// config.env.production.plugins.push("@babel/plugin-transform-regenerator");

module.exports = config;
