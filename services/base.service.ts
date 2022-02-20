import localForage from 'localforage';

interface IResponse<T = any> {
    data?: T;
    error?: any;
    status: 200 | 201 | 404 | 422 | 500;
}

interface IRequest {
    get: <T = any>(table: LocalForage, key: string) => Promise<IResponse<T>>;
    post: <T = any>(
        table: LocalForage,
        key: string,
        value: any
    ) => Promise<IResponse<T>>;
    put: <T = any>(
        table: LocalForage,
        key: string,
        newValue: any
    ) => Promise<IResponse<T>>;
    delete: <T = any>(table: LocalForage, key: string) => Promise<IResponse<T>>;
    count: (table: LocalForage) => Promise<IResponse<{ length: number }>>;
}

// base service
export default class BaseService {
    // DB tables
    private groupsDB = localForage.createInstance({
        name: 'groups'
    });

    private tasksDB = localForage.createInstance({
        name: 'tasks'
    });

    public DB = {
        groups: this.groupsDB,
        tasks: this.tasksDB
    };

    // Get an item
    private get = async <T = any>(
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
    private post = async <T = any>(
        table: LocalForage,
        key: string,
        value: any
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
    private put = async <T = any>(
        table: LocalForage,
        key: string,
        newValue: any
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
    private delete = async <T = any>(
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
            const data = await table.removeItem(key);

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

    public request: IRequest = {
        get: this.get,
        post: this.post,
        put: this.put,
        delete: this.delete,
        count: this.count
    };
}
