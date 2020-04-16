import { DbUserEntry } from "../model/db-user-entry";

// Dao to getAll the Serta specific data for a user.
export interface IUserDao {
    
    getAll() : Promise<DbUserEntry[]>;
    getById(id : string) : Promise<DbUserEntry | undefined>;

    addOrMerge(entry : DbUserEntry) : Promise<DbUserEntry>;
    deleteById(id: string) : Promise<void>;
    
}