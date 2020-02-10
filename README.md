# Adobe Target Node.js SDK

## Packages
This is a mono repo with multiple javascript target modules.

### target-nodejs-sdk
View the SDK readme [here](packages/target-nodejs-sdk/README.md)

```./packages/target-nodejs-sdk```

### target-decisioning-engine
WIP

`./packages/target-decisioning-engine`

### target-tools
Common tools and configurations shared across packages

`./packages/target-tools`

## Building

This repo uses [lerna](https://lerna.js.org) to build and link packages automatically.

1. Clone this repo.
1. Install lerna globally. `npm install --global lerna`
1. Run `lerna bootstrap` from the root of the repo.  This links relevant packages together as needed.
1. Run `npm run build` to build all packages

