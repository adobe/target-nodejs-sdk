const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const clientId = "adobesummit2018";
const organizationId = "65453EA95A70434F0A495D34@AdobeOrg";
const environment = "production";

const TargetDecisioningEngine = require("../packages/target-decisioning-engine/dist/index");

const outputFolder = path.resolve(
  __dirname,
  "../packages/target-decisioning-engine/test/test-artifacts"
);

function fetchAndSaveArtifact() {
  const artifactLocation = `${__dirname}/artifact.json`;

  return TargetDecisioningEngine({
    client: clientId,
    organizationId,
    environment,
    pollingInterval: 0,
    fetchApi: fetch
  }).then(decisioningEngine => {
    const artifact = decisioningEngine.getRawArtifact();
    fs.writeFileSync(
      artifactLocation,
      prettier.format(JSON.stringify(artifact), { parser: "json" })
    );

    return artifact;
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
      if (activityIds.includes(rule.meta["activity.id"])) {
        if (!(result[name] instanceof Array)) {
          result[name] = [];
        }

        result[name].push(rule);
      }
    }
  });

  return result;
}

async function run() {
  const smokescreenArtifact = await fetchAndSaveArtifact();

  // https://wiki.corp.adobe.com/display/elm/Local+Decisioning%3A+Test+Artifacts
  const testArtifactDefinitions = require("./testArtifacts.json").artifacts;

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

    fs.writeFileSync(
      `${outputFolder}/${artifactFilename}`,
      prettier.format(
        JSON.stringify({
          "**TEST--targetAdminUrls**":
            adminUrls instanceof Array ? adminUrls : [],
          ...artifact
        }),
        { parser: "json" }
      )
    );
  });
}

run();
