module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/server.ts'],
    coverageDirectory: 'test/coverage/server',
    coverageReporters: ['html', 'text'],

    rootDir: '../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/test/Server/**/*.test.ts']
};
