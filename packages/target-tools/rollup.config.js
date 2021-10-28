/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import license from "rollup-plugin-license";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import visualizer from "rollup-plugin-visualizer";
import pkg from "./package.json";

const browserBabelConfig = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: [
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Safari versions"
          ]
        }
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-template-literals",
      {
        loose: true
      }
    ],
    "@babel/plugin-proposal-object-rest-spread"
  ]
};

const createConfig = (input, file, format, browser = false) => {
  const plugins = [
    json(),
    resolve(),
    commonjs(),
    license({
      banner: {
        content: {
          file: path.join(__dirname, "LICENSE_BANNER.txt")
        }
      }
    }),
    visualizer({
      filename: browser
        ? "bundlesize-stats.browser.html"
        : "bundlesize-stats.html"
    })
  ];

  if (browser) {
    plugins.push(babel(browserBabelConfig));
  } else {
    plugins.push(babel());
  }

  return {
    input,
    external: browser
      ? [
          "@adobe/reactor-object-assign",
          "@adobe/reactor-cookie",
          "@adobe/reactor-promise",
          "@adobe/reactor-query-string",
          "@adobe/reactor-load-script"
        ]
      : [],
    output: {
      name: "TargetTools",
      file,
      format
    },
    plugins
  };
};

export default [
  createConfig("src/index.js", pkg.main, "cjs", false),
  createConfig("src/index.browser.js", pkg.browser, "es", true)
];
