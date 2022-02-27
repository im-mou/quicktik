import Database from 'database';
import { IGroup } from '../../types';
import { helpers } from '../../utils/helpers';
import { groupsService } from '../groups.service';

// in memory database instance
const database = new Database({}, '-test-db');

// Create dummy data
const randomHexColor = helpers.randomColor();

// Groups
const fakeBoards: IGroup[] = [...Array(10).keys()].map((item) => ({
    _id: helpers.uuid(),
    label: 'test-group-' + item,
    color: randomHexColor,
    order: item
}));

// console.error(fakeBoards);
// console.error(PouchDB.defaults());

// Tests
describe('Tests Boards service', () => {
    beforeAll(() => {
        database.init();
    });

    afterAll(async () => {
        await database.destroy();
    });

    // Tests
    test('should test that boards are created correctly', () => {
        // Create boards
        const promises = fakeBoards.map((group) => new Promise(() => groupsService.createGroup({ value: group })));

        Promise.all(promises).then(() => {
            groupsService.getAll().then((boards) => {
                // check length
                expect(boards.total_rows).toEqual(fakeBoards.length);
            });
        });
    });

    test.only('should test a board search by group id', async () => {
        const radomFakeBoard = fakeBoards[Math.floor(Math.random() * 10)];

        console.error(radomFakeBoard);

        // expect(true).toBeFalsy();
        // Search group by id
        const board = await groupsService.getGroupById({ id: radomFakeBoard._id });

        console.error(board);
        // the found object matches the selected one
        expect(true).toBeFalsy();
        // expect(board).toMatchObject(radomFakeBoard);
    });

    test('should select a board for the user to work with', () => {
        const radomFakeBoard = fakeBoards[Math.floor(Math.random() * 10)];

        // select board
        groupsService.selectGroup({ id: radomFakeBoard._id }).then((board) => {
            // the found object matches the selected one
            expect(board).toMatchObject(radomFakeBoard);
        });
    });
});
