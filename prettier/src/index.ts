import { packageJson, install } from "mrm-core";

/** Homebounds prettier setup. */
function task() {
  const pkg = packageJson();
  pkg.setScript("format", "prettier --write 'src/**/*.{ts,js,tsx,jsx}'");
  // We prefer the `prettier` key in `package.json` b/c:
  // - it avoids extra files
  // - we can use merge
  // - its unlikely we'll need comments
  pkg.merge({
    prettier: {
      trailingComma: "all",
      printWidth: 120,
    },
  });
  pkg.save();
  install("prettier");
}

export = task;
