import { settingsService } from '../services/settings.service';
import TestDatabase from './initilizeTestDatabase';

const database = new TestDatabase();
database.init();

afterAll(async () => {
    await database.db.destroy();
});

test('should test that user-config initial values are created', async () => {
    // Test user-config
    let user_config = await settingsService.getUserSettings();
    expect(user_config).not.toBeUndefined();
    expect(user_config._id).not.toBeUndefined();
    expect(typeof user_config._id).toBe('string');
}, 30000);

// test('should test that app-config has ben initialized', async () => {

//     // Test app-config
//     // database.db.config.get(database.db.constants.USER_CONFIG).then((data) => {
//     //     expect(data._id).toBeUndefined();
//     // });
// });
