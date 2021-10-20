/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: "ts-jest/presets/js-with-babel",
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transformIgnorePatterns: ["node_modules/(?!@mymodule)"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
};
