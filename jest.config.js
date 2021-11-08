/**
 * @type {jest.ProjectConfig}
 */
module.exports = {
  roots: ["<rootDir>/test"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
};
