// #!/usr/bin/env node
// const { readFile } = require("fs");
//
// async function run() {
//   // const dir =
//   //   process.env.WORKSPACE ||
//   //   process.env.GITHUB_WORKSPACE ||
//   //   "/github/workspace";
//   //
//   // const eventFile =
//   //   process.env.GITHUB_EVENT_PATH || "/github/workflow/event.json";
//   // const eventObj = await readJson(eventFile);
//
//   debugger;
// }
//
// async function readJson(file) {
//   const data = await new Promise((resolve, reject) =>
//     readFile(file, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     })
//   );
//   return JSON.parse(data);
// }
//
// run();
const core = require("@actions/core");
const github = require("@actions/github");

const ACCEPTABLE_VERSION_BUMP_OPTIONS = ["major", "minor", "patch"];

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  const versionBump = core.getInput("version-to-bump");

  if (!ACCEPTABLE_VERSION_BUMP_OPTIONS.includes(versionBump.toLowerCase())) {
    throw new Error(
      `${versionBump} is not valid.  Valid options are: ${ACCEPTABLE_VERSION_BUMP_OPTIONS.join(
        ", "
      )}`
    );
  }

  console.log(`Hello ${nameToGreet} ${versionBump}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
