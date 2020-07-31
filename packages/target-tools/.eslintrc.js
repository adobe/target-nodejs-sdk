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
    "@lwc/lwc/no-async-await": "error",
    "no-restricted-properties": [
      2,
      {
        object: "Object",
        property: "assign",
        message: "Please use @adobe/target-tools assign method instead."
      },
      {
        object: "Object",
        property: "values",
        message: "Please use @adobe/target-tools values method instead."
      },
      {
        property: "includes",
        message: "Please use @adobe/target-tools includes method instead."
      },
      {
        property: "flat",
        message: "Please use @adobe/target-tools flatten method instead."
      },
      {
        property: "padStart"
      },
      {
        property: "padEnd"
      }
    ]
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
        "@lwc/lwc/no-async-await": "off",
        "no-restricted-properties": "off"
      }
    }
  ]
};
