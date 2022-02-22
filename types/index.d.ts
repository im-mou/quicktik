// types

type TPouchDBRow = PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

export interface IGroup extends Partial<TPouchDBRow> {
    _id?: string;
    label: string;
    color: string;
    order: number;
}

export interface IAppConfig {
    app_is_initialized?: boolean;
    initialization_timestamp?: number;
    app_version?: string;
}

export interface IUserConfig {
    name?: string;
    profile_image?: any;
    selected_group_id?: string;
    last_activity?: number;
}
