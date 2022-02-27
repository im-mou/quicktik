import PouchDB from 'pouchdb';
import Database from '.';
import memoryDBAdapter from 'pouchdb-adapter-memory';

const pouchDBInstance = PouchDB.plugin(memoryDBAdapter);

class TestDatabase {
    db: Database;
    suffix: string;

    constructor(suffix: string = '-test-db') {
        this.suffix = suffix;
    }

    init() {
        this.db = new Database(
            // attach plugins to PouchDB
            pouchDBInstance,
            // db Config
            { adapter: 'memory' },
            // tables suffix
            this.suffix || ''
        );
    }
}

export default TestDatabase;
