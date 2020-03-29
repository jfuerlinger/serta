import { DbUserEntry } from "../model/db-user-entry";

// Dao to get the Serta specific data for a user.
export interface UserDao {
    
    getAll() : Promise<DbUserEntry[]>;
    getById(id : string) : Promise<DbUserEntry>;

    add(entry : DbUserEntry) : Promise<DbUserEntry>;
    deleteById(id: string) : Promise<void>;
    
}