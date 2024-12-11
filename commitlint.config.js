async function getConfig() {
  const {
    default: {
      utils: { getProjects },
    },
  } = await import("@commitlint/config-nx-scopes");

  const dependabotScopes = ["deps", "deps-dev"];

  return {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [
        2,
        "always",
        [
          "build",
          "chore",
          "ci",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "revert",
          "style",
          "test",
        ],
      ],
      "body-max-line-length": [1, "always", 100],
      "scope-enum": async (ctx) => [
        2,
        "always",
        (await getProjects(ctx))
          .concat(dependabotScopes)
          .concat(["release", "nx"]),
      ],
    },
    // . . .
  };
}

module.exports = getConfig();
