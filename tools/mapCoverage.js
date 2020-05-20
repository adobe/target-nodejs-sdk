const fs = require("fs");
const path = require("path");
const istanbulReport = require("istanbul-lib-report");
const istanbulReports = require("istanbul-reports");
const istanbulCoverage = require("istanbul-lib-coverage");

const packagesFolder = path.resolve(__dirname, "../packages/");

function getDirectories(path) {
  return fs.readdirSync(path).filter(function(file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

const coverageReports = getDirectories(packagesFolder).map(
  folderName => `${packagesFolder}/${folderName}/coverage/coverage-final.json`
);

const map = istanbulCoverage.createCoverageMap();

const mapFileCoverage = fileCoverage => {
  fileCoverage.path = fileCoverage.path.replace(
    /(.*packages\/.*\/)(build)(\/.*)/,
    "$1src$3"
  );
  return fileCoverage;
};

coverageReports.forEach(coverageReport => {
  const coverage = require(coverageReport);
  Object.keys(coverage).forEach(filename =>
    map.addFileCoverage(mapFileCoverage(coverage[filename]))
  );
});

const context = istanbulReport.createContext({ coverageMap: map });

["json", "lcov", "text"].forEach(reporter =>
  istanbulReports.create(reporter, {}).execute(context)
);
