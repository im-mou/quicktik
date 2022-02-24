import indexedDB from '../database/indexedDB';
import { TPouchError } from '../types';

// base service
export default class BaseService {
    public db: ReturnType<typeof indexedDB>;

    constructor() {
        this.db = indexedDB();
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
