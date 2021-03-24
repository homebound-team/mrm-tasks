import { file, install, json, packageJson } from "mrm-core";

/**
 * Homebound's basic TypeScript setup.
 *
 * Kinda of library-ish, doesn't assume create-react-app or backend.
 *
 * We assume that we want jest/ts-jest as well.
 */
function task() {
  json("tsconfig.json").merge({ extends: "@homebound/tsconfig/tsconfig.json" }).save();

  packageJson()
    .merge({
      main: "./dist/index.js",
      types: "./dist/index.d.ts",
      files: ["dist", "!dist/**/*.test.*"],
    })
    .appendScript("build", "tsc")
    .appendScript("test", "jest")
    .save();

  install(["@homebound/tsconfig", "typescript", "@types/jest", "jest", "ts-jest"], { dev: true });

  // We use a jest.config.js because it's likely we'll want to
  // have customizations that might require comments
  file("jest.config.js").save(jestConfig);
}

const jestConfig = `module.exports = {
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx,js,jsx}"],
  moduleNameMapper: {
    "^src(.*)": "<rootDir>/src$1",
  },
};
`;

export = task;
