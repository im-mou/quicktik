import { settingsService } from '../services/settings.service';
import TestDatabase from './initilizeTestDatabase';

const database = new TestDatabase();

beforeEach(() => {
    jest.setTimeout(1000 * 200);
    database.init();
});

afterEach(async () => {
    await database.db.destroy();
});

test('should test that user-config initial values are created', async () => {
    jest.setTimeout(1000 * 200);
    // Test user-config
    const user_config = await settingsService.getUserSettings();
    expect(user_config).not.toBeUndefined();
    expect(user_config._id).not.toBeUndefined();
    expect(typeof user_config._id).toBe('string');
});

// test('should test that app-config has ben initialized', async () => {

//     // Test app-config
//     // database.db.config.get(database.db.constants.USER_CONFIG).then((data) => {
//     //     expect(data._id).toBeUndefined();
//     // });
// });
