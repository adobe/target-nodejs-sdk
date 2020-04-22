# Adobe Target Node.js SDK ( Alpha )

Thank you for taking the time to try the alpha version of the Adobe Target Node.js SDK.  This version of the SDK includes the new local execution mode and `getAttributes` functionality.  This document will help you get started.


## Getting started

### Existing Projects

If you already have a project that uses a current version of target-nodejs-sdk, you can try the alpha by simply finding the target-nodejs-sdk entry in the dependencies section of package.json, and set it's value to "alpha".

```json
{  
  "dependencies": {
    "@adobe/target-nodejs-sdk": "alpha"
  }
}
```

Then run `npm install` and you'll have the latest alpha installed.

### New Projects

If you are adding the SDK to a new project for the first time, simply run `npm install @adobe/target-nodejs-sdk@alpha` from the command line and you're all set.

## Local execution mode

Take a look at the following resources to learn about local execution mode and how it works.

- [All about local execution mode](./README.md#local-execution-mode)
- Sample project: [Local execution sample](https://github.com/jasonwaters/target-nodejs-sdk-samples/tree/master/local-execution)


### Decisioning Artifact

The decisioning artifact is a JSON definition file that describes target activity rules.  This artifact is used in local execution mode to determine experience outcomes locally rather than make a request to the delivery API.  In the future, this artifact will be automatically built and distributed by the target infrastructure so the SDK can magically discover and consume it.  But during the alpha, you will need to manually generate an artifact and supply it to the SDK on instantiation.

#### Generating the artifact

First, set up the artifact tool to run on your machine.

1. Download the [target-Ld-artifact-tool](http://files.jasonwaters.dev.s3.amazonaws.com/target-ld-artifact-tool.zip).
2. Extract the zip file and switch to the directory where the files were extracted.
3. Run `npm install`.  
2. Follow the instructions in README.md (it's in the the folder of extracted files) to configure the tool to work with Adobe I/O.  This includes setting some environment variables.

Then, to generate an artifact...

1. Identify which target activities to include in the artifact.  You can find the `activityId` for any activity on it's details page inthe [Target Admin UI](https://experience.adobe.com/).
2. In a terminal, navigate to the directory where you cloned the artifact generation tool.
3. Run `node . activityId,activityId,...` 
4. Find the generated artifact file in `./rules.json`. 

#### Configuring the SDK with the artifact

You can provide the artifact to the SDK in the configuration options when creating the `TargetClient`.  This can be done in one of two ways.  

The first way is by specifying `artifactPayload` in the config options.  This is the most efficient way, as the SDK will not need to make a request for the artifact on it's own.  

```js
const CONFIG = {
    executionMode: "local",
    artifactPayload: require("./sampleRules"), // loads sampleRules.json and provides it to TargetClient
    clientReadyCallback: targetReady
};

const targetClient = TargetClient.create(CONFIG);

function targetReady() {
    // make getOffers requests
    // targetClient.getOffers({...})            
}
```

The second way is by specifying `artifactLocation` in the config options.  When you provide a fully qualified URL to an artifact file, the SDK will load it on initialization.  

```js
const CONFIG = {
    executionMode: "local",
    artifactLocation: "http://cdn.mywebsite.com/path/to/decisioning/rules.json", // provide a URL for the SDK to load the artifact from
    clientReadyCallback: targetReady
};

const targetClient = TargetClient.create(CONFIG);

function targetReady() {
    // make getOffers requests
    // targetClient.getOffers({...})            
}
```

Remember, during the alpha, one of the above two methods must be used to tell the SDK where to get an artifact.  But after public release, it will be optional.


## getAttributes

- [All about the new getAttributes method](./README.md#targetclientgetattributes)

- Sample project: [Feature flag sample](https://github.com/jasonwaters/target-nodejs-sdk-samples/tree/master/feature-flag)

