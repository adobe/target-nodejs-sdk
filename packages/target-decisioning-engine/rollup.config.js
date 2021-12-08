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
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import visualizer from "rollup-plugin-visualizer";
import pkg from "./package.json";

const tsConfig = {
  compilerOptions: {
    lib: ["es2019", "es2020.promise", "es2020.bigint", "es2020.string"],
    module: "esnext",
    target: "es2019",

    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true
  }
};

export default [
  {
    input: "src/index.ts",
    output: {
      name: "TargetDecisioningEngine",
      file: pkg.main,
      format: "cjs"
    },
    plugins: [
      json(),
      resolve(),
      commonjs(),
      babel(),
      license({
        banner: {
          content: {
            file: path.join(__dirname, "LICENSE_BANNER.txt")
          }
        }
      }),
      visualizer({
        filename: "bundlesize-stats.html"
      }),
      typescript({
        tsconfigOverride: {
          ...tsConfig
        }
      }),
      terser()
    ]
  }
];
