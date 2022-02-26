import Database from '../database';
import inMemoryDB from '../database/inMemoryDB';

class TestDatabase {
    db: Database;
    suffix: string;

    constructor(suffix: string = '-jest-test-db') {
        this.suffix = suffix;
    }

    init() {
        this.db = inMemoryDB();
    }
}

export default TestDatabase;
