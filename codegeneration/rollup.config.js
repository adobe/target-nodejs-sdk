import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "index.ts",
  output: {
    file: pkg.main,
    format: "es",
    sourcemap: true
  },
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    json(),
    resolve(),
    commonjs(),
    typescript({
      typescript: require("typescript")
    })
  ]
};
