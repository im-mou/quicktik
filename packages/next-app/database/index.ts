import PouchDB from 'pouchdb';
import PouchDBObject from './pouchdbObject';

// attach plugins
const MyPouchDB = PouchDB.plugin(require('pouchdb-upsert')).plugin(require('pouchdb-find'));

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
        return new PouchDBObject(
            MyPouchDB.defaults({
                adapter: 'idb'
            })
        );
    };
}

class MemoryDBAdapter {
    createInstance = () => {
        return new PouchDBObject(
            MyPouchDB.plugin(require('pouchdb-adapter-memory')).defaults({
                adapter: 'memory'
            }),
            null,
            '-test-db'
        );
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
