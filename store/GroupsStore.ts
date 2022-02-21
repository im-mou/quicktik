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
        this.fetchAllGroups();
    }

    fetchAllGroups = () => {
        // get all groups
        groupsService.getAll().then(({ data }) => {
            this.groups = data.sort((a, b) => a.order - b.order);
        });

        // get selected group
        groupsService.getSelectedGroup().then(({ data }) => {
            this.selectedGroup = data;
        });
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
