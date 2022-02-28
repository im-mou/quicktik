import { IGroup, IUserSettings } from '../../types';
import { groupsService } from '../groups.service';
import Database from '../../database';
import GroupFactory from '../../database/factory/group';
import UserFactory from '../../database/factory/user';

// in memory database instance
const database = Database.getInstance();

// Groups to create
const GROUPS_COUNT = 10;
const mockGroups: IGroup[] = [];
let userSettings: IUserSettings = null; // this also creates a group

beforeAll(async () => {
    database.init();

    // seed groups and user data in the database
    (await new GroupFactory(GROUPS_COUNT).bulk()).docs.forEach((group) => mockGroups.push(group));
    userSettings = await new UserFactory().create();
});

afterAll(async () => {
    await database.destroy();
});

// Tests
describe('Tests Boards service methods', () => {
    // Tests
    test('should test that boards are created correctly', async () => {
        const boards = await groupsService.getAll();
        // check length
        expect(boards.total_rows).toEqual(GROUPS_COUNT + 1);
    });

    test('should test a board search by group id', async () => {
        const id = Math.floor(Math.random() * GROUPS_COUNT);

        // Search group by id
        const board = await groupsService.getGroupById({ id: mockGroups[id]._id });

        // the found object matches the selected one
        expect(board).toMatchObject(mockGroups[id]);
        expect(board).not.toMatchObject(mockGroups[(id + 1) % GROUPS_COUNT]);
    });

    test('should select a board for the user to work with', async () => {
        const id = Math.floor(Math.random() * GROUPS_COUNT);

        // select board
        const board = await groupsService.selectGroup({ id: mockGroups[id]._id });

        // the found object matches the selected one
        expect(board).toMatchObject(mockGroups[id]);
        expect(board).not.toMatchObject(mockGroups[(id + 1) % GROUPS_COUNT]);
    });
});
