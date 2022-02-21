import { uuid as uuidv4, fromString } from 'uuidv4';
import { IRequest, IResponse } from '../types';

// base service
export default class BaseService {
    // Get an item
    private get = async <T extends any>(
        table: LocalForage,
        key: string
    ): Promise<IResponse<T>> => {
        try {
            const data = await table.getItem(key);

            return Promise.resolve({
                status: 200,
                data: data as T
            });
        } catch (err) {
            return Promise.reject({
                status: 404,
                data: err
            });
        }
    };

    // Post -> create item
    private post = async <T extends any>(
        table: LocalForage,
        key: string,
        value: T
    ): Promise<IResponse<T>> => {
        try {
            const data = await table.setItem(key, value);

            return Promise.resolve({
                status: 201,
                data: data as T
            });
        } catch (err) {
            return Promise.reject({
                status: 500,
                data: err
            });
        }
    };

    // put -> update item
    private put = async <T extends any>(
        table: LocalForage,
        key: string,
        newValue: T
    ): Promise<IResponse<T>> => {
        // Check if item exists
        table.getItem(key, function (err) {
            if (err) {
                return Promise.reject({
                    status: 404,
                    data: err
                });
            }
        });

        try {
            const data = await table.setItem(key, newValue);

            return Promise.resolve({
                status: 201,
                data: data as T
            });
        } catch (err) {
            return Promise.reject({
                status: 500,
                data: err
            });
        }
    };

    // delete item from table
    private delete = async <T extends any>(
        table: LocalForage,
        key: string
    ): Promise<IResponse<T>> => {
        // Check if item exists
        table.getItem(key, function (err) {
            if (err) {
                return Promise.reject({
                    status: 404,
                    data: err
                });
            }
        });

        try {
            await table.removeItem(key);

            return Promise.resolve({
                status: 201
            });
        } catch (err) {
            return Promise.reject({
                status: 500,
                data: err
            });
        }
    };

    // count table entries
    private count = async (
        table: LocalForage
    ): Promise<IResponse<{ length: number }>> => {
        try {
            const data = await table.length();

            return Promise.resolve({
                status: 201,
                data: { length: data }
            });
        } catch (err) {
            return Promise.reject({
                status: 500,
                data: err
            });
        }
    };

    // get all table entries
    private all = async <T extends any>(
        table: LocalForage
    ): Promise<IResponse<T>> => {
        try {
            const data: any[] = [];

            return new Promise((resolve, reject) => {
                table
                    .iterate((value, key) => {
                        data.push(value);
                    })
                    .then(() => {
                        resolve({
                            status: 201,
                            data: data as T
                        });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } catch (err) {
            return Promise.reject({
                status: 500,
                data: err
            });
        }
    };

    // Request functions
    public request: IRequest = {
        get: this.get,
        post: this.post,
        put: this.put,
        delete: this.delete,
        count: this.count,
        all: this.all
    };

    // get random uuid
    public uuid = (string?: string) => {
        if (string) {
            return fromString(string);
        } else {
            return uuidv4();
        }
    };
}
