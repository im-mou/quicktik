import { IGroup } from '../../types';
import { groupsService } from '../groups.service';
import Database from '../../database';
import GroupFactory from '../../database/factory/group';
import UserSettingsFactory from '../../database/factory/userSettings';

// in memory database instance
const database = Database.getInstance();

// mock info
const GROUPS_COUNT = 10;
const mockGroups: IGroup[] = [];

beforeAll(async () => {
    // in memory database instance
    await database.init();

    // seed groups data in the database
    (await new GroupFactory(GROUPS_COUNT).bulk()).docs.forEach((group) => mockGroups.push(group));
});

afterAll(async () => {
    await database.destroy();
});

// Tests
describe('Tests Boards serivce methods', () => {
    // Tests
    test('should test that boards are created correctly', async () => {
        const boards = await groupsService.getAll();
        // check length
        expect(boards.total_rows).toEqual(GROUPS_COUNT);
    });

    test('should test a board search by group id', async () => {
        const idx = Math.floor(Math.random() * GROUPS_COUNT);
        const group = mockGroups[idx];

        // Search group by id
        const board = await groupsService.getGroupById({ id: group._id });

        // the found object matches the selected one
        expect(board).toMatchObject(group);
        expect(board).not.toMatchObject(mockGroups[(idx + 1) % GROUPS_COUNT]);
    });

    test('should select a board for the user to work with', async () => {
        const idx = Math.floor(Math.random() * GROUPS_COUNT);
        const group = mockGroups[idx];

        // seed user data in the database
        await new UserSettingsFactory().create({
            selected_group_id: group._id
        });

        // select board
        const board = await groupsService.selectGroup({ id: group._id });

        // the found object matches the selected one
        expect(board).toMatchObject(group);
        expect(board).not.toMatchObject(mockGroups[(idx + 1) % GROUPS_COUNT]);
    });
});
