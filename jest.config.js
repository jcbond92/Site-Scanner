/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: "ts-jest/presets/js-with-babel",
  transform: { "^.+\\.(ts|js)$": "ts-jest" },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transformIgnorePatterns: ["node_modules/(?!@mymodule)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.js?$": "babel-jest",
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
