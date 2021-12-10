const baseConfig = require("@adobe/target-tools/.eslintrc.js");

module.exports = {
  ...baseConfig,
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"]
};
