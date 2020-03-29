import { DbTableEntry } from "./table-storage-db-table-entry";

export class DbUserEntry implements DbTableEntry {
    
    public levelId: number;
    public id: string;

    constructor(
        id: string,
        levelId: number) {
        this.RowKey = this.id = id;
        this.levelId = levelId;
    }

    PartitionKey?: string | undefined;
    RowKey?: string | undefined;

}