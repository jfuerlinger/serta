import { DbTableEntry } from "./table-storage-db-table-entry";

export class DbUserEntry implements DbTableEntry {
    
    public id: string;
    public levelId: number;

    constructor(
        id: string,
        levelId: number) {
        this.RowKey = this.id = id;
        this.levelId = levelId;
    }

    PartitionKey?: string | undefined;
    RowKey?: string | undefined;

}