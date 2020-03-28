import { DbEntry } from "../model/db-entry";

export interface DbService {
    GetAll(guildId: string): Promise<DbEntry[]>;
    GetDbEntryByUserId(guildId: string, userId: number): Promise<DbEntry>;
}