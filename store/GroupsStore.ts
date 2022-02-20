import { makeAutoObservable } from 'mobx';
import { TGroup } from '../types';
import { RootStore } from './RootStore';

class GroupsStore {
    // global state variables
    rootStore: RootStore;

    selectedGroup: TGroup | undefined;
    groups: TGroup[] = [];

    // Methods
    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    async init(callback?: () => void) {
        //
    }
}

export default GroupsStore;
