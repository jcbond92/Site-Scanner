// node ./examples/status-checker.mjs
import { statusChecker } from "../.build/index.js";

const config = {
  url: "https://www.google.com",
  path: "./examples/results.json",
};

statusChecker(config);
