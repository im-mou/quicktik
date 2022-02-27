import TestDatabase from '../../database/testDatabase';
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

    test('should test that user-config initial values are created', () => {
        // Test user-config
        settingsService.getUserSettings().then((user_config) => {
            expect(user_config).not.toBeUndefined();
            expect(user_config._id).not.toBeUndefined();
            expect(typeof user_config._id).toBe('string');
        });
    });

    test('should test that app-config initial values are created', () => {
        // Test user-config
        settingsService.getAppSettings().then((app_config) => {
            expect(app_config).not.toBeUndefined();
            expect(app_config._id).not.toBeUndefined();
            expect(typeof app_config._id).toBe('string');

            // App is not initializde yet
            expect(app_config.app_is_initialized).not.toBe(1);
            expect(app_config.app_version).not.toBeUndefined();
            expect(typeof app_config.initialization_timestamp).toBe('number');
        });
    });

    test('should test if app is initialized', () => {
        settingsService.isAppInitialized().then((response) => {
            expect(response).toBeFalsy();
        });
    });
});

describe('Tests while app has been initialized', () => {
    beforeEach(() => {
        database.init();
    });

    beforeEach(async () => {
        await database.db.destroy();
    });

    test('should not initialize app data with out any parametes', () => {
        expect(
            settingsService.initializeAppData({
                group: undefined,
                userData: undefined
            })
        ).rejects.toThrow();
    });

    describe('Tests initialized app', () => {
        test('should initialize app with complete initial data', () => {
            // Initialize app
            settingsService
                .initializeAppData({
                    group: newGroup,
                    userData: newUser
                })
                .then(() => {
                    // app is initialized
                    expect(settingsService.isAppInitialized()).resolves.toBeTruthy();
                });
        });

        test('should verify user data is correct', () => {
            // Verify newly created group and user data
            settingsService.getUserSettings().then((userSettings) => {
                expect(userSettings.selected_group_id).toBe(newGroup._id);
                expect(userSettings.name).toBe(newUser.name);
            });
        });

        test('should verify group data is correct', () => {
            // Check if group was correctly added
            groupsService
                .getGroupById({
                    id: newGroup._id
                })
                .then((group) => {
                    expect(group).toMatchObject(newGroup);
                });
        });
    });
});
