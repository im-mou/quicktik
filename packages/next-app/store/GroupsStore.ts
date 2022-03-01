import { makeAutoObservable } from 'mobx';
import { groupsService } from '../services/groups.service';
import { IGroup } from '../types';
import { RootStore } from './RootStore';

class GroupsStore {
    // global state variables
    rootStore: RootStore;

    selectedGroup: IGroup = null;
    groups: IGroup[] = [];

    // Methods
    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    async init(callback?: () => void) {
        await this.fetchAllGroups();
        callback?.();
    }

    fetchAllGroups = async () => {
        try {
            // get all groups
            const groupsList = await groupsService.getAll();
            this.groups = groupsList.rows.map((row) => row.doc).sort((a, b) => a.order - b.order);

            // get selected group
            const selectedGroup = await groupsService.getSelectedGroup();
            this.selectedGroup = selectedGroup;

            return Promise.resolve(true);
        } catch (e: any) {
            return Promise.reject(e);
        }
    };

    addNewGroup = (group: IGroup) => {
        if (!group) throw new Error('No group was provided.');
        this.groups.push(group);

        // reorder
        this.groups = [...this.groups].sort((a, b) => a.order - b.order);
    };

    setSelectedGroup = (group: IGroup) => {
        if (!group) throw new Error('No group was provided.');
        this.selectedGroup = group;
    };
}

export default GroupsStore;
