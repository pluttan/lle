const { testMatch } = require("./jest.testlib.config");

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/test/Element/**/*.test.ts'],
};
