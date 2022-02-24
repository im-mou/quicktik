import PouchDB from 'pouchdb';
import { IGroup, IAppConfig, IUserConfig } from '../types';

// local interfaces
interface IDatabseInstance<T> extends PouchDB.Database<T> {}

// databse service
export default class Database {
    // tables
    public groups: IDatabseInstance<IGroup>;
    public tasks: IDatabseInstance<unknown>;
    public config: IDatabseInstance<IAppConfig | IUserConfig>;
    public tables: IDatabseInstance<unknown>[] = [];

    // props
    private dbConfig: PouchDB.Configuration.DatabaseConfiguration;
    public constants = {
        APP_CONFIG: 'app-config',
        USER_CONFIG: 'user-config'
    };

    // ctor
    constructor(
        PouchDBInstance: PouchDB.Static<{}>,
        config?: PouchDB.Configuration.DatabaseConfiguration,
        suffix?: string
    ) {
        // attach plugins
        PouchDBInstance.plugin(require('pouchdb-upsert'));

        // databse settings
        this.dbConfig = config || { adapter: 'indexeddb' /** IndexedDB */ };

        // create tables
        this.groups = new PouchDBInstance<IGroup>(
            `groups-table${suffix || ''}`,
            this.dbConfig
        );

        this.tasks = new PouchDBInstance<any>(
            `tasks-table${suffix || ''}`,
            this.dbConfig
        );

        this.config = new PouchDBInstance<IAppConfig | IUserConfig>(
            `app-config-table${suffix || ''}`,
            this.dbConfig
        );

        // create an array with tables
        this.tables = [this.groups, this.tasks, this.config];
    }

    async destroy() {
        return this.tables.map((table) => {
            table.destroy();
        });
    }

    export() {
        // Todo
    }

    import() {
        // Todo
    }
}
