import PouchDB from 'pouchdb';
import idbAdapter from 'pouchdb-adapter-idb';
import { IGroup } from '../types';

// local interfaces
interface IDatabseInstance<T> {
    table: PouchDB.Database<T>;
    keys?: { [key: string]: any };
}

interface IUserSettingsTableData {
    selected_group_id: string;
}

// databse service
export default class Database {
    // props
    private pouch:any;
    private dbConfig: PouchDB.Configuration.DatabaseConfiguration;
    public groups: IDatabseInstance<IGroup>;
    public tasks: IDatabseInstance<unknown>;
    public userSettings: IDatabseInstance<IUserSettingsTableData>;

    // ctor
    constructor(config?: PouchDB.Configuration.DatabaseConfiguration) {
        const pouch = PouchDB
        pouch.plugin(idbAdapter)

        // databse settings
        this.dbConfig = config || { adapter: 'indexeddb' /** IndexedDB */ };

        // create tables
        this.groups = {
            table: new pouch<IGroup>('groups-table', this.dbConfig)
        };
        this.tasks = {
            table: new pouch('tasks-table', this.dbConfig)
        };
        this.userSettings = {
            table: new pouch<IUserSettingsTableData>(
                'user-settings-table',
                this.dbConfig
            ),
            keys: {
                SELECTED_GROUP_ID: 'selected_group_id'
            }
        };
    }
}
