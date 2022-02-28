import PouchDB from 'pouchdb';
import { IGroup, IAppSettings, IUserSettings } from '../types';

// local interfaces
interface IDatabseInstance<T> extends PouchDB.Database<T> {}

// databse service
export default class PouchDBObject {
    // tables
    public groups: IDatabseInstance<IGroup>;
    public tasks: IDatabseInstance<unknown>;
    public settings: IDatabseInstance<IAppSettings | IUserSettings>;
    public tables: IDatabseInstance<unknown>[] = [];

    // props
    private suffix: string;
    private dbConfig: PouchDB.Configuration.DatabaseConfiguration;
    public constants = {
        APP_SETTINGS: 'app-settings',
        USER_SETTINGS: 'user-settings'
    };

    // ctor
    constructor(settings?: PouchDB.Configuration.DatabaseConfiguration, suffix?: string) {
        // databse settings
        this.dbConfig = settings;
        this.suffix = suffix;

        // attach plugins
        PouchDB.plugin(require('pouchdb-upsert'));
        PouchDB.plugin(require('pouchdb-find'));
    }

    public init() {
        // create tables
        this.groups = new PouchDB<IGroup>(`groups-table${this.suffix || ''}`, this.dbConfig);

        this.tasks = new PouchDB<any>(`tasks-table${this.suffix || ''}`, this.dbConfig);

        this.settings = new PouchDB<IAppSettings | IUserSettings>(
            `app-settings-table${this.suffix || ''}`,
            this.dbConfig
        );

        // create an array with tables
        this.tables = [this.groups, this.tasks, this.settings];

        return this;
    }

    // Destroy all tebles from the database
    public async destroy() {
        const promises = this.tables.map((table) => {
            return new Promise(async (resolve, reject) => {
                try {
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
