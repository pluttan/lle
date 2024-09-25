module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],  
    setupFiles: ['./test/testlib/UpdateVersion.js'],
};
