import { DbEntry } from "../model/db-entry";

export interface DbService {
    GetDbEntryByUserId(userId: number): DbEntry;
}