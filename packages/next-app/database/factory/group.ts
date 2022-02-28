import { group } from 'console';
import Database from '..';
import { IGroup } from '../../types';
import { helpers } from '../../utils/helpers';

export default class GroupFactory {
    private count: number = 1;
    constructor(count?: number) {
        this.count = count || 1;
    }

    // generate board blueprint with random data
    private generate = (data?: Partial<IGroup>): IGroup => {
        return {
            _id: helpers.uuid(),
            label: 'board-' + helpers.uuid().slice(0, 5),
            color: helpers.randomColor(),
            ...data
        } as IGroup;
    };

    public create = async (data?: Partial<IGroup>) => {
        const instance = Database.getInstance();
        try {
            // get docs count for the order counter
            const count = await instance.settings.info();

            // create instance
            const groupsToAdd: IGroup = this.generate({ order: count.doc_count + 1, ...data });

            // add to db
            const newylyCreatedGroupResponse = await instance.groups.put<IGroup>(groupsToAdd);

            // return created instance
            return await instance.groups.get<IGroup>(newylyCreatedGroupResponse.id);
        } catch (e) {
            return Promise.reject(e);
        }
    };

    public bulk = async (data?: Partial<IGroup>) => {
        const instance = Database.getInstance();
        try {
            if (this.count <= 1) {
                throw new Error('With bulk operation count must be larger than 1');
            }

            // get docs count for the order counter
            const count = await instance.settings.info();

            const groupsToAdd: IGroup[] = [];

            // create boards instances
            [...Array(this.count).keys()].forEach((_, index) => {
                groupsToAdd.push(this.generate({ order: count.doc_count + index + 1, ...data }));
            });

            // buck add to db
            const newylyCreatedGroupResponses = await instance.groups.bulkDocs<IGroup>(groupsToAdd);

            // return created instance
            return instance.groups.find({
                selector: {
                    _id: { $in: newylyCreatedGroupResponses.map((group) => group.id) }
                }
            });
        } catch (e) {
            return Promise.reject(e);
        }
    };
}
