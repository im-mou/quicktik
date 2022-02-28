import PouchDB from 'pouchdb';
import { IGroup, IAppSettings, IUserSettings } from '../types';

// local interfaces and types
interface IDatabseInstance<T> extends PouchDB.Database<T> {}
type TMyPouchDB = ReturnType<typeof PouchDB.defaults>;

// databse service
export default class PouchDBObject {
    private MyPouchDB: TMyPouchDB;
    private initialized: boolean = false;

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
    constructor(MyPouchDB: TMyPouchDB, settings?: PouchDB.Configuration.DatabaseConfiguration, suffix?: string) {
        // databse settings
        this.MyPouchDB = MyPouchDB;
        this.dbConfig = settings;
        this.suffix = suffix;
    }

    public async init() {
        // singleton behaviour
        if (this.initialized) return this;

        // create tables
        this.groups = new this.MyPouchDB<IGroup>(`groups-table${this.suffix || ''}`, this.dbConfig);

        this.tasks = new this.MyPouchDB<any>(`tasks-table${this.suffix || ''}`, this.dbConfig);

        this.settings = new this.MyPouchDB<IAppSettings | IUserSettings>(
            `app-settings-table${this.suffix || ''}`,
            this.dbConfig
        );

        // create an array with tables
        this.tables = [this.groups, this.tasks, this.settings];

        // Insert initial USER SETTING data
        await this.settings.putIfNotExists<IUserSettings>({
            _id: this.constants.USER_SETTINGS
        });

        // Insert initial APP SETTING data
        await this.settings.putIfNotExists<IAppSettings>({
            _id: this.constants.APP_SETTINGS,
            initialization_timestamp: +new Date(),
            app_version: 'alpha' // @Todo: use git version
        });

        this.initialized = true;

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
