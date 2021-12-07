module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-object-spread": "off",
    "prefer-spread": "off",
    "no-underscore-dangle": "off",
    "curly": ["error", "all"],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": "allow-with-description",
        "minimumDescriptionLength": 3
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
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
        "no-restricted-properties": "off",
        "no-async-promise-executor": "off",
        "jest/expect-expect": [
          "error",
          {
            assertFunctionNames: [
              "expect",
              "expectObjectContaining",
              "expectToMatchObject"
            ]
          }
        ]
      }
    }
  ]
};
//
// module.exports = {
//   extends: ["airbnb-base", "prettier", "plugin:jest/recommended"],
//   env: {
//     "es6": true,
//     "node": true,
//     "jest/globals": true
//   },
//   plugins: ["prettier", "jest", "@lwc/eslint-plugin-lwc"],
//   rules: {
//     "prettier/prettier": "error",
//     "prefer-object-spread": "off",
//     "prefer-spread": "off",
//     "no-underscore-dangle": "off",
//     "curly": ["error", "all"],
//     "import/no-extraneous-dependencies": [
//       "error",
//       {
//         devDependencies: true,
//         optionalDependencies: false,
//         peerDependencies: false
//       }
//     ],
//     "@lwc/lwc/no-async-await": "error",
//     "no-restricted-properties": [
//       2,
//       {
//         object: "Object",
//         property: "assign",
//         message: "Please use @adobe/target-tools assign method instead."
//       },
//       {
//         object: "Object",
//         property: "values",
//         message: "Please use @adobe/target-tools values method instead."
//       },
//       {
//         property: "includes",
//         message: "Please use @adobe/target-tools includes method instead."
//       },
//       {
//         property: "flat",
//         message: "Please use @adobe/target-tools flatten method instead."
//       },
//       {
//         property: "padStart"
//       },
//       {
//         property: "padEnd"
//       }
//     ]
//   },
//   overrides: [
//     {
//       files: ["*.spec.js"],
//       globals: {
//         expectAsync: "readonly",
//         fetch: true,
//         window: true
//       },
//       rules: {
//         "@lwc/lwc/no-async-await": "off",
//         "no-restricted-properties": "off",
//         "no-async-promise-executor": "off",
//         "jest/expect-expect": [
//           "error",
//           {
//             assertFunctionNames: [
//               "expect",
//               "expectObjectContaining",
//               "expectToMatchObject"
//             ]
//           }
//         ]
//       }
//     }
//   ]
// };
