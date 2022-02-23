// types

type TPouchDBRow = PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

export interface IGroup extends Partial<TPouchDBRow> {
    _id?: string;
    label: string;
    color: string;
    order: number;
}

export interface IAppConfig extends Partial<TPouchDBRow> {
    app_is_initialized?: 0 | 1;
    initialization_timestamp?: number;
    app_version?: string;
}

export interface IUserConfig extends Partial<TPouchDBRow> {
    name?: string;
    selected_group_id?: string;
    last_activity?: number;
}
