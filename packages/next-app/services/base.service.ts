import Database from 'database';
import { TPouchError } from '../types';

// base service
export default class BaseService {
    public db: Database;

    constructor() {
        this.db = new Database().init();
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
