import PouchDB from 'pouchdb';
import Database from '.';
// @ts-ignore
import indexedDBAdapter from 'pouchdb-adapter-indexeddb';

const pouchDBInstance = PouchDB.plugin(indexedDBAdapter);

const indexedDB = (config?: PouchDB.Configuration.DatabaseConfiguration, suffix?: string) => {
    return new Database(
        // attach plugins to PouchDB
        pouchDBInstance,
        // db Config
        { adapter: 'indexeddb', ...config },
        // tables suffix
        suffix || ''
    );
};

export default indexedDB;
