import PouchDB from 'pouchdb';
import Database from '.';
import memoryDBAdapter from 'pouchdb-adapter-memory';

const pouchDBInstance = PouchDB.plugin(memoryDBAdapter);

const inMemoryDB = (config?: PouchDB.Configuration.DatabaseConfiguration, suffix?: string) => {
    return new Database(
        // attach plugins to PouchDB
        pouchDBInstance,
        // db Config
        { adapter: 'memory', ...config },
        // tables suffix
        suffix || ''
    );
};

export default inMemoryDB;
