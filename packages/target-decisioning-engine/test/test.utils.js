import { isPojo, isUndefined } from "@adobe/target-tools";
import * as MockDate from "mockdate";
import fs from "fs";
import path from "path";

function traverseObject(
  obj = {},
  result = {},
  parseHandler = (key, value) => value
) {
  Object.keys(obj).forEach(key => {
    if (
      Array.isArray(obj[key]) ||
      (obj[key] instanceof Object && isPojo(obj[key]))
    ) {
      // eslint-disable-next-line no-param-reassign
      result[key] = traverseObject(
        obj[key],
        Array.isArray(obj[key]) ? [] : {},
        parseHandler
      );
    } else {
      // eslint-disable-next-line no-param-reassign
      result[key] = parseHandler(key, obj[key]);
    }
  });
  return result;
}

export function prepareTestResponse(response = {}) {
  const SPECIALS = {
    "expect.any(Object)": expect.any(Object),
    "expect.any(String)": expect.any(String),
    "expect.any(Number)": expect.any(Number)
  };

  const SPECIAL_VALUES = Object.keys(SPECIALS);

  return traverseObject(response, {}, (key, value) => {
    if (SPECIAL_VALUES.indexOf(value) >= 0) {
      return SPECIALS[value];
    }

    return value;
  });
}

function hydrateArtifacts(testObj = {}, artifactFolder, artifactList) {
  return traverseObject(testObj, {}, (key, value) => {
    if (key === "artifact") {
      const artifactFilename = `${value}.json`;
      if (artifactList.indexOf(artifactFilename) === -1) return value;

      const fileContents = fs.readFileSync(
        path.resolve(artifactFolder, artifactFilename)
      );
      const artifact = JSON.parse(fileContents.toString("utf-8"));
      return artifact;
    }
    return value;
  });
}

export function expectObjectContaining(obj) {
  return expect.objectContaining(prepareTestResponse(obj));
}

export function expectToMatchObject(received, expected) {
  return expect(received).toMatchObject(prepareTestResponse(expected));
}

export function setMockDate(mockDate) {
  if (isUndefined(mockDate)) return undefined;

  const mock = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ...mockDate
  };

  const theDate = Date.UTC(
    mock.year,
    mock.month,
    mock.date,
    mock.hours,
    mock.minutes,
    mock.seconds
  );

  MockDate.set(theDate);
  return theDate;
}

const JSON_FILES = fileName => fileName.toLowerCase().endsWith(".json");

const TEST_ARTIFACTS_FOLDER = path.resolve(__dirname, "schema/artifacts");
const TEST_MODELS_FOLDER = path.resolve(__dirname, "schema/models");

export function getTestArtifacts() {
  return fs.readdirSync(TEST_ARTIFACTS_FOLDER).filter(JSON_FILES);
}

export function getTestModels() {
  return fs.readdirSync(TEST_MODELS_FOLDER).filter(JSON_FILES);
}

export function getTestSuites(testSuiteName) {
  const artifacts = getTestArtifacts();
  const testModels = getTestModels();

  return testModels
    .filter(testModelFileName =>
      isUndefined(testSuiteName)
        ? true
        : testModelFileName === `${testSuiteName}.json`
    )
    .map(testModelFileName => {
      const fileContents = fs.readFileSync(
        path.resolve(TEST_MODELS_FOLDER, testModelFileName)
      );
      const suite = JSON.parse(fileContents.toString("utf-8"));
      return hydrateArtifacts(suite, TEST_ARTIFACTS_FOLDER, artifacts);
    });
}
