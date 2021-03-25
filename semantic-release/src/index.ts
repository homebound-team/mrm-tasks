import { yaml, install, packageJson } from "mrm-core";

/** Homebound's semantic release setup. */
function task() {
  // We prefer the `release` key in package.json so that we can:
  // - avoid extra files
  // - use mrm's merge
  // - it's unlikely we'll need comments
  packageJson()
    .merge({
      release: {
        branches: ["main"],
        plugins: [
          ["@semantic-release/commit-analyzer", { preset: "conventionalcommits" }],
          ["@semantic-release/release-notes-generator", { preset: "conventionalcommits" }],
          "@semantic-release/npm",
          "@semantic-release/github",
        ],
      },
    })
    .appendScript("semantic-release", "semantic-release")
    .save();

  install(["conventional-changelog-conventionalcommits", "semantic-release"], { dev: true });

  yaml(".github/workflows/conventional-commit-pr-title.yml")
    .merge({
      name: "Validate PR Title",
      on: {
        pull_request_target: {
          types: ["opened", "reopened", "edited", "synchronize"],
        },
      },
      jobs: {
        validate_pr_title: {
          "runs-on": "ubuntu-latest",
          steps: [
            {
              uses: "amannn/action-semantic-pull-request@v3.1.0",
              env: { GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}" },
            },
          ],
        },
      },
    })
    .save();
}

export = task;
