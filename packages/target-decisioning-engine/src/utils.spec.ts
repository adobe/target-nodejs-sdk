import { firstMatch, hasRemoteDependency } from "./utils";

const ARTIFACT_BLANK = require("../test/schema/artifacts/TEST_ARTIFACT_BLANK.json");

describe("utils", () => {
  const targetRequest = {
    id: {
      tntId: "338e3c1e51f7416a8e1ccba4f81acea0.28_0"
    },
    context: {
      channel: "web",
      browser: {
        host: "local-target-test"
      },
      address: {
        url: "http://local-target-test/"
      },
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
    }
  };

  describe("hasRemoteDependency", () => {
    it("is remote if mbox is in remoteMboxes array", () => {
      const artifact = {
        ...ARTIFACT_BLANK,
        remoteMboxes: ["my-remote-mbox"],
        localMboxes: ["my-local-mbox"]
      };

      const request = {
        ...targetRequest,
        prefetch: {
          mboxes: [
            {
              name: "my-remote-mbox",
              index: 1
            },
            {
              name: "my-local-mbox",
              index: 2
            }
          ]
        }
      };

      expect(hasRemoteDependency(artifact, request)).toEqual({
        remoteNeeded: true,
        remoteMboxes: ["my-remote-mbox"],
        remoteViews: []
      });
    });

    it("is remote if mbox is NOT in localMboxes array", () => {
      const artifact = {
        ...ARTIFACT_BLANK,
        remoteMboxes: [],
        localMboxes: ["my-local-mbox"]
      };

      const request = {
        ...targetRequest,
        prefetch: {
          mboxes: [
            {
              name: "my-remote-mbox",
              index: 1
            },
            {
              name: "my-local-mbox",
              index: 2
            }
          ]
        }
      };

      expect(hasRemoteDependency(artifact, request)).toEqual({
        remoteNeeded: true,
        remoteMboxes: ["my-remote-mbox"],
        remoteViews: []
      });
    });

    it("remote not needed if all requested mboxes are in the localMboxes array", () => {
      const artifact = {
        ...ARTIFACT_BLANK,
        remoteMboxes: ["my-remote-mbox"],
        localMboxes: ["my-local-mbox", "my-local-mbox2"]
      };

      const request = {
        ...targetRequest,
        prefetch: {
          mboxes: [
            {
              name: "my-local-mbox",
              index: 1
            },
            {
              name: "my-local-mbox2",
              index: 2
            }
          ]
        }
      };

      expect(hasRemoteDependency(artifact, request)).toEqual({
        remoteNeeded: false,
        remoteMboxes: [],
        remoteViews: []
      });
    });

    it("is remote if view is in remoteViews array", () => {
      const artifact = {
        ...ARTIFACT_BLANK,
        remoteViews: ["remoteView"],
        localViews: ["localView"]
      };

      const request = {
        ...targetRequest,
        prefetch: {
          views: [
            {
              name: "remoteView"
            },
            {
              name: "localView"
            }
          ]
        }
      };

      expect(hasRemoteDependency(artifact, request)).toEqual({
        remoteNeeded: true,
        remoteMboxes: [],
        remoteViews: ["remoteView"]
      });
    });

    it("is remote if view is NOT in localViews array", () => {
      const artifact = {
        ...ARTIFACT_BLANK,
        remoteViews: [],
        localViews: ["localView"]
      };

      const request = {
        ...targetRequest,
        prefetch: {
          views: [
            {
              name: "remoteView"
            },
            {
              name: "localView"
            }
          ]
        }
      };

      expect(hasRemoteDependency(artifact, request)).toEqual({
        remoteNeeded: true,
        remoteMboxes: [],
        remoteViews: ["remoteView"]
      });
    });

    it("remote not needed if all requested views are in the localViews array", () => {
      const artifact = {
        ...ARTIFACT_BLANK,
        remoteViews: ["remoteView"],
        localViews: ["localView", "localView2"]
      };

      const request = {
        ...targetRequest,
        prefetch: {
          views: [
            {
              name: "localView"
            },
            {
              name: "localView2"
            }
          ]
        }
      };

      expect(hasRemoteDependency(artifact, request)).toEqual({
        remoteNeeded: false,
        remoteMboxes: [],
        remoteViews: []
      });
    });

    it("remote needed if no view names are specified (all views requested) and remoteViews is a non-empty array", () => {
      const artifact = {
        ...ARTIFACT_BLANK,
        remoteViews: ["remoteView"],
        localViews: ["localView", "localView2"]
      };

      const request = {
        ...targetRequest,
        prefetch: {
          views: []
        }
      };

      expect(hasRemoteDependency(artifact, request)).toEqual({
        remoteNeeded: true,
        remoteMboxes: [],
        remoteViews: ["remoteView"]
      });
    });
  });

  describe("fistMatch", () => {
    it("returns default value if key is not found", () => {
      expect(firstMatch("blippi", [{}, {}, {}, {}], "not found")).toEqual(
        "not found"
      );
    });

    it("returns a value when key is found", () => {
      expect(
        firstMatch("blippi", [{}, { blippi: "hello" }, {}, {}], "not found")
      ).toEqual("hello");
    });

    it("handles invalid search objects", () => {
      expect(firstMatch("blippi", undefined, "not found")).toEqual("not found");
      expect(firstMatch("blippi")).toEqual(undefined);
      expect(firstMatch("blippi", [{}])).toEqual(undefined);
      expect(
        firstMatch("blippi", [true, false, [], "hi", { blippi: "moo" }])
      ).toEqual("moo");
    });
  });
});
