const fs = require("fs");
const istanbulReport = require("istanbul-lib-report");
const istanbulReports = require("istanbul-reports");
const istanbulCoverage = require("istanbul-lib-coverage");

function getDirectories(path) {
  return fs.readdirSync(path).filter(function(file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

const coverageReports = getDirectories("./packages").map(
  folderName => `./packages/${folderName}/coverage/coverage-final.json`
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
