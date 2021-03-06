import { yaml } from "mrm-core";

/** Homebound's circleci setup. */
function task() {
  yaml(".circleci/config.yml")
    .merge({
      version: 2.1,
      orbs: { node: "circleci/node@1.1.4" },
      workflows: {
        version: 2,
        workflow: {
          jobs: [{ build: { context: ["npm", "github"] } }],
        },
      },
      jobs: {
        build: {
          docker: [{ image: "circleci/node:erbium" }],
          working_directory: "~/project",
          steps: [
            "checkout",
            { run: 'echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc' },
            { "node/with-cache": { steps: [{ run: "npm install" }] } },
            { run: "npm run build" },
            { run: "npm test" },
            {
              when: {
                condition: { equal: ["main", "<<pipeline.git.branch>>"] },
                steps: [{ run: "npm run semantic-release" }],
              },
            },
          ],
        },
      },
    })
    .save();
}

export = task;
