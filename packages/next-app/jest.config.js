module.exports = {
    silent: false,
    verbose: true,
    roots: ['.'],
    transform: {
        '.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '.*\\.spec\\.ts?$',
    setupFilesAfterEnv: ['./__mocks__/setup.js'],
    maxWorkers: 1,
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    rootDir: '.',
    globalSetup: './__mocks__/setupEnv.ts'
};
