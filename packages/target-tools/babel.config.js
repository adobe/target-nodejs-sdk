module.exports = {
  inputSourceMap: true,
  sourceMaps: true,
  ignore: ["node_modules/**"],
  env: {
    development: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current"
            }
          }
        ]
      ]
    },
    production: {
      exclude: [/\/core-js\//],

      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            corejs: 3,
            modules: false,
            targets: {
              node: "current",
              browsers: [
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Safari versions",
                "Explorer >= 10"
              ]
            }
          }
        ]
      ],
      plugins: []
    }
  }
};
