import { DbDao } from "./table-storage-db-dao";
import { UserDao } from "../user-dao";
import { DbUserEntry } from "../../model/db-user-entry";

// Dao to work with the SertaUsers table storage entries.
export class TableStorageUserDao extends DbDao<DbUserEntry> implements UserDao {

    constructor(guildId: string) {
        super('SertaUsers', guildId);
    }

    add(entry: DbUserEntry): Promise<DbUserEntry> {
        return this.addOrMergeRecord(entry);
    }

    deleteById(id: string): Promise<void> {
        return this.deleteRecord(id);
    }

    getById(id: string): Promise<DbUserEntry> {
        return this.getRecord(id);
    }

    getAll(): Promise<DbUserEntry[]> {
        return this.getAll();
    }
}