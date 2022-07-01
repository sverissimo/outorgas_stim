/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  //preset: 'ts-jest',
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      useESM: true
    },
    extensionsToTreatAsEsm: ['.ts', '.js'],
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Adding this line solved the issue
      "^.+\\.tsx?$": "ts-jest"
    }
  }
};
