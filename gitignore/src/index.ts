import { lines } from "mrm-core";

/** Homebound's gitignore. */
function task() {
  const add = ["node_modules/", ".DS_Store", "/.idea/", "/dist/", "/coverage/"];
  lines(".gitignore").add(add).save();
}

export = task;
