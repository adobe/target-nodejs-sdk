module.exports = {
  extends: ["airbnb-base", "prettier", "plugin:jest/recommended"],
  env: {
    es6: true,
    node: true,
    "jest/globals": true
  },
  plugins: ["prettier", "jest", "@lwc/eslint-plugin-lwc"],
  rules: {
    "prettier/prettier": "error",
    "no-underscore-dangle": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    "@lwc/lwc/no-async-await": "error"
  },
  overrides: [
    {
      files: ["*.spec.js"],
      globals: {
        expectAsync: "readonly",
        fetch: true,
        window: true
      },
      rules: {
        "@lwc/lwc/no-async-await": "off"
      }
    }
  ]
};
