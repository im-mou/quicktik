// types

type TPouchDBRow = PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;
export type TPouchError = PouchDB.Core.Error;

// Interfaces
export interface IGroup extends Partial<TPouchDBRow> {
    _id?: string;
    label: string;
    color: string;
    order: number;
}

export interface IAppSettings extends Partial<TPouchDBRow> {
    app_is_initialized?: 0 | 1;
    initialization_timestamp?: number;
    app_version?: string;
}

export interface IUserSettings extends Partial<TPouchDBRow> {
    name?: string;
    selected_group_id?: string;
    last_activity?: number;
}
