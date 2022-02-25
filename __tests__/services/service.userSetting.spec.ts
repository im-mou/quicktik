import TestDatabase from '../initilizeTestDatabase';
import { settingsService } from '../../services/settings.service';
import { IGroup } from '../../types';
import { helpers } from '../../utils/helpers';
import { groupsService } from '../../services/groups.service';

// in memory database instance
const database = new TestDatabase();

// Create dummy data
const randomHexColor = helpers.randomColor();

// Group
const newGroup: IGroup = {
    _id: helpers.uuid(),
    label: 'test-group-1',
    color: randomHexColor,
    order: 0
};

// User data
const newUser = {
    name: 'test-user-1'
};

// Tests
describe('Tests while app is not initialized', () => {
    beforeAll(() => {
        database.init();
    });

    afterAll(async () => {
        await database.db.destroy();
    });

    test('should test that user-config initial values are created', async () => {
        // Test user-config
        let user_config = await settingsService.getUserSettings();
        expect(user_config).not.toBeUndefined();
        expect(user_config._id).not.toBeUndefined();
        expect(typeof user_config._id).toBe('string');
    });

    test('should test that app-config initial values are created', async () => {
        // Test user-config
        let app_config = await settingsService.getAppSettings();

        expect(app_config).not.toBeUndefined();
        expect(app_config._id).not.toBeUndefined();
        expect(typeof app_config._id).toBe('string');

        // App is not initializde yet
        expect(app_config.app_is_initialized).not.toBe(1);
        expect(app_config.app_version).not.toBeUndefined();
        expect(typeof app_config.initialization_timestamp).toBe('number');
    });

    test('should test if app is initialized', async () => {
        let response = await settingsService.isAppInitialized();
        expect(response).toBeFalsy();
    });
});

describe('Tests while app has been initialized', () => {
    beforeEach(() => {
        database.init();
    });

    beforeEach(async () => {
        await database.db.destroy();
    });

    test('should not initialize app data with out any parametes', async () => {
        await expect(
            settingsService.initializeAppData({
                group: undefined,
                userData: undefined
            })
        ).rejects.toThrow();
    });

    describe('Tests initialized app', () => {
        test('should initialize app with complete initial data', async () => {
            // Initialize app
            await settingsService.initializeAppData({
                group: newGroup,
                userData: newUser
            });

            // app is initialized
            await expect(
                settingsService.isAppInitialized()
            ).resolves.toBeTruthy();
        });

        test('should verify user data is correct', async () => {
            // Verify newly created group and user data
            const userSettings = await settingsService.getUserSettings();

            expect(userSettings.selected_group_id).toBe(newGroup._id);
            expect(userSettings.name).toBe(newUser.name);
        });

        test('should verify group data is correct', async () => {
            // Check if group was correctly added
            const group = await groupsService.getGroupById({
                id: newGroup._id
            });
            expect(group).toMatchObject(newGroup);
        });
    });
});
