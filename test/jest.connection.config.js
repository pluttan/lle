const { testMatch } = require("./jest.testlib.config");

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "src/connection/element.ts", 
    ],
    coverageDirectory: "test/coverage/connection", 
    coverageReporters: ["html"],
    

    rootDir: '../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/test/Element/**/*.test.ts'],
};
