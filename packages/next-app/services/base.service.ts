import Database from '../database';
import PouchDBObject from 'database/pouchdbObject';
import { TPouchError } from '../types';

// base service
export default class BaseService {
    public db: PouchDBObject;

    constructor() {
        this.db = Database.getInstance();
    }

    parseError(error: TPouchError | any) {
        if (!error) return;

        if (error?.status === 404) {
            console.error('Resource not found');
        } else {
            console.error(error);
        }
    }
}
