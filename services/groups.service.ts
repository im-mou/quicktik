import { helpers } from '../common/helpers';
import Database from '../database';
import { IGroup } from '../types';
import BaseService from './base.service';

class GroupsService extends BaseService {
    // Get all groups list
    getAll = async () => {
        return this.db.groups.table.allDocs();
    };

    // Get group by iid
    getGroupById = async ({ id }: { id: string }) => {
        // Get group
        return this.db.groups.table.get(id);
    };

    // get selected group
    getSelectedGroup = async () => {
        // get selected group id
        const selected_group = await this.db.userSettings.table.get(
            this.db.userSettings.keys.SELECTED_GROUP_ID
        );

        // Get group
        return this.getGroupById({ id: selected_group.selected_group_id });
    };

    // get selected group
    selectGroup = async ({ id }: { id: string }) => {
        // select group
        const response = await this.db.userSettings.table.put({
            _id: this.db.userSettings.keys.SELECTED_GROUP_ID,
            selected_group_id: id
        });

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
        const response = await this.db.groups.table.put({
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
