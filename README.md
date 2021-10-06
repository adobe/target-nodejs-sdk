# Adobe Target Node.js SDK

[![npm](https://img.shields.io/npm/v/@adobe/target-nodejs-sdk)](https://www.npmjs.com/package/@adobe/target-nodejs-sdk)
[![npm](https://img.shields.io/npm/dm/@adobe/target-nodejs-sdk)](https://www.npmjs.com/package/@adobe/target-nodejs-sdk)
[![build](https://github.com/adobe/target-nodejs-sdk/workflows/CI/badge.svg)](https://github.com/adobe/target-nodejs-sdk/actions)
[![coveralls](https://img.shields.io/coveralls/github/adobe/target-nodejs-sdk)](https://coveralls.io/github/adobe/target-nodejs-sdk?branch=HEAD)
[![license](https://img.shields.io/npm/l/@adobe/target-nodejs-sdk.svg)](https://github.com/adobe/target-nodejs-sdk/blob/main/LICENSE)

The Adobe Target Node.js SDK uses the [Target Delivery API] to retrieve and deliver personalized experiences.
Furthermore, the Node.js SDK helps manage integrations with Experience Cloud solutions using the [Experience Cloud Identity](https://docs.adobe.com/content/help/en/id-service/using/intro/overview.html)
library (ECID).

## Table of Contents

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Super Simple to Use](#super-simple-to-use)
- [Development](#development)
- [Additional code](#additional-code)

## Getting started

### Prerequisites

All currently maintained versions of Node.js are supported (including LTS versions), see
[Node.js Releases](https://en.wikipedia.org/wiki/Node.js#Releases).  
Older Node.js releases may likely work too, but are not officially supported.

### Installation

To get started with Target Node.js SDK, just add it as a dependency by installing from NPM:

```bash
npm i @adobe/target-nodejs-sdk -P
```

### Super Simple to Use

Please take a look at [our documentation](https://adobetarget-sdks.gitbook.io/docs/sdk-reference-guides/nodejs-sdk) to learn how to use the Node.js SDK.

## Development

Check out our [Contribution guidelines](./.github/CONTRIBUTING.md) as well as [Code of Conduct](CODE_OF_CONDUCT.md) prior
to contributing to Target Node.js SDK development.

- To build the project: `npm run build`
- To run the unit tests: `npm test`
- To generate code coverage after running the tests: `npm run coverage`

## Additional code

Production dependencies include:

```json
{
  "@adobe-mcid/visitor-js-server": {
    "version": "2.0.0",
    "license": "Adobe Proprietary license"
  }
}
```

## Delivery API Client generation

The SDK depends on [Target Open API](https://github.com/adobe/target-openapi). It uses Open API and the `Open API generator` to generate the low level HTTP client.

To be able to use `Target Open API` for code generation, we are leveraging Git subtree.

To refresh the local `target-openapi` subtree, use the command:

```bash
$ git subtree pull --prefix openapi git@github.com:adobe/target-openapi.git main --squash
```

The openapi-generator tool is located in the `codegeneration` directory, but there is no need to invoke it directly. Everything is wrapped in an `npm` command (execute from project root):

```bash
npm run codegen
```

---

[back to top](#table-of-contents)

[target delivery api]: https://developers.adobetarget.com/api/delivery-api/
