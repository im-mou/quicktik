import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    silent: true,
    roots: ['.'],
    transform: {
        '.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '/__tests__/.*\\.spec\\.tsx?$',
    setupFilesAfterEnv: ['./__tests__/setup.js'],
    maxWorkers: 1,
    globals: {
        'ts-jest': {
            isolatedModules: true
        }
    }
};

export default config;
