import localForage from 'localforage';

// base service
export default class Database {
    // DB tables
    public dbName = 'quicktik-db';

    public groupsTable = localForage.createInstance({
        name: this.dbName,
        storeName: 'groups-table',
        description: 'Table to store tasks groups created by the user.'
    });

    public tasksTable = localForage.createInstance({
        name: this.dbName,
        storeName: 'tasks-table',
        description: 'Table to store tasks created by the user.'
    });

    public userSettingsTable = {
        table: localForage.createInstance({
            name: this.dbName,
            storeName: 'user-settings-table',
            description: 'Table with setting defined by user'
        }),
        keys: {
            SELECTED_GROUP_ID: 'selected_group_id'
        }
    };
}
