module.exports = {
    silent: true,
    roots: ['.'],
    transform: {
        '.+\\.tsx?$': 'ts-jest'
    },
    testRegex: './__tests__/.*\\.spec\\.ts?$',
    setupFilesAfterEnv: ['./__tests__/setup.js'],
    maxWorkers: 1,
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    rootDir: '.'
};
