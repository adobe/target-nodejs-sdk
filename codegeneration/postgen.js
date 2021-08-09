const shell = require("shelljs");
const fs = require("fs");

const OUT_PATH = `${process.cwd()}/build`;

const readAndReplace = function (filePath, func) {
  const fileContents = fs.readFileSync(filePath, "utf8");

  const newFileContents = func(fileContents);

  fs.writeFileSync(filePath, newFileContents, "utf8");
};

const walk = function (dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + "/" + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

const files = walk(OUT_PATH);

files
  .filter(filePath => filePath.endsWith(".ts"))
  .forEach(filePath => {
    console.log(filePath);

    readAndReplace(filePath, fileContents => {
      return fileContents
        .replace(/DateFromJSON/g, "DateTimeFromJSON")
        .replace(/DateToJSON/g, "DateTimeToJSON");
    });
  });

readAndReplace(`${process.cwd()}/build/apis/DeliveryApi.ts`, fileContents => {
  return fileContents.replace(/ExecuteRequest/g, "ExecuteDeliveryRequest");
});

shell.cp("rollup.config.js", "build");
shell.cp("DateTime.ts", "build/models");
shell.cp("OneOf.ts", "build/models");

shell.cd("build");

shell.echo("export * from './DateTime';").toEnd("models/index.ts");
shell.echo("export * from './OneOf';").toEnd("models/index.ts");

shell.exec("npm i");
shell.exec("npm run build");
