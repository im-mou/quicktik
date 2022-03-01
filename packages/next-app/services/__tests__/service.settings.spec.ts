import { settingsService } from '../settings.service';
import { groupsService } from '../groups.service';

import Database from '../../database';
import UserSettingsFactory from '../../database/factory/userSettings';
import GroupFactory from '../../database/factory/group';
import { IGroup } from '../../types';

// in memory database instance
const database = Database.getInstance();

// mock info
let mockGroupObject: IGroup = new GroupFactory().object();
const userName = 'test-user';

beforeAll(async () => {
    await database.init();
});

afterAll(async () => {
    await database.destroy();
});

// Tests
describe('Tests while app is not initialized', () => {
    test('should test that USER SETTINGS initial values are created', async () => {
        // seed user data in the database
        const userSettings = await new UserSettingsFactory().create();

        // Test user settings
        const dbUserSettings = await settingsService.getUserSettings();

        expect(dbUserSettings).not.toBeUndefined();
        expect(dbUserSettings).toMatchObject(userSettings);
    });

    test('should test that APP SETTINGS initial values are created', async () => {
        // Test app settings
        const appSettings = await settingsService.getAppSettings();

        // By default, app is considered not initialized until the user creates a profile
        expect(appSettings.app_is_initialized).not.toBe(1);
        expect(appSettings.initialization_timestamp).not.toBeUndefined();
        expect(appSettings.app_version).not.toBeUndefined();
    });

    test('should test if app is initialized', async () => {
        const initialized = await settingsService.isAppInitialized();
        expect(initialized).toBeFalsy();
    });
});

describe('Tests while app has been initialized', () => {
    test('should not initialize app data with out any parametes', () => {
        expect(
            settingsService.initializeAppData({
                group: undefined,
                userData: undefined
            })
        ).rejects.toThrow();
    });

    test('should initialize app with complete initial data', async () => {
        // Initialize app
        await settingsService.initializeAppData({
            group: mockGroupObject,
            userData: {
                name: userName
            }
        });

        expect(settingsService.isAppInitialized()).resolves.toBeTruthy();
    });

    test('should verify user data is correct', async () => {
        // Verify newly created group and user data
        const userSettings = await settingsService.getUserSettings();

        expect(userSettings.selected_group_id).toBe(mockGroupObject._id);
        expect(userSettings.name).toBe(userName);
    });

    test('should verify group data is correct', async () => {
        // Check if group was correctly added
        const dbGroup = await groupsService.getGroupById({
            id: mockGroupObject._id
        });

        expect(dbGroup).toMatchObject(mockGroupObject);
    });
});
