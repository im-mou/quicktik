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
    private suffix: string;
    private dbConfig: PouchDB.Configuration.DatabaseConfiguration;
    public constants = {
        APP_CONFIG: 'app-config',
        USER_CONFIG: 'user-config'
    };

    // ctor
    constructor(config?: PouchDB.Configuration.DatabaseConfiguration, suffix?: string) {
        // databse settings
        this.dbConfig = config;
        this.suffix = suffix;

        // attach plugins
        PouchDB.plugin(require('pouchdb-upsert'));

        // attach adapter plugin
        if (process.env.NODE_ENV === 'test') {
            // in memory db
            PouchDB.plugin(require('pouchdb-adapter-memory'));
            this.dbConfig['adapter'] = 'memory';
        } else {
            // IndexedDB
            PouchDB.plugin(require('pouchdb-adapter-indexeddb'));
            this.dbConfig['adapter'] = 'indexeddb';
        }
    }

    public init() {
        // create tables
        this.groups = new PouchDB<IGroup>(`groups-table${this.suffix || ''}`, this.dbConfig);

        this.tasks = new PouchDB<any>(`tasks-table${this.suffix || ''}`, this.dbConfig);

        this.config = new PouchDB<IAppConfig | IUserConfig>(`app-config-table${this.suffix || ''}`, this.dbConfig);

        // create an array with tables
        this.tables = [this.groups, this.tasks, this.config];

        return this;
    }

    // Destroy all tebles from the database
    public async destroy() {
        const promises = this.tables.map((table) => {
            return new Promise(async (resolve, reject) => {
                try {
                    await table.close();
                    await table.destroy();
                    resolve(true);
                } catch (e) {
                    reject(e);
                }
            });
        });

        return Promise.all(promises);
    }

    export() {
        // Todo
    }

    import() {
        // Todo
    }
}
