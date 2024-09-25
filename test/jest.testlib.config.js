module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],  
    setupFiles: ['./testlib/UpdateVersion.js'],
    testMatch: ['**/test/testlib/**/*.test.ts'],
};
