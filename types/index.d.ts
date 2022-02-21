// types

export interface IGroup {
    id?: string;
    label: string;
    color: string;
    order: number;
}

export interface IResponse<T = any> {
    data?: T;
    error?: any;
    status: 200 | 201 | 404 | 422 | 500;
}

export interface IRequest {
    get: <T extends any>(
        table: LocalForage,
        key: string
    ) => Promise<IResponse<T>>;
    all: <T extends any>(table: LocalForage) => Promise<IResponse<T>>;
    post: <T extends any>(
        table: LocalForage,
        key: string,
        value: any
    ) => Promise<IResponse<T>>;
    put: <T extends any>(
        table: LocalForage,
        key: string,
        newValue: any
    ) => Promise<IResponse<T>>;
    delete: <T extends any>(
        table: LocalForage,
        key: string
    ) => Promise<IResponse<T>>;
    count: (table: LocalForage) => Promise<IResponse<{ length: number }>>;
}
