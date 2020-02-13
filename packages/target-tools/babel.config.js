module.exports = {
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
      exclude: "node_modules/**",

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
