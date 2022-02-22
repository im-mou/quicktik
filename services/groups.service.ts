import { helpers } from '../utils/helpers';
import { IGroup, IUserConfig } from '../types';
import BaseService from './base.service';

class GroupsService extends BaseService {
    // Get all groups list
    getAll = async () => {
        return this.db.groups.allDocs();
    };

    // Get group by iid
    getGroupById = async ({ id }: { id: string }) => {
        // Get group
        return this.db.groups.get(id);
    };

    // get selected group
    getSelectedGroup = async () => {
        // get selected group id
        const selected_group = await this.db.config.get<IUserConfig>(
            this.db.constants.config.USER_CONFIG
        );

        // Get group
        return this.getGroupById({ id: selected_group.selected_group_id });
    };

    // change current selected group
    selectGroup = async ({ id }: { id: string }) => {
        // store new group value in setting table
        const config = await this.db.config.get<IUserConfig>(
            this.db.constants.config.USER_CONFIG
        );

        // Update retrieved object
        config.selected_group_id = id;

        // save changes
        const response = await this.db.config.put(config);

        if (response.ok) {
            // get group
            return this.getGroupById({ id });
        } else {
            return Promise.reject('Could not store resource');
        }
    };

    // create a new group
    createGroup = async ({ value }: { value: IGroup }) => {
        const id = helpers.uuid();

        // add group
        const response = await this.db.groups.put({
            _id: id,
            ...value
        });

        if (response.ok) {
            // get group
            return this.getGroupById({ id: response.id });
        } else {
            return Promise.reject('Could not store resource');
        }
    };
}

export const groupsService = new GroupsService();
