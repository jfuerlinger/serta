import { TableEntity } from "./table-entity";

export class DbEntry implements TableEntity{

    public userId: number;
    public levelId: number;

    constructor(
        userId: number,
        levelId: number) {
            this.userId = userId;
            this.levelId = levelId;
    }
    
    [key: string]: string | number | boolean | undefined;
    PartitionKey?: string | undefined;
    RowKey?: string | undefined;

}