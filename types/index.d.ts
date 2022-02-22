// types

type TPouchDBRow = PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

export interface IGroup extends Partial<TPouchDBRow> {
    _id?: string;
    label: string;
    color: string;
    order: number;
}
