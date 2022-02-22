import PouchDB from 'pouchdb';
// @ts-ignore
import indexeddbAdapter from 'pouchdb-adapter-indexeddb';
import { IGroup, IAppConfig, IUserConfig } from '../types';

// Attach indexedDB adapter to PouchDB instance.
PouchDB.plugin(indexeddbAdapter).plugin(require('pouchdb-upsert'));

// local interfaces
interface IDatabseInstance<T> extends PouchDB.Database<T> {}

// databse service
class Database {
    // tables
    public groups: IDatabseInstance<IGroup>;
    public tasks: IDatabseInstance<unknown>;
    public config: IDatabseInstance<IAppConfig | IUserConfig>;

    // props
    private dbConfig: PouchDB.Configuration.DatabaseConfiguration;
    public constants = {
        config: {
            APP_CONFIG: 'app-config',
            USER_CONFIG: 'user-config'
        }
    };

    // ctor
    constructor(config?: PouchDB.Configuration.DatabaseConfiguration) {
        // databse settings
        this.dbConfig = config || { adapter: 'indexeddb' /** IndexedDB */ };

        // create tables
        this.groups = new PouchDB<IGroup>('groups-table', this.dbConfig);

        this.tasks = new PouchDB<any>('tasks-table', this.dbConfig);

        this.config = new PouchDB<IAppConfig | IUserConfig>(
            'app-config-table',
            this.dbConfig
        );

        // check if config keys are created
        this.config.putIfNotExists<IAppConfig>({
            _id: this.constants.config.APP_CONFIG,
            initialization_timestamp: +new Date(),
            app_version: 'alpha' // @Todo: use git version
        });
        this.config.putIfNotExists<IUserConfig>({
            _id: this.constants.config.USER_CONFIG
        });
    }
}

// Singleton
export default new Database();
