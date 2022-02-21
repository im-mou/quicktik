import Database from '../database';
import { IGroup } from '../types';
import BaseService from './base.service';

class GroupsService extends BaseService {
    private GROUPS_TABLE = new Database().groupsTable;
    private USER_SETTING_TABLE = new Database().userSettingsTable;

    // Get all groups list
    getAll = async () => {
        return this.request.all<IGroup[]>(this.GROUPS_TABLE);
    };

    // get selected group
    getSelectedGroup = async () => {
        // get selected group id
        const response = await this.request.get<string>(
            this.USER_SETTING_TABLE.table,
            this.USER_SETTING_TABLE.keys.SELECTED_GROUP_ID
        );
        return this.request.get<IGroup>(this.GROUPS_TABLE, response.data);
    };

    // get selected group
    selectGroup = async ({ id }: { id: string }) => {
        // select group
        await this.request.post<string>(
            this.USER_SETTING_TABLE.table,
            this.USER_SETTING_TABLE.keys.SELECTED_GROUP_ID,
            id
        );

        // get group
        return this.request.get<IGroup>(this.GROUPS_TABLE, id);
    };

    // create a new group
    createGroup = async ({ value }: { value: IGroup }) => {
        const id = this.uuid();
        return this.request.post<IGroup>(this.GROUPS_TABLE, id, {
            id: id,
            ...value
        });
    };
}

export const groupsService = new GroupsService();
