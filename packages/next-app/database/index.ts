import PouchDB from 'pouchdb';
import PouchDBObject from './pouchdbObject';

class DatabaseInstanciator {
    instance: PouchDBObject = null;
    adapter: { createInstance: () => PouchDBObject } = null;

    setAdapter = (adapter: any) => {
        this.adapter = adapter;
    };

    // use the adapter creator to instanciate a db instance
    createInstance = () => {
        this.instance = this.adapter.createInstance();
    };
}

class IndexedBDAdapter {
    createInstance = () => {
        PouchDB.plugin(require('pouchdb-adapter-indexeddb'));
        return new PouchDBObject({ adapter: 'indexeddb' }, '');
    };
}

class MemoryDBAdapter {
    createInstance = () => {
        PouchDB.plugin(require('pouchdb-adapter-memory'));
        return new PouchDBObject({ adapter: 'memory' }, '-test-db');
    };
}

// Good 'ol singleton
const Database = (() => {
    let instance: PouchDBObject = null;
    return {
        getInstance: () => {
            if (!instance) {
                let databaseInstanciator = new DatabaseInstanciator();

                // determine which db adapter to use for testing and in browser
                let adapter = new (process.env.NODE_ENV === 'test' ? MemoryDBAdapter : IndexedBDAdapter)();

                // set adapter
                databaseInstanciator.setAdapter(adapter);

                // instanciate database
                databaseInstanciator.createInstance();

                // save instance
                instance = databaseInstanciator.instance;
            }
            return instance;
        }
    };
})();

export default Database;
