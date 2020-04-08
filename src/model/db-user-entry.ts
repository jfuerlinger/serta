import { DbTableEntry } from "./table-storage-db-table-entry";

export class DbUserEntry implements DbTableEntry {
    
    public id: string
    public levelId: number
    public immuneLevel: number
    public experiencePoints: number

    constructor(
        id: string,
        levelId: number,
        immuneLevel: number,
        experiencePoints: number) {
        this.RowKey = this.id = id;
        this.levelId = levelId;
        this.immuneLevel = immuneLevel
        this.experiencePoints = experiencePoints
    }

    PartitionKey?: string | undefined;
    RowKey?: string | undefined;

}