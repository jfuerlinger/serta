import {DbUserEntry} from "../../../model/db-user-entry";
import {IUserDao} from "../../../dao/i-user-dao";

export class FakeUserDao implements IUserDao {
    private storage = new Map<string, DbUserEntry>()

    addOrMerge(entry: DbUserEntry): Promise<DbUserEntry> {
        this.storage.set(entry.id, entry)
        return new Promise<DbUserEntry>((resolve) => {
            resolve(entry)
        })
    }

    deleteById(id: string): Promise<void> {
        return new Promise<void>((resolve) => {
            this.storage.delete(id)
            resolve()
        })
    }

    getAll(): Promise<DbUserEntry[]> {
        return new Promise<DbUserEntry[]>(resolve => {
            if (this.storage.size > 0) {
                const userEntries: DbUserEntry[] = Array.from(this.storage.values())
                resolve(userEntries)
            } else {
                resolve(new Array<DbUserEntry>())
            }
        })
    }

    getById(id: string): Promise<DbUserEntry> {
        return new Promise<DbUserEntry>(resolve => resolve(this.storage.get(id)))
    }
}