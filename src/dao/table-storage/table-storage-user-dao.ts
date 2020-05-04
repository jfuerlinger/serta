import { DbDao } from "./table-storage-db-dao";
import { IUserDao } from "../i-user-dao";
import { DbUserEntry } from "../../model/db-user-entry";
import { IAppConfigurationDao } from "../app-configuration/i-app-configuration-dao";

// Dao to work with the SertaUsers table storage entries.
export class TableStorageUserDao extends DbDao<DbUserEntry> implements IUserDao {

    constructor(
        appConfigurationDao : IAppConfigurationDao,
        guildId: string) {
        super(appConfigurationDao, 'SertaUsers', guildId);
    }

    addOrMerge(entry: DbUserEntry): Promise<DbUserEntry> {
        return this.addOrMergeRecord(entry);
    }

    deleteById(id: string): Promise<void> {
        return this.deleteRecord(id);
    }

    getById(id: string): Promise<DbUserEntry | undefined> {
        return this.getRecord(id);
    }

    getAll(): Promise<DbUserEntry[]> {
        return this.getAll();
    }
}