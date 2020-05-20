const https = require("https");
const fs = require("fs");
const path = require("path");

const clientId = "adobesummit2018";
const environment = "production";
const artifactUrl = `https://assets.adobetarget.com/${clientId}/${environment}/rules.json`;

const outputFolders = [
  path.resolve(__dirname, "../packages/target-decisioning-engine/test"),
  path.resolve(__dirname, "../packages/target-nodejs-sdk/test")
];

function fetchAndSaveArtifact() {
  const artifactLocation = `${__dirname}/artifact.json`;
  const file = fs.createWriteStream(artifactLocation);
  return new Promise((resolve, reject) => {
    https
      .get(artifactUrl, response => {
        let body = "";

        if (response.statusCode === 200) {
          response.pipe(file);
        }

        response.on("data", chunk => {
          body += chunk;
        });

        response.on("end", () => {
          resolve(JSON.parse(body));
        });
      })
      .on("error", e => {
        reject(e);
      });
  });
}

/**
 *
 * @param {"views"|"mboxes"} what
 * @param { Array<String> } activityIds
 * @param artifact
 * @return {{}}
 */
function getRules(what, activityIds, artifact) {
  const things = artifact.rules[what];
  const result = {};
  const names = Object.keys(things);

  names.forEach(name => {
    const rules = things[name];
    for (const rule of rules) {
      if (activityIds.includes(rule.meta.activityId)) {
        if (!(result[name] instanceof Array)) {
          result[name] = [];
        }

        result[name].push(rule);
      }
    }
  });

  return result;
}

function getTemplate() {
  const template = fs.readFileSync(`${__dirname}/template.js`);
  return `${template}\n`;
}

async function run() {
  const smokescreenArtifact = await fetchAndSaveArtifact();

  // https://wiki.corp.adobe.com/display/elm/Local+Decisioning%3A+Test+Artifacts
  const testArtifactDefinitions = require("./testArtifacts.json").artifacts;

  let output = getTemplate();

  testArtifactDefinitions.forEach(artifactDefinition => {
    const {
      activityIds,
      artifactFilename,
      adminUrls,
      remoteMboxes
    } = artifactDefinition;

    const artifact = {
      ...smokescreenArtifact,
      remoteMboxes: Array.from(
        new Set([...remoteMboxes, ...smokescreenArtifact.remoteMboxes])
      ),

      rules: {
        mboxes: getRules("mboxes", activityIds, smokescreenArtifact),
        views: getRules("views", activityIds, smokescreenArtifact)
      }
    };

    const [name, ext] = artifactFilename.split(".");
    if (adminUrls instanceof Array) {
      adminUrls.forEach(url => {
        output += `// ${url}\n`;
      });
    }
    output += `export const ${name} = ${JSON.stringify(artifact)}\n\n`;
  });

  outputFolders.forEach(dir => {
    fs.writeFileSync(`${dir}/decisioning-payloads.js`, output);
  });
}

run();
