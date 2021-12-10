import fs from "fs";
import path from "path";
import ObfuscationProvider from "./obfuscationProvider";
import Messages from "./messages";

describe("obfuscationProvider", () => {
  const testArtifactsDirectory = path.resolve(__dirname, "../test/artifact");

  const artifact = JSON.parse(
    fs.readFileSync(`${testArtifactsDirectory}/rules.json`, "utf-8")
  );

  it("can deobfuscate", () => {
    const obfuscationProvider = ObfuscationProvider({
      client: "targettesting",
      organizationId: "74F652E95F1B16FE0A495C92@AdobeOrg"
    });

    expect.assertions(1);
    return new Promise((done: Function) => {
      fs.readFile(
        `${testArtifactsDirectory}/rules.bin`,
        null,
        (err, obfuscatedArtifact) => {
          const result = obfuscationProvider.deobfuscate(
            obfuscatedArtifact.buffer
          );
          expect(result).toMatchObject(artifact);
          done();
        }
      );
    });
  });

  it("throws an error if cannot deobfuscate (invalid key)", () => {
    expect.assertions(1);
    const obfuscationProvider = ObfuscationProvider({
      client: "targettesting",
      organizationId: "74F652E95F1B16FE0A495C92@InvalidOrg"
    });

    return new Promise((done: Function) => {
      fs.readFile(
        `${testArtifactsDirectory}/rules.bin`,
        null,
        (err, obfuscatedArtifact) => {
          expect(() =>
            obfuscationProvider.deobfuscate(obfuscatedArtifact.buffer)
          ).toThrow(new Error(Messages.ARTIFACT_OBFUSCATION_ERROR));
          done();
        }
      );
    });
  });
});
