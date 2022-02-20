import { makeAutoObservable, runInAction } from 'mobx';
import GroupsStore from './GroupsStore';

export default class RootStore {
    // Variables to assign instances of the 'stores' within the RootStore ctor.
    // To each of these stores we pass the root object and therefore so that each store is independent and also has the RootStore reference.
    GroupsStore: GroupsStore;

    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        // Initialize stores
        this.GroupsStore = new GroupsStore(this);
    }

    async init() {
        runInAction(() => {
            this.appLoaded = true;
        });
    }
}
