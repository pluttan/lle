module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts', // Укажите файлы для сбора покрытия
        '!src/**/*.d.ts' // Исключите определенные файлы, если нужно
    ],
    coverageDirectory: 'test/coverage/awotl',
    coverageReporters: ['html', 'text'],

    rootDir: '../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testPathIgnorePatterns: ['test/testlib/'] // Изменено на корректный путь
};
